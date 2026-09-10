"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, FileWarning, Send, CalendarClock } from "lucide-react";
import { nextBestAction } from "@/lib/logic";
import type { Application, RentalDocument, Visit } from "@/lib/types";

type Category = "urgences" | "bloques" | "relances" | "visites";

export function QuickInsights({
  applications,
  documents,
  visits,
}: {
  applications: Application[];
  documents: RentalDocument[];
  visits: Visit[];
}) {
  const [active, setActive] = useState<Category | null>(null);

  const docsByApp = (id: string) => documents.filter((d) => d.application_id === id);

  const urgences = applications.filter((a) => a.activity === "Pas d’activité 48h");
  const bloques = applications.filter(
    (a) => a.stage !== "Prêt à valider" && docsByApp(a.id).some((d) => d.status === "manquant" || d.status === "à vérifier")
  );
  const relances = applications.filter((a) => nextBestAction(a, docsByApp(a.id)) === "Relancer le candidat");
  const in7Days = Date.now() + 7 * 86400000;
  const visitesAVenir = visits.filter(
    (v) => v.scheduled_at && new Date(v.scheduled_at).getTime() <= in7Days && new Date(v.scheduled_at).getTime() >= Date.now()
  );

  const CATEGORIES: {
    key: Category;
    label: string;
    icon: typeof AlertTriangle;
    items: { id: string; title: string; subtitle: string; href: string }[];
  }[] = [
    {
      key: "urgences",
      label: "Urgences du jour",
      icon: AlertTriangle,
      items: urgences.map((a) => ({ id: a.id, title: `${a.first_name} ${a.last_name}`, subtitle: a.activity, href: `/applications/${a.id}` })),
    },
    {
      key: "bloques",
      label: "Dossiers bloqués",
      icon: FileWarning,
      items: bloques.map((a) => ({
        id: a.id,
        title: `${a.first_name} ${a.last_name}`,
        subtitle: `${docsByApp(a.id).filter((d) => d.status === "manquant" || d.status === "à vérifier").length} document(s) en attente`,
        href: `/applications/${a.id}`,
      })),
    },
    {
      key: "relances",
      label: "Relances à faire",
      icon: Send,
      items: relances.map((a) => ({ id: a.id, title: `${a.first_name} ${a.last_name}`, subtitle: "Aucune activité récente", href: `/applications/${a.id}` })),
    },
    {
      key: "visites",
      label: "Visites à venir",
      icon: CalendarClock,
      items: visitesAVenir.map((v) => ({
        id: v.id,
        title: `${v.application?.first_name || ""} ${v.application?.last_name || ""}`.trim() || "Visite",
        subtitle: v.scheduled_at ? new Date(v.scheduled_at).toLocaleString("fr-FR") : "",
        href: v.application?.id ? `/applications/${v.application.id}` : "/visits",
      })),
    },
  ];

  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-display font-bold text-lg text-ink mb-4">Assistant métier</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(active === c.key ? null : c.key)}
            className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-semibold transition-colors ${
              active === c.key ? "border-brand-500 bg-brand-50 text-brand-700" : "border-line text-ink-soft hover:border-ink/30 hover:text-ink"
            }`}
          >
            <c.icon size={15} /> {c.label} ({c.items.length})
          </button>
        ))}
      </div>
      {active && (
        <div className="mt-4 grid gap-2">
          {CATEGORIES.find((c) => c.key === active)!.items.length === 0 ? (
            <p className="text-sm text-muted">Rien à signaler dans cette catégorie.</p>
          ) : (
            CATEGORIES.find((c) => c.key === active)!.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5 text-sm hover:border-brand-200 transition-colors"
              >
                <span className="font-medium text-ink">{item.title}</span>
                <span className="text-xs text-muted">{item.subtitle}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
