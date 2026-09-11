"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { suggestDocumentType, uploadDocument } from "@/lib/actions";
import type { RentalDocument } from "@/lib/types";
import { Field, inputClass } from "@/components/ui/Field";

export function CandidateUpload({ applicationId, documents }: { applicationId: string; documents: RentalDocument[] }) {
  const [type, setType] = useState(documents[0]?.type || "");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [suggestion, setSuggestion] = useState<{ label: string; source: "ai" | "fallback" } | null>(null);

  async function handleFileChange(selected: File | null) {
    setFile(selected);
    setSuggestion(null);
    if (!selected) return;
    const result = await suggestDocumentType(applicationId, selected.name);
    if (result.ok && result.type) {
      const doc = documents.find((d) => d.type === result.type);
      setType(result.type);
      setSuggestion({ label: doc?.label || result.type, source: result.source || "fallback" });
    }
  }

  async function send() {
    if (!file) {
      setStatus("Ajoute un fichier.");
      return;
    }
    const doc = documents.find((d) => d.type === type);
    setPending(true);
    const result = await uploadDocument(applicationId, type, doc?.label || type, file);
    setPending(false);
    setStatus(
      result.ok
        ? result.local
          ? `Document prêt à envoyer : ${file.name} (mode démo, non stocké).`
          : `Document envoyé : ${file.name}.`
        : `Erreur d'envoi : ${result.error}`
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h3 className="font-display font-bold text-lg text-ink">Ajouter un document</h3>
      <p className="mt-1 text-sm text-muted">Le fichier est stocké dans le coffre sécurisé de l&rsquo;agence.</p>
      <div className="mt-4">
        <Field label="Type">
          <select className={inputClass} value={type} onChange={(e) => setType(e.target.value)}>
            {documents.map((d) => (
              <option key={d.type} value={d.type}>
                {d.label}
              </option>
            ))}
          </select>
          {suggestion && (
            <p className="mt-1.5 text-xs text-muted">
              Suggestion automatique : {suggestion.label} ({suggestion.source === "ai" ? "IA" : "règles locales"})
            </p>
          )}
        </Field>
        <Field label="Fichier">
          <input
            type="file"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="w-full text-sm text-ink-soft file:mr-3 file:h-9 file:px-3.5 file:rounded-lg file:border-0 file:bg-ink file:text-white file:text-sm file:font-semibold file:cursor-pointer"
          />
        </Field>
      </div>
      <button
        onClick={send}
        disabled={pending}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        <Upload size={15} /> {pending ? "Envoi…" : "Envoyer"}
      </button>
      {status && <p className="mt-3 text-sm text-muted">{status}</p>}
    </div>
  );
}
