"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, Minimize2, RotateCcw, X, Presentation, Sparkles } from "lucide-react";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";

const STEPS = [
  {
    title: "Arrivée d'une demande",
    body: "Une demande locative arrive depuis un portail d'annonces : recherche d'un T2 à Clermont-Ferrand, budget 700 € CC, disponibilité rapide.",
    tag: "1. Réception",
  },
  {
    title: "Qualification automatique",
    body: "ImmoPilot analyse le message et identifie le type de bien, le budget, la localisation et le niveau d'urgence en quelques secondes.",
    tag: "2. Analyse",
  },
  {
    title: "Création de la fiche prospect",
    body: "Une fiche structurée est générée automatiquement, avec un score de qualification et les prochaines actions recommandées.",
    tag: "3. Fiche",
  },
  {
    title: "Préparation d'une réponse",
    body: "Une réponse personnalisée est préparée et présentée au collaborateur, prête à être vérifiée avant envoi.",
    tag: "4. Réponse",
  },
  {
    title: "Suivi par le tableau de bord",
    body: "Le responsable d'agence retrouve l'ensemble de l'activité — dossiers, visites, relances — dans une vue centralisée.",
    tag: "5. Pilotage",
  },
];

export function PresentationMode() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true);
          setStep(0);
        }}
        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-surface hover:text-ink transition-colors w-full"
      >
        <Presentation size={16} /> Mode présentation
      </button>
    );
  }

  const current = STEPS[step];

  return (
    <div className={`fixed inset-0 z-50 bg-ink text-white flex flex-col overflow-hidden ${fullscreen ? "" : "p-4 sm:p-8"}`}>
      <AmbientBackground tone="dark" />
      <div className="relative flex items-center justify-between mb-8">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles size={16} className="text-brand-300" /> ImmoPilot — Mode présentation
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep(0)}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
            aria-label="Recommencer"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setFullscreen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
            aria-label="Plein écran"
          >
            {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
            aria-label="Quitter la présentation"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
        <span className="text-xs font-semibold text-brand-300 mb-4">{current.tag}</span>
        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-5">{current.title}</h2>
        <p className="text-white/70 leading-relaxed">{current.body}</p>
      </div>

      <div className="relative flex items-center justify-between mt-8">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1.5 text-sm font-medium disabled:opacity-30"
        >
          <ArrowLeft size={15} /> Précédent
        </button>

        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-white" : "w-1.5 bg-white/30"}`} />
          ))}
        </div>

        {step === STEPS.length - 1 ? (
          <button onClick={() => setOpen(false)} className="flex items-center gap-1.5 text-sm font-semibold text-white">
            Terminer <X size={15} />
          </button>
        ) : (
          <button
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            className="flex items-center gap-1.5 text-sm font-medium"
          >
            Suivant <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
