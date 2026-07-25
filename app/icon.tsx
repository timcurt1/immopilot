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
          background: "linear-gradient(135deg, #3557FF, #5B3CCF)",
          borderRadius: 18,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
          <path d="M8 22C14 22 20 20 25 10" stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M20 8.5L25.5 9.5L24 15" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="8" cy="22" r="2.8" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
