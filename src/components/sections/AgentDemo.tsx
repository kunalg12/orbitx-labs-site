"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ─── Constants (match TerminalMenu) ───────────────────────────────────────────
const MONO = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace";
const FS   = "clamp(11px, 1.3vw, 12.5px)";

// ─── Types ────────────────────────────────────────────────────────────────────
type DemoLine = { text: string; color: string; isCommand?: boolean };

// ─── Three client scenarios (one chosen at random each mount) ─────────────────
const SCENARIOS: DemoLine[][] = [
  // Scenario A — DignoX (AI Agent)
  [
    { text: '$ orbitx run --client "DignoX"',              color: "#F59E0B", isCommand: true },
    { text: "",                                             color: "transparent" },
    { text: "→  Domain: Medical AI · India",                color: "#93C5FD" },
    { text: "→  Requirement: PDF → clinical summaries",     color: "#93C5FD" },
    { text: "✓  Stack: Python · FastAPI · LangChain · OpenAI", color: "#4ADE80" },
    { text: "→  Scaffolding 14 modules…",                   color: "#93C5FD" },
    { text: "✓  Shipped in 18 days.",                       color: "#4ADE80" },
    { text: "✓  Live at dignox.com",                        color: "#4ADE80" },
  ],
  // Scenario B — CNSG Nursing (Web Platform)
  [
    { text: '$ orbitx run --client "CNSG Nursing"',         color: "#F59E0B", isCommand: true },
    { text: "",                                             color: "transparent" },
    { text: "→  Domain: Education · Maharashtra",           color: "#93C5FD" },
    { text: "→  Requirement: Enrollment platform + enquiry form", color: "#93C5FD" },
    { text: "✓  Stack: Next.js · TypeScript · Vercel",      color: "#4ADE80" },
    { text: "→  Scaffolding 8 pages…",                      color: "#93C5FD" },
    { text: "✓  Shipped in 3 weeks.",                       color: "#4ADE80" },
    { text: "✓  Live at cnsgnmnursing.org",                 color: "#4ADE80" },
  ],
  // Scenario C — AttendX (Mobile App)
  [
    { text: '$ orbitx run --client "AttendX"',              color: "#F59E0B", isCommand: true },
    { text: "",                                             color: "transparent" },
    { text: "→  Domain: EdTech · Mobile",                   color: "#93C5FD" },
    { text: "→  Requirement: iOS + Android attendance tracking", color: "#93C5FD" },
    { text: "✓  Stack: React Native · Expo · Supabase",     color: "#4ADE80" },
    { text: "→  Cross-platform build complete.",             color: "#93C5FD" },
    { text: "✓  Shipped in 5 weeks.",                       color: "#4ADE80" },
    { text: "✓  iOS + Android. Production.",                color: "#4ADE80" },
  ],
];

// ─── Component ────────────────────────────────────────────────────────────────
interface AgentDemoProps {
  onExit: () => void;
}

export function AgentDemo({ onExit }: AgentDemoProps) {
  const router = useRouter();
  const [displayedLines, setDisplayedLines] = useState<DemoLine[]>([]);
  const [charBuffer, setCharBuffer]         = useState("");
  const [showCTAs, setShowCTAs]             = useState(false);
  const [bookHover, setBookHover]           = useState(false);
  const [workHover, setWorkHover]           = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Cancel all pending timeouts on unmount
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => { timeouts.forEach(clearTimeout); };
  }, []);

  // Escape key → exit
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onExit(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onExit]);

  // Animation driver — schedules entire sequence once on mount
  useEffect(() => {
    const scenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    let delay = 200; // initial pause before first line

    for (const line of scenario) {
      if (line.isCommand) {
        // Type character-by-character at 22ms/char
        for (let ci = 0; ci < line.text.length; ci++) {
          const partial = line.text.slice(0, ci + 1);
          const t = setTimeout(() => setCharBuffer(partial), delay + ci * 22);
          timeoutsRef.current.push(t);
        }
        delay += line.text.length * 22 + 100; // finish typing + small buffer
        const t = setTimeout(() => {
          setDisplayedLines(prev => [...prev, line]);
          setCharBuffer("");
        }, delay);
        timeoutsRef.current.push(t);
        delay += 50;
      } else if (line.text === "") {
        // Blank spacer — appears instantly at current delay, no extra pause
        const t = setTimeout(() => setDisplayedLines(prev => [...prev, line]), delay);
        timeoutsRef.current.push(t);
      } else if (line.text.startsWith("→")) {
        // 300ms pause then appear instantly
        delay += 300;
        const t = setTimeout(() => setDisplayedLines(prev => [...prev, line]), delay);
        timeoutsRef.current.push(t);
      } else if (line.text.startsWith("✓")) {
        // 200ms pause then appear instantly
        delay += 200;
        const t = setTimeout(() => setDisplayedLines(prev => [...prev, line]), delay);
        timeoutsRef.current.push(t);
      }
    }

    // After all lines, wait 600ms then reveal CTAs
    delay += 600;
    const ctaT = setTimeout(() => setShowCTAs(true), delay);
    timeoutsRef.current.push(ctaT);
  }, []); // intentional empty deps — runs once on mount

  return (
    <>
      <style>{`
        @keyframes demoFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .agent-demo * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

      <div
        className="agent-demo"
        style={{
          overflowY: "auto",
          maxHeight: "100%",
          fontFamily: MONO,
          fontSize: FS,
          lineHeight: 1.75,
        }}
      >
        {/* Header line */}
        <div style={{ color: "#93C5FD", marginBottom: 4, animation: "riseIn 0.35s ease" }}>
          →  Running orbitx agent…
        </div>

        {/* Completed lines */}
        {displayedLines.map((line, i) => (
          <div
            key={i}
            style={{
              color: line.text === "" ? "transparent" : line.color,
              minHeight: "1.75em",
              textShadow:
                line.color === "#4ADE80"
                  ? "0 0 10px rgba(74,222,128,0.4)"
                  : line.color === "#F59E0B"
                  ? "0 0 8px rgba(245,158,11,0.5)"
                  : "none",
            }}
          >
            {line.text === "" ? " " : line.text}
          </div>
        ))}

        {/* Command currently being typed */}
        {charBuffer && (
          <div style={{ color: "#F59E0B", textShadow: "0 0 8px rgba(245,158,11,0.5)" }}>
            {charBuffer}
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: "1em",
                background: "#F59E0B",
                marginLeft: 2,
                verticalAlign: "text-bottom",
                animation: "term-blink 1s step-end infinite",
                boxShadow: "0 0 8px rgba(245,158,11,0.8)",
              }}
            />
          </div>
        )}

        {/* CTAs — fade in after all lines complete */}
        {showCTAs && (
          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              animation: "demoFadeIn 0.5s ease both",
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() =>
                  window.open("https://cal.com/kunal-gursal-cxyibu/30min", "_blank", "noopener,noreferrer")
                }
                style={{
                  fontFamily: MONO,
                  fontSize: FS,
                  padding: "6px 14px",
                  borderRadius: 5,
                  cursor: "pointer",
                  background: bookHover ? "rgba(245,158,11,0.14)" : "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.20)",
                  color: "#F59E0B",
                  transition: "background 160ms ease",
                  touchAction: "manipulation",
                }}
                onMouseEnter={() => setBookHover(true)}
                onMouseLeave={() => setBookHover(false)}
              >
                Book a 30-min call
              </button>

              <button
                onClick={() => { router.push("/work"); }}
                style={{
                  fontFamily: MONO,
                  fontSize: FS,
                  padding: "6px 14px",
                  borderRadius: 5,
                  cursor: "pointer",
                  background: workHover ? "rgba(245,158,11,0.14)" : "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.20)",
                  color: "#F59E0B",
                  transition: "background 160ms ease",
                  touchAction: "manipulation",
                }}
                onMouseEnter={() => setWorkHover(true)}
                onMouseLeave={() => setWorkHover(false)}
              >
                See all our work →
              </button>
            </div>

            <button
              onClick={onExit}
              style={{
                fontFamily: MONO,
                fontSize: FS,
                background: "transparent",
                border: "none",
                color: "rgba(168,182,196,0.6)",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
                letterSpacing: "0.05em",
                touchAction: "manipulation",
              }}
            >
              ← BACK TO MENU
            </button>
          </div>
        )}
      </div>
    </>
  );
}
