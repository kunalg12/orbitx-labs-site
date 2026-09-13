"use client";

import Link from "next/link";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Why us", href: "/#why" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter / X", href: "https://x.com" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--color-bg-base)",
        borderTop: "1px solid var(--color-border)",
        paddingBlock: "64px 40px",
      }}
    >
      <div className="container">
        {/* Top: brand + nav columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "60px",
            marginBottom: "64px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "var(--color-text-primary)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "6px",
                  background: "var(--color-accent)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "#fff",
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                O
              </span>
              OrbitX Labs
            </Link>
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-text-muted)",
                lineHeight: 1.65,
                maxWidth: "240px",
                margin: 0,
              }}
            >
              AI agents, software, and mobile apps — built fast, built right.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                marginBottom: "20px",
              }}
            >
              Navigate
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "14px",
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                marginBottom: "20px",
              }}
            >
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "14px",
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
            © {year} OrbitX Labs.
          </span>
          <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
            Built with Next.js & Three.js
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </footer>
  );
}
