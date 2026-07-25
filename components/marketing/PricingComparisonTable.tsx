import { Check, Minus } from "lucide-react";

type Tier = "essentiel" | "agence" | "reseau";

const FEATURES: { label: string; tiers: Tier[] }[] = [
  { label: "Fiches prospects", tiers: ["essentiel", "agence", "reseau"] },
  { label: "Tableau de bord", tiers: ["essentiel", "agence", "reseau"] },
  { label: "Assistant ImmoPilot", tiers: ["essentiel", "agence", "reseau"] },
  { label: "Tâches et rappels", tiers: ["essentiel", "agence", "reseau"] },
  { label: "Modèles de réponses", tiers: ["essentiel", "agence", "reseau"] },
  { label: "Qualification automatique des prospects", tiers: ["agence", "reseau"] },
  { label: "Synthèse automatique des dossiers", tiers: ["agence", "reseau"] },
  { label: "Relances assistées", tiers: ["agence", "reseau"] },
  { label: "Préparation des visites", tiers: ["agence", "reseau"] },
  { label: "Comptes rendus de visite", tiers: ["agence", "reseau"] },
  { label: "Statistiques d'activité", tiers: ["agence", "reseau"] },
  { label: "Paramétrage de l'agence", tiers: ["agence", "reseau"] },
  { label: "Accompagnement au déploiement", tiers: ["agence", "reseau"] },
  { label: "Administration multi-agences", tiers: ["reseau"] },
  { label: "Droits et permissions avancés", tiers: ["reseau"] },
  { label: "Statistiques consolidées du réseau", tiers: ["reseau"] },
  { label: "Personnalisation des processus", tiers: ["reseau"] },
  { label: "Intégrations spécifiques", tiers: ["reseau"] },
  { label: "Accompagnement dédié", tiers: ["reseau"] },
];

const COLUMNS: { key: Tier; label: string }[] = [
  { key: "essentiel", label: "Essentiel" },
  { key: "agence", label: "Agence" },
  { key: "reseau", label: "Réseau" },
];

const COL_CHECK: Record<Tier, string> = {
  essentiel: "text-teal-600",
  agence: "text-brand-600",
  reseau: "text-rose-600",
};

const COL_HEADER: Record<Tier, string> = {
  essentiel: "text-teal-700",
  agence: "text-brand-700 bg-brand-50/50",
  reseau: "text-rose-700",
};

export function PricingComparisonTable() {
  return (
    <div className="rounded-2xl border border-line bg-white overflow-x-auto">
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className="border-b border-line">
            <th className="text-left font-semibold text-ink px-5 py-4">Fonctionnalité</th>
            {COLUMNS.map((c) => (
              <th key={c.key} className={`px-5 py-4 text-center font-semibold ${COL_HEADER[c.key]}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((f, i) => (
            <tr key={f.label} className={i % 2 === 0 ? "bg-white" : "bg-surface/40"}>
              <td className="px-5 py-3 text-ink-soft">{f.label}</td>
              {COLUMNS.map((c) => (
                <td key={c.key} className={`px-5 py-3 text-center ${c.key === "agence" ? "bg-brand-50/50" : ""}`}>
                  {f.tiers.includes(c.key) ? (
                    <Check size={16} className={`mx-auto ${COL_CHECK[c.key]}`} />
                  ) : (
                    <Minus size={14} className="mx-auto text-line" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
