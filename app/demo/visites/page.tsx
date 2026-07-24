import { Calendar, Clock } from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";
import { StatusBadge } from "@/components/demo/StatusBadge";
import { DEMO_VISITS } from "@/lib/demoContent";

export default function DemoVisitesPage() {
  return (
    <>
      <DemoPageHeader title="Visites" description="Visites programmées pour aujourd'hui et les prochains jours" />
      <div className="px-6 md:px-8 pb-12">
        <div className="rounded-2xl border border-line bg-white overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-line bg-surface/60">
            <Calendar size={15} className="text-brand-600" />
            <p className="text-sm font-semibold text-ink">Mercredi 24 juillet</p>
          </div>
          <ul>
            {DEMO_VISITS.map((v) => (
              <li key={v.id} className="flex items-center gap-4 px-5 py-4 border-b border-line last:border-0">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-ink w-16 shrink-0">
                  <Clock size={13} className="text-muted" /> {v.time}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink font-medium truncate">{v.prospect}</p>
                  <p className="text-xs text-muted truncate">{v.property}</p>
                </div>
                <StatusBadge value={v.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
