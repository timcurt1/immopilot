import Link from "next/link";
import type { CSSProperties } from "react";
import {
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Inbox,
  Lock,
  Mail,
  MessageSquareText,
  Sparkles,
  Users,
  Workflow,
  ArrowRight,
  ShieldCheck,
  Eye,
  Database,
  KeyRound,
  History,
  Play,
  LayoutGrid,
  ListChecks,
  UserCheck,
} from "lucide-react";
import { Section, Eyebrow } from "@/components/marketing/Section";
import { Badge } from "@/components/marketing/Badge";
import { Button } from "@/components/marketing/Button";
import { HeroMockup } from "@/components/marketing/HeroMockup";
import { TrustBar } from "@/components/marketing/TrustBar";
import { UseCaseTabs } from "@/components/marketing/UseCaseTabs";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { PricingCards } from "@/components/marketing/PricingCards";
import { BeforeAfterSlider } from "@/components/marketing/BeforeAfterSlider";
import { Reveal, RevealGroup, RevealItem, RevealMask, ScrollDepth, IconPop } from "@/components/marketing/Reveal";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Spotlight } from "@/components/marketing/Spotlight";
import { LiveTicker } from "@/components/marketing/LiveTicker";
import { ScrollDrawLine } from "@/components/marketing/ScrollDrawLine";
import { IntegrationsConstellation } from "@/components/marketing/IntegrationsConstellation";
import { RoiCalculator } from "@/components/marketing/RoiCalculator";
import { GENERAL_FAQ } from "@/lib/marketingContent";
import { type FeatureTone, TONE_CLASSES, BOLD_TONE } from "@/components/marketing/tones";

const FEATURES: { icon: typeof FileSearch; title: string; body: string; href: string; tone: FeatureTone }[] = [
  {
    icon: FileSearch,
    title: "Qualification automatique des prospects",
    body: "ImmoPilot analyse les demandes entrantes et identifie le besoin, le type de bien, le budget, la localisation et le niveau de maturité.",
    href: "/fonctionnalites#qualification",
    tone: "brand",
  },
  {
    icon: Users,
    title: "Fiche prospect intelligente",
    body: "Chaque contact dispose d'une fiche structurée regroupant ses critères, ses échanges, ses documents, son historique et les prochaines actions recommandées.",
    href: "/fonctionnalites#fiche-prospect",
    tone: "teal",
  },
  {
    icon: ClipboardCheck,
    title: "Synthèse automatique des dossiers",
    body: "Le logiciel résume les informations importantes et signale les pièces manquantes ou incohérentes.",
    href: "/fonctionnalites#synthese",
    tone: "rose",
  },
  {
    icon: Mail,
    title: "Relances assistées",
    body: "ImmoPilot détecte les prospects sans réponse et propose des relances personnalisées, prêtes à être vérifiées et envoyées.",
    href: "/fonctionnalites#relances",
    tone: "sun",
  },
  {
    icon: Calendar,
    title: "Préparation des visites",
    body: "Le collaborateur retrouve les informations sur le bien, le client, ses critères et les éléments à vérifier pendant la visite.",
    href: "/fonctionnalites#visites",
    tone: "teal",
  },
  {
    icon: CheckCircle2,
    title: "Compte rendu de visite",
    body: "Après une visite, ImmoPilot transforme les notes du collaborateur en compte rendu clair et exploitable.",
    href: "/fonctionnalites#comptes-rendus",
    tone: "brand",
  },
  {
    icon: Bot,
    title: "Assistant métier",
    body: "Les équipes peuvent interroger ImmoPilot en langage naturel pour retrouver une information, préparer une réponse ou comprendre une situation.",
    href: "/fonctionnalites#assistant",
    tone: "rose",
  },
  {
    icon: BarChart3,
    title: "Pilotage de l'agence",
    body: "Le responsable visualise l'activité, les délais de traitement, les demandes en attente et les opportunités nécessitant une action.",
    href: "/fonctionnalites#pilotage",
    tone: "sun",
  },
];

const WORKFLOW_STEPS = [
  "Une nouvelle demande arrive",
  "ImmoPilot analyse son contenu",
  "Une fiche prospect est créée",
  "La demande est classée",
  "Le collaborateur reçoit une action recommandée",
  "Une réponse personnalisée est préparée",
  "Le suivi est enregistré",
  "Les prochaines relances sont planifiées",
];

const BENEFITS: { title: string; body: string; icon: typeof Workflow; tone: FeatureTone }[] = [
  {
    title: "Gagner du temps",
    body: "Réduire le temps passé à rechercher, reformuler, classer et relancer.",
    icon: Workflow,
    tone: "brand",
  },
  {
    title: "Améliorer le suivi client",
    body: "Répondre plus rapidement et maintenir une continuité dans les échanges.",
    icon: MessageSquareText,
    tone: "teal",
  },
  {
    title: "Réduire les oublis",
    body: "Identifier automatiquement les dossiers, prospects et actions nécessitant une attention.",
    icon: Inbox,
    tone: "sun",
  },
  {
    title: "Harmoniser les pratiques",
    body: "Donner à chaque collaborateur un cadre de travail clair, tout en conservant son autonomie.",
    icon: Sparkles,
    tone: "rose",
  },
];

const SECURITY_POINTS = [
  { icon: KeyRound, text: "Contrôle des accès et gestion des rôles" },
  { icon: Lock, text: "Chiffrement des échanges" },
  { icon: History, text: "Traçabilité des actions" },
  { icon: Database, text: "Isolation des données entre organisations" },
  { icon: ShieldCheck, text: "Sauvegardes régulières et hébergement européen lorsque possible" },
  { icon: Eye, text: "Conformité aux principes du RGPD" },
];

const HIGHLIGHTS = [
  { icon: LayoutGrid, title: "1 vue centralisée", body: "Prospects, dossiers, visites et messages réunis au même endroit." },
  { icon: ListChecks, title: "Toutes les prochaines actions visibles", body: "Chaque collaborateur sait ce qu'il doit traiter en priorité." },
  { icon: UserCheck, title: "Validation humaine conservée", body: "Rien n'est envoyé sans qu'un utilisateur ait pu vérifier." },
  { icon: Users, title: "Plusieurs métiers réunis", body: "Location, transaction, gestion locative et pilotage d'agence." },
];

const DEPLOYMENT_STEPS = [
  { title: "Échange de découverte", body: "Compréhension de l'organisation, des outils et des priorités." },
  { title: "Démonstration personnalisée", body: "Présentation des fonctionnalités les plus pertinentes pour l'agence." },
  { title: "Phase pilote", body: "Déploiement auprès d'une équipe ou d'un périmètre limité." },
  { title: "Généralisation", body: "Ajustement, formation et déploiement progressif à plus grande échelle." },
];

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <Section className="!pt-16 md:!pt-20 !pb-8 relative overflow-hidden">
        <AmbientBackground parallax />
        <div className="max-w-3xl mx-auto text-center relative">
          <Reveal>
            <Badge>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
              </span>
              L'IA pensée pour les professionnels de l'immobilier
            </Badge>
          </Reveal>
          <RevealMask delay={0.08} className="mt-6">
            <h1 className="font-display font-extrabold text-[2.5rem] leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Moins de tâches répétitives.
              <br />
              <span className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">
                Plus de temps pour vos clients.
              </span>
            </h1>
          </RevealMask>
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl mx-auto">
              ImmoPilot centralise vos informations, automatise les actions répétitives et accompagne vos collaborateurs dans le
              suivi quotidien de leurs prospects, candidats et clients.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/demande-demo" size="lg">
                Demander une démonstration <ArrowRight size={16} />
              </Button>
              <Button href="/demo" variant="secondary" size="lg">
                <Play size={14} className="fill-current" /> Voir ImmoPilot en action
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted">
              Présentation personnalisée · Sans engagement · Adaptée à votre organisation
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-7 flex justify-center">
              <LiveTicker />
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="pb-20 md:pb-28 px-6 lg:px-8">
        <Reveal delay={0.3} y={32}>
          <ScrollDepth strength={26}>
            <HeroMockup />
          </ScrollDepth>
        </Reveal>
      </div>

      <TrustBar />

      {/* 2. PREUVE DE COMPRÉHENSION MÉTIER */}
      <Section surface>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-14">
          <Reveal>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight mb-5">
              Une agence immobilière ne manque pas d'outils. Elle manque de temps et de continuité.
            </h2>
            <p className="text-muted leading-relaxed">
              Les demandes arrivent par téléphone, par e-mail, depuis les portails immobiliers et pendant les visites. Les
              informations sont dispersées, les urgences s'accumulent et certaines relances passent inévitablement au
              second plan. ImmoPilot transforme ces informations en actions claires et prioritaires.
            </p>
          </Reveal>
          <RevealGroup className="grid gap-5">
            {[
              { title: "Trop de demandes à traiter", body: "Les collaborateurs doivent analyser manuellement chaque demande avant de pouvoir y répondre." },
              { title: "Des informations dispersées", body: "E-mails, notes, dossiers, calendriers et logiciels métiers ne sont pas toujours synchronisés." },
              { title: "Un suivi difficile à homogénéiser", body: "La qualité du suivi dépend du temps disponible, des habitudes et de l'expérience de chaque collaborateur." },
            ].map((p) => (
              <RevealItem key={p.title} className="rounded-xl bg-white border border-line p-5">
                <p className="font-semibold text-ink mb-1">{p.title}</p>
                <p className="text-sm text-muted leading-relaxed">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted mb-4">
            Faites glisser pour comparer
          </p>
          <BeforeAfterSlider />
        </Reveal>
      </Section>

      {/* 3. PROPOSITION DE VALEUR */}
      <Section>
        <RevealGroup className="text-center max-w-2xl mx-auto mb-14">
          <RevealItem className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight mb-4" scale>
            <h2>ImmoPilot transforme chaque information en prochaine action.</h2>
          </RevealItem>
          <RevealItem className="text-muted leading-relaxed">
            <p>
              Le logiciel analyse l'activité de l'agence et aide les équipes à identifier ce qui doit être traité, par qui et
              à quel moment.
            </p>
          </RevealItem>
        </RevealGroup>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" stagger={0.15}>
          <ScrollDrawLine />
          {[
            { n: "1", title: "ImmoPilot centralise", body: "Les demandes, prospects, dossiers, échanges et rendez-vous sont regroupés dans une vue claire.", icon: Inbox },
            { n: "2", title: "ImmoPilot analyse", body: "Le logiciel identifie les informations importantes, les dossiers incomplets, les urgences et les opportunités.", icon: FileSearch },
            { n: "3", title: "ImmoPilot accompagne", body: "Chaque collaborateur reçoit des recommandations et peut générer les actions adaptées en quelques secondes.", icon: Sparkles },
          ].map((s) => (
            <RevealItem key={s.n} className="relative rounded-2xl border border-line bg-white p-7 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white">
                <s.icon size={22} />
              </div>
              <p className="font-display font-bold text-lg text-ink mb-2">{s.title}</p>
              <p className="text-sm text-muted leading-relaxed">{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* 4. FONCTIONNALITÉS PRINCIPALES */}
      <Section surface>
        <RevealGroup className="max-w-2xl mb-14">
          <RevealItem y={12} scale={false}>
            <Eyebrow>Fonctionnalités</Eyebrow>
          </RevealItem>
          <RevealItem className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight" scale>
            <h2>Un seul copilote pour les opérations essentielles de l'agence.</h2>
          </RevealItem>
        </RevealGroup>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => {
            const tone = TONE_CLASSES[f.tone];
            return (
              <RevealItem
                key={f.title}
                style={{ "--glow": tone.glow } as CSSProperties}
                className={`group rounded-2xl border border-line bg-white p-6 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_55px_var(--glow)] ${tone.ring}`}
              >
                <IconPop className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${tone.bg} ${tone.text} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                  <f.icon size={20} />
                </IconPop>
                <p className="font-semibold text-ink mb-2 leading-snug">{f.title}</p>
                <p className="text-sm text-muted leading-relaxed mb-4 flex-1">{f.body}</p>
                <Link href={f.href} className={`text-sm font-semibold ${tone.text} inline-flex items-center gap-1 group-hover:gap-2 transition-all`}>
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* 5. DÉMONSTRATION DU FONCTIONNEMENT */}
      <Section>
        <RevealGroup className="max-w-2xl mb-14">
          <RevealItem y={12} scale={false}>
            <Eyebrow>Fonctionnement</Eyebrow>
          </RevealItem>
          <RevealItem className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight" scale>
            <h2>Du premier contact à la prochaine action, ImmoPilot accompagne chaque étape.</h2>
          </RevealItem>
        </RevealGroup>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-14" stagger={0.07}>
          {WORKFLOW_STEPS.map((s, i) => (
            <RevealItem key={s} className="rounded-xl border border-line bg-white p-4">
              <span className="text-xs font-bold text-brand-600">Étape {i + 1}</span>
              <p className="text-sm text-ink mt-1.5 leading-snug">{s}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal y={24}>
          <div className="rounded-2xl border border-line bg-white p-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8">
            <div>
              <Badge tone="brand">Exemple concret</Badge>
              <p className="mt-4 text-ink-soft leading-relaxed">
                Une candidate cherche un <strong className="text-ink">T2 à Clermont-Ferrand</strong>, avec un budget de{" "}
                <strong className="text-ink">700 €</strong>, disponible rapidement et proche des transports.
              </p>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                ImmoPilot reconnaît automatiquement la zone recherchée, identifie le budget, enregistre le type de bien, détecte
                l'urgence, crée la fiche, suggère les biens compatibles, propose une réponse et prépare une relance.
              </p>
            </div>
            <div className="rounded-xl bg-surface border border-line p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">Fiche générée par ImmoPilot</p>
              <div className="rounded-lg bg-white border border-line p-4 grid gap-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Type de bien</span><span className="font-medium text-ink">T2</span></div>
                <div className="flex justify-between"><span className="text-muted">Zone</span><span className="font-medium text-ink">Clermont-Ferrand</span></div>
                <div className="flex justify-between"><span className="text-muted">Budget</span><span className="font-medium text-ink">700 €/mois</span></div>
                <div className="flex justify-between"><span className="text-muted">Urgence</span><span className="font-medium text-amber-600">Disponibilité rapide</span></div>
                <div className="flex justify-between"><span className="text-muted">Score de qualification</span><span className="font-medium text-brand-600">87 / 100</span></div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 6. CAS D'USAGE PAR MÉTIER */}
      <Section surface>
        <RevealGroup className="max-w-2xl mb-14">
          <RevealItem y={12} scale={false}>
            <Eyebrow>Cas d'usage</Eyebrow>
          </RevealItem>
          <RevealItem className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight" scale>
            <h2>Une même plateforme, adaptée à chaque métier de l'agence.</h2>
          </RevealItem>
        </RevealGroup>
        <Reveal delay={0.1}>
          <UseCaseTabs />
        </Reveal>
      </Section>

      {/* 7. GAINS ATTENDUS */}
      <Section>
        <RevealGroup className="max-w-2xl mb-14">
          <RevealItem y={12} scale={false}>
            <Eyebrow>Bénéfices</Eyebrow>
          </RevealItem>
          <RevealItem className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight" scale>
            <h2>Des équipes mieux organisées, sans bouleverser leurs habitudes.</h2>
          </RevealItem>
        </RevealGroup>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((b) => {
            const tone = TONE_CLASSES[b.tone];
            return (
              <RevealItem
                key={b.title}
                style={{ "--glow": tone.glow } as CSSProperties}
                className="rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_var(--glow)]"
              >
                <IconPop className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${BOLD_TONE[b.tone]} text-white transition-transform duration-300 hover:scale-110 hover:rotate-6`}>
                  <b.icon size={19} />
                </IconPop>
                <p className="font-semibold text-ink mb-2">{b.title}</p>
                <p className="text-sm text-muted leading-relaxed">{b.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <p className="mt-8 text-xs text-muted text-center max-w-xl mx-auto">
          Des statistiques réelles issues de pilotes clients viendront prochainement illustrer ces bénéfices.
        </p>
      </Section>

      {/* CE QUE VOUS Y GAGNEZ CONCRÈTEMENT */}
      <Section className="!py-14">
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((h) => (
            <RevealItem key={h.title} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <h.icon size={17} />
              </span>
              <div>
                <p className="font-display font-bold text-ink text-sm">{h.title}</p>
                <p className="text-xs text-muted leading-relaxed mt-0.5">{h.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* CALCULATEUR DE TEMPS GAGNÉ */}
      <Section id="calculateur">
        <Reveal>
          <RoiCalculator />
        </Reveal>
      </Section>

      {/* 8. INTÉGRATIONS */}
      <Section surface>
        <RevealGroup className="text-center max-w-2xl mx-auto mb-10">
          <RevealItem className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight mb-4" scale>
            <h2>ImmoPilot s'intègre à votre environnement de travail.</h2>
          </RevealItem>
          <RevealItem className="text-muted leading-relaxed text-sm">
            <p>Les intégrations disponibles dépendent de la configuration et du projet de déploiement.</p>
          </RevealItem>
        </RevealGroup>
        <Reveal delay={0.1}>
          <IntegrationsConstellation />
        </Reveal>
        <div className="text-center mt-10">
          <Button href="/contact" variant="secondary">
            Parler de mon environnement logiciel
          </Button>
        </div>
      </Section>

      {/* 9. SÉCURITÉ */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal y={24}>
            <Eyebrow>Sécurité</Eyebrow>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight mb-6">
              Vos données immobilières méritent une protection à la hauteur de leur importance.
            </h2>
            <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8" stagger={0.06}>
              {SECURITY_POINTS.map((p) => (
                <RevealItem key={p.text} className="flex items-start gap-2.5 text-sm text-ink-soft" y={10}>
                  <p.icon size={16} className="mt-0.5 text-brand-600 shrink-0" />
                  {p.text}
                </RevealItem>
              ))}
            </RevealGroup>
            <Button href="/securite" variant="secondary">
              Découvrir notre approche de la sécurité
            </Button>
          </Reveal>
          <Reveal delay={0.15} y={24} className="relative overflow-hidden rounded-2xl bg-ink text-white p-8">
            <AmbientBackground tone="dark" grid={false} parallax />
            <div className="relative">
              <IconPop className="mb-4 inline-flex text-brand-300">
                <ShieldCheck size={28} />
              </IconPop>
              <p className="font-display font-bold text-xl mb-3">
                ImmoPilot assiste vos collaborateurs. Il ne remplace pas leur jugement.
              </p>
              <p className="text-white/75 text-sm leading-relaxed">
                Toutes les réponses, relances ou décisions importantes peuvent être contrôlées par un utilisateur avant
                envoi ou validation.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 10. TÉMOIGNAGES (emplacement à venir) */}
      <Section surface>
        <RevealGroup className="max-w-2xl mb-14">
          <RevealItem y={12} scale={false}>
            <Eyebrow>Retours terrain</Eyebrow>
          </RevealItem>
          <RevealItem className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight" scale>
            <h2>Les retours de nos premières agences pilotes.</h2>
          </RevealItem>
          <RevealItem className="mt-3 text-muted text-sm leading-relaxed">
            <p>
              Nos premiers déploiements pilotes sont en cours. Les témoignages ci-dessous seront remplacés par des retours
              réels dès qu'ils seront disponibles.
            </p>
          </RevealItem>
        </RevealGroup>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {["Objectif du pilote", "Résultat observé", "Retour de l'équipe"].map((label) => (
            <RevealItem key={label} className="rounded-2xl border border-dashed border-line bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">{label}</p>
              <p className="text-sm text-ink-soft leading-relaxed italic">
                Contenu à venir — sera complété à l'issue de la phase pilote en cours.
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* 11. DÉPLOIEMENT */}
      <Section>
        <RevealGroup className="max-w-2xl mb-14">
          <RevealItem y={12} scale={false}>
            <Eyebrow>Déploiement</Eyebrow>
          </RevealItem>
          <RevealItem className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight" scale>
            <h2>Un déploiement progressif, adapté à votre organisation.</h2>
          </RevealItem>
        </RevealGroup>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-4 gap-6 relative" stagger={0.12}>
          <ScrollDrawLine top="top-6" inset="left-[12%] right-[12%]" />
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

      {/* 12. TARIFICATION */}
      <Section surface id="tarifs">
        <RevealGroup className="text-center max-w-2xl mx-auto mb-14">
          <RevealItem className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight mb-4" scale>
            <h2>Une offre adaptée à la taille et aux besoins de votre agence.</h2>
          </RevealItem>
          <RevealItem className="text-muted text-sm">
            <p>Tarification établie selon le nombre d'utilisateurs, les fonctionnalités et le niveau d'intégration.</p>
          </RevealItem>
        </RevealGroup>
        <Reveal delay={0.1}>
          <PricingCards />
        </Reveal>
        <Reveal delay={0.15}>
          <div className="text-center mt-8">
            <Link href="/tarifs" className="text-sm font-semibold text-brand-600 inline-flex items-center gap-1">
              Voir le détail des formules et la FAQ tarifaire <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* 13. FAQ */}
      <Section>
        <RevealGroup className="max-w-2xl mb-14">
          <RevealItem y={12} scale={false}>
            <Eyebrow>Questions fréquentes</Eyebrow>
          </RevealItem>
          <RevealItem className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight" scale>
            <h2>Tout ce que les directions d'agence nous demandent.</h2>
          </RevealItem>
        </RevealGroup>
        <Reveal delay={0.1} className="max-w-3xl">
          <FaqAccordion items={GENERAL_FAQ} />
        </Reveal>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: GENERAL_FAQ.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      </Section>

      {/* 14. CTA FINAL */}
      <Section className="!py-0">
        <Reveal y={28}>
          <Spotlight dark className="relative overflow-hidden rounded-3xl bg-ink text-white px-8 py-16 md:py-20 text-center">
            <AmbientBackground tone="dark" parallax />
            <div className="relative">
              <RevealMask className="mb-5">
                <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight max-w-2xl mx-auto">
                  Et si votre agence retrouvait du temps pour ce qui compte vraiment ?
                </h2>
              </RevealMask>
              <p className="text-white/70 max-w-xl mx-auto mb-8">
                Découvrez comment ImmoPilot peut s'adapter à vos équipes, à vos outils et à vos processus actuels.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
                <Button href="/demande-demo" size="lg" className="!bg-white !text-ink hover:!bg-white/90">
                  Réserver une démonstration
                </Button>
                <Button href="/contact" variant="secondary" size="lg" className="!bg-transparent !text-white !border-white/25 hover:!bg-white/10">
                  Nous contacter
                </Button>
              </div>
              <p className="text-xs text-white/50">Démonstration personnalisée · Aucun engagement · Réponse sous un jour ouvré</p>
            </div>
          </Spotlight>
        </Reveal>
      </Section>
    </>
  );
}
