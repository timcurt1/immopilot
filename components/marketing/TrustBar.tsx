import { Building2, KeyRound, Home, TrendingUp, Users, Network } from "lucide-react";

const ITEMS = [
  { label: "Agence indépendante", icon: Home },
  { label: "Réseau immobilier", icon: Network },
  { label: "Location", icon: KeyRound },
  { label: "Transaction", icon: Building2 },
  { label: "Gestion locative", icon: Users },
  { label: "Direction d'agence", icon: TrendingUp },
];

export function TrustBar() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="border-y border-line bg-white py-6 overflow-hidden">
      <p className="text-center text-xs font-medium text-muted mb-5 px-6">
        Pensé pour la location, la transaction, la gestion locative et les réseaux immobiliers.
      </p>
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-10 animate-marquee motion-reduce:animate-none">
          {loop.map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-sm font-semibold text-ink-soft whitespace-nowrap">
              <item.icon size={15} className="text-brand-500" />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
