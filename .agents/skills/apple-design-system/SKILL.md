---
name: apple-design-system
description: >-
  Use this skill whenever creating, modifying, or refactoring UI components, pages,
  or styling in the OrbitX Labs site. Enforces Apple Human Interface Guidelines (HIG),
  SF Pro typography, frosted glass materials, and the brand warm amber-yellow color palette.
---

# Apple Design System for OrbitX Labs

This skill guides the design and implementation of world-class, premium UI following Apple's Human Interface Guidelines combined with the OrbitX Labs warm amber/orange brand aesthetic.

## Core Design Tokens

### 1. Typography Stack
- **Display & Headings**: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif`
- **Body & Captions**: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif`
- **Monospace / Console**: `"SF Mono", "Fira Code", ui-monospace, "Cascadia Code", monospace`

### 2. Brand Color Palette (Warm Amber & Orange)
- **Primary Brand Accent (Light)**: `#C96500` (Rich warm amber-orange)
- **Primary Brand Accent (Dark)**: `#F59E0B` (Glowing amber-yellow)
- **Neon / Glow Highlight**: `#FBBF24`
- **Accent Light Tint**: `rgba(201, 101, 0, 0.10)` / `rgba(245, 158, 11, 0.16)`
- **System Accents**:
  - Green (Live / Online): `#34C759` (Light) / `#30D158` (Dark)
  - Traffic lights: Red `#FF5F56`, Yellow `#FFBD2E`, Green `#27C93F`

### 3. Apple Materials & Translucency
- **Frosted Glass (Navigation & Cards)**:
  ```css
  background: color-mix(in srgb, var(--color-bg-card) 85%, transparent);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
  ```

### 4. Corner Radii (Apple Squircle Scale)
- `xs: 4px`, `sm: 6px`, `md: 8px`, `lg: 10px`, `xl: 14px`, `2xl: 18px`, `3xl: 24px`, `full: 9999px`

### 5. Motion & Physics
- **Apple Spring**: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Smooth Easing**: `cubic-bezier(0.25, 1, 0.5, 1)`
- **Durations**: Fast `150ms`, Base `250ms`, Slow `450ms`

## Component Guidelines
1. **Interactive Elements**: Use native cursor ergonomics (`cursor: pointer`). Do NOT apply custom hiding cursors (`cursor: none`).
2. **Buttons**:
   - Primary: Solid amber with subtle layered shadow (`0 2px 8px rgba(245, 158, 11, 0.35)`).
   - Secondary: Frosted card background with subtle border.
   - Ghost: Transparent background with micro-hover background shift.
3. **Form Fields**:
   - Generous touch targets (`padding: 13px 16px`).
   - Squircles (`border-radius: 10px`).
   - Focus ring: `outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3.5px rgba(245, 158, 11, 0.18)`.
