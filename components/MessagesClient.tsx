"use client";

import { useState } from "react";
import { Copy, Save } from "lucide-react";
import { saveAIMessage } from "@/lib/actions";
import type { Application } from "@/lib/types";
import { Field, inputClass, textareaClass } from "@/components/ui/Field";

const templates = [
  {
    title: "Document manquant",
    body: "Bonjour, votre dossier est presque prêt. Il manque encore certains documents pour permettre à l’agence de l’étudier rapidement.",
  },
  { title: "Visite à confirmer", body: "Bonjour, pouvez-vous confirmer votre disponibilité pour la visite du logement ?" },
  { title: "Dossier complet", body: "Bonjour, votre dossier est complet. L’agence va maintenant procéder à l’étude finale." },
  { title: "Relance 48h", body: "Bonjour, votre dossier est toujours ouvert, mais il manque une action pour poursuivre." },
  { title: "Demande garant", body: "Bonjour, pouvez-vous ajouter les informations et justificatifs de votre garant ?" },
  {
    title: "Refus poli",
    body: "Bonjour, merci pour votre candidature. Après étude, nous ne pourrons malheureusement pas donner suite pour ce logement.",
  },
];

export function MessagesClient({ applications }: { applications: Application[] }) {
  const [candidateId, setCandidateId] = useState(applications[0]?.id || "");
  const [message, setMessage] = useState("Choisis un modèle.");
  const [status, setStatus] = useState("");
  const app = applications.find((a) => a.id === candidateId) || applications[0];

  if (!app) {
    return (
      <section className="rounded-2xl bg-ink text-white p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Assistant IA</span>
        <h2 className="mt-3 font-display font-bold text-2xl">Aucune candidature</h2>
        <p className="mt-3 text-sm text-white/70">Il n&rsquo;y a pas encore de dossier candidat pour générer un message.</p>
      </section>
    );
  }

  function useTemplate(body: string) {
    setStatus("");
    setMessage(`${body}\n\nCandidat : ${app.first_name} ${app.last_name}\nLogement : ${app.property?.title}`);
  }

  async function save() {
    const result = await saveAIMessage(app.id, message);
    setStatus(result.ok ? "Message enregistré sur le dossier." : `Erreur : ${result.error}`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <section className="rounded-2xl bg-ink text-white p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Assistant IA</span>
        <h2 className="mt-3 font-display font-bold text-2xl tracking-tight leading-tight">
          Générer vite,
          <br />
          <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">
            valider humainement.
          </span>
        </h2>
        <p className="mt-3 text-sm text-white/70 leading-relaxed">
          Les messages sont préparés par l&rsquo;IA, mais l&rsquo;agent garde toujours le contrôle avant envoi.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {templates.map((t) => (
            <button
              key={t.title}
              onClick={() => useTemplate(t.body)}
              className="text-left rounded-xl bg-white/10 hover:bg-white/15 transition-colors p-4"
            >
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="mt-1 text-xs text-white/60 leading-relaxed">{t.body.slice(0, 90)}...</p>
            </button>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-line bg-white p-6">
        <Field label="Candidat">
          <select className={inputClass} value={candidateId} onChange={(e) => setCandidateId(e.target.value)}>
            {applications.map((a) => (
              <option key={a.id} value={a.id}>
                {a.first_name} {a.last_name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Message">
          <textarea className={`${textareaClass} min-h-[180px]`} value={message} onChange={(e) => setMessage(e.target.value)} />
        </Field>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => navigator.clipboard?.writeText(message)}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            <Copy size={15} /> Copier
          </button>
          <button
            onClick={save}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
          >
            <Save size={15} /> Enregistrer sur le dossier
          </button>
        </div>
        {status && <p className="mt-3 text-sm text-muted">{status}</p>}
      </section>
    </div>
  );
}
