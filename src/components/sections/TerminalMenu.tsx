"use client";
import React, { useCallback, useEffect, useRef, useState, useId } from "react";

// ─── Types / constants ─────────────────────────────────────────────────────────
export type MenuAction = "demo" | "game" | "work" | "book" | "contact";

const MONO = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace";
const FS   = "clamp(11px, 1.3vw, 12.5px)";

export const MENU: Array<{ key: string; icon: string; label: string; action: MenuAction }> = [
  { key: "1", icon: "🤖", label: "Run AI demo",         action: "demo"     },
  { key: "2", icon: "📂", label: "View our work",        action: "work"     },
  { key: "3", icon: "📅", label: "Book a 30-min call",   action: "book"     },
  { key: "4", icon: "📩", label: "Start a project",      action: "contact"  },
  { key: "5", icon: "🚀", label: "Play Space Defender",  action: "game"     },
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
}

export const TerminalMenu = React.memo(function TerminalMenu({ onAction }: TerminalMenuProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleMenuAction = useCallback((action: MenuAction) => {
    onAction(action);
  }, [onAction]);

  const handleInputSubmit = useCallback((raw: string) => {
    const v = raw.trim().toLowerCase();
    const byKey = MENU.find(m => m.key === v);
    if (byKey) { setInputValue(""); handleMenuAction(byKey.action); return; }
    const byLabel: Record<string, MenuAction> = {
      demo: "demo", ai: "demo",
      game: "game", play: "game", defender: "game",
      work: "work", portfolio: "work",
      book: "book", call: "book", meeting: "book",
      contact: "contact", project: "contact", hire: "contact",
    };
    const matched = byLabel[v];
    if (matched) { setInputValue(""); handleMenuAction(matched); return; }
    setInputError(true);
    setTimeout(() => setInputError(false), 700);
  }, [handleMenuAction]);

  // Auto-focus input when menu appears
  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div>
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

        <div role="menu" aria-label="Mission Control menu" style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {MENU.map((item, i) => (
            <MenuBtn key={item.key} item={item} onAction={handleMenuAction} delay={80 + i * 70} />
          ))}
        </div>

        {/* Real command input */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6, marginTop: 10,
          paddingTop: 8, borderTop: "1px solid rgba(245,158,11,0.08)",
          animation: "riseIn 0.35s ease 0.55s both",
          border: inputError ? "1px solid rgba(248,113,113,0.35)" : "1px solid transparent",
          borderRadius: 5, padding: "4px 6px", marginLeft: -6,
          transition: "border-color 0.15s",
        }}>
          <span style={{ fontFamily: MONO, fontSize: FS, color: inputError ? "#F87171" : "rgba(245,158,11,0.40)", flexShrink: 0 }}>›</span>
          <label htmlFor={inputId} style={{ position: "absolute", left: -9999 }}>Enter command</label>
          <input
            id={inputId}
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") { handleInputSubmit(inputValue); }
              if (e.key === "Escape") { setInputValue(""); }
            }}
            placeholder="type 1-5 or a command…"
            autoComplete="off"
            spellCheck={false}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontFamily: MONO, fontSize: FS,
              color: inputError ? "#F87171" : "#F59E0B",
              caretColor: "#F59E0B",
              minWidth: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
});
