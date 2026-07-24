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
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
          <path d="M16 7L22.5 24.5L16 20.5L9.5 24.5L16 7Z" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
