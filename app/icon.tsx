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
          <path d="M26.34 14.18A10.5 10.5 0 1 1 21.25 6.9" stroke="#0b1220" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M20.5 10.64A7 7 0 0 1 22.58 13.61" stroke="#0b1220" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="24.6" cy="9.98" r="2.6" fill="#3557ff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
