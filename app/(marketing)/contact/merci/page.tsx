import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/marketing/Section";
import { Button } from "@/components/marketing/Button";
import { Confetti } from "@/components/marketing/Confetti";

export const metadata: Metadata = { title: "Message envoyé" };

export default function ContactMerciPage() {
  return (
    <Section className="!py-28 text-center">
      <Confetti />
      <div className="max-w-md mx-auto">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-positive-soft text-green-600 mb-6">
          <CheckCircle2 size={28} />
        </span>
        <h1 className="font-display font-bold text-3xl text-ink tracking-tight mb-3">Votre message a bien été transmis.</h1>
        <p className="text-muted leading-relaxed mb-8">Notre équipe vous répond généralement sous un jour ouvré.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/demo">Découvrir la démo</Button>
          <Button href="/ressources" variant="secondary">Voir les ressources</Button>
        </div>
      </div>
    </Section>
  );
}
