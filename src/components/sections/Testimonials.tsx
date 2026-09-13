"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "OrbitX Labs delivered our nursing college site faster than we thought possible. The result looks incredibly professional and our enrollment inquiries went up immediately.",
    name: "Sarah Johnson",
    role: "Director, CNSG Nursing College",
    initials: "SJ",
    accent: "#2563EB",
  },
  {
    quote:
      "They built exactly what we described — clean, modern, and working. No back-and-forth, no surprises on the invoice. We'll be back for the mobile app next.",
    name: "Michael Chen",
    role: "Administrator, SEI Nursing Institute",
    initials: "MC",
    accent: "#16A34A",
  },
  {
    quote:
      "The AI document analysis agent they built saves hours every week. It actually understands medical reports — not just keyword matching.",
    name: "Dr. Priya Patel",
    role: "Founder, DignoX",
    initials: "PP",
    accent: "#9333EA",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        background: "var(--color-bg-surface)",
        paddingBlock: "var(--section-gap)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
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
            What clients say.
          </h2>
        </div>

        {/* Cards grid — 3 columns desktop, stacked mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            alignItems: "start",
          }}
          className="testimonial-grid"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
              style={{
                background: "var(--color-bg-base)",
                border: "1px solid var(--color-border)",
                borderTop: `3px solid ${t.accent}`,
                borderRadius: "var(--radius-lg)",
                padding: "clamp(28px, 3vw, 40px)",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Large decorative quote mark */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "24px",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "120px",
                  lineHeight: 1,
                  color: t.accent,
                  opacity: 0.08,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                &ldquo;
              </div>

              {/* Quote text */}
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  fontWeight: 400,
                  color: "var(--color-text-primary)",
                  lineHeight: 1.6,
                  letterSpacing: "-0.015em",
                  margin: 0,
                  position: "relative",
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: `color-mix(in srgb, ${t.accent} 15%, var(--color-bg-surface))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: t.accent,
                    flexShrink: 0,
                    border: `1px solid color-mix(in srgb, ${t.accent} 25%, transparent)`,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 560px) and (max-width: 900px) {
          .testimonial-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
