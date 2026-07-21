"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Home, UserRound, MessageSquare, Settings } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applications", label: "Candidatures", icon: FolderKanban },
  { href: "/properties", label: "Biens", icon: Home },
  { href: "/candidate", label: "Portail candidat", icon: UserRound },
  { href: "/messages", label: "Messages IA", icon: MessageSquare },
  { href: "/settings", label: "Réglages", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} href={item.href} className={active ? "active" : undefined}>
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
