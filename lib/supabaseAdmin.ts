import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabaseAdminConfigured = Boolean(url && serviceRoleKey);

// Client à privilèges élevés (bypass RLS) : utilisé uniquement dans des server actions
// pour des opérations admin (ex: inviter un coéquipier). Ne jamais l'exposer au client.
export const supabaseAdmin = supabaseAdminConfigured
  ? createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })
  : null;
