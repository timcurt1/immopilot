import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { submitDemoRequest } from "@/lib/marketingActions";

export const metadata: Metadata = {
  title: "Demande de démonstration",
  description: "Réservez une démonstration personnalisée d'ImmoPilot, adaptée aux tâches et à l'environnement de votre agence.",
};

const ACTIVITIES = ["Location", "Transaction", "Gestion locative", "Syndic", "Immobilier d'entreprise", "Réseau multi-agences", "Autre"];
const CHALLENGES = [
  "Trop de demandes à traiter", "Suivi des prospects", "Relances", "Gestion des dossiers",
  "Préparation des visites", "Comptes rendus", "Centralisation des informations", "Reporting",
  "Intégration des outils", "Autre",
];
const TIMELINES = ["Dès que possible", "Dans le trimestre", "Dans les 6 mois", "Je m'informe pour l'instant"];

export default function DemandeDemoPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <>
      <PageHero
        eyebrow="Démonstration"
        path="/demande-demo"
        title="Découvrez ImmoPilot dans le contexte de votre agence."
        description="Pendant cette démonstration, nous étudierons vos principales tâches répétitives, votre environnement logiciel et les fonctionnalités les plus pertinentes pour votre équipe."
      />

      <Section className="!pt-0 !pb-24">
        <Reveal>
          <form action={submitDemoRequest} className="max-w-2xl mx-auto rounded-2xl border border-line bg-white p-8 grid gap-5">
            {searchParams.error && (
              <p className="text-sm text-red-600 bg-danger-soft rounded-lg px-3 py-2">
                Merci de renseigner tous les champs obligatoires et d'accepter d'être recontacté·e.
              </p>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Prénom" name="firstName" required />
              <Field label="Nom" name="lastName" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="E-mail professionnel" name="email" type="email" required />
              <Field label="Téléphone" name="phone" type="tel" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Fonction" name="role" />
              <Field label="Nom de l'entreprise" name="company" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nombre d'agences" name="agencyCount" type="number" />
              <Field label="Nombre de collaborateurs" name="teamSize" type="number" />
            </div>

            <SelectField label="Activité principale" name="activity" options={ACTIVITIES} />
            <Field label="Logiciel métier actuellement utilisé" name="software" />
            <SelectField label="Problématique principale" name="challenge" options={CHALLENGES} />
            <SelectField label="Délai envisagé" name="timeline" options={TIMELINES} />

            <label className="flex items-start gap-2.5 text-sm text-ink-soft">
              <input type="checkbox" name="consent" required className="mt-1" />
              J'accepte d'être recontacté·e par l'équipe ImmoPilot au sujet de ma demande. *
            </label>

            <button
              type="submit"
              className="h-12 rounded-xl bg-ink text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
            >
              Demander ma démonstration
            </button>
          </form>
        </Reveal>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold text-ink mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full h-11 rounded-xl border border-line px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold text-ink mb-1.5">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full h-11 rounded-xl border border-line px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white"
      >
        <option value="" disabled>
          Sélectionner…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
