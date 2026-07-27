"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, ArrowRight } from "lucide-react";
import { ASSISTANT_FAQ, findBestAnswer } from "@/lib/assistantFaq";
import { trackEvent } from "@/lib/analytics";

type Message = { role: "bot" | "user"; text: string; noMatch?: boolean };

const GREETING: Record<"tarifs" | "securite", string> = {
  tarifs: "Bonjour ! Une question sur nos formules ou la tarification ? Choisissez une question ci-dessous, ou tapez la vôtre.",
  securite: "Bonjour ! Une question sur la sécurité ou le RGPD ? Choisissez une question ci-dessous, ou tapez la vôtre.",
};

export function AssistantChat({ context }: { context: "tarifs" | "securite" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: GREETING[context] }]);
  const [input, setInput] = useState("");
  const suggestions = ASSISTANT_FAQ[context].slice(0, 4);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) trackEvent("Assistant — ouvert", { context });
  }

  function ask(question: string) {
    const answer = findBestAnswer(question);
    setMessages((m) => [
      ...m,
      { role: "user", text: question },
      answer
        ? { role: "bot", text: answer.answer }
        : {
            role: "bot",
            text: "Je n'ai pas de réponse toute prête pour cette question précise, mais notre équipe peut vous répondre directement.",
            noMatch: true,
          },
    ]);
    trackEvent("Assistant — question posée", { context, matched: String(Boolean(answer)) });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    ask(input.trim());
    setInput("");
  }

  return (
    <div className="fixed bottom-24 sm:bottom-5 right-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[340px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-line bg-white shadow-[0_30px_80px_rgba(15,23,42,0.2)] overflow-hidden flex flex-col"
            style={{ maxHeight: 480 }}
          >
          <div className="flex items-center justify-between px-4 py-3 bg-ink text-white shrink-0">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles size={15} /> Assistant ImmoPilot
            </span>
            <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-white/70 hover:text-white">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 grid gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm ${m.role === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block rounded-xl px-3.5 py-2.5 max-w-[85%] text-left leading-relaxed ${
                    m.role === "user" ? "bg-ink text-white" : "bg-surface text-ink-soft"
                  }`}
                >
                  {m.text}
                </div>
                {m.noMatch && (
                  <div className="mt-2 flex flex-wrap gap-2 justify-start">
                    <a
                      href="/demande-demo"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                    >
                      Demander une démo <ArrowRight size={11} />
                    </a>
                    <a href="/contact" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">
                      Contacter l&rsquo;équipe <ArrowRight size={11} />
                    </a>
                  </div>
                )}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="grid gap-2 mt-1">
                {suggestions.map((s) => (
                  <button
                    key={s.question}
                    onClick={() => ask(s.question)}
                    className="text-left rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft hover:border-brand-300 hover:text-ink transition-colors"
                  >
                    {s.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={submit} className="flex items-center gap-2 border-t border-line p-3 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question…"
              className="flex-1 h-10 rounded-lg border border-line px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
            <button
              type="submit"
              aria-label="Envoyer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-white hover:bg-brand-700 transition-colors"
            >
              <Send size={15} />
            </button>
          </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant ImmoPilot"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-[0_16px_40px_rgba(11,18,32,0.3)] hover:bg-brand-700 transition-colors"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
