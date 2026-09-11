import { createSupabaseServerClient, supabaseConfigured } from "./supabaseServer";
import type { TimelineEvent } from "./types";

export async function logTimelineEvent(applicationId: string, label: string) {
  if (!supabaseConfigured) return;
  const supabase = createSupabaseServerClient();
  await supabase.from("timeline_events").insert({ application_id: applicationId, label });
}

export async function getTimeline(applicationId: string): Promise<TimelineEvent[]> {
  if (!supabaseConfigured) return [];
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("timeline_events")
    .select("*")
    .eq("application_id", applicationId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getTimeline:", error.message);
    return [];
  }
  return (data as TimelineEvent[]) ?? [];
}
