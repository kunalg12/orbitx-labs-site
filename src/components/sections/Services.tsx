"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

const services = [
  {
    id: "ai",
    title: "AI Agents & Automation",
    tagline: "Autonomous workflows powered by modern LLMs",
    description:
      "Custom agents that extract unstructured document data, orchestrate complex multi-step workflows, and make verified decisions inside your existing operational stack.",
    bullets: [
      "Document analysis & clinical/legal data extraction",
      "Multi-agent reasoning and workflow loops",
      "Semantic search & candidate matching pipelines",
      "Secure private model hosting & tool integration",
    ],
    timeline: "2–4 weeks",
    accent: "var(--color-accent)",
    accentBg: "var(--color-accent-light)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    badge: "Core Expertise",
  },
  {
    id: "software",
    title: "Full-Stack Software",
    tagline: "Production systems built for longevity",
    description:
      "Enterprise-grade web applications with type-safe architectures, relational databases, clean API boundaries, and instant deployments. Zero bloated consulting bloat.",
    bullets: [
      "Next.js, React 19 & TypeScript frontend architecture",
      "Robust REST & GraphQL microservices",
      "PostgreSQL, Supabase & Vector store design",
      "Auth, RBAC & payment processing infrastructure",
    ],
    timeline: "3–6 weeks",
    accent: "var(--color-system-purple)",
    accentBg: "color-mix(in srgb, var(--color-system-purple) 12%, transparent)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    badge: "Scalable Architecture",
  },
  {
    id: "mobile",
    title: "Native Mobile Apps",
    tagline: "iOS and Android from one unified codebase",
    description:
      "High-frame-rate React Native applications with native hardware gestures, offline storage, push notification pipelines, and guaranteed App Store compliance.",
    bullets: [
      "React Native & Expo cross-platform framework",
      "Offline-first synchronization & SQLite caching",
      "Biometric auth, push notifications & analytics",
      "Full App Store & Google Play Store submission",
    ],
    timeline: "4–8 weeks",
    accent: "var(--color-system-green)",
    accentBg: "color-mix(in srgb, var(--color-system-green) 12%, transparent)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
      </svg>
    ),
    badge: "App Store Ready",
  },
  {
    id: "web",
    title: "Institutional Web Platforms",
    tagline: "High-conversion portals and marketing sites",
    description:
      "Lightning-fast web experiences engineered for institutional credibility. From complete nursing college admission portals to SaaS marketing engines with flawless SEO.",
    bullets: [
      "High-conversion enrollment & admission pipelines",
      "Perfect 100 Lighthouse performance & SEO score",
      "CMS integration (Sanity, Contentful, MDX)",
      "Automated lead capture & CRM synchronization",
    ],
    timeline: "1–4 weeks",
    accent: "var(--color-system-cyan)",
    accentBg: "color-mix(in srgb, var(--color-system-cyan) 12%, transparent)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    badge: "100 Lighthouse Score",
  },
];

export function Services() {
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
        {/* Section Header */}
        <div style={{ maxWidth: "680px", marginBottom: "56px" }}>
          <SectionLabel number="01">Capabilities</SectionLabel>
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
            Four disciplines. Engineered to production standards.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            We don&apos;t do generic consulting. Every capability represents proven architecture we have built, shipped, and actively support for founders and institutions.
          </p>
        </div>

        {/* Apple 2x2 Bento Feature Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
          }}
          className="services-bento-grid"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -4 }}
              className="apple-card"
              style={{
                padding: "36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div>
                {/* Header row: Squircle Icon + Badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: service.accentBg,
                      color: service.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                    }}
                  >
                    {service.icon}
                  </div>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: service.accent,
                      background: service.accentBg,
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    {service.badge}
                  </span>
                </div>

                {/* Title and Tagline */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--color-text-primary)",
                    lineHeight: 1.25,
                    marginBottom: "8px",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: service.accent,
                    marginBottom: "14px",
                  }}
                >
                  {service.tagline}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                  }}
                >
                  {service.description}
                </p>

                {/* Bullets */}
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "28px",
                  }}
                >
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        fontSize: "14px",
                        color: "var(--color-text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: service.accentBg,
                          color: service.accent,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </div>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "18px",
                  borderTop: "1px solid var(--color-border)",
                  fontSize: "13px",
                }}
              >
                <span style={{ color: "var(--color-text-muted)", fontWeight: 500 }}>
                  Timeline: <strong style={{ color: "var(--color-text-primary)" }}>{service.timeline}</strong>
                </span>

                <Link
                  href="/contact"
                  style={{
                    color: service.accent,
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "transform 150ms ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  Inquire <span>›</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .services-bento-grid { grid-template-columns: 1fr !important; gap: 18px !important; }
        }
      `}</style>
    </section>
  );
}
