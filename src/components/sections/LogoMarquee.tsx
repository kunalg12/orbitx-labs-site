const clients = [
  "CNSG Nursing",
  "SEI Nursing Institute",
  "SVS Nursing",
  "LAGS Medical",
  "DignoX AI",
  "AttendX Mobile",
  "Chaitanya College",
  "JobMatching AI",
  "Next.js 16",
  "React 19",
  "OpenAI",
  "Supabase",
];

export function LogoMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section
      style={{
        padding: "32px 0",
        background: "var(--color-bg-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        overflow: "hidden",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            whiteSpace: "nowrap",
          }}
        >
          Selected clients &amp; live production systems
        </span>
      </div>

      <div
        className="marquee-row"
        style={{
          position: "relative",
        }}
      >
        {/* Soft edge gradients */}
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
            alignItems: "center",
            gap: "56px",
            animation: "marquee-left 38s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map((name, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "var(--color-border-strong)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.01em",
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
