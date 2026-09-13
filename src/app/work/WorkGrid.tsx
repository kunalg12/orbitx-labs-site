"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types/work";

const CATEGORIES = [
  "All",
  "AI Agent",
  "Web Platform",
  "Mobile App",
  "Software",
] as const;

export function WorkGrid({ initialProjects }: { initialProjects: CaseStudy[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === active);

  return (
    <section
      style={{
        background: "var(--color-bg-surface)",
        paddingBlock: "60px",
      }}
    >
      <div className="container">
        {/* Filter pills */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                border: "1.5px solid",
                borderColor:
                  active === cat ? "var(--color-accent)" : "var(--color-border)",
                background:
                  active === cat ? "var(--color-accent)" : "transparent",
                color:
                  active === cat ? "#fff" : "var(--color-text-secondary)",
                transition: "all 200ms ease",
                fontFamily: "var(--font-body)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
          className="work-grid-full"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={`/work/${project.slug}`}
                style={{ textDecoration: "none" }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: "var(--color-bg-base)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div
                    style={{
                      height: "160px",
                      background: project.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "56px",
                      position: "relative",
                    }}
                  >
                    {project.emoji}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        background: "rgba(255,255,255,0.9)",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: project.accentColor,
                      }}
                    >
                      {project.category}
                    </div>
                  </div>
                  <div style={{ padding: "20px 24px 24px" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        color: "var(--color-text-muted)",
                        marginBottom: "6px",
                      }}
                    >
                      {project.year}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "var(--color-text-primary)",
                        letterSpacing: "-0.02em",
                        marginBottom: "8px",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.5,
                        marginBottom: "14px",
                      }}
                    >
                      {project.description.slice(0, 80)}...
                    </p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "11px",
                            fontWeight: 500,
                            padding: "3px 8px",
                            borderRadius: "9999px",
                            background: "var(--color-bg-surface)",
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
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-grid-full { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .work-grid-full { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
