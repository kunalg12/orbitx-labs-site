"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const projects = [
  {
    slug: "cnsg-nursing",
    title: "Chaitanya Nursing School",
    subtitle: "CNSG Nursing · Maharashtra",
    category: "Web Platform",
    result: "Complete institutional admissions portal. Live enrollment applications active within 3 weeks of kickoff.",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    accent: "#007AFF",
    initial: "CN",
    url: "https://www.cnsgnmnursing.org/",
    preview: "/previews/cnsg-nursing.png",
    large: true,
  },
  {
    slug: "digno-x",
    title: "DignoX Clinical AI",
    subtitle: "AI-Powered Medical Records",
    category: "AI Agent",
    result: "Autonomous LLM pipeline parsing multi-page clinical lab PDFs into structured diagnostic summaries.",
    year: "2024",
    tags: ["Python", "OpenAI", "FastAPI", "Vector DB"],
    accent: "#AF52DE",
    initial: "DX",
    url: null,
    large: false,
  },
  {
    slug: "attend-x",
    title: "AttendX Mobile",
    subtitle: "Cross-Platform School Attendance",
    category: "Mobile App",
    result: "Offline-first iOS & Android attendance tracking with realtime sync for educators across Maharashtra.",
    year: "2024",
    tags: ["React Native", "Expo", "Supabase", "SQLite"],
    accent: "#34C759",
    initial: "AX",
    url: null,
    large: false,
  },
  {
    slug: "sei-nursing",
    title: "Sant Eknath Nursing",
    subtitle: "SEI Nursing · Bhagur",
    category: "Web Platform",
    result: "INC-approved nursing institute digital portal featuring program curriculums, hostel tours, and inquiry CRM.",
    year: "2024",
    tags: ["Next.js", "Tailwind", "SEO", "Vercel"],
    accent: "#32ADE6",
    initial: "SE",
    url: "https://www.seinursing.org/",
    preview: "/previews/sei-nursing.png",
    large: false,
  },
  {
    slug: "pacific-nursing",
    title: "Swami Vivekanand Nursing",
    subtitle: "SVS Nursing · Sambhajinagar",
    category: "Web Platform",
    result: "GNM & ANM admissions portal with hospital affiliation directories and automated student applicant tracking.",
    year: "2024",
    tags: ["Next.js", "TypeScript", "SEO", "Vercel"],
    accent: "#FF9500",
    initial: "SV",
    url: "https://svsnursing.org/",
    preview: "/previews/svs-nursing.png",
    large: false,
  },
  {
    slug: "chaitanya-eng",
    title: "Chaitanya English School",
    subtitle: "CES & Junior College · Badnapur",
    category: "Web Platform",
    result: "Modern educational web presence unifying K-12 academics, junior college admissions, and campus facilities.",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    accent: "#5856D6",
    initial: "CE",
    url: "https://www.chaitanyaengschool.org/",
    preview: "/previews/chaitanyaengschool.png",
    large: false,
  },
  {
    slug: "metro-nursing",
    title: "Late Arvind Gaikwad Nursing",
    subtitle: "LAGS Nursing · Sambhajinagar",
    category: "Web Platform",
    result: "Recognized nursing academy portal driving direct applicant conversions and verified prospectus downloads.",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    accent: "#007AFF",
    initial: "LA",
    url: "https://www.lagsnursing.org/",
    preview: "/previews/lagsn-nursing.png",
    large: false,
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.25, 1, 0.5, 1] }}
      style={{ height: "100%" }}
    >
      <Link href={`/work/${project.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          className="apple-card"
          style={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            borderRadius: project.large ? "var(--radius-2xl)" : "var(--radius-xl)",
          }}
        >
          {/* Card Preview Banner */}
          <div
            style={{
              height: project.large ? "260px" : "180px",
              background: project.preview
                ? "var(--color-bg-ink)"
                : `linear-gradient(135deg, color-mix(in srgb, ${project.accent} 15%, var(--color-bg-surface)) 0%, var(--color-bg-surface) 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {project.preview ? (
              <div style={{ position: "absolute", inset: 0 }}>
                <Image
                  src={project.preview}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes={project.large ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
                  style={{
                    objectFit: "cover",
                    objectPosition: "top center",
                    transition: "transform 400ms ease",
                  }}
                  className="preview-img"
                  priority={project.large}
                />
              </div>
            ) : (
              /* Apple Icon Monogram */
              <div style={{ position: "relative", textAlign: "center" }}>
                <div
                  style={{
                    width: project.large ? "64px" : "48px",
                    height: project.large ? "64px" : "48px",
                    borderRadius: "14px",
                    background: project.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                    fontSize: project.large ? "22px" : "18px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    fontFamily: "var(--font-display)",
                    boxShadow: `0 4px 16px ${project.accent}40`,
                  }}
                >
                  {project.initial}
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)" }}>
                  {project.category}
                </div>
              </div>
            )}

            {/* Top Tag Badges */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                display: "flex",
                gap: "6px",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(0, 0, 0, 0.65)",
                  backdropFilter: "blur(12px) saturate(180%)",
                  WebkitBackdropFilter: "blur(12px) saturate(180%)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                }}
              >
                {project.category}
              </span>
              {project.url && (
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(52, 199, 89, 0.85)",
                    backdropFilter: "blur(12px)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#FFF" }} />
                  Live
                </span>
              )}
            </div>

            {/* Apple Arrow glyph */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "13px",
                zIndex: 2,
              }}
            >
              ↗
            </div>
          </div>

          {/* Text Content */}
          <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "12px", color: "var(--color-text-muted)", fontWeight: 500, marginBottom: "4px" }}>
              {project.subtitle} · {project.year}
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: project.large ? "22px" : "18px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "8px",
                lineHeight: 1.25,
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.55,
                marginBottom: "20px",
                flex: 1,
              }}
            >
              {project.result}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    padding: "3px 9px",
                    borderRadius: "var(--radius-sm)",
                    background: "color-mix(in srgb, var(--color-bg-surface) 80%, transparent)",
                    color: "var(--color-text-secondary)",
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
            marginBottom: "52px",
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: "36px",
          }}
          className="work-header"
        >
          <div>
            <SectionLabel number="02">Featured Builds</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display)",
                fontWeight: 700,
                letterSpacing: "var(--tracking-display)",
                color: "var(--color-text-primary)",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Real products. Real outcomes.
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "20px",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              A selection of recent systems built for founders, medical colleges, and institutions across India.
            </p>
            <Link
              href="/work"
              className="btn-apple-secondary"
              style={{ alignSelf: "flex-start", fontSize: "14px", padding: "10px 20px" }}
            >
              Browse all case studies <span>→</span>
            </Link>
          </div>
        </div>

        {/* Featured large card */}
        {large[0] && (
          <div style={{ marginBottom: "24px" }}>
            <ProjectCard project={large[0]} index={0} />
          </div>
        )}

        {/* Grid of 6 remaining projects */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="work-grid"
        >
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
      </div>

      <style>{`
        .apple-card:hover .preview-img {
          transform: scale(1.03);
        }
        @media (max-width: 900px) {
          .work-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 18px !important; }
        }
        @media (max-width: 640px) {
          .work-grid { grid-template-columns: 1fr !important; }
          .work-header { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
