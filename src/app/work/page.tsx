import { getAllWork } from "@/lib/work";
import { WorkGrid } from "./WorkGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and projects from OrbitX Labs — AI agents, web platforms, mobile apps, and software.",
};

export default async function WorkPage() {
  const projects = await getAllWork();

  return (
    <>
      <div
        style={{
          paddingTop: "calc(var(--nav-height) + 48px)",
          paddingBottom: "40px",
          background: "var(--color-bg-base)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "16px",
            }}
          >
            Portfolio
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 96px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
            }}
          >
            Things we&apos;ve{" "}
            <span style={{ fontWeight: 300, fontStyle: "italic" }}>shipped</span>
          </h1>
        </div>
      </div>

      <WorkGrid initialProjects={projects} />

      <div
        style={{
          background: "var(--color-bg-base)",
          borderTop: "1px solid var(--color-border)",
          padding: "80px var(--container-padding)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            color: "var(--color-text-secondary)",
            marginBottom: "24px",
          }}
        >
          Have a project in mind?
        </p>
        <a
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            background: "var(--color-accent)",
            color: "#fff",
            borderRadius: "9999px",
            fontSize: "15px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Let&apos;s talk →
        </a>
      </div>
    </>
  );
}
