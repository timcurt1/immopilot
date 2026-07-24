import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";

export const metadata: Metadata = { title: "Statut du service" };

const SERVICES = [
  "Application ImmoPilot",
  "Assistant conversationnel",
  "Automatisations",
  "Notifications par e-mail",
  "API et intégrations",
];

export default function StatutPage() {
  return (
    <>
      <PageHero eyebrow="Statut" path="/statut" title="Statut du service ImmoPilot" description="Tous les systèmes fonctionnent normalement." />
      <Section className="!pt-0 !pb-24">
        <div className="max-w-xl mx-auto rounded-2xl border border-line bg-white overflow-hidden">
          {SERVICES.map((s, i) => (
            <Reveal key={s} delay={i * 0.05}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-line last:border-0">
                <span className="text-sm text-ink">{s}</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
                  <CheckCircle2 size={14} /> Opérationnel
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-center text-xs text-muted mt-6">
          Cette page sera prochainement connectée à un système de supervision en temps réel.
        </p>
      </Section>
    </>
  );
}
