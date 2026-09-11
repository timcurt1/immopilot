"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Sparkles, Info } from "lucide-react";
import { askAssistant } from "@/lib/actions";
import type { Application } from "@/lib/types";
import { Badge } from "@/components/marketing/Badge";
import { textareaClass } from "@/components/ui/Field";

const suggestions = [
  "Quels prospects dois-je relancer aujourd’hui ?",
  "Quelles sont les urgences ?",
  "Quels dossiers sont prêts à valider ?",
];

type Exchange = {
  id: string;
  question: string;
  answer?: string;
  error?: string;
  relatedApplicationIds?: string[];
  source?: "ai" | "fallback";
};

export function AssistantClient({ applications }: { applications: Application[] }) {
  const [question, setQuestion] = useState("");
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(false);

  function nameFor(id: string) {
    const app = applications.find((a) => a.id === id);
    return app ? `${app.first_name} ${app.last_name}` : "Dossier";
  }

  async function send(q: string) {
    const trimmed = q.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    setQuestion("");
    const id = `${Date.now()}`;
    setExchanges((prev) => [...prev, { id, question: trimmed }]);
    const result = await askAssistant(trimmed);
    setExchanges((prev) =>
      prev.map((ex) =>
        ex.id === id
          ? result.ok
            ? { ...ex, answer: result.answer, relatedApplicationIds: result.relatedApplicationIds, source: result.source }
            : { ...ex, error: result.error || "Une erreur est survenue." }
          : ex
      )
    );
    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-start gap-3 rounded-xl bg-surface border border-line px-4 py-3 mb-6">
        <Info size={16} className="mt-0.5 shrink-0 text-ink-soft" />
        <p className="text-sm text-ink-soft leading-relaxed">
          L&rsquo;assistant répond à tes questions à partir des données réelles de l&rsquo;agence. Il n&rsquo;envoie jamais de
          message et ne déclenche jamais d&rsquo;action à ta place&nbsp;: à toi de décider ensuite.
        </p>
      </div>

      {exchanges.length === 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink mb-2">Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors disabled:opacity-50"
              >
                <Sparkles size={12} /> {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {exchanges.length > 0 && (
        <div className="space-y-5 mb-6">
          {exchanges.map((ex) => (
            <div key={ex.id}>
              <div className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl bg-ink text-white text-sm font-semibold px-4 py-2.5">{ex.question}</p>
              </div>
              <div className="mt-2">
                {ex.error ? (
                  <p className="text-sm text-red-700">Erreur&nbsp;: {ex.error}</p>
                ) : ex.answer ? (
                  <div className="rounded-2xl border border-line bg-surface px-4 py-3">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Assistant</span>
                      {ex.source && <Badge tone={ex.source === "ai" ? "brand" : "neutral"}>{ex.source === "ai" ? "IA" : "Règles locales"}</Badge>}
                    </div>
                    <p className="text-sm text-ink leading-relaxed whitespace-pre-line">{ex.answer}</p>
                    {ex.relatedApplicationIds && ex.relatedApplicationIds.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {ex.relatedApplicationIds.map((id) => (
                          <Link
                            key={id}
                            href={`/applications/${id}`}
                            className="inline-flex items-center rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
                          >
                            {nameFor(id)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted">L&rsquo;assistant réfléchit…</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(question);
        }}
        className="flex items-end gap-2.5"
      >
        <textarea
          className={`${textareaClass} min-h-[44px] py-2.5 flex-1`}
          rows={1}
          placeholder="Pose ta question sur tes dossiers…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(question);
            }
          }}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50"
        >
          <Send size={15} /> Envoyer
        </button>
      </form>
    </div>
  );
}
