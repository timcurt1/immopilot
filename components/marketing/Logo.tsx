type LogoProps = {
  tone?: "dark" | "light";
  mark?: boolean;
  tagline?: boolean;
  className?: string;
};

export function Logo({ tone = "dark", mark = true, tagline = false, className = "" }: LogoProps) {
  const immoColor = tone === "dark" ? "#0b1220" : "#ffffff";
  const pilotColor = tone === "dark" ? "#2451ff" : "#8ea2ff";
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="inline-flex items-center gap-2.5 font-display font-extrabold tracking-tight">
        {mark && <LogoMark size={26} />}
        <span className="text-[19px] leading-none">
          <span style={{ color: immoColor }}>Immo</span>
          <span style={{ color: pilotColor }}>Pilot</span>
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

/** Skyline + growth-arrow mark. `size` sets the rendered height; width follows the 5:3 aspect ratio. */
export function LogoMark({ size = 26, className = "" }: { size?: number; className?: string }) {
  const w = Math.round(size * (120 / 72));
  return (
    <svg width={w} height={size} viewBox="0 0 120 72" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path
        d="M20 60V38L34 24L48 38V60"
        stroke="#0b1220"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46 60V26L66 8L86 26V60"
        stroke="#0b1220"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="54" r="10" fill="url(#ip-mark-glow)" opacity="0.55" />
      <path
        d="M18 54C42 54,72 50,100 21"
        stroke="url(#ip-mark-line)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M85 16.5L101.5 20.5L97 34" stroke="url(#ip-mark-line)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="18" cy="54" r="5" fill="#2451ff" />
      <defs>
        <linearGradient id="ip-mark-line" x1="18" y1="54" x2="101" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3557FF" />
          <stop offset="1" stopColor="#2451FF" />
        </linearGradient>
        <radialGradient id="ip-mark-glow" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#3557FF" />
          <stop offset="1" stopColor="#3557FF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/** Compact badge variant of the mark, for favicons / app icons / OG images. */
export function LogoBadge({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="url(#ip-badge-bg)" />
      <path d="M8 22 C 14 22, 20 20, 25 10" stroke="white" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M20 8.5L25.5 9.5L24 15" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="8" cy="22" r="2.6" fill="white" />
      <defs>
        <linearGradient id="ip-badge-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3557FF" />
          <stop offset="1" stopColor="#1636B0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
