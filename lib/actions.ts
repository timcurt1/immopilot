"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient, getCurrentProfile, supabaseConfigured } from "./supabaseServer";
import { supabaseAdmin, supabaseAdminConfigured } from "./supabaseAdmin";
import { PLANS, isPlanId } from "./plans";
import { sendEmail } from "./email";
import { computeQualification } from "./data";

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
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("applications").update({ stage, updated_at: new Date().toISOString() }).eq("id", id);
  if (!error) {
    revalidatePath(`/applications/${id}`);
    revalidatePath("/applications");
    revalidatePath("/dashboard");
  }
  return { ok: !error, error: error?.message };
}

export async function saveAIMessage(applicationId: string, message: string) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const supabase = createSupabaseServerClient();
  const { data: application, error: e1 } = await supabase
    .from("applications")
    .update({ last_message: message })
    .eq("id", applicationId)
    .select("candidate_email, first_name")
    .single();
  const { error: e2 } = await supabase.from("messages").insert({ application_id: applicationId, sender: "ai", body: message });
  if (!e1 && application?.candidate_email) {
    await sendEmail({
      to: application.candidate_email as string,
      subject: "Message de votre agence",
      html: `<p>Bonjour ${application.first_name},</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    });
  }
  if (!e1) {
    revalidatePath(`/applications/${applicationId}`);
    revalidatePath("/candidate");
  }
  return { ok: !e1 && !e2, error: e1?.message || e2?.message };
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
    revalidatePath(`/applications/${visit.application_id}`);
    revalidatePath("/applications");
  }
  revalidatePath("/visits");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function saveVisitReport(
  visitId: string,
  input: { impression: string; positives: string; concerns: string; signatureLikelihood: string; nextStep: string }
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
      report_generated_at: new Date().toISOString(),
    })
    .eq("id", visitId)
    .select("application_id")
    .single();
  if (visit?.application_id) revalidatePath(`/applications/${visit.application_id}`);
  revalidatePath("/visits");
  return { ok: !error, error: error?.message };
}
