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
