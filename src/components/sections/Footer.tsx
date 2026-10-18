"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Process",  href: "/#process" },
  { label: "About",    href: "/#why" },
  { label: "Contact",  href: "/contact" },
];

const socialLinks = [
  { label: "GitHub",      href: "https://github.com/kunalg12" },
  { label: "LinkedIn",    href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  return (
    <footer
      style={{
        background: "var(--color-bg-surface)",
        borderTop: "1px solid var(--color-border)",
        paddingTop: "64px",
      }}
    >
      <div className="container">
        {/* Optional CTA strip — hidden on contact page */}
        {!isContactPage && (
          <div
            style={{
              paddingBottom: "56px",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
              flexWrap: "wrap",
            }}
            className="footer-cta"
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 3.2vw, 44px)",
                  fontWeight: 700,
                  letterSpacing: "var(--tracking-display)",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.1,
                  margin: "0 0 10px",
                }}
              >
                Ready to ship your next product?
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Kick off in days. Full product delivery in 2–8 weeks.
              </p>
            </div>

            <Link
              href="/contact"
              className="btn-apple-primary"
              style={{ fontSize: "14px", padding: "12px 24px" }}
            >
              Start a project <span>›</span>
            </Link>
          </div>
        )}

        {/* Directory Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "48px",
            paddingTop: "48px",
            paddingBottom: "40px",
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "6px",
                  background: "linear-gradient(135deg, #F59E0B 0%, #C96500 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-primary)",
                  lineHeight: 1,
                }}
              >
                OrbitX<span style={{ fontWeight: 400, opacity: 0.65, marginLeft: "3px" }}>Labs</span>
              </span>
            </Link>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                maxWidth: "280px",
                margin: "0 0 20px",
              }}
            >
              Founder-led agency building production AI agents, software platforms, and mobile apps. Designed and engineered in Maharashtra, India.
            </p>

            {/* Apple availability indicator */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "var(--color-text-secondary)",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--color-system-green)",
                  boxShadow: "0 0 0 3px rgba(52,199,89,0.22)",
                  display: "inline-block",
                  flexShrink: 0,
                  animation: "footer-pulse 2.4s infinite",
                }}
              />
              Taking on new client builds
            </span>
          </div>

          {/* Navigation Links */}
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                letterSpacing: "0.04em",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              Directory
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link"
                  style={{
                    fontSize: "14px",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                letterSpacing: "0.04em",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{
                    fontSize: "14px",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal / Metadata Row */}
        <div
          style={{
            paddingBlock: "20px",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>
            © {year} OrbitX Labs. Built to Apple Human Interface Guidelines.
          </span>
          <span style={{ fontSize: "12px", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>
            Next.js 16 · React 19 · San Francisco Font Stack
          </span>
        </div>
      </div>

      <style>{`
        @keyframes footer-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(52,199,89,0.22); }
          50%       { box-shadow: 0 0 0 6px rgba(52,199,89,0.06); }
        }
        .footer-link:hover { color: var(--color-accent) !important; }
        @media (max-width: 768px) {
          .footer-cta  { flex-direction: column !important; align-items: flex-start !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
