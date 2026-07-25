import type { Metadata } from "next";
import { Target, Sparkles, ShieldCheck, Users, Handshake, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/Reveal";
import { Button } from "@/components/marketing/Button";
import { OrbitIllustration } from "@/components/marketing/illustrations/OrbitIllustration";
import { BOLD_TONE, toneAt } from "@/components/marketing/tones";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "ImmoPilot est né d'un constat simple : les professionnels de l'immobilier passent encore trop de temps à gérer l'information plutôt qu'à l'utiliser.",
};

const VALUES = [
  { icon: Target, title: "Utilité réelle", body: "Chaque fonctionnalité répond à un besoin concret observé sur le terrain, pas à une tendance technologique." },
  { icon: Sparkles, title: "Simplicité", body: "Un outil doit se comprendre en quelques minutes pour être réellement adopté par une équipe." },
  { icon: ShieldCheck, title: "Maîtrise humaine", body: "L'automatisation prépare et recommande ; les décisions importantes restent entre les mains des équipes." },
  { icon: Users, title: "Proximité métier", body: "Comprendre le quotidien d'une agence est la condition pour construire un outil qui l'aide vraiment." },
  { icon: Handshake, title: "Sécurité", body: "La confiance d'une agence se mérite, notamment par une protection sérieuse de ses données." },
  { icon: TrendingUp, title: "Amélioration continue", body: "Le produit évolue au contact des agences pilotes et de leurs retours réels." },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        path="/a-propos"
        title="ImmoPilot est né d'un constat simple : les professionnels de l'immobilier passent encore trop de temps à gérer l'information plutôt qu'à l'utiliser."
      />

      <Section className="!pt-0">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">Notre mission</p>
            <p className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight leading-snug">
              Aider les agences immobilières à intégrer l'intelligence artificielle de façon concrète, progressive et
              responsable.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-sm mx-auto">
              <OrbitIllustration />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface>
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">Nos valeurs</p>
          <h2 className="font-display font-bold text-3xl text-ink tracking-tight">Ce qui guide chaque décision produit.</h2>
        </div>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <RevealItem key={v.title} className="group rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1">
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${BOLD_TONE[toneAt(i)]} text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
              >
                <v.icon size={19} />
              </div>
              <p className="font-semibold text-ink mb-2">{v.title}</p>
              <p className="text-sm text-muted leading-relaxed">{v.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section className="!pb-24">
        <Reveal>
          <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center max-w-2xl mx-auto">
            <p className="font-semibold text-ink mb-2">L'histoire de l'équipe, à venir</p>
            <p className="text-sm text-muted leading-relaxed">
              Cette section présentera prochainement l'histoire des fondateurs, les membres de l'équipe, nos partenaires
              et nos offres d'emploi.
            </p>
          </div>
        </Reveal>
        <div className="text-center mt-10">
          <Button href="/contact">Nous contacter</Button>
        </div>
      </Section>
    </>
  );
}
