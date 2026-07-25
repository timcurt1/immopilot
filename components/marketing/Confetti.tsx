"use client";

import { useMemo } from "react";

const COLORS = ["#3557FF", "#5B3CCF", "#0d9488", "#f43f8e", "#fb923c", "#16a34a"];

export function Confetti({ count = 60 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 200,
        spin: 180 + Math.random() * 360,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 6,
        round: Math.random() > 0.5,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-20px] animate-confetti-fall"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.round ? "999px" : "3px",
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
