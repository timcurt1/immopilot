import {
  Mail,
  PhoneMissed,
  AlertTriangle,
  Search,
  MessageSquare,
  LayoutGrid,
  Zap,
  Send,
  FileCheck2,
  Repeat2,
  ArrowRight,
  Check,
} from "lucide-react";
import { RevealGroup, RevealItem } from "./Reveal";

const PAIRS = [
  { before: "Informations dispersées", beforeIcon: Mail, after: "Vue centralisée", afterIcon: LayoutGrid },
  { before: "Relances manuelles", beforeIcon: PhoneMissed, after: "Priorités automatiques", afterIcon: Zap },
  { before: "Tâches oubliées", beforeIcon: AlertTriangle, after: "Relances préparées", afterIcon: Send },
  { before: "Temps perdu à rechercher", beforeIcon: Search, after: "Dossiers synthétisés", afterIcon: FileCheck2 },
  { before: "Réponses irrégulières", beforeIcon: MessageSquare, after: "Suivi plus homogène", afterIcon: Repeat2 },
];

const TILT = [-4, 3, -3, 4, -2];

export function BeforeAfterSlider() {
  return (
    <div className="relative rounded-2xl border border-line bg-white overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-line">
        <div className="p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-6">Sans ImmoPilot</p>
          <RevealGroup className="grid grid-cols-2 gap-3" stagger={0.07}>
            {PAIRS.map((p, i) => {
              const Icon = p.beforeIcon;
              return (
                <RevealItem key={p.before} y={14} className={i % 2 === 1 ? "mt-5" : ""}>
                  <div
                    className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 text-xs font-medium text-ink-soft shadow-sm"
                    style={{ transform: `rotate(${TILT[i]}deg)` }}
                  >
                    <Icon size={14} className="text-muted shrink-0" aria-hidden="true" />
                    {p.before}
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <div className="p-6 md:p-8 bg-brand-50/30">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-6">Avec ImmoPilot</p>
          <RevealGroup className="grid grid-cols-1 gap-2.5" stagger={0.07} >
            {PAIRS.map((p) => {
              const Icon = p.afterIcon;
              return (
                <RevealItem key={p.after} y={14} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink">{p.after}</span>
                  <Check size={15} className="text-brand-600 shrink-0" aria-hidden="true" />
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>

      <div
        className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-ink text-white shadow-lg"
        aria-hidden="true"
      >
        <ArrowRight size={18} />
      </div>
    </div>
  );
}
