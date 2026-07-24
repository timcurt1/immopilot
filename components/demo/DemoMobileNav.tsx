"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  LayoutDashboard, Users, Building2, FolderOpen, Calendar, ListChecks,
  MessageSquare, Workflow, BarChart3, Sparkles, Settings,
} from "lucide-react";
import { Logo } from "@/components/marketing/Logo";

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

export function DemoMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = NAV.find((item) => (item.exact ? pathname === item.href : pathname.startsWith(item.href)));

  return (
    <div className="lg:hidden sticky top-11 z-30 bg-white border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-ink">
          {current && <current.icon size={16} />}
          {current?.label ?? "Menu"}
        </span>
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      {open && (
        <nav className="border-t border-line px-3 py-3 grid gap-1 max-h-[70vh] overflow-y-auto">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  active ? "bg-ink text-white" : "text-ink-soft hover:bg-surface"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
