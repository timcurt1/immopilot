"use client";

import { motion, useReducedMotion } from "framer-motion";

const SOURCES = [
  { x: 40, y: 60, label: "E-mail" },
  { x: 30, y: 140, label: "Portail" },
  { x: 50, y: 220, label: "Téléphone" },
  { x: 40, y: 280, label: "Visite" },
];

const OUTPUTS = [
  { x: 430, y: 90, label: "Fiche créée" },
  { x: 440, y: 160, label: "Action recommandée" },
  { x: 430, y: 230, label: "Relance préparée" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function FlowIllustration() {
  const reduced = useReducedMotion();

  return (
    <svg viewBox="0 0 480 320" fill="none" className="w-full h-auto" role="img" aria-label="Flux d'information centralisé par ImmoPilot">
      <defs>
        <linearGradient id="flow-line" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3557FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#3557FF" />
          <stop offset="1" stopColor="#5B3CCF" />
        </linearGradient>
        <radialGradient id="flow-core" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#3557FF" />
          <stop offset="1" stopColor="#5B3CCF" />
        </radialGradient>
      </defs>

      {/* Sources scattered on the left */}
      {SOURCES.map((s, i) => (
        <motion.g
          key={i}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.path
            d={`M ${s.x + 24} ${s.y} C ${160} ${s.y}, ${180} 160, 232 160`}
            stroke="url(#flow-line)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
            variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.7, delay: i * 0.1, ease: EASE } } }}
          />
          <motion.g
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.35, delay: 0.1 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] } },
            }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            <circle cx={s.x} cy={s.y} r="22" fill="white" stroke="#E3E7EF" />
            <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="#3c4657">
              {s.label}
            </text>
          </motion.g>
        </motion.g>
      ))}

      {/* Central node */}
      <motion.g
        initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: "240px 160px" }}
      >
        <circle cx="240" cy="160" r="38" fill="url(#flow-core)" />
        <text x="240" y="156" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
          ImmoPilot
        </text>
        <text x="240" y="170" textAnchor="middle" fontSize="8" fill="white" opacity="0.8">
          analyse
        </text>
      </motion.g>

      {/* Outputs on the right */}
      {OUTPUTS.map((s, i) => (
        <motion.g
          key={i}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.path
            d={`M 278 160 C 330 160, 340 ${s.y}, ${s.x - 46} ${s.y}`}
            stroke="url(#flow-line)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
            variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.6, delay: 0.55 + i * 0.1, ease: EASE } } }}
          />
          <motion.g
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              show: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.35, delay: 0.65 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] },
              },
            }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            <rect x={s.x - 46} y={s.y - 14} width="92" height="28" rx="14" fill="white" stroke="#E3E7EF" />
            <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0b1220">
              {s.label}
            </text>
          </motion.g>
        </motion.g>
      ))}
    </svg>
  );
}
