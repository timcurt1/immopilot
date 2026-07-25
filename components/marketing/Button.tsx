"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper [&_svg]:transition-transform [&_svg]:duration-200 group-hover/btn:[&_svg]:translate-x-0.5";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-brand-700 shadow-[0_10px_30px_rgba(29,67,230,0.25)] hover:shadow-[0_14px_40px_rgba(29,67,230,0.4)]",
  secondary: "bg-white text-ink border border-line hover:border-ink/30 hover:bg-surface",
  ghost: "text-ink hover:bg-surface",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

function useMagnetic() {
  const ref = useRef<HTMLElement | null>(null);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const clampedX = Math.max(-8, Math.min(8, dx * 0.25));
    const clampedY = Math.max(-6, Math.min(6, dy * 0.35));
    el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) scale(1.035)`;
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0, 0, 0) scale(1)";
  }

  function onClick(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const ripple = document.createElement("span");
    ripple.className = "btn-ripple opacity-25";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 620);
  }

  return { ref, onMouseMove, onMouseLeave, onClick };
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const magnetic = useMagnetic();
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const style = { transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)" };

  if (href) {
    return (
      <Link
        ref={magnetic.ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        style={style}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        onClick={(e) => {
          magnetic.onClick(e);
          onClick?.();
        }}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={magnetic.ref as React.Ref<HTMLButtonElement>}
      type={type ?? "button"}
      style={style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      onClick={(e) => {
        magnetic.onClick(e);
        onClick?.();
      }}
      className={classes}
    >
      {children}
    </button>
  );
}
