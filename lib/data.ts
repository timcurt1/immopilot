import { createSupabaseServerClient, getCurrentProfile, getSupabaseUser, supabaseConfigured } from "./supabaseServer";
import { demoApplications, demoDocuments, demoProperties, demoTasks, demoVisits } from "./demoData";
import type { Application, Profile, Property, RentalDocument, Task, Visit } from "./types";

export { missingDocuments, completionRate, nextBestAction, computeQualification, buildRelanceMessage, assembleVisitReport } from "./logic";

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

export async function getPublicProperty(id: string): Promise<Property | undefined> {
  const fallback = demoProperties.find((p) => p.id === id);
  if (!supabaseConfigured) return fallback;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).eq("status", "active").single();
  if (error) {
    console.error("getPublicProperty:", error.message);
    return fallback;
  }
  return (data as Property) ?? fallback;
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

export async function getAgencyTeam(): Promise<Profile[]> {
  if (!supabaseConfigured) return [];
  const profile = await getCurrentProfile();
  if (!profile) return [];
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, agency_id, role, full_name, email")
    .eq("agency_id", profile.agency_id)
    .order("created_at", { ascending: true });
  if (error) {
    console.error("getAgencyTeam:", error.message);
    return [];
  }
  return (data as Profile[]) ?? [];
}

export async function getAgencyBilling(): Promise<{ plan: string; subscriptionStatus: string | null } | null> {
  if (!supabaseConfigured) return null;
  const profile = await getCurrentProfile();
  if (!profile) return null;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("agencies").select("plan, subscription_status").eq("id", profile.agency_id).single();
  if (error || !data) return null;
  return { plan: data.plan as string, subscriptionStatus: data.subscription_status as string | null };
}

export async function getCurrentCandidateApplication(): Promise<Application | undefined> {
  const applications = await getApplications();
  if (!supabaseConfigured) return applications[0];
  const user = await getSupabaseUser();
  if (!user?.email) return undefined;
  return applications.find((a) => a.candidate_email === user.email);
}

export async function getVisits(): Promise<Visit[]> {
  if (!supabaseConfigured) return demoVisits;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("visits")
    .select("*, application:applications(*, property:properties(*))")
    .order("scheduled_at", { ascending: true });
  if (error) {
    console.error("getVisits:", error.message);
    return demoVisits;
  }
  return (data as Visit[]) ?? demoVisits;
}

export async function getVisit(id: string): Promise<Visit | undefined> {
  const fallback = demoVisits.find((v) => v.id === id);
  if (!supabaseConfigured) return fallback;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("visits")
    .select("*, application:applications(*, property:properties(*))")
    .eq("id", id)
    .single();
  if (error) {
    console.error("getVisit:", error.message);
    return fallback;
  }
  return (data as Visit) ?? fallback;
}
