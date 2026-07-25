"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Application } from "@/lib/types";
import { Badge } from "@/components/marketing/Badge";

function stageTone(stage: string): "green" | "amber" | "brand" {
  if (stage === "Prêt à valider") return "green";
  if (stage === "À relancer") return "amber";
  return "brand";
}

export function ApplicationTable({ applications }: { applications: Application[] }) {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("Tous");

  const stages = useMemo(() => ["Tous", ...Array.from(new Set(applications.map((a) => a.stage)))], [applications]);

  const filtered = applications.filter((a) => {
    const matchesStage = stage === "Tous" || a.stage === stage;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || `${a.first_name} ${a.last_name} ${a.candidate_email}`.toLowerCase().includes(q);
    return matchesStage && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un candidat (nom, email)…"
            className="w-full h-10 rounded-xl border border-line bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {stages.map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={`h-10 px-3.5 rounded-xl text-xs font-semibold border transition-colors ${
                stage === s ? "bg-ink text-white border-ink" : "bg-white text-ink-soft border-line hover:border-ink/30"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {applications.length === 0 ? (
        <p className="text-sm text-muted py-6">Aucune candidature pour le moment.</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-muted py-6">Aucune candidature ne correspond à cette recherche.</p>
      ) : (
        <div className="rounded-2xl border border-line bg-white overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-line text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-semibold">Candidat</th>
                <th className="px-5 py-3 font-semibold">Bien</th>
                <th className="px-5 py-3 font-semibold">Score</th>
                <th className="px-5 py-3 font-semibold">Statut</th>
                <th className="px-5 py-3 font-semibold">Visite</th>
                <th className="px-5 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-ink">
                      {a.first_name} {a.last_name}
                    </p>
                    <p className="text-xs text-muted">{a.candidate_email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft">{a.property?.title || "Non relié"}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone="brand">{a.score}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={stageTone(a.stage)}>{a.stage}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft">{a.visit_status}</td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/applications/${a.id}`}
                      className="inline-flex items-center h-8 px-3 rounded-lg border border-line text-xs font-semibold text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
                    >
                      Ouvrir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
