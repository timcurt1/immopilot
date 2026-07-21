"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Application } from "@/lib/types";

function stageTone(stage: string) {
  if (stage === "Prêt à valider") return "chip green";
  if (stage === "À relancer") return "chip amber";
  return "chip blue";
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
    <div className="glass" style={{ padding: 14 }}>
      <div className="tableFilters">
        <input
          className="searchInput"
          placeholder="Rechercher un candidat (nom, email)…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="searchInput" value={stage} onChange={(e) => setStage(e.target.value)}>
          {stages.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {applications.length === 0 ? (
        <p style={{ color: "var(--muted)", padding: "20px 4px" }}>Aucune candidature pour le moment.</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: "var(--muted)", padding: "20px 4px" }}>Aucune candidature ne correspond à cette recherche.</p>
      ) : (
        <table className="table applicationsTable">
          <thead>
            <tr>
              <th>Candidat</th>
              <th>Bien</th>
              <th>Score</th>
              <th>Statut</th>
              <th>Visite</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td data-label="Candidat">
                  <b>
                    {a.first_name} {a.last_name}
                  </b>
                  <br />
                  <span style={{ color: "var(--muted)", fontSize: 12 }}>{a.candidate_email}</span>
                </td>
                <td data-label="Bien">{a.property?.title || "Non relié"}</td>
                <td data-label="Score">
                  <span className="chip blue">{a.score}</span>
                </td>
                <td data-label="Statut">
                  <span className={stageTone(a.stage)}>{a.stage}</span>
                </td>
                <td data-label="Visite">{a.visit_status}</td>
                <td data-label="Action">
                  <Link className="btn ghost" href={`/applications/${a.id}`}>
                    Ouvrir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
