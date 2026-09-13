"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    const handleEnter = () => {
      if (ringRef.current) ringRef.current.style.transform += " scale(1.8)";
    };
    const handleLeave = () => {
      if (ringRef.current) ringRef.current.style.transform = ringRef.current.style.transform.replace(" scale(1.8)", "");
    };

    const interactives = document.querySelectorAll("a, button, [role=button]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--color-accent)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-100px, -100px)",
          marginLeft: "-4px",
          marginTop: "-4px",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1.5px solid var(--color-accent)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-100px, -100px)",
          marginLeft: "-18px",
          marginTop: "-18px",
          willChange: "transform",
          opacity: 0.6,
          transition: "transform 100ms ease",
        }}
      />
    </>
  );
}
