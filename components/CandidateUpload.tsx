"use client";

import { useState } from "react";
import { uploadDocument } from "@/lib/actions";
import type { RentalDocument } from "@/lib/types";

export function CandidateUpload({ applicationId, documents }: { applicationId: string; documents: RentalDocument[] }) {
  const [type, setType] = useState(documents[0]?.type || "");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

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
        : `Erreur d’envoi : ${result.error}`
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0, color: "var(--navy)" }}>Ajouter un document</h3>
      <p style={{ color: "var(--muted)", fontSize: 13 }}>Le fichier est stocké dans le coffre sécurisé de l’agence.</p>
      <div className="field">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {documents.map((d) => (
            <option key={d.type} value={d.type}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>Fichier</label>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>
      <button className="btn primary" onClick={send} disabled={pending}>
        {pending ? "Envoi…" : "Envoyer"}
      </button>
      {status && <p style={{ color: "var(--muted)", fontSize: 13 }}>{status}</p>}
    </div>
  );
}
