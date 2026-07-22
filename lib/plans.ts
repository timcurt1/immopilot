export type PlanId = "starter" | "pro" | "agence";

// Prix et limites d'exemple — à ajuster une fois la stratégie tarifaire définitive choisie,
// et à faire correspondre aux Price IDs réellement créés dans le dashboard Stripe.
export const PLANS: Record<PlanId, { label: string; price: number; maxProperties: number; maxUsers: number; priceId: string | undefined }> = {
  starter: {
    label: "Starter",
    price: 49,
    maxProperties: 10,
    maxUsers: 3,
    priceId: process.env.STRIPE_PRICE_STARTER,
  },
  pro: {
    label: "Pro",
    price: 129,
    maxProperties: 50,
    maxUsers: 10,
    priceId: process.env.STRIPE_PRICE_PRO,
  },
  agence: {
    label: "Agence",
    price: 299,
    maxProperties: Infinity,
    maxUsers: Infinity,
    priceId: process.env.STRIPE_PRICE_AGENCE,
  },
};

export const PLAN_ORDER: PlanId[] = ["starter", "pro", "agence"];

export function isPlanId(value: string): value is PlanId {
  return value === "starter" || value === "pro" || value === "agence";
}
