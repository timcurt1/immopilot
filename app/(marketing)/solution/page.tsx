import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Inbox, FileSearch, Sparkles, UserCheck, Plug, Rocket } from "lucide-react";
import { Section, Eyebrow } from "@/components/marketing/Section";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/marketing/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/Reveal";
import { FlowIllustration } from "@/components/marketing/illustrations/FlowIllustration";
import { Spotlight } from "@/components/marketing/Spotlight";

export const metadata: Metadata = {
  title: "Solution",
  description:
    "Découvrez comment ImmoPilot centralise, analyse et exploite l'activité de votre agence immobilière, avec une validation humaine à chaque étape.",
};

const PROBLEMS = [
  "Les demandes arrivent par plusieurs canaux : téléphone, e-mail, portails, visites.",
  "Les informations sont dispersées entre logiciels métiers, boîtes mail et notes.",
  "Le temps disponible de chaque collaborateur détermine la qualité du suivi.",
];

const FLOW_STEPS = [
  { icon: Inbox, title: "Collecte", body: "ImmoPilot regroupe les demandes, prospects, dossiers et échanges dans une vue unique." },
  { icon: FileSearch, title: "Analyse", body: "Le logiciel identifie les critères, les urgences, les documents manquants et les opportunités." },
  { icon: Sparkles, title: "Recommandation", body: "Chaque collaborateur reçoit une prochaine action claire, prête à être exécutée." },
  { icon: UserCheck, title: "Validation", body: "Rien n'est envoyé ou enregistré sans qu'un utilisateur ait vérifié l'action proposée." },
];

const AUTOMATIONS = [
  "Qualification automatique d'une nouvelle demande locative",
  "Détection d'un prospect resté sans réponse depuis plusieurs jours",
  "Repérage d'un dossier avec une pièce manquante",
  "Génération d'un compte rendu à partir des notes d'une visite",
  "Suggestion de biens compatibles avec les critères d'un candidat",
];

export default function SolutionPage() {
  return (
    <>
      <PageHero
        eyebrow="Solution"
        path="/solution"
        title="Une couche d'intelligence au-dessus de l'activité de votre agence."
        description="ImmoPilot ne cherche pas à remplacer tous les logiciels existants, mais à connecter, comprendre et exploiter les informations plus efficacement."
      />

      <Section surface>
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <Eyebrow>Le constat</Eyebrow>
            <h2 className="font-display font-bold text-3xl text-ink tracking-tight mb-5">
              Les agences ne manquent pas d'informations. Elles manquent de temps pour les traiter.
            </h2>
            <p className="text-muted leading-relaxed">
              Chaque agence dispose déjà de logiciels métiers, d'une messagerie et d'un calendrier. Le problème n'est pas
              l'absence d'outils, mais la difficulté à transformer un flux continu d'informations en actions claires et
              priorisées.
            </p>
          </Reveal>
          <RevealGroup className="grid gap-4">
            {PROBLEMS.map((p) => (
              <RevealItem key={p} className="flex items-start gap-3 rounded-xl bg-white border border-line p-5">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-brand-500 shrink-0" />
                <p className="text-sm text-ink-soft leading-relaxed">{p}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl mb-10">
          <Eyebrow>Fonctionnement</Eyebrow>
          <h2 className="font-display font-bold text-3xl text-ink tracking-tight">
            Un flux d'information simple, de la demande à l'action.
          </h2>
        </div>
        <Reveal>
          <div className="max-w-xl mx-auto mb-14">
            <FlowIllustration />
          </div>
        </Reveal>
        <RevealGroup className="grid md:grid-cols-4 gap-5 relative" stagger={0.1}>
          <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-px bg-line" />
          {FLOW_STEPS.map((s) => (
            <RevealItem key={s.title} className="relative rounded-2xl border border-line bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white relative z-10">
                <s.icon size={20} />
              </div>
              <p className="font-semibold text-ink mb-1.5">{s.title}</p>
              <p className="text-sm text-muted leading-relaxed">{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section surface>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <Eyebrow>Exemples d'automatisations</Eyebrow>
            <h2 className="font-display font-bold text-3xl text-ink tracking-tight mb-6">
              Des tâches répétitives prises en charge, jamais décidées à votre place.
            </h2>
            <ul className="grid gap-3">
              {AUTOMATIONS.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <CheckCircle2 size={16} className="mt-0.5 text-brand-600 shrink-0" /> {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <Spotlight dark className="rounded-2xl bg-ink text-white p-8">
              <UserCheck size={26} className="mb-4 text-brand-300" />
              <p className="font-display font-bold text-xl mb-3">Le contrôle humain reste la règle.</p>
              <p className="text-white/75 text-sm leading-relaxed">
                ImmoPilot prépare, résume et recommande. Les réponses, relances et décisions importantes restent
                soumises à la validation d'un collaborateur avant tout envoi.
              </p>
            </Spotlight>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 mb-5">
              <Plug size={20} />
            </div>
            <h2 className="font-display font-bold text-3xl text-ink tracking-tight mb-4">
              S'intègre dans votre environnement existant.
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              ImmoPilot est pensé pour s'articuler avec votre messagerie, votre calendrier et votre logiciel métier. Les
              intégrations disponibles dépendent de la configuration et du projet de déploiement.
            </p>
            <Button href="/contact" variant="secondary">
              Parler de mon environnement logiciel
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 mb-5">
              <Rocket size={20} />
            </div>
            <h2 className="font-display font-bold text-3xl text-ink tracking-tight mb-4">
              Un déploiement progressif.
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Découverte, démonstration personnalisée, phase pilote puis généralisation : chaque étape est calibrée
              selon la taille et les priorités de votre organisation.
            </p>
            <Link href="/tarifs#deploiement" className="text-sm font-semibold text-brand-600 inline-flex items-center gap-1">
              Voir les étapes de déploiement <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section className="!py-0 !pb-20">
        <Reveal>
          <Spotlight dark className="rounded-3xl bg-ink text-white px-8 py-16 text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-5 max-w-xl mx-auto">
              Voyez comment ImmoPilot s'articule avec votre agence.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/demande-demo" size="lg" className="!bg-white !text-ink hover:!bg-white/90">
                Demander une démonstration
              </Button>
              <Button href="/fonctionnalites" variant="secondary" size="lg" className="!bg-transparent !text-white !border-white/25 hover:!bg-white/10">
                Voir toutes les fonctionnalités
              </Button>
            </div>
          </Spotlight>
        </Reveal>
      </Section>
    </>
  );
}
