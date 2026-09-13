const clients = [
  "CNSG Nursing",
  "SEI Nursing",
  "Pacific Nursing",
  "Metro Nursing",
  "DignoX AI",
  "AttendX",
  "JobMatch AI",
  "React",
  "Next.js",
  "Python",
  "OpenAI",
];

export function LogoMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section
      style={{
        padding: "40px 0",
        background: "var(--color-bg-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "4px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "1px",
            background: "var(--color-border-strong)",
            flexShrink: 0,
            marginLeft: "var(--container-padding)",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            whiteSpace: "nowrap",
          }}
        >
          Trusted by & built with
        </span>
      </div>

      <div
        className="marquee-row"
        style={{
          marginTop: "20px",
          position: "relative",
        }}
      >
        {/* Fade edges */}
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
            gap: "64px",
            animation: "marquee-left 35s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map((name, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--color-text-muted)",
                whiteSpace: "nowrap",
                letterSpacing: "-0.01em",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
