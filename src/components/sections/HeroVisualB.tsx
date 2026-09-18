"use client";

import { useEffect, useState, useCallback } from "react";
import { TerminalMenu, Cursor, MENU } from "./TerminalMenu";
import type { MenuAction } from "./TerminalMenu";
import { SpaceDefenderGame } from "./SpaceDefenderGame";

// ─── Types / constants ─────────────────────────────────────────────────────────
type Phase = "intro" | "interactive" | "game";
const MONO = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace";
const FS   = "clamp(11px, 1.3vw, 12.5px)";

// ─── Intro phase ───────────────────────────────────────────────────────────────
const INTRO_LINES: Array<{ text: string; color: string; delay: string; glow?: boolean }> = [
  { text: "Connecting to mission control…", color: "#93C5FD", delay: "0.3s"  },
  { text: "Auth handshake complete.     ✓", color: "#4ADE80", delay: "0.7s"  },
  { text: "All systems nominal.         ✓", color: "#4ADE80", delay: "1.05s" },
  { text: "Welcome, Commander.",           color: "#F59E0B", delay: "1.45s", glow: true },
];

function IntroPhase() {
  return (
    <div style={{ animation: "fadeIn 0.5s ease" }}>
      <div style={{ border: "1px solid rgba(245,158,11,0.28)", borderRadius: 7, padding: "14px 18px", marginBottom: 14, background: "rgba(245,158,11,0.03)", boxShadow: "0 0 30px rgba(245,158,11,0.05), inset 0 0 30px rgba(245,158,11,0.02)" }}>
        <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: "#F59E0B", letterSpacing: "0.24em", textAlign: "center", textShadow: "0 0 24px rgba(245,158,11,0.7)", marginBottom: 3, animation: "glitch 4s ease-in-out infinite" }}>ORBITX TERMINAL</div>
        <div style={{ fontFamily: MONO, fontSize: 9, color: "rgba(245,158,11,0.32)", letterSpacing: "0.16em", textAlign: "center" }}>v2.0 · MISSION CONTROL</div>
      </div>
      {INTRO_LINES.map((l, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: FS, lineHeight: 1.75, color: l.color, textShadow: l.glow ? "0 0 16px rgba(245,158,11,0.5)" : "none", animation: `riseIn 0.4s ease ${l.delay} both` }}>
          <span style={{ opacity: 0.35, flexShrink: 0 }}>›</span>
          <span>{l.text}</span>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, animation: "fadeIn 0.4s ease 1.9s both" }}>
        <span style={{ fontFamily: MONO, fontSize: FS, color: "rgba(245,158,11,0.30)" }}>›</span>
        <Cursor />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function HeroVisualB() {
  const [phase, setPhase] = useState<Phase>("intro");

  // Intro auto-advance
  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(() => setPhase("interactive"), 2600);
    return () => clearTimeout(t);
  }, [phase]);

  // Menu action handler — surprise is handled internally by TerminalMenu
  const handleAction = useCallback((action: Exclude<MenuAction, "surprise">) => {
    if (action === "game")    { setPhase("game"); return; }
    if (action === "work")    { document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); return; }
    if (action === "book")    { window.open("https://cal.com/kunal-gursal-cxyibu/30min", "_blank"); return; }
    if (action === "contact") { window.location.href = "/contact"; return; }
  }, []);

  // Keyboard shortcuts — interactive phase; key "5" delegated to TerminalMenu
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (phase !== "interactive") return;
      const item = MENU.find(m => m.key === e.key);
      if (item && item.action !== "surprise") handleAction(item.action);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [phase, handleAction]);

  return (
    <div className="terminal-wrap" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 28px 40px 12px" }}>
      <div style={{ position: "relative", width: "100%", maxWidth: 500 }}>

        {/* Terminal window */}
        <div style={{ background: "#06080D", borderRadius: 10, border: "1px solid rgba(245,158,11,0.22)", boxShadow: "0 0 0 1px rgba(0,0,0,0.7), 0 32px 80px rgba(0,0,0,0.70), 0 0 60px rgba(245,158,11,0.06), inset 0 1px 0 rgba(255,255,255,0.04)", overflow: "hidden", position: "relative", animation: "borderPulse 4s ease-in-out infinite" }}>

          {/* Scanline grid overlay */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20, background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)" }} />

          {/* CRT vignette */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 15, background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.50) 100%)" }} />

          {/* Sweep line */}
          <div style={{ position: "absolute", left: 0, right: 0, height: 2, top: 0, background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.18) 40%, rgba(245,158,11,0.18) 60%, transparent)", pointerEvents: "none", zIndex: 18, animation: "sweepLine 5s linear infinite" }} />

          {/* Title bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 16px", borderBottom: "1px solid rgba(245,158,11,0.10)", background: "linear-gradient(180deg, #0A0D16 0%, #06080D 100%)" }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, flexShrink: 0, boxShadow: `0 0 7px ${c}70` }} />
            ))}
            <span style={{ flex: 1, textAlign: "center", fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,158,11,0.45)" }}>
              {phase === "game" ? "space-defender" : "orbitx · terminal"}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28C840", animation: "pulseDot 2.5s infinite", boxShadow: "0 0 7px #28C84090" }} />
              <span style={{ fontFamily: MONO, fontSize: 9, color: "#28C840", letterSpacing: "0.10em" }}>ONLINE</span>
            </div>
          </div>

          {/* Body */}
          <div className="terminal-body" style={{ padding: "18px 20px 20px", height: 310, overflowY: "hidden", display: "flex", flexDirection: "column", justifyContent: phase === "game" ? "flex-start" : "flex-end", position: "relative" }}>
            {phase === "intro"       && <IntroPhase />}
            {phase === "interactive" && <TerminalMenu onAction={handleAction} />}
            {phase === "game"        && <SpaceDefenderGame onExit={() => setPhase("interactive")} />}
          </div>
        </div>

        {/* Badge */}
        <div style={{ position: "absolute", top: -16, right: -8, background: "linear-gradient(135deg, #F59E0B 0%, #C96500 100%)", borderRadius: 10, padding: "8px 14px", boxShadow: "0 8px 24px rgba(201,101,0,0.50), 0 0 0 1px rgba(245,158,11,0.25)", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", boxShadow: "0 0 0 3px rgba(255,255,255,0.25)", animation: "pulse-white 2s infinite", flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "var(--font-body)", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
            {phase === "game" ? "SPACE DEFENDER" : "MISSION CONTROL"}
          </span>
        </div>

        {/* Stats strip */}
        {phase !== "game" && (
          <div style={{ display: "flex", marginTop: 14, background: "#06080D", borderRadius: 8, border: "1px solid rgba(245,158,11,0.10)", overflow: "hidden" }}>
            {[
              { value: "8+",  label: "Projects shipped", color: "#F59E0B" },
              { value: "18d", label: "Fastest delivery",  color: "#4ADE80" },
              { value: "3+",  label: "AI agents built",   color: "#93C5FD" },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: 1, padding: "11px 0", textAlign: "center", borderLeft: i > 0 ? "1px solid rgba(245,158,11,0.07)" : "none" }}>
                <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, lineHeight: 1.1, color: s.color, textShadow: `0 0 16px ${s.color}55` }}>{s.value}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.26)", marginTop: 3, fontFamily: "var(--font-body)", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Ambient glow */}
        <div style={{ position: "absolute", inset: "-30%", background: "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(245,158,11,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: -1 }} />
      </div>

      <style>{`
        @keyframes term-blink  { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse-white { 0%, 100% { box-shadow: 0 0 0 3px rgba(255,255,255,0.25); } 50% { box-shadow: 0 0 0 6px rgba(255,255,255,0.08); } }
        @keyframes pulseDot    { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes fadeIn      { from { opacity: 0; } to { opacity: 1; } }
        @keyframes riseIn      { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sweepLine   { 0% { transform: translateY(0px); opacity: 0; } 3% { opacity: 1; } 97% { opacity: 1; } 100% { transform: translateY(360px); opacity: 0; } }
        @keyframes borderPulse { 0%, 100% { box-shadow: 0 0 0 1px rgba(0,0,0,0.7), 0 32px 80px rgba(0,0,0,0.70), 0 0 60px rgba(245,158,11,0.06), inset 0 1px 0 rgba(255,255,255,0.04); } 50% { box-shadow: 0 0 0 1px rgba(0,0,0,0.7), 0 32px 80px rgba(0,0,0,0.70), 0 0 100px rgba(245,158,11,0.14), inset 0 1px 0 rgba(255,255,255,0.04); } }
        @keyframes glitch {
          0%, 85%, 100% { transform: none; text-shadow: 0 0 24px rgba(245,158,11,0.7); }
          87% { transform: translateX(-3px) skewX(-1deg); text-shadow: -3px 0 rgba(0,220,255,0.6), 3px 0 rgba(255,0,100,0.6); }
          89% { transform: translateX(3px) skewX(1deg); text-shadow: 3px 0 rgba(0,220,255,0.6), -3px 0 rgba(255,0,100,0.6); }
          91% { transform: translateX(-1px); text-shadow: 0 0 24px rgba(245,158,11,0.7); }
          93% { transform: translateX(1px); }
          95% { transform: none; }
        }
        .game-grid { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace; font-size: clamp(11px, 1.6vw, 12px); }
        .game-cell { width: 1ch; display: inline-block; text-align: center; line-height: 1; letter-spacing: 0; }
        @media (max-width: 540px) {
          .terminal-wrap { padding: 20px 10px 20px 6px !important; }
          .terminal-body { height: 270px !important; padding: 14px 14px 16px !important; }
          .game-grid     { font-size: clamp(6px, calc((100vw - 60px) / 42), 11px); }
          .mobile-controls { gap: 12px !important; }
        }
        @media (max-width: 390px) {
          .terminal-body { height: 240px !important; padding: 12px 10px 12px !important; }
          .game-grid     { font-size: clamp(5.5px, calc((100vw - 48px) / 42), 10px); }
        }
        .mobile-controls button { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        @media (hover: none) { .terminal-body button { min-height: 44px; } }
        @media (prefers-reduced-motion: reduce) {
          .terminal-wrap * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </div>
  );
}
