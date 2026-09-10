import type { Application, RentalDocument } from "./types";

export function missingDocuments(docs: RentalDocument[]) {
  return docs.filter((d) => d.status === "manquant" || d.status === "à vérifier");
}

export function completionRate(docs: RentalDocument[]) {
  const c = docs.filter((d) => d.status !== "non requis");
  return c.length ? Math.round((c.filter((d) => d.status === "validé").length / c.length) * 100) : 100;
}

export function nextBestAction(app: Application, docs: RentalDocument[]) {
  const m = missingDocuments(docs);
  if (app.stage === "Prêt à valider" || completionRate(docs) >= 95) return "Valider le dossier";
  if (app.activity === "Pas d’activité 48h" || app.stage === "À relancer") return "Relancer le candidat";
  if (app.visit_status !== "Confirmée" && app.score >= 65) return "Confirmer la visite";
  if (m.length) return `Demander ${m.length} document(s)`;
  return "Ouvrir le dossier";
}

function normalize(value?: string | null): string {
  return (value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function computeQualification(
  input: {
    income?: number | null;
    job_status?: string | null;
    guarantor_status?: string | null;
    guarantor_income?: number | null;
    phone?: string | null;
    city?: string | null;
  },
  rent: number
): { score: number; signature_probability: number } {
  const income = input.income || 0;
  const ratio = rent > 0 ? income / rent : 0;

  let incomePts = 0;
  if (ratio >= 3) incomePts = 40;
  else if (ratio >= 2.5) incomePts = 30;
  else if (ratio >= 2) incomePts = 20;
  else if (ratio >= 1) incomePts = 10;

  const job = normalize(input.job_status);
  let jobPts = 0;
  if (job.includes("cdi") || job.includes("fonctionnaire") || job.includes("titulaire")) jobPts = 25;
  else if (
    job.includes("cdd") ||
    job.includes("interim") ||
    job.includes("independant") ||
    job.includes("auto-entrepreneur") ||
    job.includes("autoentrepreneur") ||
    job.includes("freelance")
  )
    jobPts = 15;
  else if (job.includes("etudiant") || job.includes("alternance") || job.includes("apprenti")) jobPts = 8;

  const guarantorStatus = normalize(input.guarantor_status);
  const guarantorIncome = input.guarantor_income || 0;
  const guarantorRatio = rent > 0 ? guarantorIncome / rent : 0;
  let guarantorPts = 0;
  if (ratio >= 3 || guarantorStatus.includes("pas necessaire") || guarantorStatus.includes("aucun besoin")) {
    guarantorPts = 25;
  } else if (guarantorIncome > 0 || guarantorStatus.includes("oui") || guarantorStatus.includes("garant")) {
    // Un revenu de garant renseigné est une preuve suffisante d'avoir un garant, même si le texte
    // libre du champ "Garant" ne contient ni "oui" ni "garant" (ex: "Ma mère, fonctionnaire, 4000€").
    if (guarantorRatio >= 3) guarantorPts = 25;
    else if (guarantorRatio >= 2) guarantorPts = 15;
  }

  const hasPhone = Boolean(input.phone && input.phone.trim());
  const hasCity = Boolean(input.city && input.city.trim());
  const completenessPts = hasPhone && hasCity ? 10 : hasPhone || hasCity ? 5 : 0;

  const score = Math.min(100, incomePts + jobPts + guarantorPts + completenessPts);
  const motivationBonus = hasPhone && hasCity && guarantorStatus ? 10 : 0;
  const signature_probability = Math.min(100, Math.round(score * 0.8 + motivationBonus));

  return { score, signature_probability };
}

export function buildRelanceMessage(app: Application, docs: RentalDocument[]): string {
  const missing = missingDocuments(docs).map((d) => d.label);
  const propertyTitle = app.property?.title || "le logement";

  if (app.stage === "Prêt à valider" || completionRate(docs) >= 95) {
    return `Bonjour ${app.first_name},\n\nBonne nouvelle : votre dossier pour ${propertyTitle} est complet. Nous procédons à l'étude finale et revenons vers vous rapidement.`;
  }
  if (app.activity === "Pas d’activité 48h" || app.stage === "À relancer") {
    return `Bonjour ${app.first_name},\n\nVotre dossier pour ${propertyTitle} est toujours ouvert, mais nous sommes sans nouvelles depuis un moment. Pouvez-vous nous confirmer que vous êtes toujours intéressé(e) ?`;
  }
  if (app.visit_status !== "Confirmée" && app.score >= 65) {
    return `Bonjour ${app.first_name},\n\nVotre profil correspond bien à ${propertyTitle}. Pouvez-vous confirmer votre disponibilité pour une visite ?`;
  }
  if (missing.length) {
    return `Bonjour ${app.first_name},\n\nVotre dossier pour ${propertyTitle} avance bien. Il manque encore : ${missing.join(", ")}. Vous pouvez les ajouter depuis votre portail candidat.`;
  }
  return `Bonjour ${app.first_name},\n\nMerci pour votre candidature pour ${propertyTitle}. Nous revenons vers vous prochainement.`;
}

export function assembleVisitReport(input: {
  impression: string;
  positives: string;
  concerns: string;
  signatureLikelihood: string;
  nextStep: string;
}): string {
  return [
    `Impression générale : ${input.impression}`,
    `Points positifs : ${input.positives || "—"}`,
    `Points de vigilance : ${input.concerns || "—"}`,
    `Probabilité de signature estimée : ${input.signatureLikelihood}`,
    `Prochaine étape : ${input.nextStep}`,
  ].join("\n");
}
