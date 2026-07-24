import type { Metadata } from "next";
import {
  Database, Server, Lock, KeyRound, History, UserCog, HardDriveDownload, ActivitySquare,
  CalendarClock, Download, ShieldCheck, Building2, BrainCircuit, UserCheck, FileText, Flag,
} from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { Section, Eyebrow } from "@/components/marketing/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/Reveal";
import { Button } from "@/components/marketing/Button";

export const metadata: Metadata = {
  title: "Sécurité",
  description:
    "Gouvernance des données, chiffrement, gestion des accès, RGPD, validation humaine : découvrez l'approche sécurité d'ImmoPilot.",
};

const NOTE = "Information disponible dans le cadre de l'étude de déploiement.";

const TOPICS = [
  { icon: Database, title: "Gouvernance des données", body: "Chaque organisation reste propriétaire de ses données. Leur usage est limité au fonctionnement du service." },
  { icon: Server, title: "Hébergement", body: "Hébergement européen privilégié lorsque le projet de déploiement le permet." },
  { icon: Lock, title: "Chiffrement", body: "Les échanges entre les utilisateurs et la plateforme sont chiffrés." },
  { icon: KeyRound, title: "Gestion des accès", body: "Chaque collaborateur dispose d'un accès limité à son rôle et à son périmètre." },
  { icon: History, title: "Journalisation", body: "Les actions importantes réalisées dans la plateforme sont tracées." },
  { icon: UserCog, title: "Droits utilisateurs", body: "Les administrateurs de l'organisation définissent et modifient les droits des collaborateurs." },
  { icon: HardDriveDownload, title: "Sauvegardes", body: "Des sauvegardes régulières limitent le risque de perte de données." },
  { icon: ActivitySquare, title: "Continuité de service", body: NOTE },
  { icon: CalendarClock, title: "Politique de conservation", body: NOTE },
  { icon: Download, title: "Export et suppression", body: "Les données d'une organisation peuvent être exportées ou supprimées à sa demande." },
  { icon: ShieldCheck, title: "RGPD", body: "Le produit est conçu selon les principes du RGPD : limitation des données, contrôle des accès, traçabilité." },
  { icon: Building2, title: "Sous-traitants", body: NOTE },
];

export default function SecuritePage() {
  return (
    <>
      <PageHero
        eyebrow="Sécurité"
        title="Vos données restent sous votre contrôle."
        description="Une approche sérieuse de la sécurité, pensée pour rassurer les directions d'agence et les équipes techniques."
      />

      <Section className="!pt-0">
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOPICS.map((t) => (
            <RevealItem key={t.title} className="rounded-2xl border border-line bg-white p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <t.icon size={19} />
              </div>
              <p className="font-semibold text-ink mb-2">{t.title}</p>
              <p className="text-sm text-muted leading-relaxed">{t.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section surface>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white mb-5">
              <BrainCircuit size={20} />
            </div>
            <Eyebrow>Intelligence artificielle responsable</Eyebrow>
            <h2 className="font-display font-bold text-3xl text-ink tracking-tight mb-4">
              Les données de votre organisation n'entraînent aucun modèle public.
            </h2>
            <p className="text-muted leading-relaxed">
              Les données d'une organisation ne sont pas utilisées pour entraîner un modèle public sans consentement
              explicite. Elles servent uniquement au fonctionnement du service pour cette organisation.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-ink text-white p-8">
              <UserCheck size={26} className="mb-4 text-brand-300" />
              <p className="font-display font-bold text-xl mb-3">
                ImmoPilot assiste vos collaborateurs. Il ne remplace pas leur jugement.
              </p>
              <p className="text-white/75 text-sm leading-relaxed">
                Toutes les réponses, relances ou décisions importantes peuvent être contrôlées par un utilisateur avant
                envoi ou validation. Aucune action externe n'est irréversible sans intervention humaine.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="!pb-24">
        <div className="grid sm:grid-cols-2 gap-5">
          <Reveal>
            <div className="rounded-2xl border border-line bg-white p-6 h-full">
              <FileText size={20} className="text-brand-600 mb-3" />
              <p className="font-semibold text-ink mb-2">Documentation de sécurité</p>
              <p className="text-sm text-muted leading-relaxed">{NOTE}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-line bg-white p-6 h-full">
              <Flag size={20} className="text-brand-600 mb-3" />
              <p className="font-semibold text-ink mb-2">Procédure de signalement</p>
              <p className="text-sm text-muted leading-relaxed">
                Toute question ou signalement lié à la sécurité peut être adressé directement à notre équipe via la
                page contact.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="text-center mt-10">
          <Button href="/contact">Contacter notre équipe sécurité</Button>
        </div>
      </Section>
    </>
  );
}
