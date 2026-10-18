"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const differentiators = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Founder-led engineering",
    tagline: "Direct access to builders",
    description:
      "You collaborate directly with senior architects and developers. No client managers, no message dilution, and zero translation lag between vision and execution.",
    accent: "var(--color-accent)",
    accentBg: "var(--color-accent-light)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Weeks, not quarters",
    tagline: "Continuous deployment speed",
    description:
      "We deliver functional nursing portals, AI document pipelines, and cross-platform apps in 2–8 weeks. Focused scope, high velocity, and instant user validation.",
    accent: "var(--color-system-green)",
    accentBg: "color-mix(in srgb, var(--color-system-green) 12%, transparent)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
      </svg>
    ),
    title: "AI-native by foundation",
    tagline: "Automated advantage built in",
    description:
      "We don't tack on shallow wrappers. We architect applications from day one around semantic search, automated extraction, and agentic workflows.",
    accent: "var(--color-system-purple)",
    accentBg: "color-mix(in srgb, var(--color-system-purple) 12%, transparent)",
  },
];

export function WhyOrbitX() {
  return (
    <section
      id="why"
      style={{
        background: "var(--color-bg-base)",
        paddingBlock: "var(--section-gap)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: "680px", marginBottom: "56px" }}>
          <SectionLabel number="05">Philosophy</SectionLabel>
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
            The agency built for makers, not meetings.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Traditional agencies staff more account executives than engineers. OrbitX is structured in reverse: a tight, senior engineering core that turns ambitious ideas into live software.
          </p>
        </div>

        {/* 3-column Apple feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="why-cards"
        >
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -4 }}
              className="apple-card"
              style={{
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Squircle Icon */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "13px",
                  background: d.accentBg,
                  color: d.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                {d.icon}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: d.accent,
                  marginBottom: "6px",
                  letterSpacing: "0.02em",
                }}
              >
                {d.tagline}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.25,
                  marginBottom: "12px",
                }}
              >
                {d.title}
              </h3>

              <p
                style={{
                  fontSize: "15px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {d.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Apple Metrics Callout */}
        <div
          className="why-metrics apple-card"
          style={{
            display: "flex",
            marginTop: "32px",
            padding: "32px 40px",
            background: "var(--color-bg-surface)",
          }}
        >
          {[
            { value: "100%", label: "On-time delivery rate" },
            { value: "0", label: "Scope creep or invoice surprises" },
            { value: "8+", label: "Production platforms live" },
            { value: "24h", label: "Average support response" },
          ].map((m, i) => (
            <div
              key={m.label}
              className="why-metric-item"
              style={{
                flex: 1,
                paddingRight: "28px",
                paddingLeft: i > 0 ? "28px" : "0",
                borderLeft: i > 0 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 2.5vw, 36px)",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                  marginBottom: "6px",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  fontWeight: 500,
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-cards { grid-template-columns: 1fr !important; gap: 16px !important; }
          .why-metrics { flex-direction: column !important; gap: 20px !important; padding: 24px !important; }
          .why-metric-item { padding: 0 !important; border: none !important; }
        }
      `}</style>
    </section>
  );
}
