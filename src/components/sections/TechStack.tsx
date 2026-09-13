const techs = [
  { name: "Next.js", emoji: "▲" },
  { name: "React", emoji: "⚛️" },
  { name: "TypeScript", emoji: "📘" },
  { name: "Python", emoji: "🐍" },
  { name: "React Native", emoji: "📱" },
  { name: "Tailwind CSS", emoji: "🎨" },
  { name: "OpenAI", emoji: "🤖" },
  { name: "Supabase", emoji: "⚡" },
  { name: "Vercel", emoji: "△" },
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "Expo", emoji: "📦" },
  { name: "FastAPI", emoji: "🚀" },
  { name: "LangChain", emoji: "🔗" },
  { name: "Figma", emoji: "🖌️" },
  { name: "Three.js", emoji: "🌐" },
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
            gridTemplateColumns: "1fr 2fr",
            gap: "80px",
            alignItems: "end",
            marginBottom: "48px",
          }}
          className="tech-header"
        >
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--color-accent)",
                marginBottom: "16px",
                letterSpacing: "0.02em",
              }}
            >
              Our toolkit
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Tools we{" "}
              <span style={{ fontWeight: 300, fontStyle: "italic" }}>master.</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "480px",
              alignSelf: "flex-end",
              paddingBottom: "8px",
              margin: 0,
            }}
          >
            Production-grade tools only — chosen for reliability, not hype.
          </p>
        </div>

        <style>{`
          @media (max-width: 768px) { .tech-header { grid-template-columns: 1fr !important; gap: 24px !important; } }
        `}</style>
      </div>

      {/* Full-width marquee, outside container */}
      <div className="marquee-row" style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "80px",
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
            width: "80px",
            background: "linear-gradient(to left, var(--color-bg-surface), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div
          className="marquee-track"
          style={{
            display: "flex",
            gap: "16px",
            animation: "marquee-left 40s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map((tech, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 20px",
                background: "var(--color-bg-base)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "18px" }}>{tech.emoji}</span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
