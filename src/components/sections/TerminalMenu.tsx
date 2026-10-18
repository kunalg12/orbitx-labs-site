"use client";
import React, { useCallback, useEffect, useRef, useState, useId } from "react";

// ─── Types / constants ─────────────────────────────────────────────────────────
export type MenuAction = "demo" | "game" | "work" | "book" | "contact";

const MONO = "'SF Mono', ui-monospace, 'Cascadia Code', 'Fira Code', monospace";
const FS   = "clamp(11px, 1.3vw, 12.5px)";

export const MENU: Array<{ key: string; icon: string; label: string; action: MenuAction }> = [
  { key: "1", icon: "⚡", label: "Run AI Agent Demo",      action: "demo"     },
  { key: "2", icon: "📂", label: "Inspect Live Portfolios",  action: "work"     },
  { key: "3", icon: "📅", label: "Schedule 30-min Call",     action: "book"     },
  { key: "4", icon: "✨", label: "Start a New Build",        action: "contact"  },
  { key: "5", icon: "🚀", label: "Launch Space Defender",    action: "game"     },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
export const Cursor = React.memo(function Cursor() {
  return (
    <span style={{
      display: "inline-block", width: 7, height: "1.1em",
      background: "var(--color-accent)", marginLeft: 2, verticalAlign: "text-bottom",
      borderRadius: "1px",
      animation: "term-blink 1s step-end infinite",
      boxShadow: "0 0 8px rgba(245,158,11,0.7)",
    }} />
  );
});

const MenuBtn = React.memo(function MenuBtn({ item, onAction, delay }: { item: typeof MENU[number]; onAction: (a: MenuAction) => void; delay: number }) {
  return (
    <button
      role="menuitem"
      onClick={() => onAction(item.action)}
      style={{
        display: "flex", alignItems: "center", gap: 10, padding: "7px 10px",
        background: "transparent", border: "1px solid transparent", cursor: "pointer",
        fontFamily: MONO, fontSize: FS, lineHeight: 1.6, borderRadius: "var(--radius-sm)",
        color: "var(--color-text-secondary)", textAlign: "left", width: "100%", transition: "all 140ms ease",
        animation: `riseIn 0.35s ease both`,
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--color-text-primary)";
        el.style.background = "var(--color-accent-light)";
        el.style.borderColor = "color-mix(in srgb, var(--color-accent) 25%, transparent)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--color-text-secondary)";
        el.style.background = "transparent";
        el.style.borderColor = "transparent";
      }}
    >
      <span style={{ color: "var(--color-accent)", fontWeight: 700, minWidth: 26, flexShrink: 0 }}>[{item.key}]</span>
      <span style={{ fontSize: 13, flexShrink: 0 }}>{item.icon}</span>
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
      demo: "demo", ai: "demo", agent: "demo",
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

  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div>
      <div style={{ animation: "fadeIn 0.35s ease" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 10, paddingBottom: 8,
          borderBottom: "1px solid var(--color-border)",
        }}>
          <span style={{ fontFamily: MONO, fontSize: 10, color: "var(--color-accent)", letterSpacing: "0.10em", fontWeight: 700 }}>
            PRO STUDIO CONSOLE
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: 10, color: "var(--color-system-green)", letterSpacing: "0.08em" }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--color-system-green)", animation: "pulseDot 2.5s infinite", boxShadow: "0 0 6px rgba(52,199,89,0.5)" }} />
            SYSTEMS READY
          </span>
        </div>

        <div style={{ fontFamily: MONO, fontSize: FS, color: "var(--color-text-secondary)", lineHeight: 1.65, marginBottom: 8, animation: "riseIn 0.35s ease 0.05s both" }}>
          → Select operation or type shortcut [1-5]:
        </div>

        <div role="menu" aria-label="Developer Console menu" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {MENU.map((item, i) => (
            <MenuBtn key={item.key} item={item} onAction={handleMenuAction} delay={60 + i * 50} />
          ))}
        </div>

        {/* Real command input */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, marginTop: 10,
          border: inputError ? "1px solid var(--color-system-red)" : "1px solid var(--color-border)",
          background: "color-mix(in srgb, var(--color-bg-base) 60%, transparent)",
          borderRadius: "var(--radius-sm)", padding: "6px 10px",
          transition: "border-color 0.15s ease",
        }}>
          <span style={{ fontFamily: MONO, fontSize: FS, color: inputError ? "var(--color-system-red)" : "var(--color-accent)", flexShrink: 0, fontWeight: 700 }}>›</span>
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
            placeholder="type 1-5 or enter command…"
            autoComplete="off"
            spellCheck={false}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontFamily: MONO, fontSize: FS,
              color: inputError ? "var(--color-system-red)" : "var(--color-text-primary)",
              caretColor: "var(--color-accent)",
              minWidth: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
});
