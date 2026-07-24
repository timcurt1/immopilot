"use client";

import { useRef, useState } from "react";
import { CheckCircle2, GripVertical } from "lucide-react";

const BEFORE = ["Informations dispersées", "Relances manuelles", "Tâches oubliées", "Temps perdu à rechercher", "Réponses irrégulières"];
const AFTER = ["Vue centralisée", "Priorités automatiques", "Relances préparées", "Dossiers synthétisés", "Suivi plus homogène"];

export function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function updateFromClientX(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }

  return (
    <div
      ref={ref}
      className="relative select-none rounded-2xl border border-line bg-white overflow-hidden touch-none"
      onPointerMove={(e) => dragging.current && updateFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      <div className="grid grid-cols-2 divide-x divide-line">
        <div className="p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-5">Sans ImmoPilot</p>
          <ul className="grid gap-3">
            {BEFORE.map((t) => (
              <li key={t} className="text-sm text-ink-soft flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 md:p-8 bg-brand-50/30">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-5">Avec ImmoPilot</p>
          <ul className="grid gap-3">
            {AFTER.map((t) => (
              <li key={t} className="text-sm text-ink flex items-start gap-2 font-medium">
                <CheckCircle2 size={15} className="mt-0.5 text-brand-600 shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay that reveals "After" as the handle moves left */}
      <div
        className="absolute inset-y-0 right-0 bg-white border-l-2 border-brand-500 pointer-events-none"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <div className="p-6 md:p-8 bg-brand-50/30 h-full">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-5 whitespace-nowrap">Avec ImmoPilot</p>
          <ul className="grid gap-3">
            {AFTER.map((t) => (
              <li key={t} className="text-sm text-ink flex items-start gap-2 font-medium whitespace-nowrap">
                <CheckCircle2 size={15} className="mt-0.5 text-brand-600 shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        aria-label="Faire glisser pour comparer avant et après ImmoPilot"
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white shadow-lg cursor-ew-resize touch-none"
        style={{ left: `${pos}%` }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
      >
        <GripVertical size={16} />
      </button>
    </div>
  );
}
