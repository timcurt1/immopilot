import "server-only";
import { computeQualification, buildRelanceMessage, missingDocuments, completionRate } from "./logic";
import type { Application, RentalDocument, Task, Visit } from "./types";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = "claude-sonnet-4-6";

export type AiOutcome<T> = { source: "ai" | "fallback"; data: T };

async function callClaude(system: string, userMessage: string): Promise<string | null> {
  if (!ANTHROPIC_API_KEY) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1000,
        system,
        messages: [{ role: "user", content: userMessage }],
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.warn(`[ai] Claude API a répondu ${res.status}, repli sur les règles locales.`);
      return null;
    }
    const json = await res.json();
    const text = json?.content?.[0]?.text;
    return typeof text === "string" ? text : null;
  } catch (err) {
    console.warn("[ai] Appel Claude échoué, repli sur les règles locales.", err instanceof Error ? err.message : err);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// Parse le JSON renvoyé par le modèle et valide sa forme via `isValid` avant de le faire confiance :
// une réponse mal formée (champ manquant, tronquée par max_tokens, JSON noyé dans du texte) doit
// déclencher le repli local, jamais planter l'action serveur qui l'appelle.
function extractJson<T>(text: string, isValid: (v: unknown) => v is T): T | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[0]);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

// 1. Qualification automatique — extrait besoin/type/budget/localisation/urgence + score /100 depuis un texte libre.
export type ProspectExtraction = {
  need: string;
  propertyType: string;
  budget: number | null;
  location: string;
  urgency: "faible" | "moyenne" | "élevée";
  score: number;
  reasoning: string;
};

export async function aiQualifyProspect(freeText: string): Promise<AiOutcome<ProspectExtraction>> {
  const system =
    "Tu es le moteur de qualification d'ImmoPilot, un copilote IA pour agences immobilières françaises. " +
    "Analyse la demande d'un prospect (email ou message libre) et réponds UNIQUEMENT avec un objet JSON de la forme " +
    '{"need":string,"propertyType":string,"budget":number|null,"location":string,"urgency":"faible"|"moyenne"|"élevée","score":number (0-100),"reasoning":string (une phrase courte)}. ' +
    "Le score reflète la qualité/maturité du prospect (budget réaliste, urgence, précision de la demande). Ne réponds rien d'autre que ce JSON.";
  const text = await callClaude(system, freeText);
  if (text) {
    const parsed = extractJson<ProspectExtraction>(text, isProspectExtraction);
    if (parsed) return { source: "ai", data: parsed };
  }
  return { source: "fallback", data: fallbackQualify(freeText) };
}

function isProspectExtraction(v: unknown): v is ProspectExtraction {
  if (!isRecord(v)) return false;
  return (
    typeof v.need === "string" &&
    typeof v.propertyType === "string" &&
    (v.budget === null || typeof v.budget === "number") &&
    typeof v.location === "string" &&
    (v.urgency === "faible" || v.urgency === "moyenne" || v.urgency === "élevée") &&
    typeof v.score === "number" &&
    typeof v.reasoning === "string"
  );
}

function fallbackQualify(freeText: string): ProspectExtraction {
  const t = freeText.toLowerCase();
  const budgetMatch = t.match(/(\d{2,5})\s?€|\b(\d{2,5})\s?euros?\b/);
  const budget = budgetMatch ? Number(budgetMatch[1] || budgetMatch[2]) : null;
  const typeMatch = t.match(/\b(t1|t2|t3|t4|t5|studio|maison|loft|duplex)\b/i);
  const propertyType = typeMatch ? typeMatch[0].toUpperCase() : "Non précisé";
  const cityGuess = freeText.match(/\b(?:à|sur|vers)\s+([A-ZÀ-Ý][a-zà-ÿ-]+(?:\s[A-ZÀ-Ý][a-zà-ÿ-]+)*)/);
  const location = cityGuess ? cityGuess[1] : "Non précisée";
  const urgentWords = ["urgent", "rapidement", "vite", "dès que possible", "immédiat"];
  const urgency: ProspectExtraction["urgency"] = urgentWords.some((w) => t.includes(w)) ? "élevée" : t.includes("bientôt") ? "moyenne" : "faible";
  let score = 40;
  if (budget) score += 15;
  if (typeMatch) score += 15;
  if (cityGuess) score += 15;
  if (urgency === "élevée") score += 15;
  else if (urgency === "moyenne") score += 8;
  return {
    need: freeText.slice(0, 140),
    propertyType,
    budget,
    location,
    urgency,
    score: Math.min(100, score),
    reasoning: "Extraction par mots-clés (repli local, sans appel IA).",
  };
}

// 2. Synthèse automatique de dossier.
export async function aiSummarizeDossier(app: Application, docs: RentalDocument[]): Promise<AiOutcome<string>> {
  const system =
    "Tu es l'assistant d'ImmoPilot. Rédige une synthèse narrative courte (4-6 phrases, en français) d'un dossier de candidature locative " +
    "à destination d'un agent immobilier : profil du candidat, points forts, points de vigilance, pièces manquantes, recommandation. " +
    "Sois factuel, concis, professionnel. Ne fabrique aucune information absente des données fournies.";
  const missing = missingDocuments(docs).map((d) => d.label);
  const payload = JSON.stringify({
    candidat: `${app.first_name} ${app.last_name}`,
    bien: app.property?.title,
    loyer: app.property?.rent,
    revenu: app.income,
    statut_pro: app.job_status,
    garant: app.guarantor_status,
    score: app.score,
    probabilite_signature: app.signature_probability,
    statut_dossier: app.stage,
    documents_manquants: missing,
    taux_completude: completionRate(docs),
    note_agent: app.note,
  });
  const text = await callClaude(system, payload);
  if (text) return { source: "ai", data: text.trim() };
  return { source: "fallback", data: fallbackSummary(app, docs, missing) };
}

function fallbackSummary(app: Application, docs: RentalDocument[], missing: string[]): string {
  const completion = completionRate(docs);
  const parts = [
    `${app.first_name} ${app.last_name} candidate pour ${app.property?.title || "un bien"} (loyer ${app.property?.rent ?? "?"} €), statut « ${app.job_status || "non précisé"} », revenu déclaré ${app.income ?? 0} €.`,
    `Score de qualification : ${app.score}/100, probabilité de signature estimée à ${app.signature_probability}%.`,
    missing.length ? `Pièces manquantes : ${missing.join(", ")} (dossier complet à ${completion}%).` : `Dossier complet à ${completion}%.`,
    `Statut actuel : ${app.stage}.`,
  ];
  if (app.note) parts.push(`Note agent : ${app.note}`);
  return parts.join(" ");
}

// 3. Assistant conversationnel — répond à une question en langage naturel sur les données de l'agence.
export type AssistantAnswer = { answer: string; relatedApplicationIds: string[] };

export async function aiAnswerAssistant(
  question: string,
  context: { applications: Application[]; tasks: Task[]; visits: Visit[] }
): Promise<AiOutcome<AssistantAnswer>> {
  const system =
    "Tu es l'assistant conversationnel d'ImmoPilot, branché sur les données réelles d'une agence immobilière. " +
    "Réponds UNIQUEMENT avec un objet JSON {\"answer\":string (réponse en français, concise, factuelle, basée uniquement sur les données fournies), " +
    '"relatedApplicationIds":string[] (ids des dossiers cités dans la réponse)}. ' +
    "Ne propose jamais d'envoyer un message toi-même : tu informes l'agent, il agit ensuite.";
  const payload = JSON.stringify({
    question,
    dossiers: context.applications.map((a) => ({
      id: a.id,
      candidat: `${a.first_name} ${a.last_name}`,
      statut: a.stage,
      activite: a.activity,
      score: a.score,
      visite: a.visit_status,
      bien: a.property?.title,
      derniere_maj: a.updated_at,
    })),
    taches: context.tasks.map((t) => ({ titre: t.title, priorite: t.priority, statut: t.status })),
    visites: context.visits.map((v) => ({ date: v.scheduled_at, statut: v.status, candidat: v.application?.first_name })),
  });
  const text = await callClaude(system, payload);
  if (text) {
    const parsed = extractJson<AssistantAnswer>(text, isAssistantAnswer);
    if (parsed) return { source: "ai", data: parsed };
  }
  return { source: "fallback", data: fallbackAssistant(question, context) };
}

function isAssistantAnswer(v: unknown): v is AssistantAnswer {
  if (!isRecord(v)) return false;
  return typeof v.answer === "string" && Array.isArray(v.relatedApplicationIds) && v.relatedApplicationIds.every((id) => typeof id === "string");
}

function fallbackAssistant(question: string, context: { applications: Application[] }): AssistantAnswer {
  const q = question.toLowerCase();
  const wantsRelance = /relanc|sans réponse|48h|inactif|urgen/.test(q);
  const wantsReady = /prêt|valider|complet/.test(q);
  let matches = context.applications;
  if (wantsRelance) matches = matches.filter((a) => a.activity === "Pas d’activité 48h" || a.stage === "À relancer");
  else if (wantsReady) matches = matches.filter((a) => a.stage === "Prêt à valider");
  else matches = matches.slice(0, 3);
  const answer = matches.length
    ? `${matches.length} dossier(s) concerné(s) : ${matches.map((a) => `${a.first_name} ${a.last_name} (${a.stage})`).join(", ")}.`
    : "Aucun dossier ne correspond à cette question pour le moment.";
  return { answer: `${answer} (réponse par mots-clés, repli local sans appel IA)`, relatedApplicationIds: matches.map((a) => a.id) };
}

// 4a. Rédaction/relances assistées — brouillon de message, jamais envoyé automatiquement.
export async function aiDraftMessage(
  kind: "relance" | "redaction",
  app: Application,
  docs: RentalDocument[],
  instruction?: string
): Promise<AiOutcome<string>> {
  const system =
    "Tu es le rédacteur assisté d'ImmoPilot. Rédige un message court (3-5 phrases), en français, professionnel et chaleureux, " +
    "destiné à un candidat locataire, à partir des données de son dossier. Ne signe pas le message. Ne dis jamais que tu es une IA. " +
    "Tu proposes un brouillon : l'agent le relira et le validera avant tout envoi.";
  const missing = missingDocuments(docs).map((d) => d.label);
  const payload = JSON.stringify({
    type_message: kind,
    instruction: instruction || null,
    candidat: app.first_name,
    bien: app.property?.title,
    statut: app.stage,
    documents_manquants: missing,
    score: app.score,
  });
  const text = await callClaude(system, payload);
  if (text) return { source: "ai", data: text.trim() };
  return { source: "fallback", data: buildRelanceMessage(app, docs) };
}

// 4b. Structuration de compte-rendu de visite — notes libres -> champs structurés.
export type StructuredVisitReport = {
  impression: "Très positive" | "Positive" | "Mitigée" | "Négative";
  positives: string;
  concerns: string;
  signatureLikelihood: "Élevée" | "Moyenne" | "Faible";
  nextStep: string;
};

export async function aiStructureVisitNotes(rawNotes: string): Promise<AiOutcome<StructuredVisitReport>> {
  const system =
    "Tu structures les notes libres qu'un agent immobilier prend juste après une visite. Réponds UNIQUEMENT avec un objet JSON " +
    '{"impression":"Très positive"|"Positive"|"Mitigée"|"Négative","positives":string,"concerns":string,"signatureLikelihood":"Élevée"|"Moyenne"|"Faible","nextStep":string}. ' +
    "Base-toi uniquement sur les notes fournies.";
  const text = await callClaude(system, rawNotes);
  if (text) {
    const parsed = extractJson<StructuredVisitReport>(text, isStructuredVisitReport);
    if (parsed) return { source: "ai", data: parsed };
  }
  return { source: "fallback", data: fallbackStructureNotes(rawNotes) };
}

function isStructuredVisitReport(v: unknown): v is StructuredVisitReport {
  if (!isRecord(v)) return false;
  const impressions = ["Très positive", "Positive", "Mitigée", "Négative"];
  const likelihoods = ["Élevée", "Moyenne", "Faible"];
  return (
    typeof v.impression === "string" &&
    impressions.includes(v.impression) &&
    typeof v.positives === "string" &&
    typeof v.concerns === "string" &&
    typeof v.signatureLikelihood === "string" &&
    likelihoods.includes(v.signatureLikelihood) &&
    typeof v.nextStep === "string"
  );
}

function fallbackStructureNotes(rawNotes: string): StructuredVisitReport {
  const t = rawNotes.toLowerCase();
  const positive = /content|ravi|adore|parfait|top|super|motivé/.test(t);
  const negative = /déçu|pas convaincu|trop petit|trop cher|problème|inquiet/.test(t);
  return {
    impression: positive && !negative ? "Positive" : negative && !positive ? "Mitigée" : "Positive",
    positives: rawNotes.slice(0, 200) || "—",
    concerns: negative ? rawNotes.slice(0, 200) : "—",
    signatureLikelihood: positive && !negative ? "Élevée" : negative ? "Faible" : "Moyenne",
    nextStep: "Relancer le candidat sous 48h (repli local, sans appel IA).",
  };
}

// 5. Traitement documentaire — suggère le type de pièce à partir du nom de fichier / libellé attendu.
export async function aiClassifyDocument(fileName: string, expectedTypes: { type: string; label: string }[]): Promise<AiOutcome<string>> {
  const fallback = fallbackClassifyDocument(fileName, expectedTypes);
  const system =
    "Tu classes un document immobilier déposé par un candidat locataire. On te donne le nom du fichier et la liste des types de pièces " +
    'attendues pour ce dossier. Réponds UNIQUEMENT avec un objet JSON {"type":string} où "type" est EXACTEMENT une des valeurs "type" fournies, ' +
    "celle qui correspond le mieux au nom de fichier.";
  const text = await callClaude(system, JSON.stringify({ fileName, expectedTypes }));
  if (text) {
    const parsed = extractJson<{ type: string }>(
      text,
      (v): v is { type: string } => isRecord(v) && typeof v.type === "string" && expectedTypes.some((e) => e.type === v.type)
    );
    if (parsed) return { source: "ai", data: parsed.type };
  }
  return { source: "fallback", data: fallback };
}

function fallbackClassifyDocument(fileName: string, expectedTypes: { type: string; label: string }[]): string {
  const f = fileName.toLowerCase();
  const rules: Record<string, string[]> = {
    id: ["cni", "carte", "identite", "identité", "passeport"],
    domicile: ["domicile", "quittance", "facture", "edf", "electricite"],
    contrat: ["contrat", "attestation", "travail"],
    paie: ["paie", "salaire", "bulletin"],
    impots: ["impot", "impôt", "avis"],
    rib: ["rib", "iban", "banque"],
    garant: ["garant", "caution"],
  };
  for (const e of expectedTypes) {
    const keywords = rules[e.type] || [];
    if (keywords.some((k) => f.includes(k))) return e.type;
  }
  return expectedTypes[0]?.type || "";
}
