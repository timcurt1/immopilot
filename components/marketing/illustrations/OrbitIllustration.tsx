"use client";

import { motion, useReducedMotion } from "framer-motion";

const NODES = [
  { angle: -60, r: 100, label: "Location" },
  { angle: 20, r: 100, label: "Transaction" },
  { angle: 100, r: 100, label: "Gestion" },
  { angle: 190, r: 100, label: "Direction" },
  { angle: -20, r: 150, label: "Réseau" },
  { angle: 140, r: 150, label: "Sécurité" },
];

export function OrbitIllustration() {
  const reduced = useReducedMotion();

  return (
    <svg viewBox="0 0 400 400" fill="none" className="w-full h-auto" role="img" aria-label="ImmoPilot au centre du quotidien des agences immobilières">
      <defs>
        <radialGradient id="orbit-core" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#3557FF" />
          <stop offset="1" stopColor="#5B3CCF" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="200"
        cy="200"
        r="150"
        stroke="#E3E7EF"
        strokeWidth="1"
        strokeDasharray="3 5"
        style={{ transformOrigin: "200px 200px" }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="200"
        cy="200"
        r="100"
        stroke="#E3E7EF"
        strokeWidth="1"
        strokeDasharray="3 5"
        style={{ transformOrigin: "200px 200px" }}
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      <motion.g
        initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <circle cx="200" cy="200" r="46" fill="url(#orbit-core)" />
        <path d="M200 178 L216 224 L200 212 L184 224 Z" fill="white" />
      </motion.g>

      {NODES.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = 200 + n.r * Math.cos(rad);
        const y = 200 + n.r * Math.sin(rad);
        return (
          <motion.g
            key={i}
            initial={reduced ? undefined : { opacity: 0, scale: 0.4 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            <circle cx={x} cy={y} r="26" fill="white" stroke="#E3E7EF" />
            <text x={x} y={y + 3} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0b1220">
              {n.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
