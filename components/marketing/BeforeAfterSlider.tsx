import { ArrowRight, Check, CornerDownRight, Minus } from "lucide-react";
import { RevealGroup, RevealItem } from "./Reveal";

const PAIRS = [
  { before: "Informations dispersées", after: "Vue centralisée" },
  { before: "Relances manuelles", after: "Priorités automatiques" },
  { before: "Tâches oubliées", after: "Relances préparées" },
  { before: "Temps perdu à rechercher", after: "Dossiers synthétisés" },
  { before: "Réponses irrégulières", after: "Suivi plus homogène" },
];

export function BeforeAfterSlider() {
  return (
    <div className="rounded-2xl border border-line bg-white overflow-hidden">
      <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] gap-4 border-b border-line bg-surface/60 px-6 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Sans ImmoPilot</p>
        <span className="w-4" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 justify-self-end">Avec ImmoPilot</p>
      </div>

      <RevealGroup className="grid grid-cols-1 divide-y divide-line" stagger={0.08}>
        {PAIRS.map((p) => (
          <RevealItem
            key={p.before}
            y={14}
            className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 px-5 sm:px-6 py-4"
          >
            <div className="flex items-center gap-2.5 text-sm text-muted">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface text-muted">
                <Minus size={11} />
              </span>
              {p.before}
            </div>

            <div className="flex sm:hidden items-center gap-2 pl-2 text-line">
              <CornerDownRight size={14} />
            </div>
            <ArrowRight size={16} className="hidden sm:block text-line shrink-0" aria-hidden="true" />

            <div className="flex items-center gap-2.5 text-sm font-medium text-ink sm:justify-self-end">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Check size={11} />
              </span>
              {p.after}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
