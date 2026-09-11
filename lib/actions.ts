"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient, getCurrentProfile, supabaseConfigured } from "./supabaseServer";
import { supabaseAdmin, supabaseAdminConfigured } from "./supabaseAdmin";
import { PLANS, isPlanId } from "./plans";
import { sendEmail } from "./email";
import { computeQualification, getApplications, getDocuments, getProperties, getTasks, getVisits } from "./data";
import { logTimelineEvent } from "./timeline";
import {
  aiAnswerAssistant,
  aiClassifyDocument,
  aiDraftMessage,
  aiQualifyProspect,
  aiStructureVisitNotes,
  aiSummarizeDossier,
} from "./ai";

async function getAgencyPlan(supabase: ReturnType<typeof createSupabaseServerClient>, agencyId: string) {
  const { data } = await supabase.from("agencies").select("plan").eq("id", agencyId).single();
  const plan = data?.plan && isPlanId(data.plan) ? data.plan : "starter";
  return PLANS[plan];
}

async function notifyAgencyAdmins(supabase: ReturnType<typeof createSupabaseServerClient>, agencyId: string, subject: string, html: string) {
  const { data: admins } = await supabase.from("profiles").select("email").eq("agency_id", agencyId).in("role", ["admin", "manager"]);
  await Promise.all((admins || []).map((a) => sendEmail({ to: a.email as string, subject, html })));
}

export async function signOut() {
  if (supabaseConfigured) {
    const supabase = createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  redirect("/login");
}

export async function updateApplicationStage(id: string, stage: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role === "candidate") return { ok: false, error: "Réservé aux collaborateurs de l'agence." };
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("applications").update({ stage, updated_at: new Date().toISOString() }).eq("id", id);
  if (!error) {
    await logTimelineEvent(id, `Statut changé : ${stage}`);
    revalidatePath(`/applications/${id}`);
    revalidatePath("/applications");
    revalidatePath("/dashboard");
  }
  return { ok: !error, error: error?.message };
}

// Enregistre un brouillon de message sur le dossier — NE L'ENVOIE JAMAIS. L'envoi requiert un
// appel explicite à sendMessageToCandidate, déclenché par un clic dédié côté agent (contrôle humain).
export async function saveAIMessage(applicationId: string, message: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role === "candidate") return { ok: false, error: "Réservé aux collaborateurs de l'agence." };
  const supabase = createSupabaseServerClient();
  const { error: e1 } = await supabase.from("applications").update({ last_message: message }).eq("id", applicationId);
  const { error: e2 } = await supabase.from("messages").insert({ application_id: applicationId, sender: "ai", body: message });
  if (!e1) {
    revalidatePath(`/applications/${applicationId}`);
  }
  return { ok: !e1 && !e2, error: e1?.message || e2?.message };
}

// Envoi effectif au candidat — action séparée et explicite, jamais déclenchée automatiquement par
// une génération IA. C'est le point de validation humaine obligatoire avant tout envoi.
export async function sendMessageToCandidate(applicationId: string, message: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role === "candidate") {
    return { ok: false, error: "Seul un agent peut envoyer un message à un candidat." };
  }
  const supabase = createSupabaseServerClient();
  const { data: application, error } = await supabase
    .from("applications")
    .update({ last_message: message })
    .eq("id", applicationId)
    .select("candidate_email, first_name")
    .single();
  if (error || !application) return { ok: false, error: error?.message || "Dossier introuvable." };
  await supabase.from("messages").insert({ application_id: applicationId, sender: "ai", body: message });
  const sendResult = await sendEmail({
    to: application.candidate_email as string,
    subject: "Message de votre agence",
    html: `<p>Bonjour ${application.first_name},</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
  });
  await logTimelineEvent(applicationId, "Message envoyé au candidat");
  revalidatePath(`/applications/${applicationId}`);
  revalidatePath("/candidate");
  return { ok: sendResult.ok, error: sendResult.error, local: sendResult.local };
}

// Génère un brouillon (relance ou rédaction) via l'IA, avec repli local automatique. Ne modifie
// rien en base : c'est à l'agent de sauvegarder (saveAIMessage) puis d'envoyer (sendMessageToCandidate).
export async function generateMessageDraft(applicationId: string, kind: "relance" | "redaction", instruction?: string) {
  const [applications, documents] = await Promise.all([getApplications(), getDocuments(applicationId)]);
  const application = applications.find((a) => a.id === applicationId);
  if (!application) return { ok: false, error: "Dossier introuvable." };
  const result = await aiDraftMessage(kind, application, documents, instruction);
  return { ok: true, message: result.data, source: result.source };
}

export async function createProperty(input: { title: string; address: string; city: string; rent: number }) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile) return { ok: false, error: "Profil introuvable. Reconnecte-toi." };
  const supabase = createSupabaseServerClient();
  const plan = await getAgencyPlan(supabase, profile.agency_id);
  const { count } = await supabase.from("properties").select("id", { count: "exact", head: true }).eq("agency_id", profile.agency_id);
  if ((count ?? 0) >= plan.maxProperties) {
    return { ok: false, error: `Limite de biens atteinte pour le palier ${plan.label} (${plan.maxProperties}). Passe au palier supérieur dans Réglages.` };
  }
  const { data, error } = await supabase
    .from("properties")
    .insert({ agency_id: profile.agency_id, title: input.title, address: input.address, city: input.city, rent: input.rent })
    .select("id")
    .single();
  return { ok: !error, error: error?.message, id: data?.id as string | undefined };
}

export async function submitApplication(
  propertyId: string,
  input: {
    first_name: string;
    last_name: string;
    candidate_email: string;
    phone?: string;
    city?: string;
    job_status?: string;
    income?: number;
    guarantor_status?: string;
    guarantor_income?: number;
  }
) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const supabase = createSupabaseServerClient();
  const { data: property, error: propertyError } = await supabase
    .from("properties")
    .select("id, agency_id, rent")
    .eq("id", propertyId)
    .single();
  if (propertyError || !property) return { ok: false, error: "Bien introuvable." };
  const { score, signature_probability } = computeQualification(input, property.rent as number);
  const { error } = await supabase
    .from("applications")
    .insert({ agency_id: property.agency_id, property_id: property.id, ...input, score, signature_probability });
  if (!error) {
    await notifyAgencyAdmins(
      supabase,
      property.agency_id,
      "Nouvelle candidature reçue",
      `<p>${input.first_name} ${input.last_name} (${input.candidate_email}) vient de candidater.</p>`
    );
  }
  return { ok: !error, error: error?.message };
}

export async function inviteTeammate(email: string, role: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || !["admin", "manager"].includes(profile.role)) {
    return { ok: false, error: "Seuls les admins et managers peuvent inviter un coéquipier." };
  }
  if (!supabaseAdminConfigured || !supabaseAdmin) {
    return { ok: false, error: "Invitation indisponible : SUPABASE_SERVICE_ROLE_KEY n’est pas configurée." };
  }
  const supabase = createSupabaseServerClient();
  const plan = await getAgencyPlan(supabase, profile.agency_id);
  const { count } = await supabase.from("profiles").select("id", { count: "exact", head: true }).eq("agency_id", profile.agency_id);
  if ((count ?? 0) >= plan.maxUsers) {
    return { ok: false, error: `Limite d’utilisateurs atteinte pour le palier ${plan.label} (${plan.maxUsers}). Passe au palier supérieur dans Réglages.` };
  }
  const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: { invited: true, agency_id: profile.agency_id, role },
  });
  return { ok: !error, error: error?.message };
}

export async function uploadDocument(applicationId: string, documentType: string, label: string, file: File) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const supabase = createSupabaseServerClient();
  const path = `${applicationId}/${documentType}-${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage.from("rental-documents").upload(path, file, { upsert: true });
  if (uploadError) return { ok: false, error: uploadError.message };
  const { error: dbError } = await supabase
    .from("documents")
    .upsert(
      { application_id: applicationId, type: documentType, label, status: "à vérifier", file_name: file.name, storage_path: path },
      { onConflict: "application_id,type" }
    );
  if (!dbError) {
    const { data: application } = await supabase.from("applications").select("agency_id, first_name, last_name").eq("id", applicationId).single();
    if (application?.agency_id) {
      await notifyAgencyAdmins(
        supabase,
        application.agency_id,
        "Nouveau document reçu",
        `<p>${application.first_name} ${application.last_name} a déposé un document (${label}).</p>`
      );
    }
  }
  if (!dbError) {
    await logTimelineEvent(applicationId, `Document déposé : ${label}`);
    revalidatePath(`/applications/${applicationId}`);
    revalidatePath("/candidate");
  }
  return { ok: !dbError, error: dbError?.message };
}

export async function updateDocumentStatus(documentId: string, status: "validé" | "refusé", rejectionReason?: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role === "candidate") {
    return { ok: false, error: "Seul un agent peut valider ou refuser un document." };
  }
  const supabase = createSupabaseServerClient();
  const { data: document, error } = await supabase
    .from("documents")
    .update({ status, rejection_reason: status === "refusé" ? rejectionReason || null : null, updated_at: new Date().toISOString() })
    .eq("id", documentId)
    .select("application_id, label")
    .single();
  if (error) return { ok: false, error: error.message };
  if (status === "refusé" && document) {
    const { data: application } = await supabase
      .from("applications")
      .select("candidate_email, first_name")
      .eq("id", document.application_id)
      .single();
    if (application?.candidate_email) {
      await sendEmail({
        to: application.candidate_email as string,
        subject: "Document à corriger",
        html: `<p>Bonjour ${application.first_name},</p><p>Le document « ${document.label} » n'a pas pu être validé${
          rejectionReason ? ` : ${rejectionReason}` : ""
        }. Merci de le renvoyer depuis votre portail candidat.</p>`,
      });
    }
  }
  if (document?.application_id) {
    await logTimelineEvent(document.application_id, `Document ${status} : ${document.label}`);
    revalidatePath(`/applications/${document.application_id}`);
    revalidatePath("/candidate");
    revalidatePath("/dashboard");
  }
  return { ok: true };
}

export async function scheduleVisit(applicationId: string, scheduledAt: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role === "candidate") {
    return { ok: false, error: "Seul un agent peut programmer une visite." };
  }
  const supabase = createSupabaseServerClient();
  const { data: application } = await supabase
    .from("applications")
    .select("property:properties(address)")
    .eq("id", applicationId)
    .single();
  const address = (application?.property as { address?: string } | null)?.address || null;
  const { error: insertError } = await supabase
    .from("visits")
    .insert({ application_id: applicationId, scheduled_at: scheduledAt, status: "À confirmer", address });
  if (insertError) return { ok: false, error: insertError.message };
  await supabase.from("applications").update({ visit_status: "À confirmer" }).eq("id", applicationId);
  await logTimelineEvent(applicationId, "Visite programmée");
  revalidatePath(`/applications/${applicationId}`);
  revalidatePath("/applications");
  revalidatePath("/visits");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function updateVisitStatus(visitId: string, status: "Confirmée" | "Effectuée" | "Annulée") {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role === "candidate") {
    return { ok: false, error: "Seul un agent peut modifier le statut d'une visite." };
  }
  const supabase = createSupabaseServerClient();
  const { data: visit, error } = await supabase.from("visits").update({ status }).eq("id", visitId).select("application_id").single();
  if (error) return { ok: false, error: error.message };
  if (visit?.application_id) {
    await supabase.from("applications").update({ visit_status: status }).eq("id", visit.application_id);
    await logTimelineEvent(visit.application_id, `Visite : ${status}`);
    revalidatePath(`/applications/${visit.application_id}`);
    revalidatePath("/applications");
  }
  revalidatePath("/visits");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function saveVisitReport(
  visitId: string,
  input: { impression: string; positives: string; concerns: string; signatureLikelihood: string; nextStep: string; rawNotes?: string }
) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role === "candidate") {
    return { ok: false, error: "Seul un agent peut enregistrer un compte-rendu de visite." };
  }
  const supabase = createSupabaseServerClient();
  const { data: visit, error } = await supabase
    .from("visits")
    .update({
      report_impression: input.impression,
      report_positives: input.positives,
      report_concerns: input.concerns,
      report_signature_likelihood: input.signatureLikelihood,
      report_next_step: input.nextStep,
      report_raw_notes: input.rawNotes || null,
      report_generated_at: new Date().toISOString(),
    })
    .eq("id", visitId)
    .select("application_id")
    .single();
  if (visit?.application_id) {
    await logTimelineEvent(visit.application_id, "Compte-rendu de visite enregistré");
    revalidatePath(`/applications/${visit.application_id}`);
  }
  revalidatePath("/visits");
  return { ok: !error, error: error?.message };
}

// Structure des notes libres de visite via l'IA (repli local si l'appel échoue). Ne sauvegarde
// rien : les champs proposés restent éditables dans le formulaire avant l'enregistrement explicite.
export async function structureVisitNotesAction(rawNotes: string): Promise<
  | { ok: true; error?: undefined; source: "ai" | "fallback"; impression: string; positives: string; concerns: string; signatureLikelihood: string; nextStep: string }
  | { ok: false; error: string }
> {
  if (!rawNotes.trim()) return { ok: false, error: "Aucune note à structurer." };
  const result = await aiStructureVisitNotes(rawNotes);
  return { ok: true, ...result.data, source: result.source };
}

// --- Qualification automatique (score /100 éditable par un agent) ---
export async function updateApplicationScore(applicationId: string, score: number) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role === "candidate") {
    return { ok: false, error: "Seul un agent peut modifier le score d'un dossier." };
  }
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("applications")
    .update({ score: clamped, score_source: "manuel", updated_at: new Date().toISOString() })
    .eq("id", applicationId);
  if (!error) {
    await logTimelineEvent(applicationId, `Score ajusté manuellement à ${clamped}/100`);
    revalidatePath(`/applications/${applicationId}`);
    revalidatePath("/applications");
  }
  return { ok: !error, error: error?.message };
}

// Crée un nouveau prospect à partir d'un texte libre (email, message) : qualification automatique
// (extraction structurée + score) via l'IA, avec repli local, puis rattachement au bien le plus
// compatible (ville + budget). Le score et les champs restent modifiables ensuite par l'agent.
export async function createProspectFromText(input: {
  rawText: string;
  first_name: string;
  last_name: string;
  candidate_email: string;
  phone?: string;
}) {
  if (supabaseConfigured) {
    const profile = await getCurrentProfile();
    if (!profile || profile.role === "candidate") {
      return { ok: false, error: "Seul un agent peut créer un prospect." };
    }
  }
  const extraction = await aiQualifyProspect(input.rawText);
  const properties = await getProperties();
  const budget = extraction.data.budget;
  const location = (extraction.data.location || "").toLowerCase();
  const compatible = properties
    .filter((p) => p.status === "active")
    .filter((p) => (location && location !== "non précisée" ? (p.city || "").toLowerCase().includes(location) || location.includes((p.city || "").toLowerCase()) : true))
    .filter((p) => (budget ? p.rent <= budget * 1.2 : true))
    .sort((a, b) => a.rent - b.rent);
  const bestMatch = compatible[0] || properties.find((p) => p.status === "active") || null;

  if (!supabaseConfigured) {
    // Mode démo : pas de projet Supabase configuré, donc pas de persistance possible — on retourne
    // quand même la qualification complète pour que la démo reste crédible plutôt que de ne rien faire.
    return { ok: true, local: true, extraction: extraction.data, source: extraction.source, matchedProperty: bestMatch?.title || null };
  }
  const profile = await getCurrentProfile();
  if (!profile) return { ok: false, error: "Profil introuvable. Reconnecte-toi." };
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("applications")
    .insert({
      agency_id: profile.agency_id,
      property_id: bestMatch?.id || null,
      candidate_email: input.candidate_email,
      first_name: input.first_name,
      last_name: input.last_name,
      phone: input.phone || null,
      city: extraction.data.location,
      stage: "À compléter",
      activity: "Document manquant",
      visit_status: "À confirmer",
      score: extraction.data.score,
      signature_probability: Math.round(extraction.data.score * 0.8),
      score_source: extraction.source,
      note: `Demande initiale : « ${input.rawText} »\n\nQualification automatique : ${extraction.data.reasoning}`,
    })
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  await logTimelineEvent(data.id as string, `Prospect créé et qualifié automatiquement (${extraction.source === "ai" ? "IA" : "règles locales"})`);
  revalidatePath("/applications");
  revalidatePath("/dashboard");
  return {
    ok: true,
    id: data.id as string,
    extraction: extraction.data,
    source: extraction.source,
    matchedProperty: bestMatch?.title || null,
  };
}

// --- Synthèse automatique de dossier ---
export async function generateDossierSummary(applicationId: string) {
  if (supabaseConfigured) {
    const profile = await getCurrentProfile();
    if (!profile || profile.role === "candidate") return { ok: false, error: "Réservé aux collaborateurs de l'agence." };
  }
  const [applications, documents] = await Promise.all([getApplications(), getDocuments(applicationId)]);
  const application = applications.find((a) => a.id === applicationId);
  if (!application) return { ok: false, error: "Dossier introuvable." };
  const result = await aiSummarizeDossier(application, documents);
  if (supabaseConfigured) {
    const supabase = createSupabaseServerClient();
    await supabase.from("applications").update({ summary: result.data }).eq("id", applicationId);
    await logTimelineEvent(applicationId, "Synthèse du dossier générée");
    revalidatePath(`/applications/${applicationId}`);
  }
  return { ok: true, summary: result.data, source: result.source };
}

// --- Traitement documentaire : suggestion de type à partir du nom de fichier ---
export async function suggestDocumentType(applicationId: string, fileName: string) {
  // Ouvert aux candidats (ils uploadent leurs propres documents), mais exige une session valide
  // pour éviter qu'un appel non authentifié ne déclenche un appel IA facturé.
  if (supabaseConfigured) {
    const profile = await getCurrentProfile();
    if (!profile) return { ok: false, error: "Session expirée, reconnecte-toi." };
  }
  const documents = await getDocuments(applicationId);
  const expectedTypes = documents.map((d) => ({ type: d.type, label: d.label }));
  if (!expectedTypes.length) return { ok: false, error: "Aucun type de document attendu pour ce dossier." };
  const result = await aiClassifyDocument(fileName, expectedTypes);
  return { ok: true, type: result.data, source: result.source };
}

// --- Assistant conversationnel ---
export async function askAssistant(question: string) {
  const profile = supabaseConfigured ? await getCurrentProfile() : { role: "agent" };
  if (!profile || profile.role === "candidate") {
    return { ok: false, error: "L'assistant est réservé aux collaborateurs de l'agence." };
  }
  const [applications, tasks, visits] = await Promise.all([getApplications(), getTasks(), getVisits()]);
  const result = await aiAnswerAssistant(question, { applications, tasks, visits });
  return { ok: true, answer: result.data.answer, relatedApplicationIds: result.data.relatedApplicationIds, source: result.source };
}

// --- Recherche globale transverse (prospects/dossiers, biens, tâches) ---
export async function globalSearch(query: string) {
  if (supabaseConfigured) {
    const profile = await getCurrentProfile();
    if (!profile || profile.role === "candidate") return { ok: false, results: [] as { type: string; id: string; title: string; subtitle: string; href: string }[] };
  }
  const q = query.trim().toLowerCase();
  if (q.length < 2) return { ok: true, results: [] as { type: string; id: string; title: string; subtitle: string; href: string }[] };
  const [applications, properties, tasks] = await Promise.all([getApplications(), getProperties(), getTasks()]);
  const results: { type: string; id: string; title: string; subtitle: string; href: string }[] = [];
  for (const a of applications) {
    const haystack = `${a.first_name} ${a.last_name} ${a.candidate_email} ${a.city || ""} ${a.property?.title || ""}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({ type: "Dossier", id: a.id, title: `${a.first_name} ${a.last_name}`, subtitle: a.property?.title || a.stage, href: `/applications/${a.id}` });
    }
  }
  for (const p of properties) {
    const haystack = `${p.title} ${p.address || ""} ${p.city || ""}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({ type: "Bien", id: p.id, title: p.title, subtitle: `${p.city || ""} · ${p.rent} €`, href: "/properties" });
    }
  }
  for (const t of tasks) {
    if (t.title.toLowerCase().includes(q)) {
      results.push({ type: "Tâche", id: t.id, title: t.title, subtitle: t.priority, href: `/applications/${t.application_id}` });
    }
  }
  return { ok: true, results: results.slice(0, 20) };
}

// --- Tâches et rappels ---
export async function assignTask(taskId: string, assignedTo: string | null) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role === "candidate") return { ok: false, error: "Réservé aux collaborateurs de l'agence." };
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("tasks").update({ assigned_to: assignedTo }).eq("id", taskId);
  if (!error) {
    revalidatePath("/tasks");
    revalidatePath("/dashboard");
  }
  return { ok: !error, error: error?.message };
}

export async function updateTaskStatus(taskId: string, status: "open" | "done" | "ignored") {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role === "candidate") return { ok: false, error: "Réservé aux collaborateurs de l'agence." };
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("tasks").update({ status }).eq("id", taskId);
  if (!error) {
    revalidatePath("/tasks");
    revalidatePath("/dashboard");
  }
  return { ok: !error, error: error?.message };
}

// --- Administration : modèles de messages ---
export async function createMessageTemplate(title: string, body: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || !["admin", "manager"].includes(profile.role)) {
    return { ok: false, error: "Seuls les admins et managers peuvent gérer les modèles de messages." };
  }
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("message_templates").insert({ agency_id: profile.agency_id, title, body });
  if (!error) revalidatePath("/settings");
  return { ok: !error, error: error?.message };
}

export async function updateMessageTemplate(id: string, title: string, body: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || !["admin", "manager"].includes(profile.role)) {
    return { ok: false, error: "Seuls les admins et managers peuvent gérer les modèles de messages." };
  }
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("message_templates").update({ title, body }).eq("id", id).select("id");
  if (error) return { ok: false, error: error.message };
  if (!data?.length) return { ok: false, error: "Modèle introuvable (la table message_templates existe-t-elle ? applique supabase/schema.sql)." };
  revalidatePath("/settings");
  return { ok: true };
}

export async function deleteMessageTemplate(id: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || !["admin", "manager"].includes(profile.role)) {
    return { ok: false, error: "Seuls les admins et managers peuvent gérer les modèles de messages." };
  }
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("message_templates").delete().eq("id", id).select("id");
  if (error) return { ok: false, error: error.message };
  if (!data?.length) return { ok: false, error: "Modèle introuvable (la table message_templates existe-t-elle ? applique supabase/schema.sql)." };
  revalidatePath("/settings");
  return { ok: true };
}

// --- Gestion des utilisateurs et des droits ---
const ASSIGNABLE_ROLES = ["agent", "manager", "admin"];

export async function updateTeammateRole(profileId: string, role: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") {
    return { ok: false, error: "Seul un admin peut modifier le rôle d'un coéquipier." };
  }
  if (!ASSIGNABLE_ROLES.includes(role)) {
    return { ok: false, error: "Rôle invalide." };
  }
  if (profileId === profile.id) {
    return { ok: false, error: "Tu ne peux pas modifier ton propre rôle (risque de te bloquer l'accès admin). Demande à un autre admin." };
  }
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("profiles").update({ role }).eq("id", profileId).eq("agency_id", profile.agency_id);
  if (!error) revalidatePath("/settings");
  return { ok: !error, error: error?.message };
}

export async function removeTeammate(profileId: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") {
    return { ok: false, error: "Seul un admin peut révoquer un coéquipier." };
  }
  if (profileId === profile.id) return { ok: false, error: "Tu ne peux pas te révoquer toi-même." };
  if (!supabaseAdminConfigured || !supabaseAdmin) {
    return { ok: false, error: "Révocation indisponible : SUPABASE_SERVICE_ROLE_KEY n'est pas configurée." };
  }
  await supabaseAdmin.from("profiles").delete().eq("id", profileId).eq("agency_id", profile.agency_id);
  const { error } = await supabaseAdmin.auth.admin.deleteUser(profileId);
  revalidatePath("/settings");
  return { ok: !error, error: error?.message };
}
