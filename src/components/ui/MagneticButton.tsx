"use client";

import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
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
    x.current = (e.clientX - centerX) * 0.25;
    y.current = (e.clientY - centerY) * 0.25;
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
    padding: "14px 28px",
    borderRadius: "var(--radius-full)",
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "background 200ms ease, box-shadow 200ms ease, transform 300ms var(--ease-out-expo)",
    whiteSpace: "nowrap",
    ...style,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "var(--color-accent)",
      color: "#fff",
    },
    outline: {
      background: "transparent",
      color: "var(--color-text-primary)",
      border: "1.5px solid var(--color-border-strong)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-text-secondary)",
    },
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
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
