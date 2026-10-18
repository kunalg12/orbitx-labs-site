"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

  // Smooth lerped Apple ambient glow
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let id = 0;
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.05);
      current.current.y = lerp(current.current.y, target.current.y, 0.05);
      if (glowRef.current) {
        const x = current.current.x * 100;
        const y = current.current.y * 100;
        glowRef.current.style.background = `radial-gradient(circle 500px at ${x}% ${y}%, color-mix(in srgb, var(--color-accent) 10%, transparent) 0%, transparent 70%)`;
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
        background: "var(--color-bg-base)",
        borderTop: "1px solid var(--color-border)",
        paddingBlock: "clamp(80px, 12vw, 140px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient Cursor Glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto" }}
        >
          <div style={{ marginBottom: "20px" }}>
            <SectionLabel number="07">Get In Touch</SectionLabel>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6.5vw, 84px)",
              fontWeight: 700,
              letterSpacing: "var(--tracking-hero)",
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              marginBottom: "24px",
            }}
          >
            Let&apos;s build <span style={{ color: "var(--color-accent)" }}>something real.</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.4vw, 19px)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              maxWidth: "520px",
              margin: "0 auto 36px",
            }}
          >
            Tell us about your project or target timeline. We will evaluate technical feasibility and return a detailed plan within 24 hours.
          </p>

          {/* Action Buttons */}
          <div
            className="cta-buttons"
            style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}
          >
            <Link
              href="/contact"
              className="btn-apple-primary"
              style={{ fontSize: "15px", padding: "14px 32px" }}
            >
              Start a project
            </Link>

            <button
              data-cal-link="kunal-gursal-cxyibu/30min"
              data-cal-config='{"layout":"month_view"}'
              className="btn-apple-ghost"
              style={{ fontSize: "15px", padding: "14px 28px" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.75 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book a 30-min call
            </button>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "var(--color-text-muted)",
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--color-system-green)",
                display: "inline-block",
              }}
            />
            Typical reply time: Under 4 hours
          </div>
        </motion.div>
      </div>
    </section>
  );
}
