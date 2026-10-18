"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { HeroVisualB } from "./HeroVisualB";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
};

const HEADLINE: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(34px, 4.2vw, 54px)",
  fontWeight: 700,
  lineHeight: 1.08,
  letterSpacing: "var(--tracking-hero)",
  margin: 0,
};

export function Hero() {
  return (
    <section
      id="hero-section"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        overflowX: "clip",
        background: "var(--color-bg-base)",
        paddingTop: "var(--nav-height)",
      }}
    >
      {/* Subtle Apple ambient radial glow */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1000px, 90vw)",
          height: "400px",
          background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        className="container hero-outer"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "48px",
          paddingBottom: "clamp(28px, 4vh, 56px)",
          paddingTop: "clamp(24px, 3vh, 40px)",
          flex: 1,
        }}
      >
        {/* Left: Apple typographic content */}
        <div className="hero-text-col" style={{ flex: "0 0 auto", width: "min(560px, 52%)" }}>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            {/* Apple Vision Status Badge */}
            <motion.div variants={itemVariants} style={{ marginBottom: "20px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-full)",
                  padding: "6px 14px",
                  backdropFilter: "blur(16px) saturate(180%)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  letterSpacing: "0.02em",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "var(--color-system-green)",
                    display: "inline-block",
                    boxShadow: "0 0 0 3px rgba(52,199,89,0.25)",
                    animation: "pulse-green 2.4s infinite",
                    flexShrink: 0,
                  }}
                />
                Available for new projects · 2026
              </span>
            </motion.div>

            {/* Headline */}
            <div style={{ marginBottom: "2px" }}>
              <motion.h1 variants={lineVariants} style={{ ...HEADLINE, color: "var(--color-text-primary)" }}>
                We build AI,
              </motion.h1>
            </div>
            <div style={{ marginBottom: "2px" }}>
              <motion.div variants={lineVariants} style={{ ...HEADLINE, color: "var(--color-text-primary)" }}>
                software &amp; apps
              </motion.div>
            </div>
            <div style={{ marginBottom: "2px" }}>
              <motion.div variants={lineVariants} style={{ ...HEADLINE, fontWeight: 400, color: "var(--color-text-secondary)" }}>
                competitors haven&apos;t
              </motion.div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <motion.div variants={lineVariants} style={{ ...HEADLINE, color: "var(--color-accent)" }}>
                shipped yet.
              </motion.div>
            </div>

            {/* Subhead */}
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16.5px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.55,
                maxWidth: "480px",
                marginBottom: "26px",
                letterSpacing: "-0.01em",
              }}
            >
              Founder-led agency building production AI agents, high-performance web platforms, and mobile apps. Real quality, shipped in weeks.
            </motion.p>

            {/* Apple Action Button Group */}
            <motion.div
              variants={itemVariants}
              style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "28px" }}
            >
              <Link
                href="/contact"
                className="btn-apple-primary"
                style={{ fontSize: "14px", padding: "12px 24px" }}
              >
                Start a project
              </Link>
              <Link
                href="/work"
                className="btn-apple-secondary"
                style={{ fontSize: "14px", padding: "12px 24px" }}
              >
                View our work
              </Link>
              <button
                data-cal-link="kunal-gursal-cxyibu/30min"
                data-cal-config='{"layout":"month_view"}'
                className="btn-apple-ghost"
                style={{ fontSize: "14px", padding: "12px 20px" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.75 }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book call
              </button>
            </motion.div>

            {/* Apple Metrics Row */}
            <motion.div
              variants={itemVariants}
              className="hero-stats"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "12px",
                paddingTop: "24px",
                borderTop: "1px solid var(--color-border)",
                width: "100%",
              }}
            >
              {[
                { value: "8+", label: "Projects shipped" },
                { value: "4", label: "Live client portals" },
                { value: "3+", label: "AI agents deployed" },
                { value: "≤6wks", label: "Average delivery" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="hero-stat-item"
                  style={{
                    paddingLeft: i > 0 ? "14px" : "0",
                    borderLeft: i > 0 ? "1px solid var(--color-border)" : "none",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(22px, 2.2vw, 28px)",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      marginBottom: "6px",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.35,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right: macOS Developer Studio Window */}
        <div className="hero-visual-col" style={{ flex: 1, minWidth: 0 }}>
          <HeroVisualB />
        </div>
      </div>

      <style>{`
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 3px rgba(52,199,89,0.25); }
          50% { box-shadow: 0 0 0 6px rgba(52,199,89,0.06); }
        }
        @media (max-width: 960px) {
          .hero-outer      { flex-direction: column !important; align-items: stretch !important; gap: 36px !important; }
          .hero-text-col   { width: 100% !important; flex: none !important; }
          .hero-visual-col { width: 100% !important; flex: none !important; }
        }
        @media (max-width: 640px) {
          .hero-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 16px 20px !important;
          }
          .hero-stat-item {
            padding-left: 0 !important;
            border-left: none !important;
          }
        }
      `}</style>
    </section>
  );
}
