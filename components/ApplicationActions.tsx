"use client";

import { useState } from "react";
import { Sparkles, Save, CheckCircle2 } from "lucide-react";
import { saveAIMessage, updateApplicationStage } from "@/lib/actions";
import type { Application, RentalDocument } from "@/lib/types";
import { Field, textareaClass } from "@/components/ui/Field";

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
    <div className="rounded-2xl border border-line bg-white p-6">
      <h3 className="font-display font-bold text-lg text-ink mb-4">Actions agent</h3>
      <Field label="Message IA">
        <textarea className={textareaClass} value={message} onChange={(e) => setMessage(e.target.value)} />
      </Field>
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={generate}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
        >
          <Sparkles size={15} /> Générer relance IA
        </button>
        <button
          onClick={save}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
        >
          <Save size={15} /> Sauvegarder message
        </button>
        <button
          onClick={validate}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-brand-50 text-brand-700 text-sm font-semibold hover:bg-brand-100 transition-colors"
        >
          <CheckCircle2 size={15} /> Valider le dossier
        </button>
      </div>
      {status && <p className="mt-3 text-sm text-muted">{status}</p>}
    </div>
  );
}
