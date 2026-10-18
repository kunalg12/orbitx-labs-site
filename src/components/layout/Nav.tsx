"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "About",    href: "/#why" },
  { label: "Contact",  href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme }  = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "var(--nav-height)",
          display: "flex",
          alignItems: "center",
          transition: "background 240ms ease, border-color 240ms ease, backdrop-filter 240ms ease",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(12px) saturate(140%)",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(12px) saturate(140%)",
          background: scrolled
            ? "color-mix(in srgb, var(--color-bg-base) 80%, transparent)"
            : "color-mix(in srgb, var(--color-bg-base) 50%, transparent)",
          borderBottom: `1px solid ${scrolled ? "var(--color-border)" : "transparent"}`,
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Brand Wordmark & SF Orbital Glyph */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                background: "linear-gradient(135deg, #F59E0B 0%, #C96500 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(245, 158, 11, 0.35)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
                <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
                <path d="M12 3a9 9 0 0 1 6.36 15.36" strokeDasharray="2 3" opacity="0.75" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                color: "var(--color-text-primary)",
                lineHeight: 1,
              }}
            >
              OrbitX<span style={{ fontWeight: 400, opacity: 0.65, marginLeft: "4px" }}>Labs</span>
            </span>
          </Link>

          {/* Desktop links - Apple Segmented Glass Navigation */}
          <div
            className="nav-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px",
              borderRadius: "var(--radius-full)",
              background: "color-mix(in srgb, var(--color-bg-surface) 60%, transparent)",
              border: "1px solid var(--color-border)",
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="apple-nav-item"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                    textDecoration: "none",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    background: isActive ? "var(--color-bg-base)" : "transparent",
                    boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    transition: "all 150ms ease",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right cluster: Theme toggle + Apple Primary Action Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {/* Theme Toggle with SF Symbols Sun/Moon SVG */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                background: "color-mix(in srgb, var(--color-bg-surface) 70%, transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 150ms ease",
                color: "var(--color-text-secondary)",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text-primary)";
                e.currentTarget.style.borderColor = "var(--color-border-strong)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-secondary)";
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              {theme === "light" ? (
                /* Moon SF Symbol */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                /* Sun SF Symbol */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            {/* Apple Primary CTA */}
            <Link
              href="/contact"
              className="btn-apple-primary nav-cta"
              style={{
                fontSize: "13px",
                padding: "8px 18px",
              }}
            >
              Start a project
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="nav-menu-btn"
              style={{
                display: "none",
                width: "36px",
                height: "36px",
                alignItems: "center",
                justifyContent: "center",
                background: "color-mix(in srgb, var(--color-bg-surface) 70%, transparent)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                color: "var(--color-text-primary)",
              }}
            >
              {menuOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Apple Sheet style) */}
      <div
        style={{
          position: "fixed",
          top: "var(--nav-height)",
          left: 0,
          right: 0,
          zIndex: 99,
          background: "var(--color-bg-base)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid var(--color-border)",
          padding: menuOpen ? "24px var(--container-padding) 24px" : "0 var(--container-padding)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxHeight: menuOpen ? "420px" : "0",
          overflow: "hidden",
          transition: "max-height 280ms cubic-bezier(0.25, 1, 0.5, 1), padding 280ms ease",
          boxShadow: menuOpen ? "0 12px 32px rgba(0,0,0,0.14)" : "none",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: "18px",
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
              textDecoration: "none",
              letterSpacing: "-0.015em",
              padding: "6px 0",
            }}
          >
            {link.label}
          </Link>
        ))}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn-apple-primary"
            style={{ width: "100%", textAlign: "center" }}
          >
            Start a project
          </Link>
          <button
            data-cal-link="kunal-gursal-cxyibu/30min"
            data-cal-config='{"layout":"month_view"}'
            onClick={() => setMenuOpen(false)}
            className="btn-apple-ghost"
            style={{ width: "100%" }}
          >
            Book a 30-min call
          </button>
        </div>
      </div>

      <style>{`
        .apple-nav-item:hover {
          color: var(--color-text-primary) !important;
          background: color-mix(in srgb, var(--color-text-primary) 8%, transparent) !important;
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
          .nav-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
