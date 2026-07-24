import type { Metadata } from "next";
import { CheckCircle2, Calendar, PlayCircle, BookOpen } from "lucide-react";
import { Section } from "@/components/marketing/Section";
import { Button } from "@/components/marketing/Button";

export const metadata: Metadata = { title: "Demande envoyée" };

export default function DemandeDemoMerciPage() {
  return (
    <Section className="!py-28 text-center">
      <div className="max-w-lg mx-auto">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-positive-soft text-green-600 mb-6">
          <CheckCircle2 size={28} />
        </span>
        <h1 className="font-display font-bold text-3xl text-ink tracking-tight mb-3">Votre demande a bien été transmise.</h1>
        <p className="text-muted leading-relaxed mb-10">
          Notre équipe revient vers vous sous un jour ouvré pour organiser votre démonstration personnalisée.
        </p>

        <div className="grid gap-3 text-left mb-10">
          <div className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
            <Calendar size={18} className="text-brand-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink text-sm">Un créneau vous conviendra mieux ?</p>
              <p className="text-sm text-muted">Précisez vos disponibilités par retour d'e-mail dès réception de notre message.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/demo">
            <PlayCircle size={16} /> Découvrir la démo interactive
          </Button>
          <Button href="/ressources" variant="secondary">
            <BookOpen size={16} /> Voir les ressources
          </Button>
        </div>
      </div>
    </Section>
  );
}
