import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { DemandeDemoTabs } from "@/components/marketing/DemandeDemoTabs";

export const metadata: Metadata = {
  title: "Demande de démonstration",
  description: "Réservez une démonstration personnalisée d'ImmoPilot, adaptée aux tâches et à l'environnement de votre agence.",
};

export default function DemandeDemoPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <>
      <PageHero
        eyebrow="Démonstration"
        path="/demande-demo"
        title="Découvrez ImmoPilot dans le contexte de votre agence."
        description="Réservez directement un créneau, ou laissez-nous vos coordonnées si vous préférez qu'on vous recontacte."
      />

      <Section className="!pt-0 !pb-24">
        <Reveal>
          <DemandeDemoTabs hasError={Boolean(searchParams.error)} />
        </Reveal>
      </Section>
    </>
  );
}
