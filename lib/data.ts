import { createSupabaseServerClient, getSupabaseUser, supabaseConfigured } from "./supabaseServer";
import { demoApplications, demoDocuments, demoProperties, demoTasks } from "./demoData";
import type { Application, Property, RentalDocument, Task } from "./types";

export async function getApplications(): Promise<Application[]> {
  if (!supabaseConfigured) return demoApplications;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("applications").select("*, property:properties(*)").order("created_at", { ascending: false });
  if (error) {
    console.error("getApplications:", error.message);
    return demoApplications;
  }
  return (data as Application[]) ?? demoApplications;
}

export async function getApplication(id: string): Promise<Application | undefined> {
  const fallback = demoApplications.find((a) => a.id === id);
  if (!supabaseConfigured) return fallback;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("applications").select("*, property:properties(*)").eq("id", id).single();
  if (error) {
    console.error("getApplication:", error.message);
    return fallback;
  }
  return (data as Application) ?? fallback;
}

export async function getProperties(): Promise<Property[]> {
  if (!supabaseConfigured) return demoProperties;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("getProperties:", error.message);
    return demoProperties;
  }
  return (data as Property[]) ?? demoProperties;
}

export async function getDocuments(applicationId?: string): Promise<RentalDocument[]> {
  const fallback = applicationId ? demoDocuments.filter((d) => d.application_id === applicationId) : demoDocuments;
  if (!supabaseConfigured) return fallback;
  const supabase = createSupabaseServerClient();
  let query = supabase.from("documents").select("*");
  if (applicationId) query = query.eq("application_id", applicationId);
  const { data, error } = await query;
  if (error) {
    console.error("getDocuments:", error.message);
    return fallback;
  }
  return (data as RentalDocument[]) ?? fallback;
}

export async function getTasks(): Promise<Task[]> {
  if (!supabaseConfigured) return demoTasks;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("tasks").select("*").eq("status", "open").order("created_at", { ascending: false });
  if (error) {
    console.error("getTasks:", error.message);
    return demoTasks;
  }
  return (data as Task[]) ?? demoTasks;
}

export async function getCurrentCandidateApplication(): Promise<Application | undefined> {
  const applications = await getApplications();
  if (!supabaseConfigured) return applications[0];
  const user = await getSupabaseUser();
  if (!user?.email) return undefined;
  return applications.find((a) => a.candidate_email === user.email);
}

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
