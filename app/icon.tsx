import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafaf9",
          borderRadius: 18,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
          <path d="M22.75 24.04A10.5 10.5 0 1 1 15.08 5.54" stroke="#0b1220" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M25.52 11.56A10.5 10.5 0 0 1 26.5 16" stroke="#0b1220" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="22.02" cy="7.4" r="2.7" fill="#3557ff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
