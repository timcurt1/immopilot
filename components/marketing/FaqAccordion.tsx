"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { RevealGroup, RevealItem } from "./Reveal";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <RevealGroup className="grid gap-3" stagger={0.06}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <RevealItem key={item.question} className="rounded-2xl border border-line bg-white overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="font-semibold text-ink text-[15px]">{item.question}</span>
              <Plus
                size={18}
                className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 -mt-1 text-sm text-ink-soft leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
