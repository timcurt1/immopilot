import { Building2, Palette, ListChecks, Users2 } from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";

const TEAM = [
  { name: "Léa Bonnet", role: "Responsable location" },
  { name: "Karim Aziz", role: "Négociateur transaction" },
  { name: "Nadia Fontaine", role: "Gestionnaire locative" },
];

const STATUSES = ["Nouveau", "Qualifié", "À relancer", "Dossier en cours", "Prêt à valider", "Signé"];

export default function DemoParametresPage() {
  return (
    <>
      <DemoPageHeader title="Paramètres" description="Configuration de l'agence pour cette démonstration" />
      <div className="px-6 md:px-8 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={16} className="text-brand-600" />
            <p className="font-semibold text-ink text-sm">Agence</p>
          </div>
          <dl className="grid gap-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Nom</dt><dd className="text-ink font-medium">Bellevue Immobilier</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Activité principale</dt><dd className="text-ink font-medium">Location, Transaction</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Ville</dt><dd className="text-ink font-medium">Clermont-Ferrand</dd></div>
          </dl>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users2 size={16} className="text-brand-600" />
            <p className="font-semibold text-ink text-sm">Utilisateurs et droits</p>
          </div>
          <ul className="grid gap-3">
            {TEAM.map((t) => (
              <li key={t.name} className="flex items-center justify-between text-sm">
                <span className="text-ink">{t.name}</span>
                <span className="text-muted">{t.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks size={16} className="text-brand-600" />
            <p className="font-semibold text-ink text-sm">Statuts de suivi</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <span key={s} className="rounded-full bg-surface border border-line px-3 py-1.5 text-xs font-medium text-ink-soft">
                {s}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted mt-4">Ces statuts sont personnalisables selon les pratiques de votre agence.</p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette size={16} className="text-brand-600" />
            <p className="font-semibold text-ink text-sm">Personnalisation</p>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            Modèles de messages, règles de priorité et étapes de suivi peuvent être ajustés lors du déploiement pour
            correspondre aux méthodes de votre agence ou de votre réseau.
          </p>
        </div>
      </div>
    </>
  );
}
