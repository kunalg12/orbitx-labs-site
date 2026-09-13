"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useMobileGL } from "@/lib/utils";
import { HeroVisualB } from "./HeroVisualB";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const lineVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } },
};

const HEADLINE: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(36px, 4.5vw, 58px)",
  fontWeight: 800,
  lineHeight: 1.06,
  letterSpacing: "-0.05em",
  margin: 0,
};

export function Hero() {
  const isMobile = useMobileGL();

  return (
    <section
      id="hero-section"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-bg-base)",
        paddingTop: "var(--nav-height)",
      }}
    >
      {/* Device mockups — right 50%, clear of text */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: "50%",
            pointerEvents: "none",
          }}
        >
          <HeroVisualB />
        </div>
      )}

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "140px",
          background: "linear-gradient(to top, var(--color-bg-base), transparent)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {isMobile && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 50% at 100% 40%, rgba(201,101,0,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        className="container"
        style={{ position: "relative", zIndex: 2, paddingBottom: "60px", paddingTop: "48px" }}
      >
        <div style={{ maxWidth: "min(580px, 48vw)" }} className="hero-text-col">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            {/* Availability badge */}
            <motion.div variants={itemVariants} style={{ marginBottom: "32px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--color-text-muted)",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#22C55E",
                    display: "inline-block",
                    boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
                    animation: "pulse-green 2.4s infinite",
                    flexShrink: 0,
                  }}
                />
                Taking on new projects · AI agency since 2024
              </span>
            </motion.div>

            {/* Headline — clip-path reveal per line */}
            <div style={{ overflow: "hidden", marginBottom: "2px" }}>
              <motion.h1 variants={lineVariants} style={{ ...HEADLINE, color: "var(--color-text-primary)" }}>
                We build AI,
              </motion.h1>
            </div>
            <div style={{ overflow: "hidden", marginBottom: "2px" }}>
              <motion.div variants={lineVariants} style={{ ...HEADLINE, color: "var(--color-text-primary)" }}>
                software &amp; apps
              </motion.div>
            </div>
            <div style={{ overflow: "hidden", marginBottom: "2px" }}>
              <motion.div variants={lineVariants} style={{ ...HEADLINE, fontWeight: 300, color: "var(--color-text-secondary)" }}>
                competitors haven&apos;t
              </motion.div>
            </div>
            <div style={{ overflow: "hidden", marginBottom: "40px" }}>
              <motion.div variants={lineVariants} style={{ ...HEADLINE, color: "var(--color-accent)" }}>
                shipped yet.
              </motion.div>
            </div>

            {/* Subhead */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "clamp(14px, 1.3vw, 16px)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.72,
                maxWidth: "440px",
                marginBottom: "40px",
              }}
            >
              Founder-led team building AI agents, web platforms, and mobile apps.
              Real quality, shipped in weeks — not quarters.
            </motion.p>

            {/* CTAs — contact is the primary conversion action */}
            <motion.div
              variants={itemVariants}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}
            >
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  background: "var(--color-accent)",
                  color: "#fff",
                  borderRadius: "var(--radius-md)",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  boxShadow: "0 4px 20px rgba(201,101,0,0.30)",
                  transition: "transform 200ms ease, box-shadow 200ms ease, background 150ms ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 8px 28px rgba(201,101,0,0.42)";
                  el.style.background = "var(--color-accent-hover)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 4px 20px rgba(201,101,0,0.30)";
                  el.style.background = "var(--color-accent)";
                }}
              >
                Start a project
              </Link>
              <Link
                href="/work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  background: "transparent",
                  color: "var(--color-text-primary)",
                  border: "1.5px solid var(--color-border-strong)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  transition: "border-color 200ms ease, background 200ms ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--color-accent)";
                  el.style.background = "rgba(201,101,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--color-border-strong)";
                  el.style.background = "transparent";
                }}
              >
                View our work
              </Link>
            </motion.div>

            {/* Stats — larger numbers in amber */}
            <motion.div
              variants={itemVariants}
              style={{ display: "flex", marginTop: "40px", flexWrap: "wrap", gap: "0 0" }}
            >
              {[
                { value: "8+", label: "Projects shipped" },
                { value: "4", label: "Live client sites" },
                { value: "3+", label: "AI agents built" },
                { value: "≤6wks", label: "Avg delivery" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    paddingRight: "24px",
                    paddingLeft: i > 0 ? "24px" : "0",
                    borderLeft: i > 0 ? "1px solid var(--color-border)" : "none",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(22px, 2.5vw, 34px)",
                      fontWeight: 800,
                      color: "var(--color-accent)",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      marginBottom: "4px",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--color-text-muted)",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            width: "20px",
            height: "32px",
            borderRadius: "10px",
            border: "1.5px solid var(--color-border-strong)",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{
              width: "3px",
              height: "6px",
              borderRadius: "2px",
              background: "var(--color-text-muted)",
            }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.06); }
        }
        @keyframes glow-breathe {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @media (max-width: 900px) {
          .hero-text-col { max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
