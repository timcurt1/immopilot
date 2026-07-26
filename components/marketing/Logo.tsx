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
        {mark && <LogoMark size={28} tone={tone} />}
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
export function LogoMark({
  size = 28,
  tone = "dark",
  className = "",
}: {
  size?: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  const ringColor = tone === "dark" ? "#0b1220" : "#ffffff";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M26.34 14.18A10.5 10.5 0 1 1 21.25 6.9" stroke={ringColor} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M20.5 10.64A7 7 0 0 1 22.58 13.61" stroke={ringColor} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="24.6" cy="9.98" r="2.6" fill="#3557ff" />
    </svg>
  );
}

/** Compact badge variant of the mark, for favicons / app icons / OG images. */
export function LogoBadge({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#fafaf9" />
      <path d="M26.34 14.18A10.5 10.5 0 1 1 21.25 6.9" stroke="#0b1220" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M20.5 10.64A7 7 0 0 1 22.58 13.61" stroke="#0b1220" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="24.6" cy="9.98" r="2.6" fill="#3557ff" />
    </svg>
  );
}
