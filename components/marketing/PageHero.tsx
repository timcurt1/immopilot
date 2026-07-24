import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Badge } from "./Badge";
import { AmbientBackground } from "./AmbientBackground";

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
      <AmbientBackground />
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
