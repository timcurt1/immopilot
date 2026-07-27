import { ImageResponse } from "next/og";
import { LOGO_MARK_DATA_URI } from "@/lib/logoMarkDataUri";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fafaf9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_MARK_DATA_URI} width={180} height={180} alt="" />
      </div>
    ),
    { ...size }
  );
}
