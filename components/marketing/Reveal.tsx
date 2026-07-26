"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ReactNode, CSSProperties } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 20,
  scale = true,
  duration = 0.65,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  scale?: boolean;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y, scale: scale ? 0.98 : 1 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className = "",
  stagger = 0.1,
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
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: reduced ? 0 : 0.04 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  y = 16,
  scale = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: boolean;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: reduced ? {} : { opacity: 0, y, scale: scale ? 0.97 : 1 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Curtain-style reveal for headline blocks: the content slides up from behind
 * an overflow-hidden mask instead of just fading in. Reserved for the one or
 * two most important headings per page (H1s) — spec explicitly warns against
 * applying heavy title treatments everywhere.
 */
export function RevealMask({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: {} }}
    >
      <motion.div
        variants={{
          hidden: { y: "110%", opacity: 0 },
          show: { y: "0%", opacity: 1, transition: { duration: 0.85, delay, ease: EASE } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const POP_EASE = [0.34, 1.56, 0.64, 1] as const;

/**
 * Springy scale+rotate entrance for icon badges. Self-triggering (its own
 * whileInView), so it works whether it's nested inside a Reveal, a
 * RevealGroup/RevealItem, or standalone — used to give feature/topic grid
 * icons a bit more character than the surrounding fade-up without
 * overshadowing it (icon settles slightly ahead of the card text).
 */
export function IconPop({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, scale: 0.5, rotate: -10 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: POP_EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Subtle scroll-linked depth for hero/product-demo imagery: a slow vertical
 * drift plus a very light scale-down as the element passes through the
 * viewport, so large screenshots feel like they have real depth rather than
 * being flat cutouts. Deliberately tiny ranges — this should read as
 * "premium," not as a parallax gimmick.
 */
export function ScrollDepth({
  children,
  className = "",
  strength = 40,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y, scale }}>{children}</motion.div>
    </div>
  );
}
