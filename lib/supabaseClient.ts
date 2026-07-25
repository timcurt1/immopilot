import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfigured } from "./supabaseConfig";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export { supabaseConfigured };

export const supabase = supabaseConfigured ? createBrowserClient(url, key) : null;
