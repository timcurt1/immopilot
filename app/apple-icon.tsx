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
          background: "linear-gradient(135deg, #3557FF, #5B3CCF)",
        }}
      >
        <svg width="100" height="100" viewBox="0 0 32 32" fill="none">
          <path d="M16 7L22.5 24.5L16 20.5L9.5 24.5L16 7Z" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
