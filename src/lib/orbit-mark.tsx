/**
 * OrbitX Labs orbital mark, drawn with plain boxes so it renders inside
 * `next/og` (Satori) for favicons and social share images.
 *
 * Mirrors the SVG wordmark in components/layout/Nav.tsx:
 * outer ring + tilted orbit ellipse + filled core.
 */
export function OrbitMark({
  size,
  accent = "#F59E0B",
}: {
  size: number;
  accent?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${Math.max(1, size * 0.06)}px solid ${accent}`,
        }}
      />
      {/* Tilted orbit */}
      <div
        style={{
          position: "absolute",
          width: size,
          height: size * 0.42,
          borderRadius: "50%",
          border: `${Math.max(1, size * 0.04)}px solid ${accent}`,
          opacity: 0.4,
          transform: "rotate(-18deg)",
        }}
      />
      {/* Core */}
      <div
        style={{
          width: size * 0.34,
          height: size * 0.34,
          borderRadius: "50%",
          background: accent,
        }}
      />
    </div>
  );
}
