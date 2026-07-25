"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/marketing/Logo";
import { NAV_ITEMS } from "@/lib/navItems";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = NAV_ITEMS.find((item) => pathname === item.href || pathname?.startsWith(`${item.href}/`));

  return (
    <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-line">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="shrink-0">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-surface"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-line px-3 py-3 grid gap-1" aria-label="Navigation mobile">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item === current;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  active ? "bg-ink text-white" : "text-ink-soft hover:bg-surface"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
