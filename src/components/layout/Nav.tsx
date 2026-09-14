"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "About",    href: "/#why" },
  { label: "Contact",  href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { theme, toggleTheme }    = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: "var(--nav-height)",
          display: "flex",
          alignItems: "center",
          transition: "background 320ms ease, border-color 320ms ease, backdrop-filter 320ms ease",
          backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          background: scrolled ? "color-mix(in srgb, var(--color-bg-base) 88%, transparent)" : "transparent",
          borderBottom: `1px solid ${scrolled ? "var(--color-border)" : "transparent"}`,
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>

          {/* Wordmark */}
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
            {/* Orbital / eye mark */}
            <svg width="26" height="26" viewBox="0 0 22 22" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="10" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
              <circle cx="11" cy="11" r="4" fill="var(--color-accent)" />
              <ellipse cx="11" cy="11" rx="10" ry="4.2" stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.40" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "17px",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "var(--color-text-primary)",
                lineHeight: 1,
              }}
            >
              OrbitX Labs
            </span>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "0.005em",
                  position: "relative",
                  paddingBottom: "2px",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              style={{
                width: "32px", height: "32px",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", cursor: "pointer",
                transition: "border-color 150ms ease, background 150ms ease",
                color: "var(--color-text-muted)",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.background = "color-mix(in srgb, var(--color-accent) 8%, transparent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Primary CTA */}
            <Link
              href="/contact"
              className="nav-cta"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#fff",
                background: "var(--color-accent)",
                textDecoration: "none",
                padding: "8px 18px",
                borderRadius: "var(--radius-full)",
                transition: "box-shadow 200ms ease, transform 200ms ease",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
                boxShadow: "0 2px 10px rgba(201,101,0,0.28)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(201,101,0,0.42)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(201,101,0,0.28)";
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
                width: "32px", height: "32px",
                alignItems: "center", justifyContent: "center",
                background: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                color: "var(--color-text-primary)",
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position: "fixed",
          top: "var(--nav-height)",
          left: 0, right: 0,
          zIndex: 99,
          background: "var(--color-bg-base)",
          borderBottom: "1px solid var(--color-border)",
          padding: menuOpen ? "28px var(--container-padding) 24px" : "0 var(--container-padding)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxHeight: menuOpen ? "360px" : "0",
          overflow: "hidden",
          transition: "max-height 280ms ease, padding 280ms ease",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: "22px",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
              textDecoration: "none",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#fff",
            background: "var(--color-accent)",
            textDecoration: "none",
            padding: "13px 24px",
            borderRadius: "var(--radius-full)",
            textAlign: "center",
            marginTop: "4px",
            boxShadow: "0 4px 16px rgba(201,101,0,0.35)",
          }}
        >
          Start a project
        </Link>
        {/* Replace YOUR_CAL_USERNAME with your Cal.com username */}
        <button
          data-cal-link="kunal-gursal-cxyibu/intro-call-test"
          data-cal-config='{"layout":"month_view"}'
          onClick={() => setMenuOpen(false)}
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            background: "transparent",
            border: "1.5px solid var(--color-border-strong)",
            padding: "13px 24px",
            borderRadius: "var(--radius-full)",
            textAlign: "center",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          📅 Book a 30-min call
        </button>
      </div>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--color-accent);
          transition: width 220ms cubic-bezier(0.19, 1, 0.22, 1);
          border-radius: 2px;
        }
        .nav-link:hover { color: var(--color-text-primary) !important; }
        .nav-link:hover::after { width: 100%; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
          .nav-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
