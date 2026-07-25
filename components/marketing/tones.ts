export type FeatureTone = "brand" | "teal" | "rose" | "sun";

export const TONE_ORDER: FeatureTone[] = ["brand", "teal", "rose", "sun"];

export const TONE_CLASSES: Record<FeatureTone, { bg: string; text: string; ring: string; glow: string }> = {
  brand: { bg: "bg-brand-50", text: "text-brand-700", ring: "group-hover:border-brand-200", glow: "rgba(53,87,255,0.18)" },
  teal: { bg: "bg-teal-50", text: "text-teal-600", ring: "group-hover:border-teal-500/30", glow: "rgba(13,148,136,0.16)" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", ring: "group-hover:border-rose-500/30", glow: "rgba(244,63,142,0.16)" },
  sun: { bg: "bg-sun-50", text: "text-sun-600", ring: "group-hover:border-sun-500/30", glow: "rgba(251,146,60,0.18)" },
};

export const BOLD_TONE: Record<FeatureTone, string> = {
  brand: "bg-brand-600",
  teal: "bg-teal-500",
  rose: "bg-rose-500",
  sun: "bg-sun-500",
};

export function toneAt(index: number): FeatureTone {
  return TONE_ORDER[index % TONE_ORDER.length];
}

export const GRADIENT_TONE: Record<FeatureTone, string> = {
  brand: "from-brand-600 to-violet-500",
  teal: "from-teal-500 to-brand-500",
  rose: "from-rose-500 to-violet-500",
  sun: "from-sun-500 to-rose-500",
};
