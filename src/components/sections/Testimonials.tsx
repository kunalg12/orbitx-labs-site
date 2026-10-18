"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const testimonials = [
  {
    quote:
      "OrbitX Labs delivered our nursing college enrollment portal faster than we thought possible. The outcome looks world-class and our online applicant inquiries increased immediately.",
    name: "Dr. Sarah Johnson",
    role: "Director · CNSG Nursing College",
    initials: "SJ",
    accent: "var(--color-accent)",
    accentBg: "var(--color-accent-light)",
  },
  {
    quote:
      "They engineered exactly what was promised: clean, fast, and stable. No communication lag, no surprise invoices. We're launching our mobile attendance app with them next.",
    name: "Michael Chen",
    role: "Administrator · SEI Nursing Institute",
    initials: "MC",
    accent: "var(--color-system-green)",
    accentBg: "color-mix(in srgb, var(--color-system-green) 12%, transparent)",
  },
  {
    quote:
      "The clinical document analysis agent they built saves our medical team hours daily. It accurately parses structured diagnoses from complex laboratory PDF reports.",
    name: "Dr. Priya Patel",
    role: "Chief Medical Officer · DignoX AI",
    initials: "PP",
    accent: "var(--color-system-purple)",
    accentBg: "color-mix(in srgb, var(--color-system-purple) 12%, transparent)",
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
        <div style={{ maxWidth: "680px", marginBottom: "56px" }}>
          <SectionLabel number="06">Endorsements</SectionLabel>
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
            Trusted by founders and institutional leaders.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Direct feedback from clients whose critical infrastructure, AI models, and student portals we engineered and deployed.
          </p>
        </div>

        {/* Apple Testimonial Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="testimonial-grid"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 1, 0.5, 1],
              }}
              whileHover={{ y: -4 }}
              className="apple-card"
              style={{
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Quote text */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.65,
                  letterSpacing: "-0.01em",
                  margin: "0 0 28px 0",
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Client Profile Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                {/* Apple squircle avatar monogram */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: t.accentBg,
                    color: t.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                    flexShrink: 0,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  {t.initials}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      lineHeight: 1.25,
                      marginBottom: "3px",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                      fontWeight: 500,
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
          .testimonial-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}
