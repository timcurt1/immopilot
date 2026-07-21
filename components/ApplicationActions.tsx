"use client";

import { useState } from "react";
import { saveAIMessage, updateApplicationStage } from "@/lib/actions";
import type { Application, RentalDocument } from "@/lib/types";

export function ApplicationActions({ application, documents }: { application: Application; documents: RentalDocument[] }) {
  const [message, setMessage] = useState(application.last_message || "");
  const [status, setStatus] = useState("");
  const missing = documents.filter((d) => d.status === "manquant" || d.status === "à vérifier").map((d) => d.label);
  const generated = `Bonjour ${application.first_name}, votre dossier est presque prêt. Il manque encore : ${
    missing.join(", ") || "aucun document"
  }. Vous pouvez les ajouter depuis votre portail candidat.`;

  async function generate() {
    setMessage(generated);
    await saveAIMessage(application.id, generated);
    setStatus("Message généré et enregistré.");
  }

  async function save() {
    const result = await saveAIMessage(application.id, message);
    setStatus(result.ok ? "Message enregistré." : `Erreur : ${result.error}`);
  }

  async function validate() {
    const result = await updateApplicationStage(application.id, "Prêt à valider");
    setStatus(result.ok ? "Dossier passé en Prêt à valider." : `Erreur : ${result.error}`);
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0, color: "var(--navy)" }}>Actions agent</h3>
      <div className="field">
        <label>Message IA</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn primary" onClick={generate}>
          Générer relance IA
        </button>
        <button className="btn ghost" onClick={save}>
          Sauvegarder message
        </button>
        <button className="btn soft" onClick={validate}>
          Valider le dossier
        </button>
      </div>
      {status && <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 10 }}>{status}</p>}
    </div>
  );
}
