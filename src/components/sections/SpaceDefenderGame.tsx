"use client";

import { useEffect, useState } from "react";
import {
  useSpaceDefender,
  cellStyle,
  ENEMIES_PER_ROW,
  ENEMY_TOTAL_ROWS,
} from "@/hooks/useSpaceDefender";

const MONO = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace";

interface SpaceDefenderGameProps {
  onExit: () => void;
}

export function SpaceDefenderGame({ onExit }: SpaceDefenderGameProps) {
  const { cells, gs, keysRef, shootRef } = useSpaceDefender(true);
  const [hiScore, setHiScore] = useState(0);

  // Load hi score from localStorage on mount
  useEffect(() => {
    try { setHiScore(Number(localStorage.getItem("orbitx-hiscore") ?? "0")); } catch {}
  }, []);

  // Save hi score after game ends
  useEffect(() => {
    if (!gs.gameOver && !gs.won) return;
    if (gs.score > hiScore) {
      setHiScore(gs.score);
      try { localStorage.setItem("orbitx-hiscore", String(gs.score)); } catch {}
    }
  }, [gs.gameOver, gs.won, gs.score, hiScore]);

  // Keyboard listener — ArrowLeft/Right/a/d move ship, Space shoots, Escape exits
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (e.key === " ") { e.preventDefault(); shootRef.current = true; }
      if (e.key === "Escape") onExit();
    };
    const up = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [keysRef, shootRef, onExit]);

  const aliveCount = gs.enemies.filter(e => e.alive).length;
  const total = ENEMIES_PER_ROW * ENEMY_TOTAL_ROWS;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* HUD */}
      <div style={{
        display: "flex", justifyContent: "space-between", marginBottom: 5,
        fontFamily: MONO, fontSize: 9, letterSpacing: "0.08em",
        paddingBottom: 4, borderBottom: "1px solid rgba(245,158,11,0.08)",
      }}>
        <span style={{ color: "rgba(255,255,255,0.20)" }}>← → MOVE · SPC FIRE · ESC EXIT</span>
        <span style={{ color: "#F87171", textShadow: "0 0 8px rgba(248,113,113,0.4)" }}>
          HOSTILES {aliveCount}/{total} · HI: {hiScore}
        </span>
      </div>

      {/* Per-character game grid */}
      <div
        className="game-grid"
        aria-hidden="true"
        style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
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

      {/* Mobile controls — touch-only devices; hidden on desktop via CSS */}
      <div className="mobile-controls" style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 8 }}>
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
              width: 52, height: 30,
              background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.22)",
              borderRadius: 6, color: "#F59E0B", fontFamily: MONO, fontSize: 13,
              cursor: "pointer", userSelect: "none", touchAction: "manipulation",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Game over / win overlay */}
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
            textShadow: gs.won
              ? "0 0 30px rgba(74,222,128,0.7), 0 0 60px rgba(74,222,128,0.3)"
              : "0 0 30px rgba(248,113,113,0.7), 0 0 60px rgba(248,113,113,0.3)",
          }}>
            {gs.won ? "◈ SYSTEM CLEARED" : "✕ MISSION FAILED"}
          </div>
          <div style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em" }}>
            FINAL SCORE: {gs.score}
          </div>
          <button
            onClick={onExit}
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

      <style>{`
        .game-grid { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace; font-size: clamp(11px, 1.6vw, 12px); }
        .game-cell { width: 1ch; display: inline-block; text-align: center; line-height: 1; letter-spacing: 0; }
        @media (max-width: 540px) { .game-grid { font-size: clamp(6px, calc((100vw - 60px) / 42), 11px); } .mobile-controls { gap: 12px !important; } }
        @media (max-width: 390px) { .game-grid { font-size: clamp(5.5px, calc((100vw - 48px) / 42), 10px); } }
        .mobile-controls button { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        /* Hide mobile controls on desktop (hover-capable) devices */
        @media (hover: hover) { .mobile-controls { display: none !important; } }
        @media (prefers-reduced-motion: reduce) {
          .game-grid * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </div>
  );
}
