import { SectionLabel } from "@/components/ui/SectionLabel";

const techs = [
  { name: "Next.js 16", tag: "Frontend" },
  { name: "React 19", tag: "UI Library" },
  { name: "TypeScript", tag: "Type Safety" },
  { name: "React Native", tag: "Mobile" },
  { name: "Expo", tag: "Tooling" },
  { name: "Python", tag: "AI / ML" },
  { name: "FastAPI", tag: "APIs" },
  { name: "OpenAI API", tag: "LLMs" },
  { name: "LangChain", tag: "Agents" },
  { name: "PostgreSQL", tag: "Database" },
  { name: "Supabase", tag: "Backend" },
  { name: "Tailwind CSS v4", tag: "Styling" },
  { name: "Three.js", tag: "WebGL" },
  { name: "Vercel", tag: "Edge Infrastructure" },
];

const doubled = [...techs, ...techs];

export function TechStack() {
  return (
    <section
      id="tech-stack"
      style={{
        background: "var(--color-bg-surface)",
        paddingBlock: "var(--section-gap)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "end",
            marginBottom: "44px",
          }}
          className="tech-header"
        >
          <div>
            <SectionLabel number="04">Foundation</SectionLabel>
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
              Battle-tested tools. Zero throwaway tech.
            </h2>
          </div>
          <p
            style={{
              fontSize: "16px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            We choose established, production-ready technologies with high runtime performance, long-term stability, and thriving ecosystems.
          </p>
        </div>
      </div>

      {/* Marquee Row */}
      <div className="marquee-row" style={{ position: "relative", overflow: "hidden" }}>
        {/* Soft edge blur */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to right, var(--color-bg-surface), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to left, var(--color-bg-surface), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div
          className="marquee-track"
          style={{
            display: "flex",
            gap: "14px",
            animation: "marquee-left 36s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map((tech, i) => (
            <div
              key={i}
              className="apple-card"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 18px",
                borderRadius: "var(--radius-full)",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                }}
              >
                {tech.name}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "var(--color-text-muted)",
                  background: "color-mix(in srgb, var(--color-bg-surface) 90%, transparent)",
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                {tech.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tech-header { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}
