"use client";

import { useEffect, useState, useRef } from "react";

// The script that types out — shows the AI agent at work
const SCRIPT: Array<{ type: "cmd" | "ok" | "info" | "code" | "gap"; text: string; delay?: number }> = [
  { type: "cmd",  text: "orbitx-agent --project attendx --mode build",  delay: 60 },
  { type: "gap",  text: "" },
  { type: "info", text: "→  Parsing requirements brief…",               delay: 28 },
  { type: "ok",   text: "✓  Domain model extracted  (12 entities)",     delay: 22 },
  { type: "ok",   text: "✓  Sprint plan generated   (3 × 1-wk sprints)",delay: 22 },
  { type: "gap",  text: "" },
  { type: "info", text: "→  Scaffolding Next.js 15 + TypeScript…",      delay: 28 },
  { type: "ok",   text: "✓  Auth layer ready         (JWT + RBAC)",      delay: 22 },
  { type: "ok",   text: "✓  DB schema written        (Postgres + Drizzle)",delay:22},
  { type: "ok",   text: "✓  REST API routes          (14 endpoints)",    delay: 22 },
  { type: "gap",  text: "" },
  { type: "info", text: "→  Integrating LLM matching engine…",          delay: 28 },
  { type: "code", text: 'const match = await agent.rank(candidates, jd)',delay:18 },
  { type: "ok",   text: "✓  Pipeline connected       (GPT-4o + RAG)",   delay: 22 },
  { type: "ok",   text: "✓  Accuracy benchmark       92.4 % precision", delay: 22 },
  { type: "gap",  text: "" },
  { type: "info", text: "→  Deploying to production…",                  delay: 28 },
  { type: "ok",   text: "✓  CI passed                (0 failures)",     delay: 22 },
  { type: "ok",   text: "✓  Live at attendx.io       shipped in 18 d",  delay: 22 },
  { type: "gap",  text: "" },
  { type: "cmd",  text: "_",                                             delay: 0 },
];

// Time between lines completing and the next starting
const LINE_PAUSE = 120;
// Time between completing everything and restarting the loop
const LOOP_PAUSE = 3200;

function useTerminalScript() {
  const [lines, setLines] = useState<typeof SCRIPT>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (lineIndex >= SCRIPT.length) {
      // All lines typed — pause then restart
      timerRef.current = setTimeout(() => {
        setLines([]);
        setCurrentText("");
        setLineIndex(0);
        setCharIndex(0);
        setDone(false);
      }, LOOP_PAUSE);
      return;
    }

    const line = SCRIPT[lineIndex];

    if (line.type === "gap") {
      // Gap lines are instant
      timerRef.current = setTimeout(() => {
        setLines((prev) => [...prev, line]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
        setCurrentText("");
      }, LINE_PAUSE);
      return;
    }

    const fullText = line.text;

    if (charIndex < fullText.length) {
      // Still typing this line
      const delay = line.delay ?? 30;
      timerRef.current = setTimeout(() => {
        setCurrentText(fullText.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, delay);
    } else {
      // Line complete — commit it
      timerRef.current = setTimeout(() => {
        setLines((prev) => [...prev, { ...line, text: fullText }]);
        setCurrentText("");
        setCharIndex(0);
        setLineIndex((i) => i + 1);
      }, LINE_PAUSE);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lineIndex, charIndex]);

  return { lines, currentText, lineIndex };
}

function TerminalLine({ item }: { item: (typeof SCRIPT)[number] }) {
  if (item.type === "gap") return <div style={{ height: 8 }} />;

  const color =
    item.type === "cmd"  ? "#F59E0B" :
    item.type === "ok"   ? "#4ADE80" :
    item.type === "info" ? "#93C5FD" :
    item.type === "code" ? "#C084FC" :
    "#9CA3AF";

  const prefix =
    item.type === "cmd"  ? "$ " :
    item.type === "code" ? "  " :
    "  ";

  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        lineHeight: 1.7,
        fontSize: "clamp(12px, 1.4vw, 13px)",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        color,
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      <span style={{ opacity: 0.5, flexShrink: 0 }}>{prefix}</span>
      <span>{item.text}</span>
    </div>
  );
}

export function HeroVisualB() {
  const { lines, currentText, lineIndex } = useTerminalScript();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal as lines appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, currentText]);

  const currentLine = lineIndex < SCRIPT.length ? SCRIPT[lineIndex] : null;
  const currentColor =
    !currentLine ? "#F59E0B" :
    currentLine.type === "cmd"  ? "#F59E0B" :
    currentLine.type === "ok"   ? "#4ADE80" :
    currentLine.type === "info" ? "#93C5FD" :
    currentLine.type === "code" ? "#C084FC" :
    "#9CA3AF";

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 28px 40px 12px",
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: 500 }}>

        {/* Terminal window */}
        <div
          style={{
            background: "#0D1117",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(245,158,11,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "#161B22",
            }}
          >
            {/* Traffic lights */}
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, flexShrink: 0 }} />
            ))}
            <span
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.04em",
              }}
            >
              orbitx-agent — bash
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            style={{
              padding: "18px 20px 20px",
              height: 310,
              overflowY: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {lines.map((line, i) => (
                <TerminalLine key={i} item={line} />
              ))}

              {/* Currently typing line */}
              {currentLine && currentLine.type !== "gap" && (
                <div
                  style={{
                    display: "flex",
                    lineHeight: 1.7,
                    fontSize: "clamp(12px, 1.4vw, 13px)",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    color: currentColor,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ opacity: 0.5, flexShrink: 0 }}>
                    {currentLine.type === "cmd" ? "$ " : "  "}
                  </span>
                  <span>{currentText}</span>
                  {/* Blinking cursor */}
                  <span
                    style={{
                      display: "inline-block",
                      width: 7,
                      height: "1em",
                      background: "#F59E0B",
                      marginLeft: 1,
                      verticalAlign: "text-bottom",
                      animation: "term-blink 1s step-end infinite",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating badge — top-right */}
        <div
          style={{
            position: "absolute",
            top: -16,
            right: -8,
            background: "linear-gradient(135deg, #F59E0B, #C96500)",
            borderRadius: 10,
            padding: "8px 14px",
            boxShadow: "0 8px 24px rgba(201,101,0,0.40)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 0 0 3px rgba(255,255,255,0.25)",
              animation: "pulse-white 2s infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            AI agent · live build
          </span>
        </div>

        {/* Stats strip below terminal */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginTop: 14,
            background: "#0D1117",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          {[
            { value: "8+", label: "Projects shipped", color: "#F59E0B" },
            { value: "18d", label: "Fastest delivery", color: "#4ADE80" },
            { value: "3+", label: "AI agents built", color: "#93C5FD" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                padding: "10px 0",
                textAlign: "center",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  fontWeight: 700,
                  color: s.color,
                  lineHeight: 1.1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.35)",
                  marginTop: 2,
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.04em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: "-30%",
            background: "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(245,158,11,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      </div>

      <style>{`
        @keyframes term-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse-white { 0%, 100% { box-shadow: 0 0 0 3px rgba(255,255,255,0.25); } 50% { box-shadow: 0 0 0 6px rgba(255,255,255,0.08); } }
      `}</style>
    </div>
  );
}
