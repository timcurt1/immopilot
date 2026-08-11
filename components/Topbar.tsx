import Link from "next/link";
import { LifeBuoy } from "lucide-react";
import { Badge } from "@/components/marketing/Badge";
import { getSupabaseUser, supabaseConfigured } from "@/lib/supabaseServer";

export async function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  const user = supabaseConfigured ? await getSupabaseUser() : null;

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line bg-white px-6 lg:px-8 py-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        <a
          href="mailto:support.immopilot.world@gmail.com"
          title="Contacter le support"
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
        >
          <LifeBuoy size={14} /> Support
        </a>
        {user ? (
          <Badge tone="green">{user.email}</Badge>
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
