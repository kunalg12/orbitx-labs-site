"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    slug: "cnsg-nursing",
    title: "Chaitanya Nursing School",
    subtitle: "CNSG Nursing, Badnapur · Maharashtra",
    category: "Web Platform",
    result: "Zero to live enrollment site — applications open within 3 weeks of kickoff.",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    accent: "#2563EB",
    initial: "CN",
    url: "https://www.cnsgnmnursing.org/",
    large: true,
  },
  {
    slug: "digno-x",
    title: "DignoX",
    subtitle: "AI-powered medical document analysis",
    category: "AI Agent",
    result: "LLM pipeline that reads medical PDFs and returns structured clinical summaries.",
    year: "2024",
    tags: ["Python", "OpenAI", "FastAPI"],
    accent: "#7C3AED",
    initial: "DX",
    url: null,
    large: false,
  },
  {
    slug: "attend-x",
    title: "AttendX",
    subtitle: "School attendance tracking app",
    category: "Mobile App",
    result: "iOS & Android attendance system for schools — built on one React Native codebase.",
    year: "2024",
    tags: ["React Native", "Expo", "Supabase"],
    accent: "#DC2626",
    initial: "AX",
    url: null,
    large: false,
  },
  {
    slug: "sei-nursing",
    title: "Sant Eknath Institute of Nursing",
    subtitle: "SEI Nursing, Bhagur · Maharashtra",
    category: "Web Platform",
    result: "INC-approved institute goes digital — program info, hostel details, and inquiry flow.",
    year: "2024",
    tags: ["React", "Tailwind", "SEO", "Vercel"],
    accent: "#059669",
    initial: "SE",
    url: "https://www.seinursing.org/",
    large: false,
  },
  {
    slug: "pacific-nursing",
    title: "Swami Vivekanand School of Nursing",
    subtitle: "SVS Nursing, Chhatrapati Sambhajinagar",
    category: "Web Platform",
    result: "Premier GNM & ANM institute — full program site with hospital affiliations and online enquiry.",
    year: "2024",
    tags: ["Next.js", "TypeScript", "SEO", "Vercel"],
    accent: "#EA580C",
    initial: "SV",
    url: "https://svsnursing.org/",
    large: false,
  },
  {
    slug: "metro-nursing",
    title: "Late Arvind Gaikwad School of Nursing",
    subtitle: "LAGS Nursing, Chhatrapati Sambhajinagar",
    category: "Web Platform",
    result: "Trusted local GNM program gets a professional online presence and inquiry pipeline.",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    accent: "#0284C7",
    initial: "LA",
    url: "https://www.lagsnursing.org/",
    large: false,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(24px 0 0 0 round 12px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0px 0 0 0 round 12px)", opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.09, ease: [0.19, 1, 0.22, 1] }}
    >
      <Link href={`/work/${project.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            background: "var(--color-bg-base)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            flexDirection: "column",
            transition: "border-color 200ms ease, box-shadow 200ms ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = `${project.accent}40`;
            el.style.boxShadow = `0 12px 40px ${project.accent}18`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "var(--color-border)";
            el.style.boxShadow = "var(--shadow-card)";
          }}
        >
          {/* Visual header — browser mockup for live sites, geometric for internal */}
          <div
            style={{
              height: project.large ? "240px" : "160px",
              background: project.url
                ? `linear-gradient(160deg, color-mix(in srgb, ${project.accent} 8%, #0A0F1E) 0%, color-mix(in srgb, ${project.accent} 3%, #0D1220) 100%)`
                : `linear-gradient(135deg, color-mix(in srgb, ${project.accent} 12%, var(--color-bg-surface)) 0%, color-mix(in srgb, ${project.accent} 4%, var(--color-bg-surface)) 100%)`,
              display: "flex",
              alignItems: project.url ? "flex-start" : "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              padding: project.url ? "14px 14px 0" : "0",
              flexDirection: "column",
            }}
          >
            {project.url ? (
              /* Browser frame mockup — lifts independently of the card on hover */
              <motion.div
                whileHover={{ scale: 1.016, y: -3 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
              >
                {/* Browser chrome */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderBottom: "none",
                    borderRadius: "8px 8px 0 0",
                    padding: "8px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  {/* Traffic lights */}
                  <div style={{ display: "flex", gap: "5px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF5F57" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FEBC2E" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#28C840" }} />
                  </div>
                  {/* URL bar */}
                  <div
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "4px",
                      padding: "3px 8px",
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.55)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontFamily: "monospace",
                    }}
                  >
                    <span aria-hidden="true">🔒</span>{" "}
                    {project.url.replace(/^https?:\/\//, "")}
                  </div>
                </div>
                {/* Browser content area — gradient + site name + grid pattern */}
                <div
                  style={{
                    flex: 1,
                    background: `linear-gradient(180deg, color-mix(in srgb, ${project.accent} 18%, #111827) 0%, color-mix(in srgb, ${project.accent} 6%, #0D1220) 100%)`,
                    borderRadius: "0 0 6px 6px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderTop: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: 0,
                  }}
                >
                  {/* Grid pattern overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `linear-gradient(${project.accent}18 1px, transparent 1px), linear-gradient(90deg, ${project.accent}18 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Site initial + name */}
                  <div style={{ position: "relative", textAlign: "center" }}>
                    <div
                      style={{
                        width: project.large ? "52px" : "40px",
                        height: project.large ? "52px" : "40px",
                        borderRadius: "10px",
                        background: project.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 8px",
                        fontSize: project.large ? "20px" : "16px",
                        fontWeight: 800,
                        color: "#fff",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.04em",
                        boxShadow: `0 4px 20px ${project.accent}60`,
                      }}
                    >
                      {project.initial}
                    </div>
                    <div
                      style={{
                        fontSize: project.large ? "13px" : "11px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Geometric placeholder for internal/upcoming projects */
              <>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: project.large ? "96px" : "72px",
                    fontWeight: 900,
                    letterSpacing: "-0.06em",
                    color: project.accent,
                    opacity: 0.12,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {project.initial}
                </span>
                <div
                  style={{
                    position: "absolute",
                    width: project.large ? "160px" : "120px",
                    height: project.large ? "160px" : "120px",
                    borderRadius: "50%",
                    border: `1.5px solid ${project.accent}`,
                    opacity: 0.15,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: project.large ? "220px" : "160px",
                    height: project.large ? "220px" : "160px",
                    borderRadius: "50%",
                    border: `1px solid ${project.accent}`,
                    opacity: 0.08,
                  }}
                />
              </>
            )}
            {/* Category badge — top offset clears browser chrome bar (~30px) on url cards */}
            <div
              style={{
                position: "absolute",
                top: project.url ? "50px" : "12px",
                left: "12px",
                padding: "4px 10px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(8px)",
                fontSize: "11px",
                fontWeight: 700,
                color: project.accent,
                letterSpacing: "0.02em",
                zIndex: 2,
              }}
            >
              {project.category}
            </div>
            {/* Arrow on large card */}
            {project.large && (
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: project.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  color: "#fff",
                  zIndex: 2,
                }}
              >
                →
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Year + live indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: 500 }}>
                {project.year}
              </span>
              {project.url && (
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#16A34A",
                    background: "rgba(22,163,74,0.1)",
                    padding: "2px 7px",
                    borderRadius: "4px",
                  }}
                >
                  Live ↗
                </span>
              )}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: project.large ? "20px" : "16px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.025em",
                marginBottom: "3px",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
            {project.subtitle && (
              <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginBottom: "8px", lineHeight: 1.4 }}>
                {project.subtitle}
              </p>
            )}
            <p
              style={{
                fontSize: "13px",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                marginBottom: "16px",
                flex: 1,
              }}
            >
              {project.result}
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    padding: "3px 8px",
                    borderRadius: "5px",
                    background: "var(--color-bg-surface)",
                    color: "var(--color-text-muted)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function FeaturedWork() {
  const large = projects.filter((p) => p.large);
  const rest = projects.filter((p) => !p.large);

  return (
    <section
      id="work"
      style={{
        background: "var(--color-bg-surface)",
        paddingBlock: "var(--section-gap)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "flex-end",
            marginBottom: "56px",
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: "40px",
          }}
          className="work-header"
        >
          <div>
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
              Things we&apos;ve shipped.
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "24px",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              AI agents, web platforms, and mobile apps — each one shipped to production and in use by real people.
            </p>
            <Link
              href="/work"
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                alignSelf: "flex-start",
                padding: "10px 20px",
                border: "1.5px solid var(--color-border-strong)",
                borderRadius: "var(--radius-full)",
                transition: "border-color 150ms ease, background 150ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.background = "rgba(217,119,6,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-strong)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              View all work →
            </Link>
          </div>
        </div>

        {/* Featured large card */}
        {large[0] && (
          <div style={{ marginBottom: "20px" }}>
            <ProjectCard project={large[0]} index={0} />
          </div>
        )}

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
          className="work-grid"
        >
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .work-grid { grid-template-columns: 1fr !important; }
          .work-header { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
