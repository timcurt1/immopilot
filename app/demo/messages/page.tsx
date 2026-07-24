"use client";

import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";
import { DEMO_MESSAGES } from "@/lib/demoContent";

const SUGGESTED_REPLIES: Record<string, string> = {
  m1: "Bonjour Camille, votre dossier est en cours de traitement. Il manque encore votre contrat de travail et votre avis d'imposition pour le finaliser. Pourriez-vous nous les transmettre dès que possible ?",
  m2: "Merci Jordan, votre contrat de travail a bien été reçu. Il ne manque plus que votre avis d'imposition pour compléter le dossier.",
  m3: "Bonjour Amélie, nous avons bien pris en compte l'urgence de votre demande. Un artisan est missionné pour intervenir dans les plus brefs délais.",
};

export default function DemoMessagesPage() {
  const [selected, setSelected] = useState(DEMO_MESSAGES[0].id);
  const [reply, setReply] = useState("");
  const current = DEMO_MESSAGES.find((m) => m.id === selected)!;

  return (
    <>
      <DemoPageHeader title="Messages" description="Échanges avec vos prospects et clients" />
      <div className="px-6 md:px-8 pb-12">
        <div className="rounded-2xl border border-line bg-white overflow-hidden grid md:grid-cols-[280px_1fr] min-h-[420px]">
          <div className="border-r border-line">
            {DEMO_MESSAGES.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelected(m.id);
                  setReply("");
                }}
                className={`w-full text-left px-4 py-3.5 border-b border-line transition-colors ${
                  selected === m.id ? "bg-brand-50/60" : "hover:bg-surface"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-ink">{m.prospect}</span>
                  {m.unread && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                </div>
                <p className="text-xs text-muted truncate">{m.preview}</p>
                <p className="text-[11px] text-muted mt-1">{m.time}</p>
              </button>
            ))}
          </div>

          <div className="p-6 flex flex-col">
            <p className="font-semibold text-ink mb-1">{current.prospect}</p>
            <div className="rounded-xl bg-surface p-4 text-sm text-ink-soft mb-4 max-w-md">{current.preview}</div>

            <div className="mt-auto grid gap-3">
              {reply === "" && (
                <button
                  onClick={() => setReply(SUGGESTED_REPLIES[current.id] || "")}
                  className="inline-flex w-max items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3.5 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
                >
                  <Sparkles size={13} /> Préparer une réponse avec ImmoPilot
                </button>
              )}
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Écrire une réponse…"
                rows={4}
                className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="button"
                className="inline-flex w-max items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
              >
                <Send size={14} /> Envoyer (simulation)
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
