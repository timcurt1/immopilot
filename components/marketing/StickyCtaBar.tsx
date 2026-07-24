"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, ArrowRight } from "lucide-react";
import { Button } from "./Button";

const DISMISS_KEY = "immopilot_sticky_cta_dismissed";

export function StickyCtaBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 900);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || pathname === "/demande-demo") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-3xl px-4 pb-4">
        <div className="flex items-center gap-3 rounded-2xl bg-ink text-white px-4 py-3 shadow-[0_20px_50px_rgba(11,18,32,0.35)] border border-white/10">
          <p className="hidden sm:block text-sm font-medium flex-1">
            Prêt à voir ImmoPilot dans le contexte de votre agence ?
          </p>
          <p className="sm:hidden text-sm font-medium flex-1">Voir ImmoPilot en contexte ?</p>
          <Button href="/demande-demo" size="md" className="!bg-white !text-ink hover:!bg-white/90 shrink-0">
            Demander une démo <ArrowRight size={14} />
          </Button>
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => {
              sessionStorage.setItem(DISMISS_KEY, "1");
              setDismissed(true);
            }}
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
