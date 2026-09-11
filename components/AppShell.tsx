import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Topbar } from "./Topbar";
import { CommandPalette } from "./CommandPalette";
import { getCurrentProfile, supabaseConfigured } from "@/lib/supabaseServer";

export async function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const profile = supabaseConfigured ? await getCurrentProfile() : null;
  // Mode démo (pas de Supabase configuré) : personne n'est connecté, mais la nav doit quand même
  // montrer l'intégralité du produit (Réglages, Pilotage) plutôt que de les masquer par rôle.
  const role = supabaseConfigured ? profile?.role ?? null : "admin";

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileNav role={role} />
        <Topbar title={title} subtitle={subtitle} role={role} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}
