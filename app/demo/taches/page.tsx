"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";
import { StatusBadge } from "@/components/demo/StatusBadge";
import { DEMO_TASKS } from "@/lib/demoContent";

export default function DemoTachesPage() {
  const [done, setDone] = useState<Set<string>>(new Set());

  return (
    <>
      <DemoPageHeader title="Tâches" description="Actions recommandées, priorisées par ImmoPilot" />
      <div className="px-6 md:px-8 pb-12">
        <div className="rounded-2xl border border-line bg-white overflow-hidden">
          <ul>
            {DEMO_TASKS.map((t) => {
              const isDone = done.has(t.id);
              return (
                <li key={t.id} className="flex items-center gap-3 px-5 py-4 border-b border-line last:border-0">
                  <button
                    onClick={() =>
                      setDone((prev) => {
                        const next = new Set(prev);
                        next.has(t.id) ? next.delete(t.id) : next.add(t.id);
                        return next;
                      })
                    }
                    aria-pressed={isDone}
                    aria-label={isDone ? "Marquer comme à faire" : "Marquer comme terminée"}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      isDone ? "bg-brand-600 border-brand-600 text-white" : "border-line text-transparent"
                    }`}
                  >
                    <Check size={12} />
                  </button>
                  <Link
                    href={`/demo/prospects/${t.prospect}`}
                    className={`flex-1 min-w-0 text-sm truncate ${isDone ? "line-through text-muted" : "text-ink"}`}
                  >
                    {t.title}
                  </Link>
                  <span className="hidden sm:inline text-xs text-muted shrink-0">{t.type}</span>
                  <StatusBadge value={t.priority} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
