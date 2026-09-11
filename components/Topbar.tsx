import Link from "next/link";
import { LifeBuoy, Search } from "lucide-react";
import { Badge } from "@/components/marketing/Badge";
import { getSupabaseUser, supabaseConfigured } from "@/lib/supabaseServer";

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrateur",
  manager: "Responsable",
  agent: "Négociateur",
  candidate: "Candidat",
};

export async function Topbar({ title, subtitle, role }: { title: string; subtitle: string; role?: string | null }) {
  const user = supabaseConfigured ? await getSupabaseUser() : null;

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line bg-white px-6 lg:px-8 py-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          data-command-palette-trigger
          title="Recherche globale (⌘K)"
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
        >
          <Search size={14} /> Rechercher
          <kbd className="ml-1 rounded border border-line bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-muted">⌘K</kbd>
        </button>
        <a
          href="mailto:support.immopilot.world@gmail.com"
          title="Contacter le support"
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
        >
          <LifeBuoy size={14} /> Support
        </a>
        {user ? (
          <div className="flex items-center gap-1.5">
            {role && <Badge tone="neutral">{ROLE_LABELS[role] || role}</Badge>}
            <Badge tone="green">{user.email}</Badge>
          </div>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center h-9 px-3.5 rounded-lg border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
          >
            Connexion
          </Link>
        )}
      </div>
    </header>
  );
}
