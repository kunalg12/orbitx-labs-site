"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  useSpaceDefender,
  cellStyle,
  ENEMIES_PER_ROW,
  ENEMY_TOTAL_ROWS,
} from "@/hooks/useSpaceDefender";
import { TerminalMenu, Cursor, MENU } from "./TerminalMenu";
import type { MenuAction } from "./TerminalMenu";

// ─── Surprise pools (kept here; used by handleAction) ─────────────────────────
const SURPRISE_POOLS = [
  [
    { text: "$ orbitx --surprise",               color: "#F59E0B" },
    { text: "",                                  color: "" },
    { text: "→  Scanning for easter eggs…",      color: "#93C5FD" },
    { text: "✓  Curiosity detected.  🎯",        color: "#4ADE80" },
    { text: "✓  You passed the vibe check.",     color: "#4ADE80" },
    { text: "",                                  color: "" },
    { text: "→  Returning to base…",             color: "#93C5FD" },
  ],
  [
    { text: "$ orbitx --unlock-secret",          color: "#F59E0B" },
    { text: "",                                  color: "" },
    { text: "→  Initializing fun protocol…",     color: "#93C5FD" },
    { text: "✓  You are officially an explorer.",color: "#4ADE80" },
    { text: "✓  The real MVP was you all along.",color: "#4ADE80" },
    { text: "",                                  color: "" },
    { text: "→  Back to mission control…",       color: "#93C5FD" },
  ],
  [
    { text: "$ orbitx --chaos-mode",             color: "#F59E0B" },
    { text: "",                                  color: "" },
    { text: "→  Running chaos subroutine…",      color: "#93C5FD" },
    { text: "✓  Fortune favours the curious.",   color: "#4ADE80" },
    { text: "✓  Ship it. Then perfect it.",      color: "#4ADE80" },
    { text: "",                                  color: "" },
    { text: "→  Returning to base…",             color: "#93C5FD" },
  ],
];

// ─── Types / constants ─────────────────────────────────────────────────────────
type Phase = "intro" | "interactive" | "game";
const MONO = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace";
const FS   = "clamp(11px, 1.3vw, 12.5px)";

// ─── Main ─────────────────────────────────────────────────────────────────────
export function HeroVisualB() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [surpriseActive, setSurpriseActive] = useState(false);
  const [surpriseLines, setSurpriseLines] = useState(SURPRISE_POOLS[0]);
  const surpriseRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { cells, gs, keysRef, shootRef } = useSpaceDefender(phase === "game");

  // ── Intro auto-advance ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(() => setPhase("interactive"), 2600);
    return () => clearTimeout(t);
  }, [phase]);

  // ── Menu action ───────────────────────────────────────────────────────────
  const handleAction = useCallback((action: MenuAction) => {
    if (surpriseRef.current) return;
    if (action === "game")    { setPhase("game"); return; }
    if (action === "work")    { document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); return; }
    if (action === "book")    { window.open("https://cal.com/kunal-gursal-cxyibu/30min", "_blank"); return; }
    if (action === "contact") { window.location.href = "/contact"; return; }
    if (action === "surprise") {
      surpriseRef.current = true;
      setSurpriseLines(SURPRISE_POOLS[Math.floor(Math.random() * SURPRISE_POOLS.length)]);
      setSurpriseActive(true);
      setTimeout(() => { surpriseRef.current = false; setSurpriseActive(false); }, 2800);
    }
  }, []);

  // ── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (phase === "interactive" && !surpriseRef.current) {
        const item = MENU.find(m => m.key === e.key);
        if (item) handleAction(item.action);
      }
      if (phase === "game") {
        if (e.key === " ") { e.preventDefault(); shootRef.current = true; }
        if (e.key === "Escape") setPhase("interactive");
      }
    };
    const up = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [phase, handleAction]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const aliveCount = gs.enemies.filter(e => e.alive).length;
  const total      = ENEMIES_PER_ROW * ENEMY_TOTAL_ROWS;

  return (
    <div className="terminal-wrap" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 28px 40px 12px" }}>
      <div style={{ position: "relative", width: "100%", maxWidth: 500 }}>

        {/* ── Terminal window ─────────────────────────────────────────────── */}
        <div style={{
          background: "#06080D",
          borderRadius: 10,
          border: "1px solid rgba(245,158,11,0.22)",
          boxShadow: [
            "0 0 0 1px rgba(0,0,0,0.7)",
            "0 32px 80px rgba(0,0,0,0.70)",
            "0 0 60px rgba(245,158,11,0.06)",
            "inset 0 1px 0 rgba(255,255,255,0.04)",
          ].join(", "),
          overflow: "hidden",
          position: "relative",
          animation: "borderPulse 4s ease-in-out infinite",
        }}>

          {/* Scanline grid overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20,
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)",
          }} />

          {/* CRT vignette */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 15,
            background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.50) 100%)",
          }} />

          {/* Sweep line */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: 2, top: 0,
            background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.18) 40%, rgba(245,158,11,0.18) 60%, transparent)",
            pointerEvents: "none", zIndex: 18,
            animation: "sweepLine 5s linear infinite",
          }} />

          {/* Title bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 7, padding: "10px 16px",
            borderBottom: "1px solid rgba(245,158,11,0.10)",
            background: "linear-gradient(180deg, #0A0D16 0%, #06080D 100%)",
          }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, flexShrink: 0, boxShadow: `0 0 7px ${c}70` }} />
            ))}
            <span style={{
              flex: 1, textAlign: "center", fontFamily: MONO,
              fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(245,158,11,0.45)",
            }}>
              {phase === "game" ? `space-defender · score: ${gs.score}` : "orbitx · terminal"}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28C840", animation: "pulseDot 2.5s infinite", boxShadow: "0 0 7px #28C84090" }} />
              <span style={{ fontFamily: MONO, fontSize: 9, color: "#28C840", letterSpacing: "0.10em" }}>ONLINE</span>
            </div>
          </div>

          {/* Body */}
          <div
            ref={scrollRef}
            className="terminal-body"
            style={{
              padding: "18px 20px 20px", height: 310, overflowY: "hidden",
              display: "flex", flexDirection: "column",
              justifyContent: phase === "game" ? "flex-start" : "flex-end",
              position: "relative",
            }}
          >

            {/* ── INTRO ──────────────────────────────────────────────────── */}
            {phase === "intro" && (
              <div style={{ animation: "fadeIn 0.5s ease" }}>
                <div style={{
                  border: "1px solid rgba(245,158,11,0.28)",
                  borderRadius: 7, padding: "14px 18px", marginBottom: 14,
                  background: "rgba(245,158,11,0.03)",
                  boxShadow: "0 0 30px rgba(245,158,11,0.05), inset 0 0 30px rgba(245,158,11,0.02)",
                }}>
                  <div style={{
                    fontFamily: MONO, fontSize: 15, fontWeight: 700,
                    color: "#F59E0B", letterSpacing: "0.24em", textAlign: "center",
                    textShadow: "0 0 24px rgba(245,158,11,0.7)",
                    marginBottom: 3,
                    animation: "glitch 4s ease-in-out infinite",
                  }}>
                    ORBITX TERMINAL
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: "rgba(245,158,11,0.32)", letterSpacing: "0.16em", textAlign: "center" }}>
                    v2.0 · MISSION CONTROL
                  </div>
                </div>

                {[
                  { text: "Connecting to mission control…", color: "#93C5FD", delay: "0.3s"  },
                  { text: "Auth handshake complete.     ✓", color: "#4ADE80", delay: "0.7s"  },
                  { text: "All systems nominal.         ✓", color: "#4ADE80", delay: "1.05s" },
                  { text: "Welcome, Commander.",           color: "#F59E0B", delay: "1.45s", glow: true },
                ].map((l, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontFamily: MONO, fontSize: FS, lineHeight: 1.75,
                    color: l.color,
                    textShadow: l.glow ? "0 0 16px rgba(245,158,11,0.5)" : "none",
                    animation: `riseIn 0.4s ease ${l.delay} both`,
                  }}>
                    <span style={{ opacity: 0.35, flexShrink: 0 }}>›</span>
                    <span>{l.text}</span>
                  </div>
                ))}

                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, animation: "fadeIn 0.4s ease 1.9s both" }}>
                  <span style={{ fontFamily: MONO, fontSize: FS, color: "rgba(245,158,11,0.30)" }}>›</span>
                  <Cursor />
                </div>
              </div>
            )}

            {/* ── INTERACTIVE ────────────────────────────────────────────── */}
            {phase === "interactive" && (
              <TerminalMenu
                onAction={handleAction}
                surpriseActive={surpriseActive}
                surpriseLines={surpriseLines}
              />
            )}

            {/* ── GAME ───────────────────────────────────────────────────── */}
            {phase === "game" && (
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* HUD */}
                <div style={{
                  display: "flex", justifyContent: "space-between", marginBottom: 5,
                  fontFamily: MONO, fontSize: 9, letterSpacing: "0.08em",
                  paddingBottom: 4, borderBottom: "1px solid rgba(245,158,11,0.08)",
                }}>
                  <span style={{ color: "rgba(255,255,255,0.20)" }}>← → MOVE · SPC FIRE · ESC EXIT</span>
                  <span style={{ color: "#F87171", textShadow: "0 0 8px rgba(248,113,113,0.4)" }}>
                    HOSTILES {aliveCount}/{total}
                  </span>
                </div>

                {/* Per-character game grid */}
                <div className="game-grid" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  {cells.map((row, ri) => (
                    <div key={ri} style={{ display: "flex", lineHeight: 1 }}>
                      {row.map((cell, ci) => {
                        const st = cellStyle(cell.type);
                        return (
                          <span key={ci} className="game-cell" style={{
                            color: st.color, textShadow: st.textShadow,
                            opacity: st.opacity,
                          }}>
                            {cell.char}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Game over/win overlay */}
                {(gs.gameOver || gs.won) && (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    background: "rgba(6,8,13,0.93)", gap: 8,
                    animation: "fadeIn 0.4s ease",
                  }}>
                    <div style={{
                      fontFamily: MONO, fontSize: 18, fontWeight: 700, letterSpacing: "0.12em",
                      color: gs.won ? "#4ADE80" : "#F87171",
                      textShadow: gs.won ? "0 0 30px rgba(74,222,128,0.7), 0 0 60px rgba(74,222,128,0.3)" : "0 0 30px rgba(248,113,113,0.7), 0 0 60px rgba(248,113,113,0.3)",
                    }}>
                      {gs.won ? "◈ SYSTEM CLEARED" : "✕ MISSION FAILED"}
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em" }}>
                      FINAL SCORE: {gs.score}
                    </div>
                    <button
                      onClick={() => setPhase("interactive")}
                      style={{
                        marginTop: 10, padding: "7px 22px",
                        background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.30)",
                        borderRadius: 6, color: "#F59E0B", fontFamily: MONO, fontSize: 10,
                        cursor: "pointer", letterSpacing: "0.10em", transition: "all 150ms",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.18)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.08)"; }}
                    >
                      RETURN TO BASE
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile game controls ─────────────────────────────────────────── */}
        {phase === "game" && (
          <div className="mobile-controls" style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12 }}>
            {[
              { label: "◄", onStart: () => keysRef.current.add("ArrowLeft"),  onEnd: () => keysRef.current.delete("ArrowLeft")  },
              { label: "◆", onStart: () => { shootRef.current = true; },       onEnd: () => {}                                   },
              { label: "►", onStart: () => keysRef.current.add("ArrowRight"), onEnd: () => keysRef.current.delete("ArrowRight") },
            ].map(btn => (
              <button
                key={btn.label}
                onMouseDown={btn.onStart} onMouseUp={btn.onEnd} onMouseLeave={btn.onEnd}
                onTouchStart={e => { e.preventDefault(); btn.onStart(); }}
                onTouchEnd={e => { e.preventDefault(); btn.onEnd(); }}
                style={{
                  minWidth: 64, minHeight: 48,
                  background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.25)",
                  borderRadius: 8, color: "#F59E0B", fontFamily: MONO, fontSize: 16,
                  cursor: "pointer", userSelect: "none", touchAction: "manipulation",
                  boxShadow: "0 0 12px rgba(245,158,11,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Badge ───────────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute", top: -16, right: -8,
          background: "linear-gradient(135deg, #F59E0B 0%, #C96500 100%)",
          borderRadius: 10, padding: "8px 14px",
          boxShadow: "0 8px 24px rgba(201,101,0,0.50), 0 0 0 1px rgba(245,158,11,0.25)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%", background: "#fff",
            boxShadow: "0 0 0 3px rgba(255,255,255,0.25)",
            animation: "pulse-white 2s infinite", flexShrink: 0,
          }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "var(--font-body)", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
            {phase === "game" ? "SPACE DEFENDER" : "MISSION CONTROL"}
          </span>
        </div>

        {/* ── Stats strip ─────────────────────────────────────────────────── */}
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

        {/* ── Ambient glow ────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute", inset: "-30%",
          background: "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(245,158,11,0.06) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: -1,
        }} />
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

        /* Game grid — responsive font-size keeps 42 chars in viewport */
        .game-grid {
          font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
          font-size: clamp(11px, 1.6vw, 12px);
        }
        .game-cell {
          width: 1ch;
          display: inline-block;
          text-align: center;
          line-height: 1;
          letter-spacing: 0;
        }

        /* Mobile — scale terminal down, enlarge touch targets */
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

        /* Prevent double-tap zoom on game buttons */
        .mobile-controls button { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }

        /* Menu buttons — larger tap target on touch screens */
        @media (hover: none) {
          .terminal-body button { min-height: 44px; }
        }
      `}</style>
    </div>
  );
}
