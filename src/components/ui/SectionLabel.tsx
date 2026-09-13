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
        gap: "8px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-accent)",
        fontFamily: "var(--font-body)",
        marginBottom: "16px",
      }}
    >
      {number && (
        <span style={{ color: "var(--color-text-muted)" }}>{number}</span>
      )}
      {children}
    </div>
  );
}
