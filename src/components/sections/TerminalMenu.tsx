"use client";
import React from "react";

// ─── Types / constants ─────────────────────────────────────────────────────────
export type MenuAction = "game" | "work" | "book" | "contact" | "surprise";

const MONO = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace";
const FS   = "clamp(11px, 1.3vw, 12.5px)";

export const MENU: Array<{ key: string; icon: string; label: string; action: MenuAction }> = [
  { key: "1", icon: "🚀", label: "Play Space Defender", action: "game"     },
  { key: "2", icon: "📂", label: "View our work",        action: "work"     },
  { key: "3", icon: "📅", label: "Book a 30-min call",   action: "book"     },
  { key: "4", icon: "📩", label: "Start a project",      action: "contact"  },
  { key: "5", icon: "🎲", label: "Surprise me",          action: "surprise" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
export const Cursor = React.memo(function Cursor() {
  return (
    <span style={{
      display: "inline-block", width: 7, height: "1em",
      background: "#F59E0B", marginLeft: 2, verticalAlign: "text-bottom",
      animation: "term-blink 1s step-end infinite",
      boxShadow: "0 0 8px rgba(245,158,11,0.8)",
    }} />
  );
});

const MenuBtn = React.memo(function MenuBtn({ item, onAction, delay }: { item: typeof MENU[number]; onAction: (a: MenuAction) => void; delay: number }) {
  return (
    <button
      role="menuitem"
      onClick={() => onAction(item.action)}
      style={{
        display: "flex", alignItems: "center", gap: 10, padding: "5px 9px",
        background: "transparent", border: "1px solid transparent", cursor: "pointer",
        fontFamily: MONO, fontSize: FS, lineHeight: 1.65, borderRadius: 5,
        color: "#A8B6C4", textAlign: "left", width: "100%", transition: "all 160ms ease",
        animation: `riseIn 0.35s ease both`,
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "#F59E0B";
        el.style.background = "rgba(245,158,11,0.07)";
        el.style.borderColor = "rgba(245,158,11,0.20)";
        el.style.boxShadow = "0 0 16px rgba(245,158,11,0.05), inset 0 0 16px rgba(245,158,11,0.03)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "#A8B6C4";
        el.style.background = "transparent";
        el.style.borderColor = "transparent";
        el.style.boxShadow = "none";
      }}
    >
      <span style={{ color: "#F59E0B", fontWeight: 700, minWidth: 26, flexShrink: 0, opacity: 0.85 }}>[{item.key}]</span>
      <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
      <span style={{ letterSpacing: "0.01em" }}>{item.label}</span>
    </button>
  );
});

// ─── TerminalMenu ─────────────────────────────────────────────────────────────
interface TerminalMenuProps {
  onAction: (action: MenuAction) => void;
  surpriseActive: boolean;
  surpriseLines: Array<{ text: string; color: string }>;
}

export const TerminalMenu = React.memo(function TerminalMenu({ onAction, surpriseActive, surpriseLines }: TerminalMenuProps) {
  return (
    <div>
      {surpriseActive ? (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          {surpriseLines.map((l, i) => (
            <div key={i} style={{
              fontFamily: MONO, fontSize: FS, lineHeight: 1.75,
              color: l.color || "transparent",
              animation: `riseIn 0.3s ease ${i * 110}ms both`,
              minHeight: "1.75em",
              textShadow: l.color === "#4ADE80" ? "0 0 10px rgba(74,222,128,0.4)" : "none",
            }}>
              {l.text || " "}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ animation: "fadeIn 0.35s ease" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 10, paddingBottom: 8,
            borderBottom: "1px solid rgba(245,158,11,0.10)",
          }}>
            <span style={{ fontFamily: MONO, fontSize: 9, color: "rgba(245,158,11,0.50)", letterSpacing: "0.14em", fontWeight: 700 }}>
              ◈ MISSION CONTROL
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: MONO, fontSize: 9, color: "#4ADE80", letterSpacing: "0.10em" }}>
              <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#4ADE80", animation: "pulseDot 2.5s infinite", boxShadow: "0 0 6px #4ADE8080" }} />
              ALL SYSTEMS GO
            </span>
          </div>

          <div style={{ fontFamily: MONO, fontSize: FS, color: "#7DD3FC", lineHeight: 1.65, marginBottom: 8, animation: "riseIn 0.35s ease 0.05s both" }}>
            → Select your mission, Commander:
          </div>

          <div role="menu" style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {MENU.map((item, i) => (
              <MenuBtn key={item.key} item={item} onAction={onAction} delay={80 + i * 70} />
            ))}
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: 6, marginTop: 10,
            paddingTop: 8, borderTop: "1px solid rgba(245,158,11,0.08)",
            animation: "riseIn 0.35s ease 0.55s both",
          }}>
            <span style={{ fontFamily: MONO, fontSize: FS, color: "rgba(245,158,11,0.30)" }}>›</span>
            <span style={{ fontFamily: MONO, fontSize: 9, color: "rgba(245,158,11,0.22)", letterSpacing: "0.12em" }}>ENTER COMMAND</span>
            <Cursor />
          </div>
        </div>
      )}
    </div>
  );
});
