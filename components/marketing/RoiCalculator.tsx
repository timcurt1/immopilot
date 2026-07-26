"use client";

import { useMemo, useState } from "react";
import { Sparkles, Info, TrendingUp } from "lucide-react";
import { Button } from "./Button";
import { CountUp } from "./CountUp";

const FULL_TIME_WEEK_HOURS = 35;
const WORKDAY_HOURS = 7;

export function RoiCalculator() {
  const [collaborateurs, setCollaborateurs] = useState(6);
  const [heuresRepetitives, setHeuresRepetitives] = useState(9);
  const [part, setPart] = useState(50);

  const { weekly, monthly, annual, days, fte } = useMemo(() => {
    const weeklyHours = collaborateurs * heuresRepetitives * (part / 100);
    return {
      weekly: weeklyHours,
      monthly: weeklyHours * 4.33,
      annual: weeklyHours * 52,
      days: (weeklyHours * 4.33) / WORKDAY_HOURS,
      fte: weeklyHours / FULL_TIME_WEEK_HOURS,
    };
  }, [collaborateurs, heuresRepetitives, part]);

  const punchline = useMemo(() => {
    if (fte >= 1.4) return `Plus de ${fte.toFixed(1)} postes à temps plein libérés pour votre équipe.`;
    if (fte >= 0.6) return "Près d'un collaborateur à temps plein rendu à votre équipe.";
    if (fte >= 0.25) return "Un temps précieux redonné à votre équipe, chaque semaine.";
    return "Quelques heures reconquises, semaine après semaine.";
  }, [fte]);

  return (
    <div className="rounded-3xl border border-line bg-white overflow-hidden">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-2">Estimation personnalisée</p>
          <h3 className="font-display font-bold text-2xl text-ink tracking-tight mb-6">
            Combien de temps votre équipe pourrait-elle regagner ?
          </h3>

          <div className="grid gap-7">
            <SliderField
              label="Nombre de collaborateurs"
              value={collaborateurs}
              min={1}
              max={30}
              step={1}
              suffix=""
              onChange={setCollaborateurs}
            />
            <SliderField
              label="Heures hebdomadaires passées sur des tâches répétitives, par collaborateur"
              value={heuresRepetitives}
              min={2}
              max={20}
              step={1}
              suffix=" h"
              onChange={setHeuresRepetitives}
            />
            <SliderField
              label="Part de ce temps que vous estimez automatisable avec ImmoPilot"
              value={part}
              min={20}
              max={70}
              step={5}
              suffix=" %"
              onChange={setPart}
            />
          </div>

          <p className="mt-7 flex items-start gap-2 text-xs text-muted leading-relaxed">
            <Info size={14} className="mt-0.5 shrink-0" />
            Estimation calculée à partir des valeurs que vous renseignez ci-dessus, fournie à titre indicatif. Elle
            sera affinée avec votre équipe lors d'une démonstration personnalisée.
          </p>
        </div>

        <div className="relative bg-ink text-white p-8 md:p-10 flex flex-col justify-center overflow-hidden">
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full blur-3xl opacity-50 animate-pulse-soft"
            style={{ background: "radial-gradient(closest-side, rgba(53,87,255,0.7), transparent)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.6), transparent)" }}
            aria-hidden="true"
          />
          <div className="relative">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 mb-5">
              <Sparkles size={20} className="text-brand-300" />
            </span>
            <p className="text-sm text-white/60 mb-1">Temps estimé regagné par votre équipe</p>
            <p className="font-display font-extrabold text-6xl md:text-7xl tracking-tight tabular-nums bg-gradient-to-r from-white to-brand-200 bg-clip-text text-transparent">
              <CountUp value={Math.round(weekly)} />
              <span className="text-2xl font-semibold text-white/60 ml-2">h / semaine</span>
            </p>
            <p className="mt-2 text-sm text-white/60">
              soit environ <span className="text-white font-semibold">{Math.round(monthly)} heures par mois</span>{" "}
              — <span className="text-white font-semibold">{Math.round(annual)} heures par an</span>
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white/10 border border-white/10 px-4 py-3.5">
              <TrendingUp size={18} className="mt-0.5 shrink-0 text-brand-300" />
              <div>
                <p className="font-display font-bold text-lg leading-tight">
                  <CountUp value={Math.round(days)} className="tabular-nums" /> journées de travail retrouvées
                  chaque mois
                </p>
                <p className="mt-1 text-xs text-white/60 leading-relaxed">{punchline}</p>
              </div>
            </div>

            <Button href="/demande-demo" size="md" className="!bg-white !text-ink hover:!bg-white/90 mt-7">
              Discuter de cette estimation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5 gap-4">
        <label className="text-sm font-medium text-ink-soft">{label}</label>
        <span className="text-sm font-bold text-ink tabular-nums shrink-0">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#1d43e6] h-1.5 cursor-pointer"
        aria-label={label}
      />
    </div>
  );
}
