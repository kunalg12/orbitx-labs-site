"use client";

import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  style?: React.CSSProperties;
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = "primary",
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useRef(0);
  const y = useRef(0);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.current = (e.clientX - centerX) * 0.18;
    y.current = (e.clientY - centerY) * 0.18;
    ref.current.style.transform = `translate(${x.current}px, ${y.current}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px 24px",
    borderRadius: "var(--radius-full)",
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "background 150ms ease, box-shadow 200ms ease, border-color 150ms ease, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
    whiteSpace: "nowrap",
    ...style,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "var(--color-accent)",
      color: "#FFFFFF",
      boxShadow: "0 2px 8px rgba(0, 122, 255, 0.28)",
    },
    secondary: {
      background: "var(--color-accent-light)",
      color: "var(--color-accent)",
      border: "1px solid transparent",
    },
    outline: {
      background: "transparent",
      color: "var(--color-text-primary)",
      border: "1px solid var(--color-border-strong)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-text-secondary)",
    },
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(className)}
      style={{ ...baseStyle, ...variantStyles[variant] }}
    >
      {children}
    </motion.button>
  );
}
