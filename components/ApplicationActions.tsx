"use client";

import { useState } from "react";
import { Sparkles, Save, Send, CheckCircle2, FileText } from "lucide-react";
import {
  saveAIMessage,
  sendMessageToCandidate,
  generateMessageDraft,
  updateApplicationStage,
  updateApplicationScore,
  generateDossierSummary,
} from "@/lib/actions";
import type { Application, RentalDocument } from "@/lib/types";
import { textareaClass, inputClass } from "@/components/ui/Field";
import { Badge } from "@/components/marketing/Badge";

const scoreSourceLabels: Record<string, string> = {
  ai: "IA",
  fallback: "Règles locales",
  manuel: "Ajusté manuellement",
};

export function ApplicationActions({ application, documents: _documents }: { application: Application; documents: RentalDocument[] }) {
  const [message, setMessage] = useState(application.last_message || "");
  const [draftSource, setDraftSource] = useState<"ai" | "fallback" | null>(null);
  const [messageStatus, setMessageStatus] = useState("");

  const [score, setScore] = useState(application.score);
  const [scoreStatus, setScoreStatus] = useState("");

  const [summary, setSummary] = useState(application.summary || "");
  const [summarySource, setSummarySource] = useState<"ai" | "fallback" | null>(null);
  const [summaryStatus, setSummaryStatus] = useState("");

  const [validateStatus, setValidateStatus] = useState("");

  // Génère un brouillon via l’IA : ne sauvegarde rien et n’envoie rien. L’agent doit relire,
  // puis explicitement enregistrer et/ou envoyer.
  async function generateDraft() {
    setMessageStatus("Génération en cours…");
    const result = await generateMessageDraft(application.id, "relance");
    if (result.ok && result.message) {
      setMessage(result.message);
      setDraftSource(result.source || null);
      setMessageStatus("Brouillon généré. Relisez-le avant de l’enregistrer ou de l’envoyer.");
    } else {
      setMessageStatus(`Erreur : ${result.error}`);
    }
  }

  async function saveDraft() {
    const result = await saveAIMessage(application.id, message);
    setMessageStatus(result.ok ? "Brouillon enregistré." : `Erreur : ${result.error}`);
  }

  // Seul point d’envoi réel — exige une confirmation explicite de l’agent, car c’est irréversible.
  async function sendMessage() {
    if (!message.trim()) {
      setMessageStatus("Rien à envoyer : le message est vide.");
      return;
    }
    if (!window.confirm("Envoyer ce message au candidat ?")) return;
    const result = await sendMessageToCandidate(application.id, message);
    if (!result.ok) {
      setMessageStatus(`Erreur : ${result.error}`);
    } else if (result.local) {
      setMessageStatus("Mode démo : email journalisé, non envoyé réellement.");
    } else {
      setMessageStatus("Message envoyé.");
    }
  }

  async function saveScore() {
    const result = await updateApplicationScore(application.id, score);
    setScoreStatus(result.ok ? "Score enregistré." : `Erreur : ${result.error}`);
  }

  async function generateSummary() {
    setSummaryStatus("Génération en cours…");
    const result = await generateDossierSummary(application.id);
    if (result.ok && result.summary) {
      setSummary(result.summary);
      setSummarySource(result.source || null);
      setSummaryStatus("");
    } else {
      setSummaryStatus(`Erreur : ${result.error}`);
    }
  }

  async function validate() {
    const result = await updateApplicationStage(application.id, "Prêt à valider");
    setValidateStatus(result.ok ? "Dossier passé en Prêt à valider." : `Erreur : ${result.error}`);
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h3 className="font-display font-bold text-lg text-ink mb-4">Actions agent</h3>

      <div className="mb-6">
        <div className="mb-1.5 flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink">Score du dossier</label>
          {application.score_source && (
            <Badge tone="neutral">{scoreSourceLabels[application.score_source] || application.score_source}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <input
            type="number"
            min={0}
            max={100}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className={`${inputClass} w-28`}
          />
          <button
            onClick={saveScore}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
          >
            <Save size={15} /> Enregistrer le score
          </button>
        </div>
        {scoreStatus && <p className="mt-2 text-sm text-muted">{scoreStatus}</p>}
      </div>

      <div className="mb-1.5 flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink">Message au candidat</label>
        {draftSource && (
          <Badge tone={draftSource === "ai" ? "brand" : "neutral"}>{draftSource === "ai" ? "IA" : "Repli local"}</Badge>
        )}
      </div>
      <div className="mb-4">
        <textarea className={textareaClass} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={generateDraft}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
        >
          <Sparkles size={15} /> Générer un brouillon (IA)
        </button>
        <button
          onClick={saveDraft}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
        >
          <Save size={15} /> Enregistrer le brouillon
        </button>
        <button
          onClick={sendMessage}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
        >
          <Send size={15} /> Envoyer au candidat
        </button>
      </div>
      {messageStatus && <p className="mt-3 text-sm text-muted">{messageStatus}</p>}

      <div className="mt-6 border-t border-line pt-6">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink">Synthèse du dossier</h4>
          {summarySource && (
            <Badge tone={summarySource === "ai" ? "brand" : "neutral"}>{summarySource === "ai" ? "IA" : "Repli local"}</Badge>
          )}
        </div>
        {summary && <p className="mb-3 whitespace-pre-line rounded-xl bg-surface p-3.5 text-sm text-ink-soft">{summary}</p>}
        <button
          onClick={generateSummary}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
        >
          <FileText size={15} /> Générer une synthèse IA
        </button>
        {summaryStatus && <p className="mt-3 text-sm text-muted">{summaryStatus}</p>}
      </div>

      <div className="mt-6 border-t border-line pt-6">
        <button
          onClick={validate}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-brand-50 text-brand-700 text-sm font-semibold hover:bg-brand-100 transition-colors"
        >
          <CheckCircle2 size={15} /> Valider le dossier
        </button>
        {validateStatus && <p className="mt-3 text-sm text-muted">{validateStatus}</p>}
      </div>
    </div>
  );
}
