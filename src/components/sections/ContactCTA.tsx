"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

  // Lerped cursor glow — follows mouse with soft lag
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let id = 0;
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.06);
      current.current.y = lerp(current.current.y, target.current.y, 0.06);
      if (glowRef.current) {
        const x = current.current.x * 100;
        const y = current.current.y * 100;
        glowRef.current.style.background = `radial-gradient(circle 600px at ${x}% ${y}%, rgba(201,101,0,0.14) 0%, transparent 70%)`;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    target.current.x = (e.clientX - rect.left) / rect.width;
    target.current.y = (e.clientY - rect.top) / rect.height;
  };

  return (
    <section
      ref={sectionRef}
      id="contact-cta"
      onMouseMove={handleMouseMove}
      style={{
        background: "var(--color-bg-surface)",
        borderTop: "1px solid var(--color-border)",
        paddingBlock: "clamp(100px, 14vw, 180px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cursor glow layer */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          transition: "none",
        }}
      />

      {/* Subtle dot grid — theme-aware opacity */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: "center" }}
        >
          {/* Overture line */}
          <p
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--color-text-muted)",
              marginBottom: "32px",
              letterSpacing: "0.06em",
            }}
          >
            orbitxlabs.com · ready when you are
          </p>

          {/* Oversized headline — the only thing on the screen */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 8vw, 110px)",
              fontWeight: 800,
              letterSpacing: "-0.045em",
              color: "var(--color-text-primary)",
              lineHeight: 1.0,
              margin: "0 auto 48px",
              maxWidth: "900px",
            }}
          >
            Let&apos;s build
            <br />
            <span style={{ color: "var(--color-accent)" }}>something real.</span>
          </h2>

          {/* Short qualifier */}
          <p
            style={{
              fontSize: "clamp(15px, 1.4vw, 18px)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto 48px",
            }}
          >
            Tell us what you&apos;re building. We&apos;ll respond within 24 hours
            and have a proposal ready within the week.
          </p>

          {/* Primary CTA */}
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "18px 40px",
              background: "var(--color-accent)",
              color: "#fff",
              borderRadius: "var(--radius-md)",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              boxShadow: "0 4px 32px rgba(245,158,11,0.35)",
              transition: "transform 220ms ease, box-shadow 220ms ease, background 150ms ease",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = "0 12px 48px rgba(245,158,11,0.50)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 32px rgba(245,158,11,0.35)";
            }}
          >
            Start a conversation
          </Link>

          {/* Supporting links */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              marginTop: "48px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/work"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--color-text-muted)",
                textDecoration: "none",
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")
              }
            >
              See our work
            </Link>
            <span style={{ color: "var(--color-border)", userSelect: "none" }}>·</span>
            <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>Response: within 24 hrs</span>
            <span style={{ color: "var(--color-border)", userSelect: "none" }}>·</span>
            <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>Kickoff: within 1 week</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
