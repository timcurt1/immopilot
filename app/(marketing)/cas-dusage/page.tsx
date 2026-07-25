import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Badge } from "@/components/marketing/Badge";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { Button } from "@/components/marketing/Button";
import { Spotlight } from "@/components/marketing/Spotlight";
import { TONE_CLASSES, toneAt } from "@/components/marketing/tones";

export const metadata: Metadata = {
  title: "Cas d'usage",
  description:
    "Six scénarios concrets pour comprendre comment ImmoPilot accompagne une demande locative, une visite, un dossier incomplet ou le pilotage d'une agence.",
};

const CASES = [
  {
    tag: "Location",
    title: "Nouvelle demande locative",
    scenario: "Une demande arrive depuis un portail d'annonces.",
    steps: [
      "ImmoPilot analyse le message reçu",
      "Les critères du candidat sont identifiés (budget, zone, type de bien)",
      "Une fiche prospect est créée automatiquement",
      "Les informations manquantes sont détectées",
      "Une réponse est proposée au collaborateur",
      "Les prochaines actions sont recommandées",
    ],
  },
  {
    tag: "Visites",
    title: "Préparation d'une visite",
    scenario: "Un rendez-vous de visite approche dans l'agenda du collaborateur.",
    steps: [
      "Résumé du prospect et de ses critères essentiels",
      "Historique des échanges avec ce contact",
      "Informations clés sur le bien visité",
      "Points à vérifier pendant la visite",
      "Questions suggérées pour qualifier davantage le besoin",
    ],
  },
  {
    tag: "Visites",
    title: "Retour de visite",
    scenario: "Le collaborateur saisit quelques notes rapides après une visite.",
    steps: [
      "Les notes sont structurées automatiquement",
      "Un compte rendu clair est généré",
      "La fiche du prospect est mise à jour",
      "Une relance est suggérée si pertinent",
      "La prochaine action est programmée",
    ],
  },
  {
    tag: "Dossiers",
    title: "Dossier incomplet",
    scenario: "Un dossier locatif est bloqué faute de pièces justificatives.",
    steps: [
      "Les pièces manquantes sont détectées automatiquement",
      "Un message clair est préparé pour le candidat",
      "Le collaborateur vérifie et envoie le message",
      "Le dossier est mis à jour dès réception des pièces",
    ],
  },
  {
    tag: "Suivi",
    title: "Prospect sans suivi",
    scenario: "Un candidat n'a reçu aucune réponse depuis plusieurs jours.",
    steps: [
      "ImmoPilot identifie l'absence de réponse",
      "Une action de relance est recommandée",
      "Un message personnalisé est préparé",
      "Le collaborateur valide et envoie la relance",
    ],
  },
  {
    tag: "Direction",
    title: "Pilotage du responsable",
    scenario: "Un directeur d'agence souhaite une vue d'ensemble de l'activité.",
    steps: [
      "Visualisation des demandes en attente",
      "Délais moyens de traitement par collaborateur",
      "Identification des dossiers bloqués",
      "Répartition de la charge de travail dans l'équipe",
    ],
  },
];

export default function CasDusagePage() {
  return (
    <>
      <PageHero
        eyebrow="Cas d'usage"
        path="/cas-dusage"
        title="Six scénarios pour comprendre ImmoPilot au quotidien."
        description="Des situations concrètes, du premier contact au pilotage de l'agence, pour visualiser comment ImmoPilot s'intègre dans le travail de vos équipes."
      />

      <Section className="!pt-0">
        <div className="grid md:grid-cols-2 gap-6">
          {CASES.map((c, i) => {
            const tone = toneAt(i);
            const toneClass = TONE_CLASSES[tone];
            return (
              <Reveal key={c.title} delay={(i % 2) * 0.08}>
                <div
                  style={{ "--glow": toneClass.glow } as CSSProperties}
                  className="group rounded-2xl border border-line bg-white p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_var(--glow)]"
                >
                  <Badge tone={tone}>{c.tag}</Badge>
                  <h2 className="mt-4 font-display font-bold text-xl text-ink tracking-tight">{c.title}</h2>
                  <p className="mt-2 text-sm text-muted leading-relaxed italic">{c.scenario}</p>
                  <ol className="mt-5 grid gap-2.5">
                    {c.steps.map((s, idx) => (
                      <li key={s} className="flex items-start gap-3 text-sm text-ink-soft">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${toneClass.bg} ${toneClass.text}`}
                        >
                          {idx + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section surface className="!pb-24">
        <Reveal>
          <Spotlight dark className="rounded-3xl bg-ink text-white px-8 py-14 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-5 max-w-xl mx-auto">
              Voyez ces scénarios fonctionner dans une interface réelle.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/demo" size="lg" className="!bg-white !text-ink hover:!bg-white/90">
                Tester la démo interactive
              </Button>
              <Button href="/demande-demo" variant="secondary" size="lg" className="!bg-transparent !text-white !border-white/25 hover:!bg-white/10">
                Demander une démonstration
              </Button>
            </div>
          </Spotlight>
        </Reveal>
      </Section>
    </>
  );
}
