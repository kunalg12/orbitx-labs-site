"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "ai",
    title: "AI Agents",
    tagline: "Intelligent automation that works for you",
    description:
      "Custom AI agents that automate workflows, process documents, match candidates, analyze data, and make decisions — built on the best LLMs and integrated into your existing systems.",
    bullets: [
      "Document analysis & extraction",
      "Workflow automation agents",
      "LLM-powered search & matching",
      "AI chatbots & assistants",
    ],
    timeline: "2–4 weeks",
  },
  {
    id: "software",
    title: "Software",
    tagline: "Production-grade apps, built lean",
    description:
      "Full-stack web applications with clean architecture, real databases, and APIs — built to scale. We don't over-engineer; we ship what you need, when you need it.",
    bullets: [
      "Next.js & React applications",
      "REST & GraphQL APIs",
      "Database design & optimization",
      "SaaS product development",
    ],
    timeline: "3–8 weeks",
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    tagline: "Cross-platform, native feel",
    description:
      "React Native apps for iOS and Android from a single codebase. Real device testing, App Store & Play Store submission handled, with ongoing maintenance support.",
    bullets: [
      "React Native (iOS + Android)",
      "Offline-first architecture",
      "Push notifications & analytics",
      "App Store submission & support",
    ],
    timeline: "4–10 weeks",
  },
  {
    id: "web",
    title: "Web Platforms",
    tagline: "From marketing sites to complex portals",
    description:
      "High-performance websites and web platforms — from a stunning college site to a full enrollment portal. SEO-optimized, fast-loading, accessible.",
    bullets: [
      "Marketing & institutional sites",
      "Enrollment & application portals",
      "CMS integration (Sanity, Contentful)",
      "Analytics & conversion optimization",
    ],
    timeline: "1–6 weeks",
  },
];

export function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section
      id="services"
      style={{
        background: "var(--color-bg-base)",
        paddingBlock: "var(--section-gap)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "80px",
            alignItems: "start",
            marginBottom: "80px",
          }}
          className="services-header"
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
            Four things,
            <br />
            done right.
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "520px",
              alignSelf: "flex-end",
              paddingBottom: "8px",
              margin: 0,
            }}
          >
            We stay focused so we can stay excellent. Every service we offer is
            something we&apos;ve shipped to production — not a consulting slide.
          </p>
        </div>

        {/* Services accordion */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {services.map((service, i) => (
            <div
              key={service.id}
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <button
                onClick={() =>
                  setExpanded(expanded === service.id ? null : service.id)
                }
                className="service-btn"
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "28px 0",
                  textAlign: "left",
                  display: "grid",
                  gridTemplateColumns: "44px 1fr auto auto",
                  alignItems: "center",
                  gap: "24px",
                }}
                aria-expanded={expanded === service.id}
              >
                {/* Index number */}
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: expanded === service.id ? "var(--color-accent)" : "var(--color-text-muted)",
                    letterSpacing: "0.04em",
                    transition: "color 200ms ease",
                  }}
                >
                  0{i + 1}
                </span>

                {/* Title */}
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 2.5vw, 32px)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "var(--color-text-primary)",
                    lineHeight: 1,
                  }}
                >
                  {service.title}
                </span>

                {/* Tagline — hidden when expanded */}
                <span
                  style={{
                    fontSize: "14px",
                    color: "var(--color-text-muted)",
                    display: expanded === service.id ? "none" : "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "220px",
                  }}
                  className="service-tagline"
                >
                  {service.tagline}
                </span>

                {/* Open/close indicator */}
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: expanded === service.id
                      ? "1.5px solid var(--color-accent)"
                      : "1.5px solid var(--color-border-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    color: expanded === service.id ? "var(--color-accent)" : "var(--color-text-secondary)",
                    flexShrink: 0,
                    transform: expanded === service.id ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform 280ms ease, border-color 200ms ease, color 200ms ease",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>

              <AnimatePresence>
                {expanded === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.19, 1, 0.22, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    {/* Amber progress line — draws across before content appears */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                      style={{
                        height: "1.5px",
                        background: "var(--color-accent)",
                        transformOrigin: "left center",
                        marginBottom: "32px",
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: 0.18, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "44px 1fr 1fr",
                          gap: "24px",
                          paddingBottom: "40px",
                        }}
                        className="service-expanded-grid"
                      >
                        <div /> {/* index spacer */}
                        <p
                          style={{
                            fontSize: "15px",
                            color: "var(--color-text-secondary)",
                            lineHeight: 1.75,
                            margin: 0,
                          }}
                        >
                          {service.description}
                        </p>
                        <div>
                          <ul
                            style={{
                              listStyle: "none",
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              marginBottom: "20px",
                            }}
                          >
                            {service.bullets.map((b) => (
                              <li
                                key={b}
                                style={{
                                  fontSize: "14px",
                                  color: "var(--color-text-secondary)",
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "10px",
                                }}
                              >
                                <span
                                  style={{
                                    color: "var(--color-accent)",
                                    flexShrink: 0,
                                    marginTop: "2px",
                                    fontWeight: 600,
                                  }}
                                >
                                  ✓
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                          <div
                            style={{
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "var(--color-text-muted)",
                              letterSpacing: "0.03em",
                            }}
                          >
                            Typical delivery: {service.timeline}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--color-border)" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .service-tagline { display: none !important; }
          .service-btn { grid-template-columns: 32px 1fr auto !important; gap: 16px !important; }
          .service-expanded-grid { grid-template-columns: 1fr !important; }
          .service-expanded-grid > :first-child { display: none; }
        }
      `}</style>
    </section>
  );
}
