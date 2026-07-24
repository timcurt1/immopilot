"use client";

import { useMemo, useState } from "react";
import { Clock, Info } from "lucide-react";
import { Button } from "./Button";

export function RoiCalculator() {
  const [demandes, setDemandes] = useState(25);
  const [minutes, setMinutes] = useState(12);
  const [part, setPart] = useState(30);

  const { weekly, monthly } = useMemo(() => {
    const weeklyMinutes = demandes * minutes * (part / 100);
    const weeklyHours = weeklyMinutes / 60;
    return { weekly: weeklyHours, monthly: weeklyHours * 4.33 };
  }, [demandes, minutes, part]);

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
              label="Demandes traitées par semaine"
              value={demandes}
              min={5}
              max={100}
              step={1}
              suffix=""
              onChange={setDemandes}
            />
            <SliderField
              label="Temps moyen sur les tâches répétitives par demande"
              value={minutes}
              min={5}
              max={30}
              step={1}
              suffix=" min"
              onChange={setMinutes}
            />
            <SliderField
              label="Part de ce temps que vous estimez automatisable"
              value={part}
              min={10}
              max={60}
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
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(closest-side, rgba(53,87,255,0.6), transparent)" }}
            aria-hidden="true"
          />
          <div className="relative">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 mb-5">
              <Clock size={20} />
            </span>
            <p className="text-sm text-white/60 mb-1">Temps estimé regagné</p>
            <p className="font-display font-extrabold text-5xl tracking-tight tabular-nums">
              {weekly < 1 ? Math.round(weekly * 60) : weekly.toFixed(1)}
              <span className="text-xl font-semibold text-white/60 ml-2">{weekly < 1 ? "min / sem." : "h / semaine"}</span>
            </p>
            <p className="mt-2 text-sm text-white/60">
              soit environ <span className="text-white font-semibold">{Math.round(monthly)} heures par mois</span>
            </p>
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
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-sm font-medium text-ink-soft">{label}</label>
        <span className="text-sm font-bold text-ink tabular-nums">
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
