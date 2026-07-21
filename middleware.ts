import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseConfigured = Boolean(url && key);

const PROTECTED_PREFIXES = ["/dashboard", "/applications", "/properties", "/candidate", "/messages", "/settings"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  // Mode démo local (pas de projet Supabase configuré) : on laisse passer, comme aujourd'hui.
  if (!supabaseConfigured) return response;

  const isProtected = PROTECTED_PREFIXES.some((p) => request.nextUrl.pathname.startsWith(p));
  if (!isProtected) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/applications/:path*", "/properties/:path*", "/candidate/:path*", "/messages/:path*", "/settings/:path*"],
};
