"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Building2, FolderOpen, Calendar, ListChecks,
  MessageSquare, Workflow, BarChart3, Sparkles, Settings, HelpCircle, LogOut, ArrowRight,
} from "lucide-react";
import { Logo } from "@/components/marketing/Logo";
import { Button } from "@/components/marketing/Button";
import { PresentationMode } from "@/components/demo/PresentationMode";

const NAV = [
  { href: "/demo", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/demo/prospects", label: "Prospects", icon: Users },
  { href: "/demo/biens", label: "Biens", icon: Building2 },
  { href: "/demo/dossiers", label: "Dossiers", icon: FolderOpen },
  { href: "/demo/visites", label: "Visites", icon: Calendar },
  { href: "/demo/taches", label: "Tâches", icon: ListChecks },
  { href: "/demo/messages", label: "Messages", icon: MessageSquare },
  { href: "/demo/automatisations", label: "Automatisations", icon: Workflow },
  { href: "/demo/analyses", label: "Analyses", icon: BarChart3 },
  { href: "/demo/assistant", label: "Assistant ImmoPilot", icon: Sparkles },
  { href: "/demo/parametres", label: "Paramètres", icon: Settings },
];

export function DemoSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-line bg-white h-[calc(100vh-44px)] sticky top-11">
      <div className="px-5 py-5 border-b border-line">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 grid gap-1" aria-label="Navigation de la démo">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active ? "text-white" : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="demo-nav-active-pill"
                  className="absolute inset-0 rounded-lg bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <item.icon size={16} className="relative z-10" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line p-3">
        <Button href="/demande-demo" size="md" className="w-full !justify-between mb-2">
          Demander une démo <ArrowRight size={14} />
        </Button>
        <div className="grid gap-1">
          <div className="flex items-center gap-2.5 rounded-lg px-3 py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700 text-xs font-bold shrink-0">
              LB
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink truncate">Léa Bonnet</p>
              <p className="text-[11px] text-muted truncate">Agence Bellevue Immobilier</p>
            </div>
          </div>
          <PresentationMode />
          <Link href="/ressources" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-surface hover:text-ink transition-colors">
            <HelpCircle size={16} /> Aide
          </Link>
          <Link href="/" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-surface hover:text-ink transition-colors">
            <LogOut size={16} /> Quitter la démo
          </Link>
        </div>
      </div>
    </aside>
  );
}
