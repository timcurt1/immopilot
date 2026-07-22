"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient, getCurrentProfile, supabaseConfigured } from "./supabaseServer";

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
  const { error: e1 } = await supabase.from("applications").update({ last_message: message }).eq("id", applicationId);
  const { error: e2 } = await supabase.from("messages").insert({ application_id: applicationId, sender: "ai", body: message });
  return { ok: !e1 && !e2, error: e1?.message || e2?.message };
}

export async function createProperty(input: { title: string; address: string; city: string; rent: number }) {
  if (!supabaseConfigured) return { ok: true, local: true };
  const profile = await getCurrentProfile();
  if (!profile) return { ok: false, error: "Profil introuvable. Reconnecte-toi." };
  const supabase = createSupabaseServerClient();
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
  return { ok: !dbError, error: dbError?.message };
}
