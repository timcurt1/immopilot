type LogoProps = {
  tone?: "dark" | "light";
  mark?: boolean;
  tagline?: boolean;
  className?: string;
};

export function Logo({ tone = "dark", mark = true, tagline = false, className = "" }: LogoProps) {
  const textColor = tone === "dark" ? "#0b1220" : "#ffffff";
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="inline-flex items-center gap-2 font-display tracking-tight">
        {mark && <LogoMark size={28} />}
        <span className="text-[19px] leading-none">
          <span className="font-medium" style={{ color: textColor }}>
            immo
          </span>
          <span className="font-extrabold" style={{ color: textColor }}>
            PILOT
          </span>
        </span>
      </span>
      {tagline && (
        <span
          className="mt-1.5 text-[11px] font-semibold tracking-wide"
          style={{ color: tone === "dark" ? "#64748b" : "rgba(255,255,255,0.65)" }}
        >
          <span style={{ color: tone === "dark" ? "#2451ff" : "#8ea2ff" }}>L&rsquo;IA</span> prépare, l&rsquo;agent décide.
        </span>
      )}
    </span>
  );
}

/** Open-ring "orbit" mark with an AI accent dot. `size` sets both width and height (square). */
export function LogoMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src="/logo-mark.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
