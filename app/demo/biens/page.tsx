import { Building2, MapPin } from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";
import { StatusBadge } from "@/components/demo/StatusBadge";
import { DEMO_PROPERTIES } from "@/lib/demoContent";

export default function DemoBiensPage() {
  return (
    <>
      <DemoPageHeader title="Biens" description={`${DEMO_PROPERTIES.length} biens suivis par l'agence`} />
      <div className="px-6 md:px-8 pb-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEMO_PROPERTIES.map((p) => (
          <div key={p.id} className="rounded-2xl border border-line bg-white overflow-hidden">
            <div className="h-24 bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center">
              <Building2 size={28} className="text-white/80" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-ink text-sm leading-snug">{p.title}</p>
                <StatusBadge value={p.status} />
              </div>
              <p className="flex items-center gap-1 text-xs text-muted mb-3">
                <MapPin size={12} /> {p.city}
              </p>
              <div className="flex items-center justify-between text-sm border-t border-line pt-3">
                <span className="text-muted">{p.type}</span>
                <span className="font-semibold text-ink">{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
