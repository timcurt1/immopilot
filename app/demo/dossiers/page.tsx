import Link from "next/link";
import { FileWarning } from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";
import { StatusBadge } from "@/components/demo/StatusBadge";
import { MountStagger, MountItem } from "@/components/demo/MountStagger";
import { DEMO_PROSPECTS } from "@/lib/demoContent";

export default function DemoDossiersPage() {
  const dossiers = DEMO_PROSPECTS.filter((p) => p.documents.length > 0);

  return (
    <>
      <DemoPageHeader title="Dossiers" description="Suivi documentaire des prospects et candidats" />
      <MountStagger className="px-6 md:px-8 pb-12 grid gap-4">
        {dossiers.map((p) => {
          const missing = p.documents.filter((d) => d.status !== "validé");
          return (
            <MountItem key={p.id} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <Link href={`/demo/prospects/${p.id}`} className="font-semibold text-ink hover:text-brand-600">
                  {p.firstName} {p.lastName}
                </Link>
                <StatusBadge value={p.status} />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {p.documents.map((d) => (
                  <StatusBadge key={d.label} value={d.status} />
                ))}
              </div>
              {missing.length > 0 ? (
                <p className="flex items-center gap-1.5 text-xs text-amber-700">
                  <FileWarning size={13} /> {missing.length} pièce{missing.length > 1 ? "s" : ""} à traiter :{" "}
                  {missing.map((d) => d.label).join(", ")}
                </p>
              ) : (
                <p className="text-xs text-green-700">Dossier complet.</p>
              )}
            </MountItem>
          );
        })}
      </MountStagger>
    </>
  );
}
