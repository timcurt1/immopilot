"use client";

import { useState } from "react";
import { Check, RotateCcw, Sparkles } from "lucide-react";
import { PRICING_PLANS, type PricingPlanId } from "@/lib/marketingContent";
import { Button } from "./Button";

type Scores = Record<PricingPlanId, number>;

const QUESTIONS: {
  question: string;
  options: { label: string; scores: Partial<Scores> }[];
}[] = [
  {
    question: "Combien de collaborateurs utiliseront ImmoPilot ?",
    options: [
      { label: "1 à 3", scores: { essentiel: 2 } },
      { label: "4 à 15", scores: { agence: 2 } },
      { label: "Plus de 15", scores: { reseau: 2 } },
    ],
  },
  {
    question: "Combien d'agences sont concernées ?",
    options: [
      { label: "Une seule agence", scores: { essentiel: 1, agence: 1 } },
      { label: "Plusieurs agences indépendantes", scores: { agence: 2 } },
      { label: "Un réseau ou une franchise", scores: { reseau: 3 } },
    ],
  },
  {
    question: "Quel est votre besoin principal aujourd'hui ?",
    options: [
      { label: "Centraliser mes prospects et structurer le suivi", scores: { essentiel: 2 } },
      { label: "Automatiser la qualification, les relances et les visites", scores: { agence: 2 } },
      { label: "Piloter plusieurs agences avec droits et reporting consolidé", scores: { reseau: 2 } },
    ],
  },
];

function computeResult(scores: Scores): PricingPlanId {
  const entries = Object.entries(scores) as [PricingPlanId, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][1] > 0 ? entries[0][0] : "agence";
}

export function PricingQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({ essentiel: 0, agence: 0, reseau: 0 });
  const [result, setResult] = useState<PricingPlanId | null>(null);

  function answer(optionScores: Partial<Scores>) {
    const next: Scores = { ...scores };
    for (const key of Object.keys(optionScores) as PricingPlanId[]) {
      next[key] += optionScores[key] ?? 0;
    }
    setScores(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setResult(computeResult(next));
    }
  }

  function reset() {
    setStep(0);
    setScores({ essentiel: 0, agence: 0, reseau: 0 });
    setResult(null);
  }

  if (result) {
    const plan = PRICING_PLANS[result];
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-700 px-3.5 py-1.5 text-xs font-semibold mb-4">
          <Sparkles size={13} /> Formule recommandée
        </span>
        <p className="font-display font-bold text-2xl text-ink tracking-tight">{plan.label}</p>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">{plan.tagline}</p>
        <ul className="mt-5 grid gap-2 max-w-xs mx-auto text-left">
          {plan.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
              <Check size={15} className="mt-0.5 text-brand-600 shrink-0" /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href={plan.ctaHref} size="md">
            {plan.cta}
          </Button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink transition-colors"
          >
            <RotateCcw size={14} /> Recommencer
          </button>
        </div>
      </div>
    );
  }

  const current = QUESTIONS[step];

  return (
    <div className="rounded-2xl border border-line bg-white p-8">
      <div className="flex items-center gap-1.5 mb-6">
        {QUESTIONS.map((_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-brand-500" : "bg-line"}`} />
        ))}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
        Question {step + 1} / {QUESTIONS.length}
      </p>
      <p className="font-display font-bold text-xl text-ink tracking-tight mb-5">{current.question}</p>
      <div className="grid gap-2.5">
        {current.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => answer(opt.scores)}
            className="text-left rounded-xl border border-line bg-white px-4 py-3.5 text-sm font-medium text-ink-soft hover:border-brand-300 hover:bg-brand-50/40 hover:text-ink transition-colors"
          >
            {opt.label}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-5 text-xs font-semibold text-muted hover:text-ink transition-colors"
        >
          ← Question précédente
        </button>
      )}
    </div>
  );
}
