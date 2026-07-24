import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Badge } from "./Badge";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(53,87,255,0.25), transparent)" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-4xl px-6 lg:px-8 pt-20 pb-14 md:pt-28 md:pb-20 text-center relative">
        <Reveal>
          {eyebrow && <Badge>{eyebrow}</Badge>}
          <h1 className="mt-6 font-display font-extrabold text-4xl md:text-5xl tracking-tight text-ink">{title}</h1>
          {description && <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl mx-auto">{description}</p>}
          {children}
        </Reveal>
      </div>
    </div>
  );
}
