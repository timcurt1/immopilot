"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AmbientBackground({
  tone = "light",
  grid = true,
  parallax = false,
}: {
  tone?: "light" | "dark";
  grid?: boolean;
  parallax?: boolean;
}) {
  const blobA = tone === "dark" ? "rgba(96,130,255,0.35)" : "rgba(53,87,255,0.22)";
  const blobB = tone === "dark" ? "rgba(139,92,246,0.3)" : "rgba(91,60,207,0.16)";

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [0, parallax ? 120 : 0]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, parallax ? -90 : 0]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {grid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${tone === "dark" ? "rgba(255,255,255,0.14)" : "rgba(11,18,32,0.08)"} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
      )}
      <motion.div
        style={parallax ? { y: yA } : undefined}
        className="absolute -top-32 left-[8%] h-[380px] w-[380px] rounded-full blur-3xl animate-drift-a"
      >
        <div className="h-full w-full rounded-full" style={{ background: blobA }} />
      </motion.div>
      <motion.div
        style={parallax ? { y: yB } : undefined}
        className="absolute -top-10 right-[6%] h-[320px] w-[320px] rounded-full blur-3xl animate-drift-b"
      >
        <div className="h-full w-full rounded-full" style={{ background: blobB }} />
      </motion.div>
    </div>
  );
}
