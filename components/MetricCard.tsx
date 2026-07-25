import { Badge } from "@/components/marketing/Badge";

const TONE_MAP = { blue: "brand", green: "green", amber: "amber", red: "red" } as const;

export function MetricCard({
  label,
  value,
  chip,
  tone = "blue",
}: {
  label: string;
  value: string | number;
  chip?: string;
  tone?: "blue" | "green" | "amber" | "red";
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 flex flex-col justify-between min-h-[120px]">
      <strong className="font-display font-bold text-3xl text-ink">{value}</strong>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-sm text-muted">{label}</span>
        {chip && <Badge tone={TONE_MAP[tone]}>{chip}</Badge>}
      </div>
    </div>
  );
}
