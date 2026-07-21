"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient, supabaseConfigured } from "./supabaseServer";

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
