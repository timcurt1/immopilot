import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabaseConfigured = Boolean(url && key);

export const supabase = supabaseConfigured ? createBrowserClient(url, key) : null;
