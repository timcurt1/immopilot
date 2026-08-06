import { Check } from "lucide-react";
import { PLAN_ORDER, PRICING_PLANS } from "@/lib/marketingContent";
import { Button } from "./Button";
import { Spotlight } from "./Spotlight";
import { RevealGroup, RevealItem } from "./Reveal";

const ACCENT: Record<string, string> = {
  essentiel: "text-teal-600",
  agence: "text-white",
  reseau: "text-rose-600",
};

export function PricingCards() {
  return (
    <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch" stagger={0.12}>
      {PLAN_ORDER.map((id) => {
        const plan = PRICING_PLANS[id];
        const card = (
          <div
            className={`h-full rounded-2xl border p-7 flex flex-col transition-transform duration-300 hover:-translate-y-1.5 ${
              plan.highlighted
                ? "border-ink bg-ink text-white shadow-[0_30px_80px_rgba(11,18,32,0.25)] md:-translate-y-3 md:hover:-translate-y-4"
                : "border-line bg-white hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
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
                  <Check size={16} className={`mt-0.5 shrink-0 ${ACCENT[id]}`} />
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

        return (
          <RevealItem key={id} className="h-full" y={20}>
            {plan.highlighted ? (
              <Spotlight dark className="h-full rounded-2xl">
                {card}
              </Spotlight>
            ) : (
              card
            )}
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
