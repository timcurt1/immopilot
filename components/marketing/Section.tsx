import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
  surface = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  surface?: boolean;
}) {
  return (
    <section id={id} className={`${surface ? "bg-surface" : ""} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20 md:py-28">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-brand-600 tracking-wide mb-3">{children}</p>;
}
