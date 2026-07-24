import { Check } from "lucide-react";
import { PLAN_ORDER, PRICING_PLANS } from "@/lib/marketingContent";
import { Button } from "./Button";

export function PricingCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 items-stretch">
      {PLAN_ORDER.map((id) => {
        const plan = PRICING_PLANS[id];
        return (
          <div
            key={id}
            className={`rounded-2xl border p-7 flex flex-col ${
              plan.highlighted ? "border-ink bg-ink text-white shadow-[0_30px_80px_rgba(11,18,32,0.25)] md:-translate-y-3" : "border-line bg-white"
            }`}
          >
            {plan.highlighted && (
              <span className="mb-4 inline-flex w-max rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                Le plus choisi
              </span>
            )}
            <p className={`font-display font-bold text-xl mb-2 ${plan.highlighted ? "text-white" : "text-ink"}`}>
              {plan.label}
            </p>
            <p className={`text-sm leading-relaxed mb-6 ${plan.highlighted ? "text-white/75" : "text-muted"}`}>
              {plan.tagline}
            </p>
            <ul className="grid gap-2.5 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.highlighted ? "text-white/90" : "text-ink-soft"}`}>
                  <Check size={16} className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-white" : "text-brand-600"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              href={plan.ctaHref}
              variant={plan.highlighted ? "secondary" : "primary"}
              size="md"
              className={`w-full ${plan.highlighted ? "!bg-white !text-ink hover:!bg-white/90 !border-0" : ""}`}
            >
              {plan.cta}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
