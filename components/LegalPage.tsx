import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { CookieNotice } from "@/components/marketing/CookieNotice";

export function LegalPage({ title, path, children }: { title: string; path?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <PageHero eyebrow="Légal" path={path} title={title} />
        <Section className="!pt-0 !pb-24">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start gap-3 rounded-xl bg-warning-soft border border-amber-200 p-4 mb-10">
              <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-900">Modèle à faire relire par un professionnel du droit</p>
                <p className="text-sm text-amber-800/80 mt-1 leading-relaxed">
                  Ce texte est un point de départ générique, pas un document juridique validé. Vu la nature des
                  données traitées (revenus, pièces d'identité, situation locative), faites-le relire avant toute
                  mise en ligne réelle, et remplacez les champs entre crochets par les informations exactes de votre
                  société.
                </p>
              </div>
            </div>
            <div className="text-[15px] text-ink-soft leading-relaxed [&>p]:mb-5 [&_b]:text-ink [&_b]:font-semibold">
              {children}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
      <CookieNotice />
    </div>
  );
}
