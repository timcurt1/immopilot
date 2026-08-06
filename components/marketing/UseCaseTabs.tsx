"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, KeyRound, LineChart, Network, Users } from "lucide-react";
import { BOLD_TONE, TONE_CLASSES, toneAt } from "./tones";
import { ScrollDepth, EASE } from "./Reveal";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const current = TABS[activeIndex];
  const tone = toneAt(activeIndex);
  const toneClass = TONE_CLASSES[tone];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Cas d'usage par métier">
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(i)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 border ${
                isActive
                  ? `${BOLD_TONE[toneAt(i)]} text-white border-transparent shadow-md`
                  : "bg-white text-ink-soft border-line hover:border-ink/30 hover:text-ink"
              }`}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        style={{ "--glow": toneClass.glow } as CSSProperties}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start rounded-2xl border border-line bg-white p-8 transition-shadow duration-500 shadow-[0_30px_70px_var(--glow)]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <p className="font-display font-bold text-2xl text-ink mb-2">{current.label}</p>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Une interface et des automatisations adaptées aux réalités du métier, sans changer d'outil.
            </p>
            <ul className="grid gap-3">
              {current.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${BOLD_TONE[tone]}`} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <ScrollDepth strength={14} className="rounded-xl bg-surface border border-line p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="rounded-lg bg-white border border-line p-4 mb-3">
                <p className="text-[11px] text-muted mb-2 uppercase tracking-wide font-semibold">Vue {current.label.toLowerCase()}</p>
                <div className="grid gap-2">
                  {current.items.slice(0, 4).map((item, i) => (
                    <div key={item} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs text-ink min-w-0">
                      <span className={`h-5 w-5 rounded-md ${toneClass.bg} ${toneClass.text} grid place-items-center font-bold text-[10px] shrink-0`}>
                        {i + 1}
                      </span>
                      <span className="min-w-0 truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-muted text-center">Aperçu illustratif de l'interface ImmoPilot</p>
            </motion.div>
          </AnimatePresence>
        </ScrollDepth>
      </div>
    </div>
  );
}
