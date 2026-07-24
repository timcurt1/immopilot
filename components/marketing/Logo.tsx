type LogoProps = {
  tone?: "dark" | "light";
  mark?: boolean;
  className?: string;
};

export function Logo({ tone = "dark", mark = true, className = "" }: LogoProps) {
  const textColor = tone === "dark" ? "#0b1220" : "#ffffff";
  return (
    <span className={`inline-flex items-center gap-2.5 font-display font-extrabold tracking-tight ${className}`}>
      {mark && <LogoMark size={30} />}
      <span style={{ color: textColor }} className="text-[19px] leading-none">
        ImmoPilot
      </span>
    </span>
  );
}

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
      <rect width="32" height="32" rx="9" fill="url(#ip-grad-bg)" />
      <path d="M16 7L22.5 24.5L16 20.5L9.5 24.5L16 7Z" fill="white" />
      <defs>
        <linearGradient id="ip-grad-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3557FF" />
          <stop offset="1" stopColor="#5B3CCF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
