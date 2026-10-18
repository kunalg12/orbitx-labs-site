"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    num: "01",
    title: "Kickoff",
    tagline: "48-Hour Scope Alignment",
    description: "One deep-dive strategy session to lock goals, tech stack, and user flows. No discovery theatre or bloated paperwork.",
  },
  {
    num: "02",
    title: "Prototype",
    tagline: "Interactive UI & Architecture",
    description: "Clickable prototypes and system architectures reviewed and approved before production code begins.",
  },
  {
    num: "03",
    title: "Sprint Build",
    tagline: "Weekly Live Demos",
    description: "Rapid agile development with staged preview URLs every 7 days. Real working software visible immediately.",
  },
  {
    num: "04",
    title: "Verification",
    tagline: "Stress & Device Testing",
    description: "Comprehensive audits across mobile browsers, lighthouse benchmarks, and real-device responsive checks.",
  },
  {
    num: "05",
    title: "Deployment",
    tagline: "Zero-Downtime Launch",
    description: "Deployed directly to your infrastructure with full docs, ownership transfer, and ongoing retainer warranty.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      style={{
        background: "var(--color-bg-base)",
        paddingBlock: "var(--section-gap)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: "680px", marginBottom: "56px" }}>
          <SectionLabel number="03">Engineering Workflow</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display)",
              fontWeight: 700,
              letterSpacing: "var(--tracking-display)",
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Five disciplined milestones. Zero surprises.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Built to eliminate the uncertainty that breaks typical agency engagements. Every stage has an unambiguous deliverable, a dedicated engineer, and a guaranteed timeline.
          </p>
        </div>

        {/* Steps Grid - Apple Stepper Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
          }}
          className="process-steps"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.25, 1, 0.5, 1],
              }}
              whileHover={{ y: -3 }}
              className="apple-card"
              style={{
                padding: "28px 22px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Number Capsule */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "var(--color-accent-light)",
                  color: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  marginBottom: "20px",
                }}
              >
                {step.num}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                  color: "var(--color-text-primary)",
                  marginBottom: "6px",
                }}
              >
                {step.title}
              </h3>

              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  marginBottom: "12px",
                  letterSpacing: "0.01em",
                }}
              >
                {step.tagline}
              </div>

              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .process-steps { grid-template-columns: repeat(3, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 640px) {
          .process-steps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
