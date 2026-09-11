"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { visibleNavItems } from "@/lib/navItems";

export function SidebarNav({ role = null }: { role?: string | null }) {
  const pathname = usePathname();
  const items = visibleNavItems(role);
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 grid gap-1" aria-label="Navigation de l'application">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-ink text-white" : "text-ink-soft hover:bg-surface hover:text-ink"
            }`}
          >
            <Icon size={17} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
