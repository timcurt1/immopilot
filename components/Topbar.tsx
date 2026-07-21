import Link from "next/link";
import { getSupabaseUser, supabaseConfigured } from "@/lib/supabaseServer";

export async function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  const user = supabaseConfigured ? await getSupabaseUser() : null;

  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span className="chip blue">SaaS MVP</span>
        {user ? (
          <span className="chip green">{user.email}</span>
        ) : (
          <Link className="btn ghost" href="/login">
            Connexion
          </Link>
        )}
      </div>
    </header>
  );
}
