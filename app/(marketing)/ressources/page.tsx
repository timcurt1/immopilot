import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { RevealGroup, RevealItem } from "@/components/marketing/Reveal";
import { ARTICLES } from "@/lib/articles";
import { GRADIENT_TONE, toneAt } from "@/components/marketing/tones";

export const metadata: Metadata = {
  title: "Ressources",
  description:
    "Guides et articles sur l'intelligence artificielle, la productivité en agence, la location, la gestion locative et la transformation numérique dans l'immobilier.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function RessourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ressources"
        path="/ressources"
        title="Guides et articles pour les professionnels de l'immobilier."
        description="Intelligence artificielle, productivité, sécurité et transformation numérique : nos analyses sur les sujets qui concernent votre agence."
      />

      <Section className="!pt-0 !pb-24">
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((a, i) => (
            <RevealItem key={a.slug}>
              <Link
                href={`/ressources/${a.slug}`}
                className="group flex flex-col h-full rounded-2xl border border-line bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
              >
                <div className={`h-32 bg-gradient-to-br ${GRADIENT_TONE[toneAt(i)]} flex items-center px-6 transition-transform duration-500 group-hover:scale-105`}>
                  <p className="text-white/90 text-xs font-semibold uppercase tracking-wide">{a.category}</p>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-display font-bold text-lg text-ink leading-snug mb-2">{a.title}</p>
                  <p className="text-sm text-muted leading-relaxed mb-4 flex-1">{a.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-line">
                    <span>{formatDate(a.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {a.readTime}
                    </span>
                  </div>
                  <span className="mt-3 text-sm font-semibold text-brand-600 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Lire l'article <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
