import { ImageResponse } from "next/og";
import { LOGO_MARK_DATA_URI } from "@/lib/logoMarkDataUri";

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
          borderRadius: 18,
          overflow: "hidden",
          background: "#fafaf9",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_MARK_DATA_URI} width={64} height={64} alt="" />
      </div>
    ),
    { ...size }
  );
}
