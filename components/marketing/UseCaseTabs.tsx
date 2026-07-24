"use client";

import { useState } from "react";
import { Building2, KeyRound, LineChart, Network, Users } from "lucide-react";

const TABS = [
  {
    id: "location",
    label: "Location",
    icon: KeyRound,
    items: [
      "Qualification automatique des candidats",
      "Analyse des critères (budget, zone, disponibilité)",
      "Préparation des visites",
      "Suivi des dossiers locatifs",
      "Relances des candidats sans réponse",
      "Comptes rendus de visite",
      "Détection des pièces manquantes",
    ],
  },
  {
    id: "transaction",
    label: "Transaction",
    icon: Building2,
    items: [
      "Qualification des acquéreurs",
      "Suivi des mandats vendeurs",
      "Rapprochement entre mandats et demandes",
      "Préparation des rendez-vous",
      "Relances commerciales",
      "Résumé des échanges avec chaque contact",
    ],
  },
  {
    id: "gestion",
    label: "Gestion locative",
    icon: Users,
    items: [
      "Synthèse des demandes locataires",
      "Classement des urgences",
      "Préparation des réponses types",
      "Suivi des interventions techniques",
      "Centralisation des informations du bien",
    ],
  },
  {
    id: "direction",
    label: "Direction d'agence",
    icon: LineChart,
    items: [
      "Suivi de l'activité globale de l'agence",
      "Détection des dossiers en attente",
      "Visibilité sur les délais de traitement",
      "Meilleure répartition des actions",
      "Homogénéisation des pratiques commerciales",
    ],
  },
  {
    id: "reseau",
    label: "Réseau immobilier",
    icon: Network,
    items: [
      "Standardisation des processus entre agences",
      "Déploiement progressif multi-agences",
      "Pilotage consolidé du réseau",
      "Gestion fine des droits et rôles",
      "Accompagnement des collaborateurs",
      "Personnalisation selon les méthodes du réseau",
    ],
  },
];

export function UseCaseTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === active)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Cas d'usage par métier">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors border ${
                isActive
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-ink-soft border-line hover:border-ink/30 hover:text-ink"
              }`}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start rounded-2xl border border-line bg-white p-8">
        <div>
          <p className="font-display font-bold text-2xl text-ink mb-2">{current.label}</p>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Une interface et des automatisations adaptées aux réalités du métier, sans changer d'outil.
          </p>
          <ul className="grid gap-3">
            {current.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-surface border border-line p-5">
          <div className="rounded-lg bg-white border border-line p-4 mb-3">
            <p className="text-[11px] text-muted mb-2 uppercase tracking-wide font-semibold">Vue {current.label.toLowerCase()}</p>
            <div className="grid gap-2">
              {current.items.slice(0, 4).map((item, i) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs text-ink">
                  <span className="h-5 w-5 rounded-md bg-brand-50 text-brand-700 grid place-items-center font-bold text-[10px]">
                    {i + 1}
                  </span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-muted text-center">Aperçu illustratif de l'interface ImmoPilot</p>
        </div>
      </div>
    </div>
  );
}
