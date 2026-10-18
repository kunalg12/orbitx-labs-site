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
      whileHover={
        hover
          ? {
              y: -3,
              boxShadow: "0 12px 32px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.04)",
              borderColor: "var(--color-border-strong)",
            }
          : undefined
      }
      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
      onClick={onClick}
      className={cn("apple-card", className)}
      style={{
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
