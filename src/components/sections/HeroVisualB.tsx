"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TerminalMenu, Cursor, MENU } from "./TerminalMenu";
import type { MenuAction } from "./TerminalMenu";
import { SpaceDefenderGame } from "./SpaceDefenderGame";
import { AgentDemo } from "./AgentDemo";

// ─── Types / constants ─────────────────────────────────────────────────────────
type Phase = "intro" | "interactive" | "demo" | "game";
const MONO = "'SF Mono', ui-monospace, 'Cascadia Code', 'Fira Code', monospace";
const FS   = "clamp(11px, 1.3vw, 12.5px)";

// ─── Intro phase ───────────────────────────────────────────────────────────────
const INTRO_LINES: Array<{ text: string; color: string; delay: string; glow?: boolean }> = [
  { text: "Initializing OrbitX Runtime v2.6…",   color: "var(--color-accent)", delay: "0.2s"  },
  { text: "Secure auth handshake established. ✓", color: "var(--color-system-green)", delay: "0.55s" },
  { text: "Neural core & agent tools online.  ✓", color: "var(--color-system-green)", delay: "0.9s" },
  { text: "Welcome to OrbitX Developer Studio.", color: "var(--color-text-primary)", delay: "1.3s", glow: true },
];

function IntroPhase() {
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding: "12px 16px",
          marginBottom: 14,
          background: "var(--color-accent-light)",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 13,
            fontWeight: 700,
            color: "var(--color-accent)",
            letterSpacing: "0.12em",
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          ORBITX DEVELOPER STUDIO
        </div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: "var(--color-text-muted)", letterSpacing: "0.08em", textAlign: "center" }}>
          macOS Runtime · AI Agency Engine
        </div>
      </div>
      {INTRO_LINES.map((l, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: MONO,
            fontSize: FS,
            lineHeight: 1.75,
            color: l.color,
            animation: `riseIn 0.35s ease ${l.delay} both`,
          }}
        >
          <span style={{ opacity: 0.4, flexShrink: 0 }}>›</span>
          <span>{l.text}</span>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, animation: "fadeIn 0.35s ease 1.6s both" }}>
        <span style={{ fontFamily: MONO, fontSize: FS, color: "var(--color-text-muted)" }}>›</span>
        <Cursor />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function HeroVisualB() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const handleExit = useCallback(() => setPhase("interactive"), []);

  // Intro auto-advance
  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(() => setPhase("interactive"), 2200);
    return () => clearTimeout(t);
  }, [phase]);

  // Menu action handler
  const handleAction = useCallback((action: MenuAction) => {
    if (action === "demo")    { setPhase("demo"); return; }
    if (action === "game")    { setPhase("game"); return; }
    if (action === "work")    { document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); return; }
    if (action === "book")    { window.open("https://cal.com/kunal-gursal-cxyibu/30min", "_blank"); return; }
    if (action === "contact") { router.push("/contact"); return; }
  }, [router]);

  // Keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (phase !== "interactive") return;
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;
      const item = MENU.find(m => m.key === e.key);
      if (item) handleAction(item.action);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [phase, handleAction]);

  return (
    <div
      className="terminal-wrap"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: 520, marginTop: "2px" }}>

        {/* macOS Studio Window */}
        <div
          style={{
            background: "var(--color-bg-card)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-float)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* macOS Title Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 16px",
              borderBottom: "1px solid var(--color-border)",
              background: "color-mix(in srgb, var(--color-bg-surface) 75%, transparent)",
            }}
          >
            {/* Traffic Lights */}
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F56", border: "0.5px solid rgba(0,0,0,0.12)" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FFBD2E", border: "0.5px solid rgba(0,0,0,0.12)" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#27C93F", border: "0.5px solid rgba(0,0,0,0.12)" }} />
            </div>

            {/* Window Title */}
            <span
              style={{
                flex: 1,
                textAlign: "center",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--color-text-secondary)",
              }}
            >
              {phase === "game" ? "Space Defender · Arcade" : phase === "demo" ? "AI Agent · Live Pipeline" : "OrbitX Pro Console"}
            </span>

            {/* Segmented control to switch tabs directly */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 10,
                  fontWeight: 600,
                  color: "var(--color-system-green)",
                  background: "color-mix(in srgb, var(--color-system-green) 12%, transparent)",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-full)",
                  fontFamily: MONO,
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-system-green)", animation: "pulseDot 2s infinite" }} />
                ACTIVE
              </span>
            </div>
          </div>

          {/* Body */}
          <div
            className="terminal-body"
            style={{
              padding: "20px 22px 22px",
              minHeight: 310,
              overflowY: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: phase === "game" ? "flex-start" : "flex-end",
              position: "relative",
            }}
          >
            {phase === "intro"       && <IntroPhase />}
            {phase === "interactive" && <TerminalMenu onAction={handleAction} />}
            {phase === "demo"        && <AgentDemo onExit={handleExit} />}
            {phase === "game"        && <SpaceDefenderGame onExit={handleExit} />}
          </div>
        </div>

        {/* Ambient background glow */}
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            background: "radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      </div>

      <style>{`
        @keyframes term-blink  { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulseDot    { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes fadeIn      { from { opacity: 0; } to { opacity: 1; } }
        @keyframes riseIn      { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .game-grid { font-family: ${MONO}; font-size: clamp(11px, 1.6vw, 12px); }
        .game-cell { width: 1ch; display: inline-block; text-align: center; line-height: 1; }
        @media (max-width: 540px) {
          .terminal-wrap { padding: 12px 0 !important; }
          .terminal-body { min-height: 270px !important; padding: 14px 14px 16px !important; }
          .game-grid     { font-size: clamp(6px, calc((100vw - 60px) / 42), 11px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .terminal-wrap * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </div>
  );
}
