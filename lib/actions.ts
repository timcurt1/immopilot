"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient, getCurrentProfile, supabaseConfigured } from "./supabaseServer";
import { supabaseAdmin, supabaseAdminConfigured } from "./supabaseAdmin";
import { PLANS, isPlanId } from "./plans";
import { sendEmail } from "./email";

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
    .select("id, agency_id")
    .eq("id", propertyId)
    .single();
  if (propertyError || !property) return { ok: false, error: "Bien introuvable." };
  const { error } = await supabase.from("applications").insert({ agency_id: property.agency_id, property_id: property.id, ...input });
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
  return { ok: !dbError, error: dbError?.message };
}
