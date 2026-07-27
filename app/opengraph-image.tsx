import { ImageResponse } from "next/og";
import { LOGO_MARK_DATA_URI } from "@/lib/logoMarkDataUri";

export const runtime = "edge";
export const alt = "ImmoPilot — L'IA pensée pour les professionnels de l'immobilier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 48 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, display: "flex", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_MARK_DATA_URI} width={64} height={64} alt="" />
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "white", letterSpacing: -1 }}>immoPILOT</div>
        </div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 800, color: "white", lineHeight: 1.1, maxWidth: 920, letterSpacing: -2 }}>
          Moins de tâches répétitives. Plus de temps pour vos clients.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.65)", marginTop: 28, maxWidth: 780 }}>
          L'IA pensée pour les professionnels de l'immobilier
        </div>
      </div>
    ),
    { ...size }
  );
}
