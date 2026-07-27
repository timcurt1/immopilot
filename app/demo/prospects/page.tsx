"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";
import { StatusBadge } from "@/components/demo/StatusBadge";
import { DEMO_PROSPECTS } from "@/lib/demoContent";

const ROW_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
};

const STATUSES = ["Tous", "Nouveau", "Qualifié", "À relancer", "Dossier en cours", "Prêt à valider"];

export default function DemoProspectsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tous");
  const reduced = useReducedMotion();

  const filtered = useMemo(() => {
    return DEMO_PROSPECTS.filter((p) => {
      const matchesStatus = status === "Tous" || p.status === status;
      const matchesQuery =
        !query || `${p.firstName} ${p.lastName} ${p.location}`.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  return (
    <>
      <DemoPageHeader title="Prospects" description={`${DEMO_PROSPECTS.length} prospects actifs dans l'agence`} />

      <div className="px-6 md:px-8 pb-12">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un prospect, une ville…"
              className="w-full h-10 rounded-xl border border-line bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`h-10 px-3.5 rounded-xl text-xs font-semibold border transition-colors ${
                  status === s ? "bg-ink text-white border-ink" : "bg-white text-ink-soft border-line hover:border-ink/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-line text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-semibold">Nom</th>
                <th className="px-5 py-3 font-semibold">Projet</th>
                <th className="px-5 py-3 font-semibold">Budget</th>
                <th className="px-5 py-3 font-semibold">Localisation</th>
                <th className="px-5 py-3 font-semibold">Score</th>
                <th className="px-5 py-3 font-semibold">Statut</th>
                <th className="px-5 py-3 font-semibold">Dernière interaction</th>
                <th className="px-5 py-3 font-semibold">Collaborateur</th>
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.035 } } }}
            >
              {filtered.map((p) => (
                <motion.tr
                  key={p.id}
                  variants={ROW_VARIANTS}
                  className="border-b border-line last:border-0 hover:bg-surface/60 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <Link href={`/demo/prospects/${p.id}`} className="font-medium text-ink hover:text-brand-600">
                      {p.firstName} {p.lastName}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft">
                    {p.project} · {p.propertyType}
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft">{p.budget}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{p.location}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-ink">{p.score}</span>
                    <span className="text-muted">/100</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge value={p.status} />
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft">{p.lastInteraction}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{p.assignedTo}</td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-muted">
                    Aucun prospect ne correspond à cette recherche.
                  </td>
                </tr>
              )}
            </motion.tbody>
          </table>
        </div>
      </div>
    </>
  );
}
