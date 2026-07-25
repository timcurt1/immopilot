import type { ReactNode } from "react";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold uppercase tracking-wide text-ink mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export const inputClass =
  "w-full h-11 rounded-xl border border-line bg-white px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-colors";

export const textareaClass = `${inputClass} h-auto min-h-[100px] py-3`;
