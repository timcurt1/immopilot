"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import type { ComponentProps } from "react";
import type { RentalDocument } from "@/lib/types";
import { Badge } from "@/components/marketing/Badge";
import { updateDocumentStatus } from "@/lib/actions";

function tone(status: string): ComponentProps<typeof Badge>["tone"] {
  if (status === "validé") return "green";
  if (status === "refusé") return "red";
  if (status === "à vérifier") return "amber";
  return "brand";
}

export function DocumentChecklist({ documents, interactive = false }: { documents: RentalDocument[]; interactive?: boolean }) {
  const [localDocs, setLocalDocs] = useState(documents);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [reasonDraft, setReasonDraft] = useState<Record<string, string>>({});
  const [errorById, setErrorById] = useState<Record<string, string>>({});

  useEffect(() => {
    setLocalDocs(documents);
  }, [documents]);

  if (localDocs.length === 0) {
    return <p className="text-sm text-muted py-2">Aucun document requis pour ce dossier.</p>;
  }

  async function validate(doc: RentalDocument) {
    setPendingId(doc.id);
    const result = await updateDocumentStatus(doc.id, "validé");
    if (result.ok) {
      setLocalDocs((docs) => docs.map((d) => (d.id === doc.id ? { ...d, status: "validé", rejection_reason: null } : d)));
      setErrorById((e) => ({ ...e, [doc.id]: "" }));
    } else {
      setErrorById((e) => ({ ...e, [doc.id]: result.error || "Erreur inconnue." }));
    }
    setPendingId(null);
  }

  async function reject(doc: RentalDocument) {
    setPendingId(doc.id);
    const reason = reasonDraft[doc.id] || "";
    const result = await updateDocumentStatus(doc.id, "refusé", reason);
    if (result.ok) {
      setLocalDocs((docs) => docs.map((d) => (d.id === doc.id ? { ...d, status: "refusé", rejection_reason: reason || null } : d)));
      setErrorById((e) => ({ ...e, [doc.id]: "" }));
    } else {
      setErrorById((e) => ({ ...e, [doc.id]: result.error || "Erreur inconnue." }));
    }
    setPendingId(null);
  }

  return (
    <div className="grid grid-cols-1 gap-2.5">
      {localDocs.map((d) => (
        <div key={d.id} className="rounded-xl border border-line bg-white p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink truncate">{d.label}</p>
              <p className="mt-0.5 text-xs text-muted truncate">{d.file_name || "Aucun fichier"}</p>
            </div>
            <Badge tone={tone(d.status)}>{d.status}</Badge>
          </div>
          {!interactive && d.status === "refusé" && d.rejection_reason && (
            <p className="mt-2 text-xs text-red-700">Motif : {d.rejection_reason}</p>
          )}
          {interactive && d.status === "à vérifier" && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => validate(d)}
                disabled={pendingId === d.id}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-positive-soft text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors disabled:opacity-60"
              >
                <Check size={13} /> Valider
              </button>
              <input
                type="text"
                placeholder="Motif de refus (optionnel)"
                value={reasonDraft[d.id] || ""}
                onChange={(e) => setReasonDraft((r) => ({ ...r, [d.id]: e.target.value }))}
                className="h-8 min-w-0 flex-1 rounded-lg border border-line px-2.5 text-xs outline-none focus:border-brand-500"
              />
              <button
                onClick={() => reject(d)}
                disabled={pendingId === d.id}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-danger-soft text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors disabled:opacity-60"
              >
                <X size={13} /> Refuser
              </button>
            </div>
          )}
          {interactive && errorById[d.id] && <p className="mt-2 text-xs text-red-700">Erreur : {errorById[d.id]}</p>}
        </div>
      ))}
    </div>
  );
}
