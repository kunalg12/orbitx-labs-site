interface SectionLabelProps {
  number?: string;
  children: React.ReactNode;
}

export function SectionLabel({ number, children }: SectionLabelProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "var(--color-accent)",
        background: "var(--color-accent-light)",
        border: "1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)",
        padding: "4px 10px",
        borderRadius: "var(--radius-full)",
        fontFamily: "var(--font-body)",
        marginBottom: "16px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
      }}
    >
      {number && (
        <span style={{ opacity: 0.65, fontWeight: 500 }}>{number} ·</span>
      )}
      {children}
    </div>
  );
}
