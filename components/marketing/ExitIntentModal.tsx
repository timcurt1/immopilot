"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, CheckCircle2, FileText } from "lucide-react";
import { Logo } from "./Logo";

const SEEN_KEY = "immopilot_exit_intent_seen";
const EXCLUDED_PATHS = ["/demande-demo", "/contact"];

export function ExitIntentModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const armedRef = useRef(false);

  useEffect(() => {
    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;
    if (sessionStorage.getItem(SEEN_KEY) === "1") return;

    const armTimer = setTimeout(() => {
      armedRef.current = true;
    }, 8000);

    function onMouseOut(e: MouseEvent) {
      if (!armedRef.current) return;
      if (e.clientY > 0) return;
      if (e.relatedTarget) return;
      trigger();
    }

    function trigger() {
      if (sessionStorage.getItem(SEEN_KEY) === "1") return;
      sessionStorage.setItem(SEEN_KEY, "1");
      setOpen(true);
      document.removeEventListener("mouseout", onMouseOut);
    }

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [pathname]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Sortie de page" }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Recevoir la présentation d'ImmoPilot"
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-ink"
        >
          <X size={16} />
        </button>

        <Logo />

        {status === "sent" ? (
          <div className="mt-5 text-center py-4">
            <CheckCircle2 size={28} className="mx-auto text-green-600 mb-3" />
            <p className="font-semibold text-ink mb-1">Merci !</p>
            <p className="text-sm text-muted">La présentation d'ImmoPilot vous sera envoyée par e-mail.</p>
          </div>
        ) : (
          <>
            <div className="mt-4 flex items-center gap-2.5 mb-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 shrink-0">
                <FileText size={16} />
              </span>
              <p className="font-display font-bold text-lg text-ink">Recevoir la présentation d'ImmoPilot</p>
            </div>
            <p className="text-sm text-muted mb-4">
              Laissez votre e-mail pour recevoir un aperçu du logiciel, sans engagement.
            </p>
            <form onSubmit={submit} className="grid gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@agence.fr"
                className="w-full h-11 rounded-xl border border-line px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="h-11 rounded-xl bg-ink text-white font-semibold text-sm hover:bg-brand-700 transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "Envoi…" : "Recevoir la présentation"}
              </button>
              {status === "error" && <p className="text-xs text-red-600">Une erreur est survenue, réessayez.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
