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
        paddingBlock: "48px 72px",
      }}
    >
      <div className="container">
        {/* Apple Segmented Control */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px",
            borderRadius: "var(--radius-full)",
            background: "color-mix(in srgb, var(--color-bg-base) 80%, transparent)",
            border: "1px solid var(--color-border)",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "13px",
                  fontWeight: isSelected ? 600 : 500,
                  cursor: "pointer",
                  border: "none",
                  background: isSelected ? "var(--color-accent)" : "transparent",
                  color: isSelected ? "#FFFFFF" : "var(--color-text-secondary)",
                  boxShadow: isSelected ? "0 2px 8px rgba(245,158,11,0.30)" : "none",
                  transition: "all 150ms ease",
                  fontFamily: "var(--font-body)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="work-grid-full"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
            >
              <Link
                href={`/work/${project.slug}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                  className="apple-card"
                  style={{
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {/* Visual Top Bar */}
                  <div
                    style={{
                      height: "160px",
                      background: `linear-gradient(135deg, color-mix(in srgb, ${project.accentColor} 18%, var(--color-bg-ink)) 0%, var(--color-bg-ink) 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "15px",
                        background: project.accentColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        fontFamily: "var(--font-display)",
                        boxShadow: `0 4px 16px ${project.accentColor}50`,
                      }}
                    >
                      {project.title.slice(0, 2).toUpperCase()}
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(0,0,0,0.65)",
                        backdropFilter: "blur(12px)",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      {project.category}
                    </div>
                  </div>

                  <div style={{ padding: "22px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "var(--color-text-muted)",
                        marginBottom: "4px",
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
                        letterSpacing: "-0.015em",
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
                        marginBottom: "18px",
                        flex: 1,
                      }}
                    >
                      {project.description.slice(0, 110)}...
                    </p>

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "11px",
                            fontWeight: 500,
                            padding: "3px 8px",
                            borderRadius: "var(--radius-sm)",
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
          .work-grid-full { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 560px) {
          .work-grid-full { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
