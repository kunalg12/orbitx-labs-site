import { ImageResponse } from "next/og";
import { OrbitMark } from "@/lib/orbit-mark";

export const alt =
  "OrbitX Labs — AI agents, software, and mobile apps. Ship in weeks, not months.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share card shown when a link to the site is posted.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#050508",
          // Warm accent glow, top-right
          backgroundImage:
            "radial-gradient(900px 500px at 100% 0%, rgba(245,158,11,0.18), transparent 60%)",
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <OrbitMark size={72} accent="#F59E0B" />
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#F5F5F4",
            }}
          >
            OrbitX Labs
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FAFAF9",
              maxWidth: 940,
            }}
          >
            AI agents, software &amp; mobile apps.
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 400,
              color: "#9CA3AF",
            }}
          >
            Small, founder-led agency. Ship in weeks, not months.
          </div>
        </div>

        {/* Footer meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            fontWeight: 500,
            color: "#F59E0B",
          }}
        >
          <div style={{ display: "flex" }}>AI Agents</div>
          <div style={{ display: "flex", color: "#4B5563" }}>·</div>
          <div style={{ display: "flex" }}>Software</div>
          <div style={{ display: "flex", color: "#4B5563" }}>·</div>
          <div style={{ display: "flex" }}>Mobile</div>
          <div style={{ display: "flex", color: "#4B5563" }}>·</div>
          <div style={{ display: "flex" }}>Web</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
