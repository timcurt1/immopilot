import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { SidebarNav } from "./SidebarNav";
import { LogoMark } from "@/components/marketing/Logo";
import { getSupabaseUser, supabaseConfigured } from "@/lib/supabaseServer";
import { signOut } from "@/lib/actions";

export async function Sidebar() {
  const user = supabaseConfigured ? await getSupabaseUser() : null;

  return (
    <aside className="glass sidebar">
      <Link href="/dashboard" className="logoLine">
        <div className="logoBox">
          <LogoMark size={24} />
        </div>
        <div>
          <b>ImmoPilot</b>
          <span>Espace agence</span>
        </div>
      </Link>
      <SidebarNav />
      {user ? (
        <form action={signOut}>
          <button className="btn ghost" style={{ width: "100%" }} type="submit">
            <LogOut size={16} /> Se déconnecter
          </button>
        </form>
      ) : (
        <Link href="/login" className="btn primary">
          <LogIn size={16} /> Se connecter
        </Link>
      )}
    </aside>
  );
}
