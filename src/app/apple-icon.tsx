import { ImageResponse } from "next/og";
import { OrbitMark } from "@/lib/orbit-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — larger orbital mark, rounded brand tile.
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
          background: "#050508",
        }}
      >
        <OrbitMark size={120} accent="#F59E0B" />
      </div>
    ),
    { ...size }
  );
}
