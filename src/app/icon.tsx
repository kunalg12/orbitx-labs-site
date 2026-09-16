import { ImageResponse } from "next/og";
import { OrbitMark } from "@/lib/orbit-mark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Branded favicon — orbital mark on the dark brand ground.
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
          background: "#050508",
          borderRadius: 12,
        }}
      >
        <OrbitMark size={44} accent="#F59E0B" />
      </div>
    ),
    { ...size }
  );
}
