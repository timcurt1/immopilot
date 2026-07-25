"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollDrawLine({ top = "top-9", inset = "left-[18%] right-[18%]" }: { top?: string; inset?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} aria-hidden="true" className={`hidden md:block absolute ${top} ${inset} h-px overflow-hidden`}>
      <div className="absolute inset-0 bg-line" />
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="absolute inset-0 bg-gradient-to-r from-brand-500 via-brand-500 to-violet-500"
      />
    </div>
  );
}
