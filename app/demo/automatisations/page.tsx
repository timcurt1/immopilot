"use client";

import { useState } from "react";
import { PlayCircle, ShieldCheck } from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";
import { DEMO_AUTOMATIONS } from "@/lib/demoContent";

export default function DemoAutomatisationsPage() {
  const [rules, setRules] = useState(DEMO_AUTOMATIONS);
  const [tested, setTested] = useState<string | null>(null);

  function toggle(id: string) {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  }

  function test(id: string) {
    setTested(id);
    setTimeout(() => setTested(null), 2200);
  }

  return (
    <>
      <DemoPageHeader
        title="Automatisations"
        description="Chaque règle peut être activée, désactivée ou testée. Une validation humaine reste possible avant toute action externe."
      />
      <div className="px-6 md:px-8 pb-12 grid gap-4">
        {rules.map((r) => (
          <div key={r.id} className="rounded-2xl border border-line bg-white p-5 flex items-center gap-4">
            <button
              role="switch"
              aria-checked={r.active}
              onClick={() => toggle(r.id)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${r.active ? "bg-brand-600" : "bg-line"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  r.active ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink">{r.title}</p>
              <p className="text-xs text-muted mt-0.5">{r.trigger}</p>
            </div>
            {r.active && (
              <span className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-positive-soft rounded-full px-2.5 py-1">
                <ShieldCheck size={11} /> Validation humaine active
              </span>
            )}
            <button
              onClick={() => test(r.id)}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-line text-xs font-semibold text-ink-soft hover:border-brand-300 hover:text-ink transition-colors shrink-0"
            >
              <PlayCircle size={14} /> {tested === r.id ? "Testé ✓" : "Tester"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
