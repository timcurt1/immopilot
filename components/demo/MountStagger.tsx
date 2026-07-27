"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Stagger wrapper for demo/app-shell content that's visible immediately on
 * load (above the fold, not scrolled into view) — unlike the marketing
 * Reveal/RevealGroup pair, this animates on mount via `animate`, not
 * `whileInView`. Re-keys naturally when the parent list changes (e.g. a
 * search filter), since React remounts on key/identity change.
 */
export function MountStagger({
  children,
  className = "",
  stagger = 0.05,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MountItem({
  children,
  className = "",
  y = 10,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? {} : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
