import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient, supabaseConfigured } from "@/lib/supabaseServer";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/dashboard";

  if (supabaseConfigured && code) {
    const supabase = createSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
