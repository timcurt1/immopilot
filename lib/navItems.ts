import { LayoutDashboard, FolderKanban, Home, UserRound, MessageSquare, Settings } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/applications", label: "Candidatures", icon: FolderKanban },
  { href: "/properties", label: "Biens", icon: Home },
  { href: "/candidate", label: "Portail candidat", icon: UserRound },
  { href: "/messages", label: "Messages IA", icon: MessageSquare },
  { href: "/settings", label: "Réglages", icon: Settings },
];
