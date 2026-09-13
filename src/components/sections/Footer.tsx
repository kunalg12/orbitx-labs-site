"use client";

import Link from "next/link";

const navLinks = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Process",  href: "/#process" },
  { label: "About",    href: "/#why" },
];

const socialLinks = [
  { label: "GitHub",      href: "https://github.com/kunalg12" },
  { label: "LinkedIn",    href: "https://linkedin.com" },
  { label: "Twitter / X", href: "https://x.com" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#111110",
        paddingTop: "80px",
      }}
    >
      <div className="container">

        {/* CTA strip — the one bold element */}
        <div
          style={{
            paddingBottom: "72px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "40px",
            flexWrap: "wrap",
          }}
          className="footer-cta"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#F5F4F2",
                lineHeight: 1.05,
                margin: "0 0 16px",
              }}
            >
              Ready to ship
              <br />
              something real?
            </p>
            <p
              style={{
                fontSize: "15px",
                color: "rgba(245,244,242,0.48)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              No discovery theatre. No months of waiting.
              <br />
              Just a kickoff call and a build that starts this week.
            </p>
          </div>

          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              background: "#C96500",
              color: "#fff",
              borderRadius: "var(--radius-full)",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
              flexShrink: 0,
              boxShadow: "0 4px 24px rgba(201,101,0,0.40)",
              transition: "transform 200ms ease, box-shadow 200ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 36px rgba(201,101,0,0.55)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(201,101,0,0.40)";
            }}
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Utility columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "60px",
            paddingTop: "52px",
            paddingBottom: "40px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "18px" }}>
              <svg width="24" height="24" viewBox="0 0 22 22" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="10" stroke="#C96500" strokeWidth="1.5" fill="none" />
                <circle cx="11" cy="11" r="4" fill="#C96500" />
                <ellipse cx="11" cy="11" rx="10" ry="4.2" stroke="#C96500" strokeWidth="1" fill="none" opacity="0.40" />
              </svg>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "#F5F4F2",
                  lineHeight: 1,
                }}
              >
                OrbitX Labs
              </span>
            </Link>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(245,244,242,0.42)",
                lineHeight: 1.7,
                maxWidth: "260px",
                margin: "0 0 24px",
              }}
            >
              A small, founder-led agency building AI agents, software, and mobile apps — fast, and built to last.
            </p>
            {/* Availability indicator */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                fontSize: "12px",
                color: "rgba(245,244,242,0.42)",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  background: "#22C55E",
                  boxShadow: "0 0 0 3px rgba(34,197,94,0.18)",
                  display: "inline-block",
                  flexShrink: 0,
                  animation: "footer-pulse 2.4s infinite",
                }}
              />
              Taking on new projects
            </span>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "rgba(245,244,242,0.30)",
                letterSpacing: "0.08em",
                marginBottom: "20px",
                textTransform: "uppercase",
              }}
            >
              Navigate
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "14px",
                    color: "rgba(245,244,242,0.50)",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#F5F4F2")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "rgba(245,244,242,0.50)")
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
                fontSize: "11px",
                fontWeight: 600,
                color: "rgba(245,244,242,0.30)",
                letterSpacing: "0.08em",
                marginBottom: "20px",
                textTransform: "uppercase",
              }}
            >
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "14px",
                    color: "rgba(245,244,242,0.50)",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#C96500")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "rgba(245,244,242,0.50)")
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
            paddingBlock: "20px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "12px", color: "rgba(245,244,242,0.28)", fontFamily: "var(--font-body)" }}>
            © {year} OrbitX Labs. All rights reserved.
          </span>
          <span style={{ fontSize: "12px", color: "rgba(245,244,242,0.28)", fontFamily: "var(--font-body)" }}>
            Built with Next.js
          </span>
        </div>
      </div>

      <style>{`
        @keyframes footer-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.18); }
          50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0.06); }
        }
        @media (max-width: 768px) {
          .footer-cta  { flex-direction: column !important; align-items: flex-start !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
