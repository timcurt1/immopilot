"use client";

import { useRef, type ReactNode } from "react";

export function Spotlight({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    el.style.setProperty("--spotlight-opacity", "1");
  }

  function handleLeave() {
    ref.current?.style.setProperty("--spotlight-opacity", "0");
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`spotlight ${dark ? "spotlight-dark" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
