"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Discover",
    description: "One focused kickoff call to map goals, users, and scope. No weeks of discovery theatre.",
  },
  {
    title: "Design",
    description: "Wireframes and visual design reviewed and approved before a line of code is written.",
  },
  {
    title: "Build",
    description: "Iterative sprints with weekly demos. Real progress, visible early — no big reveal at the end.",
  },
  {
    title: "Ship",
    description: "Tested across devices, deployed to your infra, with docs and handover call included.",
  },
  {
    title: "Support",
    description: "Post-launch fixes and optional retainer. We don't disappear after launch.",
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "80px",
            alignItems: "end",
            marginBottom: "80px",
          }}
          className="process-header"
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--color-text-primary)",
              lineHeight: 1.0,
              margin: 0,
            }}
          >
            Five steps,
            <br />
            no surprises.
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "480px",
              alignSelf: "flex-end",
              paddingBottom: "8px",
              margin: 0,
            }}
          >
            Our process is designed around one thing: eliminating the uncertainty that kills most agency relationships. Every phase has a clear output, a clear owner, and a clear timeline.
          </p>
        </div>

        {/* Steps — horizontal grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
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
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.19, 1, 0.22, 1],
              }}
              style={{
                borderLeft: i > 0 ? "1px solid var(--color-border)" : "none",
                borderTop: "1px solid var(--color-border)",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Step number — amber-tinted, branded rather than invisible */}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 4vw, 64px)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  color: `color-mix(in srgb, var(--color-accent) 22%, var(--color-bg-base))`,
                  lineHeight: 1,
                  display: "block",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                0{i + 1}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "var(--color-text-primary)",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
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
        @media (max-width: 900px) {
          .process-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .process-steps { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .process-steps { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 420px) {
          .process-steps { grid-template-columns: 1fr !important; }
          .process-steps > div { border-left: none !important; }
        }
      `}</style>
    </section>
  );
}
