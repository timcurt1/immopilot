import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage(eyebrow: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0b1220",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(53,87,255,0.45), transparent 45%), radial-gradient(circle at 85% 30%, rgba(139,92,246,0.35), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#fafaf9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M22.75 24.04A10.5 10.5 0 1 1 15.08 5.54" stroke="#0b1220" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M25.52 11.56A10.5 10.5 0 0 1 26.5 16" stroke="#0b1220" strokeWidth="2.8" strokeLinecap="round" />
              <circle cx="22.02" cy="7.4" r="2.7" fill="#3557ff" />
            </svg>
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "white", letterSpacing: -1 }}>immoPILOT</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: "#93a5ff", marginBottom: 16, textTransform: "uppercase", letterSpacing: 2 }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: 54, fontWeight: 800, color: "white", lineHeight: 1.15, maxWidth: 960, letterSpacing: -1.5 }}>
          {title}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
