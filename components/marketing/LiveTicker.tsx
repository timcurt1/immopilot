"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, UserPlus, FileCheck2, CalendarCheck, MessageCircle } from "lucide-react";

const EVENTS = [
  { icon: UserPlus, text: "Nouveau prospect qualifié — T3 Lyon 6e", tone: "text-brand-600" },
  { icon: FileCheck2, text: "Dossier complété par Camille Lefèvre", tone: "text-teal-600" },
  { icon: CalendarCheck, text: "Visite confirmée pour 15h30", tone: "text-sun-600" },
  { icon: MessageCircle, text: "Relance envoyée à 3 prospects inactifs", tone: "text-rose-600" },
  { icon: Sparkles, text: "Compte rendu de visite généré automatiquement", tone: "text-brand-600" },
];

export function LiveTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % EVENTS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const current = EVENTS[index];

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white border border-line pl-2 pr-4 py-1.5 shadow-sm text-xs font-medium text-ink-soft">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
      </span>
      <span className="relative h-4 overflow-hidden inline-flex items-center min-w-[260px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center gap-1.5 whitespace-nowrap"
          >
            <current.icon size={12} className={current.tone} />
            {current.text}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
