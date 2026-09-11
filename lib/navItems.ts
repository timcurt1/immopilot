import {
  LayoutDashboard,
  FolderKanban,
  Home,
  UserRound,
  MessageSquare,
  Settings,
  CalendarClock,
  ListTodo,
  Sparkles,
  BarChart3,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  /** Rôles autorisés à voir ce lien. Absent = visible par tous les rôles connectés (hors candidat). */
  roles?: string[];
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/applications", label: "Candidatures", icon: FolderKanban },
  { href: "/properties", label: "Biens", icon: Home },
  { href: "/visits", label: "Visites", icon: CalendarClock },
  { href: "/tasks", label: "Tâches", icon: ListTodo },
  { href: "/assistant", label: "Assistant IA", icon: Sparkles },
  { href: "/pilotage", label: "Pilotage", icon: BarChart3, roles: ["admin", "manager"] },
  { href: "/candidate", label: "Portail candidat", icon: UserRound },
  { href: "/messages", label: "Messages IA", icon: MessageSquare },
  { href: "/settings", label: "Réglages", icon: Settings, roles: ["admin", "manager"] },
];

export function visibleNavItems(role: string | null): NavItem[] {
  // Un candidat n'a accès qu'à son portail — les autres liens le renverraient de toute façon vers
  // /candidate via le middleware, mais autant ne pas les afficher.
  if (role === "candidate") return NAV_ITEMS.filter((item) => item.href === "/candidate");
  if (!role) return NAV_ITEMS.filter((item) => !item.roles);
  return NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role));
}
