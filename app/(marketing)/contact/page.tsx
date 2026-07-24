import type { Metadata } from "next";
import { Mail, MessageSquare, ShieldAlert } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { submitContact } from "@/lib/marketingActions";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur ImmoPilot, votre projet ou votre environnement logiciel ? Contactez notre équipe.",
};

export default function ContactPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <>
      <PageHero eyebrow="Contact" path="/contact" title="Parlons de votre agence." description="Une question, un projet de déploiement ou votre environnement logiciel : notre équipe vous répond sous un jour ouvré." />

      <Section className="!pt-0 !pb-24">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 max-w-4xl mx-auto">
          <Reveal>
            <div className="grid gap-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 shrink-0">
                  <MessageSquare size={18} />
                </span>
                <div>
                  <p className="font-semibold text-ink text-sm">Un projet de déploiement</p>
                  <p className="text-sm text-muted">Parlez-nous de votre agence ou de votre réseau.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 shrink-0">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="font-semibold text-ink text-sm">Une question générale</p>
                  <p className="text-sm text-muted">Fonctionnement, sécurité, intégrations : nous répondons à toutes vos questions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 shrink-0">
                  <ShieldAlert size={18} />
                </span>
                <div>
                  <p className="font-semibold text-ink text-sm">Un signalement de sécurité</p>
                  <p className="text-sm text-muted">Utilisez ce formulaire en précisant l'objet de votre message.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form action={submitContact} className="rounded-2xl border border-line bg-white p-7 grid gap-4">
              {searchParams.error && (
                <p className="text-sm text-red-600 bg-danger-soft rounded-lg px-3 py-2">
                  Merci de renseigner tous les champs obligatoires.
                </p>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Prénom" name="firstName" required />
                <Field label="Nom" name="lastName" required />
              </div>
              <Field label="E-mail" name="email" type="email" required />
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-ink mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <button
                type="submit"
                className="h-11 rounded-xl bg-ink text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
              >
                Envoyer le message
              </button>
            </form>
          </Reveal>
        </div>
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
