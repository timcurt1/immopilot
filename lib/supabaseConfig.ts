/**
 * Cheap, dependency-free check for whether Supabase is configured. Kept separate from
 * supabaseClient.ts so pages can check this without pulling in the full @supabase/ssr bundle
 * until they actually need a live client (see login/page.tsx for a lazy-loaded example).
 */
export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
