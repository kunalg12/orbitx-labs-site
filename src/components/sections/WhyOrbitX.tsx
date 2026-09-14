"use client";

import { motion } from "framer-motion";

const differentiators = [
  {
    icon: "⌖",
    title: "Founder-led, no middlemen",
    description:
      "You work directly with the person writing the code. No account managers, no game of telephone, no translation layer between you and your product.",
  },
  {
    icon: "⚡",
    title: "Ship in weeks, not quarters",
    description:
      "We've delivered live nursing college sites, AI agents, and mobile apps in 2–8 weeks. Small team, full focus, zero bureaucracy.",
  },
  {
    icon: "◈",
    title: "AI-native by default",
    description:
      "We don't bolt AI on — we design with it from the start. Every product we build considers where LLMs, embeddings, or automation can multiply your value.",
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
        {/* Header — straight, no italic contrast */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "80px",
            alignItems: "end",
            marginBottom: "72px",
          }}
          className="why-header"
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
            The agency that builds.
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
            Most agencies have more project managers than engineers. We flipped that — a small, senior team that ships real products, not decks about products.
          </p>
        </div>

        {/* 3-column differentiator cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            background: "var(--color-border)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
          className="why-cards"
        >
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              style={{
                background: "var(--color-bg-base)",
                padding: "40px 36px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Accent icon */}
              <span
                style={{
                  fontSize: "22px",
                  color: "var(--color-accent)",
                  lineHeight: 1,
                  display: "block",
                }}
                aria-hidden="true"
              >
                {d.icon}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(17px, 1.5vw, 21px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {d.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {d.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Metrics strip */}
        <div
          className="why-metrics"
          style={{
            display: "flex",
            gap: "0",
            marginTop: "64px",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "100%", label: "On-time delivery" },
            { value: "0", label: "Scope creep surprises" },
            { value: "8+", label: "Products shipped" },
          ].map((m, i) => (
            <div
              key={m.label}
              className="why-metric-item"
              style={{
                paddingRight: "48px",
                paddingLeft: i > 0 ? "48px" : "0",
                borderLeft: i > 0 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 3vw, 48px)",
                  fontWeight: 800,
                  color: "var(--color-accent)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--color-text-muted)",
                  marginTop: "4px",
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
          .why-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .why-cards { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 560px) and (max-width: 900px) {
          .why-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .why-metrics { flex-direction: column !important; gap: 24px !important; }
          .why-metric-item { padding-left: 0 !important; padding-right: 0 !important; border-left: none !important; border-top: 1px solid var(--color-border) !important; padding-top: 24px !important; }
          .why-metric-item:first-child { border-top: none !important; padding-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}
