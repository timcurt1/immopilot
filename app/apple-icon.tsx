import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <svg width="112" height="112" viewBox="0 0 32 32" fill="none">
          <path d="M26.34 14.18A10.5 10.5 0 1 1 21.25 6.9" stroke="#0b1220" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M20.5 10.64A7 7 0 0 1 22.58 13.61" stroke="#0b1220" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="24.6" cy="9.98" r="2.6" fill="#3557ff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
