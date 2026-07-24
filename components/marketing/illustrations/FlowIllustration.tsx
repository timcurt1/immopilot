export function FlowIllustration() {
  return (
    <svg viewBox="0 0 480 320" fill="none" className="w-full h-auto" role="img" aria-label="Flux d'information centralisé par ImmoPilot">
      <defs>
        <linearGradient id="flow-line" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3557FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#3557FF" />
          <stop offset="1" stopColor="#5B3CCF" />
        </linearGradient>
        <radialGradient id="flow-core" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#3557FF" />
          <stop offset="1" stopColor="#5B3CCF" />
        </radialGradient>
      </defs>

      {/* Sources scattered on the left */}
      {[
        { x: 40, y: 60, label: "E-mail" },
        { x: 30, y: 140, label: "Portail" },
        { x: 50, y: 220, label: "Téléphone" },
        { x: 40, y: 280, label: "Visite" },
      ].map((s, i) => (
        <g key={i}>
          <path
            d={`M ${s.x + 24} ${s.y} C ${160} ${s.y}, ${180} 160, 232 160`}
            stroke="url(#flow-line)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          <circle cx={s.x} cy={s.y} r="22" fill="white" stroke="#E3E7EF" />
          <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="#3c4657">
            {s.label}
          </text>
        </g>
      ))}

      {/* Central node */}
      <circle cx="240" cy="160" r="38" fill="url(#flow-core)" />
      <text x="240" y="156" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
        ImmoPilot
      </text>
      <text x="240" y="170" textAnchor="middle" fontSize="8" fill="white" opacity="0.8">
        analyse
      </text>

      {/* Outputs on the right */}
      {[
        { x: 430, y: 90, label: "Fiche créée" },
        { x: 440, y: 160, label: "Action recommandée" },
        { x: 430, y: 230, label: "Relance préparée" },
      ].map((s, i) => (
        <g key={i}>
          <path
            d={`M 278 160 C 330 160, 340 ${s.y}, ${s.x - 46} ${s.y}`}
            stroke="url(#flow-line)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <rect x={s.x - 46} y={s.y - 14} width="92" height="28" rx="14" fill="white" stroke="#E3E7EF" />
          <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0b1220">
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
