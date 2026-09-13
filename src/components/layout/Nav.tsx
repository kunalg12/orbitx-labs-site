"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#why" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "var(--nav-height)",
          display: "flex",
          alignItems: "center",
          transition: "background 350ms ease, border-color 350ms ease",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          backgroundColor: scrolled
            ? "rgba(var(--color-bg-base-rgb) / 0.88)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
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
          {/* Wordmark — no icon box */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "var(--color-text-primary)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
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
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "0",
                flexShrink: 0,
              }}
            >
              O
            </span>
            <span>OrbitX Labs</span>
          </Link>

          {/* Desktop links */}
          <div
            className="nav-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "36px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "color 150ms ease",
                  letterSpacing: "0.005em",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Theme toggle — minimal */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                cursor: "pointer",
                transition: "border-color 150ms ease, background 150ms ease",
                flexShrink: 0,
                color: "var(--color-text-secondary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-strong)";
                (e.currentTarget as HTMLElement).style.background = "var(--color-bg-surface)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* CTA */}
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
                padding: "9px 20px",
                borderRadius: "var(--radius-full)",
                transition: "opacity 150ms ease, box-shadow 150ms ease",
                whiteSpace: "nowrap",
                letterSpacing: "0.005em",
                boxShadow: "0 2px 10px rgba(201,101,0,0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.88";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(201,101,0,0.40)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(201,101,0,0.25)";
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
                width: "32px",
                height: "32px",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
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
          left: 0,
          right: 0,
          zIndex: 99,
          background: "var(--color-bg-base)",
          borderBottom: "1px solid var(--color-border)",
          padding: menuOpen ? "24px var(--container-padding)" : "0 var(--container-padding)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxHeight: menuOpen ? "400px" : "0",
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
              fontSize: "20px",
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#fff",
            background: "var(--color-accent)",
            textDecoration: "none",
            padding: "14px 24px",
            borderRadius: "var(--radius-full)",
            textAlign: "center",
          }}
        >
          Start a project
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
