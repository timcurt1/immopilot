import type { RentalDocument } from "@/lib/types";
import { Badge } from "@/components/marketing/Badge";
import type { ComponentProps } from "react";

function tone(status: string): ComponentProps<typeof Badge>["tone"] {
  if (status === "validé") return "green";
  if (status === "refusé") return "red";
  if (status === "à vérifier") return "amber";
  return "brand";
}

export function DocumentChecklist({ documents }: { documents: RentalDocument[] }) {
  if (documents.length === 0) {
    return <p className="text-sm text-muted py-2">Aucun document requis pour ce dossier.</p>;
  }

  return (
    <div className="grid gap-2.5">
      {documents.map((d) => (
        <div key={d.id} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-3.5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{d.label}</p>
            <p className="mt-0.5 text-xs text-muted truncate">{d.file_name || "Aucun fichier"}</p>
          </div>
          <Badge tone={tone(d.status)}>{d.status}</Badge>
        </div>
      ))}
    </div>
  );
}
