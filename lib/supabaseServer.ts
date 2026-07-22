import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfigured } from "./supabaseClient";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export { supabaseConfigured };

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Appelé depuis un Server Component : les cookies ne peuvent pas être modifiés ici,
          // le rafraîchissement de session est déjà géré par le middleware.
        }
      },
    },
  });
}

export async function getSupabaseUser() {
  if (!supabaseConfigured) return null;
  const client = createSupabaseServerClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  return user;
}

export async function getCurrentProfile() {
  const user = await getSupabaseUser();
  if (!user) return null;
  const client = createSupabaseServerClient();
  const { data, error } = await client.from("profiles").select("id, agency_id, role, full_name, email").eq("id", user.id).single();
  if (error || !data) return null;
  return data as { id: string; agency_id: string; role: string; full_name: string | null; email: string };
}
