import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, FileSearch, Users, Sparkles, ClipboardCheck, FileText, Mail, PenLine,
  CheckCircle2, Calendar, ListChecks, Search, BarChart3, Settings, ShieldCheck, UserCog,
} from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { Reveal } from "@/components/marketing/Reveal";
import { Badge } from "@/components/marketing/Badge";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Tableau de bord, qualification des prospects, fiche intelligente, assistant conversationnel, relances, comptes rendus : découvrez toutes les fonctionnalités d'ImmoPilot.",
};

type Feature = {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  example: string;
  control: string;
};

const FEATURES: Feature[] = [
  {
    id: "tableau-de-bord",
    icon: LayoutDashboard,
    title: "Tableau de bord",
    body: "Une vue quotidienne de l'activité de l'agence : nouveaux prospects, demandes à traiter, visites du jour, dossiers incomplets et relances recommandées.",
    example: "Le matin, un collaborateur ouvre ImmoPilot et retrouve immédiatement ses trois priorités du jour, classées par urgence.",
    control: "Le tableau de bord informe et priorise, il ne déclenche aucune action seul.",
  },
  {
    id: "qualification",
    icon: FileSearch,
    title: "Qualification automatique des prospects",
    body: "ImmoPilot analyse chaque demande entrante et identifie le besoin, le type de bien, le budget, la localisation et le niveau de maturité du contact.",
    example: "Un e-mail décrivant une recherche de T2 à Clermont-Ferrand avec un budget de 700 € est automatiquement structuré en fiche exploitable.",
    control: "La qualification est proposée avec un score ; le collaborateur peut la corriger avant de l'enregistrer.",
  },
  {
    id: "fiche-prospect",
    icon: Users,
    title: "Fiche prospect intelligente",
    body: "Chaque contact dispose d'une fiche structurée regroupant ses critères, ses échanges, ses documents, son historique et les prochaines actions recommandées.",
    example: "En un coup d'œil, un collaborateur retrouve tout l'historique d'un candidat avant de le rappeler.",
    control: "Les informations affichées sont éditables à tout moment par un utilisateur autorisé.",
  },
  {
    id: "assistant",
    icon: Sparkles,
    title: "Assistant conversationnel",
    body: "Les équipes peuvent interroger ImmoPilot en langage naturel pour retrouver une information, préparer une réponse ou comprendre une situation.",
    example: "« Quels prospects dois-je relancer aujourd'hui ? » renvoie une liste priorisée avec le contexte de chaque dossier.",
    control: "L'assistant propose des réponses ; il ne les envoie jamais sans validation explicite.",
  },
  {
    id: "synthese",
    icon: ClipboardCheck,
    title: "Synthèse des dossiers",
    body: "Le logiciel résume les informations importantes d'un dossier et signale les pièces manquantes ou incohérentes.",
    example: "Un dossier locatif incomplet est signalé avec la liste précise des pièces encore attendues.",
    control: "La synthèse est un support de lecture ; la décision finale reste au collaborateur.",
  },
  {
    id: "traitement-documentaire",
    icon: FileText,
    title: "Traitement documentaire",
    body: "Les documents transmis par un candidat ou un client sont classés et rapprochés automatiquement du bon dossier.",
    example: "Un avis d'imposition reçu par e-mail est associé au dossier du bon candidat sans ressaisie.",
    control: "Le classement automatique reste consultable et modifiable à tout moment.",
  },
  {
    id: "relances",
    icon: Mail,
    title: "Relances assistées",
    body: "ImmoPilot détecte les prospects sans réponse et propose des relances personnalisées, prêtes à être vérifiées et envoyées.",
    example: "Un candidat sans réponse depuis 3 jours déclenche une suggestion de relance adaptée à son profil.",
    control: "Chaque relance doit être approuvée par un collaborateur avant l'envoi.",
  },
  {
    id: "redaction",
    icon: PenLine,
    title: "Rédaction assistée",
    body: "Le logiciel prépare des réponses et des messages types adaptés au contexte de chaque échange.",
    example: "Une demande de documents manquants est rédigée automatiquement, prête à être relue et envoyée.",
    control: "Chaque message reste modifiable avant envoi.",
  },
  {
    id: "comptes-rendus",
    icon: CheckCircle2,
    title: "Compte rendu de visite",
    body: "Après une visite, ImmoPilot transforme les notes du collaborateur en compte rendu clair et exploitable.",
    example: "Quelques notes rapides après une visite deviennent un compte rendu structuré, prêt à partager en interne.",
    control: "Le compte rendu généré peut être édité avant d'être enregistré dans le dossier.",
  },
  {
    id: "visites",
    icon: Calendar,
    title: "Préparation des visites",
    body: "Le collaborateur retrouve les informations sur le bien, le client, ses critères et les éléments à vérifier pendant la visite.",
    example: "Avant un rendez-vous, ImmoPilot rassemble le résumé du prospect, l'historique des échanges et les points à vérifier.",
    control: "La fiche de préparation est un support ; le collaborateur garde la conduite de la visite.",
  },
  {
    id: "taches",
    icon: ListChecks,
    title: "Tâches et rappels",
    body: "Les actions à mener sont centralisées, priorisées et assignées, pour ne laisser aucun dossier sans suite.",
    example: "Une échéance de relance approchant est automatiquement remontée dans les tâches du jour.",
    control: "Les tâches sont des recommandations ; elles peuvent être réassignées ou reportées librement.",
  },
  {
    id: "recherche",
    icon: Search,
    title: "Moteur de recherche",
    body: "Une recherche globale permet de retrouver un prospect, un bien ou un dossier en quelques secondes.",
    example: "Rechercher « Clermont-Ferrand T2 » retrouve instantanément les candidats et les biens correspondants.",
    control: "—",
  },
  {
    id: "pilotage",
    icon: BarChart3,
    title: "Pilotage de l'agence",
    body: "Le responsable visualise l'activité, les délais de traitement, les demandes en attente et les opportunités nécessitant une action.",
    example: "Un directeur d'agence identifie en un coup d'œil les dossiers bloqués depuis plus de 48 heures.",
    control: "Les indicateurs sont informatifs ; ils ne déclenchent aucune action automatique sur les équipes.",
  },
  {
    id: "administration",
    icon: Settings,
    title: "Administration",
    body: "Paramétrez les statuts, modèles de messages, règles de priorité et étapes de suivi selon les pratiques de votre agence.",
    example: "Une agence adapte les statuts de suivi locatif à sa propre terminologie interne.",
    control: "Seuls les utilisateurs autorisés peuvent modifier la configuration de l'organisation.",
  },
  {
    id: "utilisateurs",
    icon: UserCog,
    title: "Gestion des utilisateurs et des droits",
    body: "Chaque collaborateur dispose d'un accès adapté à son rôle : négociateur, gestionnaire ou responsable d'agence.",
    example: "Un nouveau collaborateur reçoit automatiquement les droits correspondant à son poste.",
    control: "Les droits sont définis et modifiables par les administrateurs de l'organisation.",
  },
  {
    id: "personnalisation",
    icon: ShieldCheck,
    title: "Personnalisation et intégrations",
    body: "Statuts, priorités, modèles et règles peuvent être configurés selon l'organisation. Les intégrations disponibles dépendent du projet de déploiement.",
    example: "Un réseau multi-agences aligne les statuts et modèles de messages sur ses propres méthodes.",
    control: "Toute intégration externe est étudiée et validée avant activation.",
  },
];

export default function FonctionnalitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Fonctionnalités"
        title="Un copilote pour chaque moment de la journée."
        description="Du premier contact jusqu'au pilotage de l'agence, chaque fonctionnalité est pensée pour rester sous le contrôle des équipes."
      />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-[220px_1fr] gap-12">
          <nav className="hidden lg:block sticky top-24 self-start" aria-label="Sommaire des fonctionnalités">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">Sommaire</p>
            <ul className="grid gap-1 text-sm">
              {FEATURES.map((f) => (
                <li key={f.id}>
                  <a href={`#${f.id}`} className="block py-1.5 text-ink-soft hover:text-brand-600 transition-colors">
                    {f.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-16">
            {FEATURES.map((f) => (
              <Reveal key={f.id}>
                <section id={f.id} className="scroll-mt-24 grid md:grid-cols-[auto_1fr] gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 shrink-0">
                    <f.icon size={22} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl text-ink tracking-tight mb-3">{f.title}</h2>
                    <p className="text-ink-soft leading-relaxed mb-4">{f.body}</p>
                    <div className="rounded-xl bg-surface border border-line p-4 mb-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">Exemple</p>
                      <p className="text-sm text-ink-soft leading-relaxed">{f.example}</p>
                    </div>
                    {f.control !== "—" && (
                      <div className="flex items-start gap-2 text-xs text-muted">
                        <Badge tone="neutral">Contrôle humain</Badge>
                        <p className="pt-1.5">{f.control}</p>
                      </div>
                    )}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
