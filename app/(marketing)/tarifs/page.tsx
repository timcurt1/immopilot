import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { Section, Eyebrow } from "@/components/marketing/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/Reveal";
import { PricingCards } from "@/components/marketing/PricingCards";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { PRICING_FAQ } from "@/lib/marketingContent";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "ImmoPilot Essentiel, Agence ou Réseau : une tarification établie selon le nombre d'utilisateurs, les fonctionnalités et le niveau d'intégration.",
};

const DEPLOYMENT_STEPS = [
  { title: "Échange de découverte", body: "Compréhension de l'organisation, des outils et des priorités." },
  { title: "Démonstration personnalisée", body: "Présentation des fonctionnalités les plus pertinentes pour l'agence." },
  { title: "Phase pilote", body: "Déploiement auprès d'une équipe ou d'un périmètre limité." },
  { title: "Généralisation", body: "Ajustement, formation et déploiement progressif à plus grande échelle." },
];

export default function TarifsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tarifs"
        path="/tarifs"
        title="Une offre adaptée à la taille et aux besoins de votre agence."
        description="Tarification établie selon le nombre d'utilisateurs, les fonctionnalités et le niveau d'intégration."
      />

      <Section className="!pt-0">
        <PricingCards />
      </Section>

      <Section surface id="deploiement">
        <div className="max-w-2xl mb-14">
          <Eyebrow>Déploiement</Eyebrow>
          <h2 className="font-display font-bold text-3xl text-ink tracking-tight">
            Chaque formule s'accompagne d'un déploiement progressif.
          </h2>
        </div>
        <RevealGroup className="grid md:grid-cols-4 gap-6 relative" stagger={0.1}>
          <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-px bg-line" />
          {DEPLOYMENT_STEPS.map((s, i) => (
            <RevealItem key={s.title} className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white font-display font-bold relative z-10">
                {i + 1}
              </div>
              <p className="font-semibold text-ink mb-1.5">{s.title}</p>
              <p className="text-sm text-muted leading-relaxed">{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section className="!pb-24">
        <div className="max-w-2xl mb-14">
          <Eyebrow>FAQ tarifaire</Eyebrow>
          <h2 className="font-display font-bold text-3xl text-ink tracking-tight">Questions sur la tarification.</h2>
        </div>
        <div className="max-w-3xl">
          <Reveal>
            <FaqAccordion items={PRICING_FAQ} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
