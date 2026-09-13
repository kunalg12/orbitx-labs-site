import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllWork, getWorkBySlug } from "@/lib/work";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const all = await getAllWork();
  return all.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  const all = await getAllWork();
  const currentIdx = all.findIndex((w) => w.slug === slug);
  const next = all.length > 1 ? all[(currentIdx + 1) % all.length] : null;

  return (
    <>
      {/* Hero */}
      <div
        style={{
          paddingTop: "calc(var(--nav-height) + 48px)",
          paddingBottom: "80px",
          background: `color-mix(in srgb, ${work.accentColor} 8%, var(--color-bg-base))`,
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <Link
            href="/work"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: work.accentColor,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "32px",
            }}
          >
            ← All work
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "40px",
              alignItems: "end",
            }}
            className="case-hero-grid"
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.8)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: work.accentColor,
                  marginBottom: "20px",
                }}
              >
                {work.category} · {work.year}
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 6vw, 80px)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.05,
                  marginBottom: "20px",
                }}
              >
                {work.title}
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  maxWidth: "560px",
                }}
              >
                {work.description}
              </p>
            </div>
            <div style={{ fontSize: "80px", lineHeight: 1 }}>{work.emoji}</div>
          </div>
        </div>
      </div>

      {/* Outcomes bar */}
      <div
        style={{
          background: "var(--color-bg-base)",
          borderBottom: "1px solid var(--color-border)",
          padding: "32px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${work.outcomes.length}, 1fr)`,
              gap: "32px",
            }}
            className="outcomes-grid"
          >
            {work.outcomes.map((o) => (
              <div key={o.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "36px",
                    fontWeight: 800,
                    color: work.accentColor,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {o.metric}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-muted)",
                    marginTop: "4px",
                  }}
                >
                  {o.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          background: "var(--color-bg-base)",
          paddingBlock: "80px",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              marginBottom: "60px",
            }}
            className="case-body-grid"
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-primary)",
                  marginBottom: "16px",
                }}
              >
                The challenge
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {work.challenge}
              </p>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-primary)",
                  marginBottom: "16px",
                }}
              >
                The solution
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {work.solution}
              </p>
            </div>
          </div>

          {/* Tech stack */}
          <div
            style={{
              padding: "32px",
              background: "var(--color-bg-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "16px",
              }}
            >
              Tech Stack
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {work.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    background: "var(--color-bg-base)",
                    border: "1px solid var(--color-border)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {work.url && (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  background: work.accentColor,
                  color: "#fff",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Visit live site →
              </a>
            )}
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "transparent",
                border: "1.5px solid var(--color-border-strong)",
                color: "var(--color-text-primary)",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Start a similar project
            </Link>
          </div>
        </div>
      </div>

      {/* Next project — only shown when there are multiple projects */}
      {next && (
        <div
          style={{
            background: "var(--color-bg-surface)",
            borderTop: "1px solid var(--color-border)",
            padding: "60px 0",
          }}
        >
          <div className="container">
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "16px",
              }}
            >
              Next project
            </div>
            <Link href={`/work/${next.slug}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: `color-mix(in srgb, ${next.accentColor} 12%, var(--color-bg-surface))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    flexShrink: 0,
                  }}
                >
                  {next.emoji}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {next.title} →
                  </div>
                  <div style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
                    {next.category}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .case-hero-grid { grid-template-columns: 1fr !important; }
          .case-body-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .outcomes-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
