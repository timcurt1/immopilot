"use client";

import { useEffect, useState } from "react";
import { Copy, Save, Send, Sparkles } from "lucide-react";
import { generateMessageDraft, saveAIMessage, sendMessageToCandidate } from "@/lib/actions";
import { buildRelanceMessage } from "@/lib/logic";
import type { Application, MessageTemplate, RentalDocument } from "@/lib/types";
import { Field, inputClass, textareaClass } from "@/components/ui/Field";
import { Badge } from "@/components/marketing/Badge";

export function MessagesClient({
  applications,
  documents,
  templates,
}: {
  applications: Application[];
  documents: RentalDocument[];
  templates: MessageTemplate[];
}) {
  const [candidateId, setCandidateId] = useState(applications[0]?.id || "");
  const app = applications.find((a) => a.id === candidateId) || applications[0];
  const [message, setMessage] = useState(() =>
    app ? buildRelanceMessage(app, documents.filter((d) => d.application_id === app.id)) : "Choisis un modèle."
  );
  const [status, setStatus] = useState("");
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [source, setSource] = useState<"ai" | "fallback" | null>(null);

  useEffect(() => {
    if (app) setMessage(buildRelanceMessage(app, documents.filter((d) => d.application_id === app.id)));
    setSource(null);
    setStatus("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateId]);

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
    setSource(null);
    setMessage(`${body}\n\nCandidat : ${app.first_name} ${app.last_name}\nLogement : ${app.property?.title}`);
  }

  async function save() {
    const result = await saveAIMessage(app.id, message);
    setStatus(result.ok ? "Message enregistré sur le dossier." : `Erreur : ${result.error}`);
  }

  async function generate() {
    setGenerating(true);
    setStatus("");
    const result = await generateMessageDraft(app.id, "redaction");
    setGenerating(false);
    if (result.ok && result.message) {
      setMessage(result.message);
      setSource(result.source || null);
      setStatus("Message généré par l’IA.");
    } else {
      setStatus(`Erreur : ${result.error}`);
    }
  }

  async function sendToCandidate() {
    if (!window.confirm("Envoyer ce message au candidat ?")) return;
    setSending(true);
    const result = await sendMessageToCandidate(app.id, message);
    setSending(false);
    if (result.ok) {
      setStatus(result.local ? "Mode démo : email journalisé, non envoyé réellement." : "Message envoyé.");
    } else {
      setStatus(`Erreur : ${result.error}`);
    }
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
              key={t.id}
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
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <button
            onClick={generate}
            disabled={generating}
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-xl border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors disabled:opacity-60"
          >
            <Sparkles size={15} /> {generating ? "Génération…" : "Générer avec l’IA"}
          </button>
          {source && (source === "ai" ? <Badge tone="brand">IA</Badge> : <Badge tone="neutral">Repli local</Badge>)}
        </div>
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
          <button
            onClick={sendToCandidate}
            disabled={sending}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
          >
            <Send size={15} /> {sending ? "Envoi…" : "Envoyer au candidat"}
          </button>
        </div>
        {status && <p className="mt-3 text-sm text-muted">{status}</p>}
      </section>
    </div>
  );
}
