"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MessageSquareText } from "lucide-react";
import { BookingWidget } from "./BookingWidget";
import { DemandeDemoForm } from "./DemandeDemoForm";
import { trackEvent } from "@/lib/analytics";
import { EASE } from "./Reveal";

export function DemandeDemoTabs({ hasError = false }: { hasError?: boolean }) {
  const [tab, setTab] = useState<"booking" | "form">(hasError ? "form" : "booking");

  return (
    <div>
      <div className="flex gap-2 mb-6 max-w-md mx-auto">
        <button
          onClick={() => {
            setTab("booking");
            trackEvent("Demande de démo — onglet réservation");
          }}
          className={`flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-colors ${
            tab === "booking" ? "bg-ink text-white" : "bg-white border border-line text-ink-soft hover:border-ink/30"
          }`}
        >
          <Calendar size={15} /> Réserver un créneau
        </button>
        <button
          onClick={() => setTab("form")}
          className={`flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-colors ${
            tab === "form" ? "bg-ink text-white" : "bg-white border border-line text-ink-soft hover:border-ink/30"
          }`}
        >
          <MessageSquareText size={15} /> Laisser mes coordonnées
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === "booking" ? (
          <motion.div
            key="booking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="max-w-2xl mx-auto"
          >
            <BookingWidget />
            <p className="mt-4 text-center text-xs text-muted">
              Choisissez directement un créneau dans l&rsquo;agenda de l&rsquo;équipe. Aucun engagement.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="max-w-2xl mx-auto"
          >
            <DemandeDemoForm hasError={hasError} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
