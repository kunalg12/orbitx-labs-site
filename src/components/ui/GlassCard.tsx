"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  style,
  hover = true,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" } : undefined}
      transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
      onClick={onClick}
      className={cn(className)}
      style={{
        background: "var(--color-bg-base)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
