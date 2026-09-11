import Link from "next/link";
import { LogOut, LogIn } from "lucide-react";
import { Logo } from "@/components/marketing/Logo";
import { SidebarNav } from "./SidebarNav";
import { getCurrentProfile, getSupabaseUser, supabaseConfigured } from "@/lib/supabaseServer";
import { signOut } from "@/lib/actions";

export async function Sidebar() {
  const user = supabaseConfigured ? await getSupabaseUser() : null;
  const profile = supabaseConfigured ? await getCurrentProfile() : null;

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-line bg-white h-screen sticky top-0">
      <Link href="/dashboard" className="flex items-center px-5 py-5 border-b border-line">
        <Logo />
      </Link>
      <SidebarNav role={supabaseConfigured ? profile?.role ?? null : "admin"} />
      <div className="border-t border-line p-3">
        {user ? (
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-surface hover:text-ink transition-colors"
            >
              <LogOut size={16} /> Se déconnecter
            </button>
          </form>
        ) : (
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-ink text-white px-3 py-2.5 text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            <LogIn size={16} /> Se connecter
          </Link>
        )}
      </div>
    </aside>
  );
}
