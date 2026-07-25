import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal, RevealMask } from "./Reveal";
import { Badge } from "./Badge";
import { AmbientBackground } from "./AmbientBackground";

const BASE_URL = "https://immopilot.fr";

export function PageHero({
  eyebrow,
  title,
  description,
  path,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  path?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      <AmbientBackground parallax />
      <div className="mx-auto max-w-4xl px-6 lg:px-8 pt-20 pb-14 md:pt-28 md:pb-20 text-center relative">
        {eyebrow && (
          <nav aria-label="Fil d'Ariane" className="flex items-center justify-center gap-1.5 text-xs text-muted mb-6">
            <Link href="/" className="hover:text-ink transition-colors">
              Accueil
            </Link>
            <ChevronRight size={12} />
            <span className="text-ink font-medium" aria-current="page">
              {eyebrow}
            </span>
          </nav>
        )}
        {eyebrow && (
          <Reveal y={12} scale={false}>
            <Badge>{eyebrow}</Badge>
          </Reveal>
        )}
        <RevealMask delay={0.08} className="mt-6">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-ink">{title}</h1>
        </RevealMask>
        {description && (
          <Reveal delay={0.22} y={16} scale={false}>
            <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl mx-auto">{description}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.3} y={16} scale={false}>
            {children}
          </Reveal>
        )}
      </div>

      {eyebrow && path && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
                { "@type": "ListItem", position: 2, name: eyebrow, item: `${BASE_URL}${path}` },
              ],
            }),
          }}
        />
      )}
    </div>
  );
}
