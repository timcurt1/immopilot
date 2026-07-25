import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "green" | "amber" | "neutral" | "teal" | "rose" | "sun" | "red";
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-50 text-brand-700 border-brand-100",
    green: "bg-positive-soft text-green-700 border-green-200",
    amber: "bg-warning-soft text-amber-700 border-amber-200",
    neutral: "bg-surface text-ink-soft border-line",
    teal: "bg-teal-50 text-teal-600 border-teal-500/20",
    rose: "bg-rose-50 text-rose-600 border-rose-500/20",
    sun: "bg-sun-50 text-sun-600 border-sun-500/20",
    red: "bg-danger-soft text-red-700 border-red-200",
  };
  return (
    <span
      className={`inline-flex w-max items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
