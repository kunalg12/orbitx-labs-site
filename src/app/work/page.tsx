import { getAllWork } from "@/lib/work";
import { WorkGrid } from "./WorkGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — OrbitX Labs",
  description:
    "Case studies and production systems built by OrbitX Labs — AI agents, web platforms, mobile apps, and software.",
};

export default async function WorkPage() {
  const projects = await getAllWork();

  return (
    <>
      <div
        style={{
          paddingTop: "calc(var(--nav-height) + 40px)",
          paddingBottom: "36px",
          background: "var(--color-bg-base)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <SectionLabel>Portfolio</SectionLabel>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 76px)",
              fontWeight: 700,
              letterSpacing: "var(--tracking-hero)",
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              marginTop: "8px",
            }}
          >
            Things we have shipped.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              maxWidth: "560px",
              marginTop: "12px",
            }}
          >
            Every product below is in active daily production — serving live medical admissions, student attendance, and clinical document parsing.
          </p>
        </div>
      </div>

      <WorkGrid initialProjects={projects} />

      <div
        style={{
          background: "var(--color-bg-base)",
          borderTop: "1px solid var(--color-border)",
          padding: "72px var(--container-padding)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "17px",
            color: "var(--color-text-secondary)",
            marginBottom: "20px",
          }}
        >
          Have a project ready to kick off?
        </p>
        <a
          href="/contact"
          className="btn-apple-primary"
          style={{
            fontSize: "15px",
            padding: "14px 28px",
          }}
        >
          Start a project <span>›</span>
        </a>
      </div>
    </>
  );
}
