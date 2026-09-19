# Plan: Refactor and Enhance HeroVisualB.tsx

## Context

`src/components/sections/HeroVisualB.tsx` is a 695-line monolith managing phase orchestration, menu rendering, visual styling, and a full Space Invaders clone game loop. This plan splits it into focused files, optimises the game loop, and adds a11y/UX polish.

Branch: `feat/terminal-refactor`

## Rulings (pre-execution)

- **Component splitting**: YES — extract hook + sub-components as specified.
- **Rendering strategy**: YES — row-based string output, individual `<span>` only for non-empty cells (enemies, bullets, ship, explosions, stars rendered inline via coloured spans). Stars can be part of the string if dim colour applied per row-segment, or as spans.
- **Sound effects**: NO — out of scope, not in core plan.
- **High score (localStorage)**: YES — simple, low-risk, persist across sessions.
- **Difficulty scaling**: NO — plan's verification says "behave exactly as before"; scaling changes gameplay.

## Global Constraints

- TypeScript — zero `any`, strict mode, no `// @ts-ignore`.
- Game behaviour identical to current (movement, shooting, collision, win/lose, easter egg pools).
- All three phases (`intro`, `interactive`, `game`) must transition correctly.
- Mobile controls functional on touch with `touch-action: manipulation`.
- CSS classes (`game-grid`, `game-cell`, `terminal-body`, `terminal-wrap`, `mobile-controls`) preserved for responsive media queries in the `<style>` block.
- Keyboard shortcuts 1-5 still trigger menu actions.
- `bun run build` must pass (zero TypeScript errors).

## Tasks

### Task 1: Extract `useSpaceDefender` hook

**File created:** `src/hooks/useSpaceDefender.ts`

Move ALL game logic from `HeroVisualB.tsx` here:
- Types: `Bullet`, `Enemy`, `Explosion`, `GameState`, `CellType`
- Constants: `COLS`, `ROWS`, `SHIP_ROW`, `ENEMIES_PER_ROW`, `ENEMY_TOTAL_ROWS`, `STARS`
- Functions: `initGame`, `stepGame`, `renderCells`, `cellStyle`
- The `setInterval` game loop (80ms tick), `keysRef`, `shootRef`, `gameRef`

Hook signature:
```ts
export function useSpaceDefender(active: boolean): {
  cells: ReturnType<typeof renderCells>;
  gs: GameState;
  keysRef: React.MutableRefObject<Set<string>>;
  shootRef: React.MutableRefObject<boolean>;
}
```

- When `active` is false the loop must not run (use `useEffect` guard on `active`).
- `gameRef.current = initGame()` resets on each activation (`active` flipping true).
- Export `renderCells`, `cellStyle`, `SHIP_ROW`, `ENEMIES_PER_ROW`, `ENEMY_TOTAL_ROWS` so consumers can use them.
- Do NOT move `MENU`, `SURPRISE_POOLS`, phase types, or visual constants — those stay in their respective files.

Verification: `bun run build` passes, no TS errors.

### Task 2: Extract `TerminalMenu` component

**File created:** `src/components/sections/TerminalMenu.tsx`

Move from `HeroVisualB.tsx`:
- `MENU` constant
- `SURPRISE_POOLS` constant
- `MenuAction` type
- `MenuBtn` sub-component (wrap in `React.memo`)
- `Cursor` sub-component (wrap in `React.memo`)
- The entire interactive phase JSX (surprise overlay + normal menu)

Component signature:
```tsx
interface TerminalMenuProps {
  onAction: (action: MenuAction) => void;
}
export const TerminalMenu = React.memo(function TerminalMenu({ onAction }: TerminalMenuProps) { … });
```

- Manage `surpriseActive` state and `surpriseRef` internally.
- `MONO` and `FS` constants can be duplicated here or imported from a shared constants file — whichever is cleaner; do NOT create a new shared file just for this.
- Export `MenuAction` type so `HeroVisualB.tsx` can type the `onAction` prop.

Verification: `bun run build` passes, no TS errors.

### Task 3: Extract `SpaceDefenderGame` component

**File created:** `src/components/sections/SpaceDefenderGame.tsx`

Move from `HeroVisualB.tsx`:
- All game-phase JSX (HUD, game grid, game-over/win overlay, mobile controls)
- Imports `useSpaceDefender` hook from Task 1
- Imports `renderCells`, `cellStyle`, `SHIP_ROW`, `ENEMIES_PER_ROW`, `ENEMY_TOTAL_ROWS` from Task 1

Component signature:
```tsx
interface SpaceDefenderGameProps {
  onExit: () => void;   // called when ESC pressed or "RETURN TO BASE" clicked
}
export function SpaceDefenderGame({ onExit }: SpaceDefenderGameProps) { … }
```

- `useSpaceDefender(true)` — always active when this component is mounted (parent mounts it only during game phase).
- Keyboard: `ArrowLeft`/`ArrowRight`/`a`/`d` for movement, `Space` to shoot, `Escape` → call `onExit()`.
- Mobile controls (◄ ◆ ►) with `touch-action: manipulation`.
- Add `aria-hidden="true"` to the game grid container div.
- HUD shows `HOSTILES {aliveCount}/{total}` and `← → MOVE · SPC FIRE · ESC EXIT`.
- CSS classes `game-grid`, `game-cell`, `mobile-controls` preserved.
- Add `prefers-reduced-motion` media query inside the component's `<style>` block (or inline check) to disable sweep line and border pulse animations.
- **High score**: read `localStorage.getItem("orbitx-hiscore")` on mount. After game ends (win or lose), if `gs.score > hiScore` write new high score. Show `HI: {hiScore}` in the HUD next to score.

Verification: `bun run build` passes, no TS errors.

### Task 4: Refactor `HeroVisualB.tsx` as pure orchestrator

**File modified:** `src/components/sections/HeroVisualB.tsx`

Remove everything extracted in Tasks 1-3. HeroVisualB.tsx becomes a thin orchestrator:

Responsibilities remaining:
- `Phase` type (`"intro" | "interactive" | "game"`)
- `useState<Phase>("intro")` and intro `setTimeout` auto-advance (2600ms)
- The outer terminal chrome: terminal window div, title bar, scanline overlay, CRT vignette, sweep line, badge, stats strip, ambient glow
- Import and render `<TerminalMenu onAction={handleAction} />` for interactive phase
- Import and render `<SpaceDefenderGame onExit={() => setPhase("interactive")} />` for game phase
- `handleAction` callback: `game` → setPhase("game"), `work` → scrollIntoView, `book` → window.open, `contact` → window.location.href
- All CSS keyframes and responsive styles (terminal-wrap, terminal-body media queries, borderPulse, sweepLine, glitch, etc.) stay here

After this task HeroVisualB.tsx should be ≤ 200 lines.

Verification: `bun run build` passes, no TS errors. All three phases work in the browser.

### Task 5: Performance optimisation + a11y polish

**Files modified:** All four files from Tasks 1-4.

#### Performance
- **rAF loop**: In `useSpaceDefender`, replace `setInterval(fn, 80)` with a `requestAnimationFrame` loop using a fixed 80ms timestep accumulator:
  ```ts
  let lastTime = 0;
  const STEP = 80;
  function loop(now: number) {
    if (now - lastTime >= STEP) {
      lastTime = now;
      // step game
    }
    rafId = requestAnimationFrame(loop);
  }
  rafId = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(rafId);
  ```
- **Memoisation**: `React.memo` on `Cursor` and `MenuBtn` (Task 2 should already do this; verify and fix if not).
- **Row-based rendering option** (only if it doesn't break per-char glow): if the per-character `<span>` approach already performs well (80ms tick is not CPU-bound), keep it. The goal is correctness and glow quality over micro-optimisation. Do NOT switch to row-based if it removes the textShadow glow on individual characters.

#### a11y
- `aria-hidden="true"` on game grid container (should be done in Task 3; verify).
- `role="menu"` and `role="menuitem"` on terminal menu container and buttons in `TerminalMenu.tsx`.
- `prefers-reduced-motion`: In the `<style>` block of `HeroVisualB.tsx` add:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .terminal-wrap * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
  }
  ```

Verification: `bun run build` passes. TypeScript strict — zero errors.
