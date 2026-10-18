# OrbitX Labs — Gemini Agent & Engineering Guidelines

This repository contains the official website and client platform for OrbitX Labs. All Gemini and AI pair-programmers operating in this workspace must adhere to the following architectural, design, and verification standards.

---

## 1. Technology Stack
- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";` + `@theme`)
- **3D & Canvas**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Animations**: Framer Motion + GSAP ScrollTrigger
- **Form & Validation**: React Hook Form + Zod

---

## 2. React 19 & Next.js 16 Hook Rules
1. **No Synchronous `setState` in Effects**:
   - Do NOT invoke `setState` synchronously in `useEffect` bodies. It triggers `react-hooks/set-state-in-effect` compiler errors and cascading renders.
   - To read external browser state (e.g. `localStorage`, `matchMedia`, window properties), use **`useSyncExternalStore`**.
   - If an effect must trigger a state change, defer it with `setTimeout(..., 0)` or `requestAnimationFrame`.
2. **Client Component Navigation**:
   - Do not use `window.location.href = "/path"` for internal routes. Use `useRouter().push('/path')` from `next/navigation`.
3. **Ref Access in Render**:
   - Do not read or write `ref.current` during the render phase. Access refs only in effects or event handlers.
   - When cleaning up timeouts or listeners, capture `const val = ref.current` inside the effect scope.

---

## 3. Apple Design System & Brand Palette
- **Brand Colors**: Preserve the warm amber/orange and yellow identity:
  - Light Accent: `#C96500` (Rich amber-orange)
  - Dark Accent: `#F59E0B` (Vivid glowing amber-yellow)
  - Neon Highlight: `#FBBF24`
  - Avoid cold generic system blue (`#007AFF`) as the primary brand color.
- **Typography**:
  - Headings: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif`
  - Code / Terminal: `"SF Mono", "Fira Code", ui-monospace, "Cascadia Code", monospace`
- **Materials**:
  - Translucent frosted glass: `backdrop-filter: blur(20px) saturate(180%)` with subtle borders (`var(--color-border)`).
  - Apple squircles: `4px`, `6px`, `8px`, `10px`, `14px`, `18px`, `24px`, `9999px`.
- **Pointer Ergonomics**:
  - Maintain native cursor precision. Never apply `cursor: none` to the page.

---

## 4. Verification Protocol (Before Completion)
Always verify before declaring any task complete:
```bash
npm run typecheck # 0 TypeScript errors
npm run lint      # Must pass with 0 errors and 0 warnings
npm run build     # Must pass and generate all 18 static/dynamic routes
```
When deploying to production, ensure commits on your feature branch are fast-forwarded to `main` and pushed to `origin/main` for Vercel.
