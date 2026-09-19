"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Game constants ────────────────────────────────────────────────────────────
const COLS = 42;
const ROWS = 11;
export const SHIP_ROW = ROWS - 1;
export const ENEMIES_PER_ROW = 7;
export const ENEMY_TOTAL_ROWS = 2;

// Pre-seeded star map (deterministic, renders consistently)
const STARS: boolean[][] = (() => {
  const map = Array.from({ length: ROWS - 1 }, () => Array(COLS).fill(false));
  let s = 0xDEADBEEF;
  const rng = () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5;
    return (s >>> 0) / 0x100000000;
  };
  for (let r = 0; r < ROWS - 1; r++)
    for (let c = 0; c < COLS; c++)
      if (rng() < 0.032) map[r][c] = true;
  return map;
})();

type CellType = "empty" | "star" | "ship" | "bullet" | "enemy1" | "enemy2" | "explode" | "exfade";

interface Bullet    { col: number; row: number; id: number }
interface Enemy     { col: number; row: number; tier: 1 | 2; id: number; alive: boolean }
interface Explosion { col: number; row: number; frame: number; id: number }
export interface GameState {
  shipCol: number; bullets: Bullet[]; enemies: Enemy[];
  explosions: Explosion[]; score: number; tick: number;
  gameOver: boolean; won: boolean; dirX: 1 | -1;
  lastShotTick: number; nextId: number;
}

function initGame(): GameState {
  const enemies: Enemy[] = [];
  let id = 0;
  const spacing = Math.floor((COLS - 4) / ENEMIES_PER_ROW);
  const startCol = Math.floor((COLS - spacing * (ENEMIES_PER_ROW - 1)) / 2);
  for (let r = 0; r < ENEMY_TOTAL_ROWS; r++) {
    for (let c = 0; c < ENEMIES_PER_ROW; c++) {
      enemies.push({ col: startCol + c * spacing, row: r + 1, tier: (r + 1) as 1 | 2, id: id++, alive: true });
    }
  }
  return { shipCol: Math.floor(COLS / 2), bullets: [], enemies, explosions: [], score: 0, tick: 0, gameOver: false, won: false, dirX: 1, lastShotTick: -99, nextId: id };
}

function stepGame(gs: GameState, keys: Set<string>, shoot: boolean): GameState {
  if (gs.gameOver || gs.won) return gs;
  const tick = gs.tick + 1;
  let { shipCol, bullets, enemies, explosions, score, dirX, lastShotTick, nextId } = gs;

  if (tick % 2 === 0) {
    if (keys.has("ArrowLeft")  || keys.has("a") || keys.has("A")) shipCol = Math.max(1, shipCol - 1);
    if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) shipCol = Math.min(COLS - 2, shipCol + 1);
  }
  if (shoot && tick - lastShotTick > 5) {
    bullets = [...bullets, { col: shipCol, row: SHIP_ROW - 1, id: nextId++ }];
    lastShotTick = tick;
  }

  bullets = bullets.map(b => ({ ...b, row: b.row - 1 })).filter(b => b.row >= 0);

  let newEnemies = enemies.map(e => ({ ...e }));
  if (tick % 8 === 0) {
    const alive = newEnemies.filter(e => e.alive);
    if (alive.length > 0) {
      const minC = Math.min(...alive.map(e => e.col));
      const maxC = Math.max(...alive.map(e => e.col));
      const bounce = (dirX === 1 && maxC >= COLS - 2) || (dirX === -1 && minC <= 1);
      if (bounce) { dirX = (dirX * -1) as 1 | -1; newEnemies = newEnemies.map(e => e.alive ? { ...e, row: e.row + 1 } : e); }
      else { newEnemies = newEnemies.map(e => e.alive ? { ...e, col: e.col + dirX } : e); }
    }
  }

  const hitIds = new Set<number>();
  const newExplosions = [...explosions];
  const keptBullets: Bullet[] = [];
  for (const b of bullets) {
    let hit = false;
    for (const e of newEnemies) {
      if (e.alive && !hitIds.has(e.id) && e.col === b.col && e.row === b.row) {
        hitIds.add(e.id); score += 10;
        newExplosions.push({ col: e.col, row: e.row, frame: 0, id: nextId++ });
        hit = true; break;
      }
    }
    if (!hit) keptBullets.push(b);
  }
  newEnemies = newEnemies.map(e => hitIds.has(e.id) ? { ...e, alive: false } : e);
  const aged = newExplosions.map(ex => ({ ...ex, frame: ex.frame + 1 })).filter(ex => ex.frame < 7);
  const gameOver = newEnemies.some(e => e.alive && e.row >= SHIP_ROW);
  const won      = newEnemies.every(e => !e.alive);

  return { shipCol, bullets: keptBullets, enemies: newEnemies, explosions: aged, score, tick, gameOver, won, dirX, lastShotTick, nextId };
}

export function renderCells(gs: GameState): { char: string; type: CellType }[][] {
  const grid: { char: string; type: CellType }[][] =
    Array.from({ length: ROWS }, () => Array(COLS).fill(null).map(() => ({ char: " ", type: "empty" as CellType })));

  // Stars
  for (let r = 0; r < ROWS - 1; r++)
    for (let c = 0; c < COLS; c++)
      if (STARS[r][c]) grid[r][c] = { char: "·", type: "star" };

  // Enemies  tier 1 = ▾ (scout)  tier 2 = ◆ (commander)
  for (const e of gs.enemies) {
    if (e.alive && e.row >= 0 && e.row < ROWS && e.col < COLS)
      grid[e.row][e.col] = { char: e.tier === 1 ? "▾" : "◆", type: e.tier === 1 ? "enemy1" : "enemy2" };
  }

  // Explosions
  for (const ex of gs.explosions) {
    if (ex.row >= 0 && ex.row < ROWS && ex.col < COLS) {
      const char = ex.frame < 2 ? "*" : ex.frame < 4 ? "+" : ex.frame < 6 ? "." : " ";
      grid[ex.row][ex.col] = { char, type: ex.frame < 4 ? "explode" : "exfade" };
    }
  }

  // Bullets
  for (const b of gs.bullets) {
    if (b.row >= 0 && b.row < ROWS && b.col < COLS)
      grid[b.row][b.col] = { char: "|", type: "bullet" };
  }

  // Ship — 3-wide  ‹^›
  if (!gs.gameOver) {
    if (gs.shipCol > 0)        grid[SHIP_ROW][gs.shipCol - 1] = { char: "‹", type: "ship" };
    grid[SHIP_ROW][gs.shipCol]  = { char: "^", type: "ship" };
    if (gs.shipCol < COLS - 1) grid[SHIP_ROW][gs.shipCol + 1] = { char: "›", type: "ship" };
  }

  return grid;
}

export function cellStyle(type: CellType): { color: string; textShadow: string; opacity?: number } {
  switch (type) {
    case "ship":    return { color: "#F59E0B", textShadow: "0 0 8px rgba(245,158,11,0.9), 0 0 20px rgba(245,158,11,0.4)" };
    case "bullet":  return { color: "#FDE68A", textShadow: "0 0 6px rgba(253,230,138,0.8)" };
    case "enemy1":  return { color: "#F87171", textShadow: "0 0 8px rgba(248,113,113,0.7)" };
    case "enemy2":  return { color: "#FB923C", textShadow: "0 0 8px rgba(251,146,60,0.7)" };
    case "explode": return { color: "#FFF9C4", textShadow: "0 0 12px rgba(255,249,196,0.9), 0 0 24px rgba(255,200,100,0.6)" };
    case "exfade":  return { color: "#F59E0B", textShadow: "0 0 6px rgba(245,158,11,0.4)", opacity: 0.5 };
    case "star":    return { color: "rgba(255,255,255,0.18)", textShadow: "none" };
    default:        return { color: "transparent", textShadow: "none" };
  }
}

export function useSpaceDefender(active: boolean): {
  cells: ReturnType<typeof renderCells>;
  gs: GameState;
  keysRef: React.MutableRefObject<Set<string>>;
  shootRef: React.MutableRefObject<boolean>;
} {
  const gameRef  = useRef<GameState>(initGame());
  const keysRef  = useRef<Set<string>>(new Set());
  const shootRef = useRef(false);
  const [, setRenderTick] = useState(0);

  useEffect(() => {
    if (!active) return;
    gameRef.current = initGame();
    let lastTime = 0;
    let rafId: number;
    const STEP = 80;
    const loop = (now: number) => {
      if (now - lastTime >= STEP) {
        lastTime = now;
        gameRef.current = stepGame(gameRef.current, keysRef.current, shootRef.current);
        shootRef.current = false;
        setRenderTick(t => t + 1);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [active]);

  const gs    = gameRef.current;
  const cells = active ? renderCells(gs) : [];

  return { cells, gs, keysRef, shootRef };
}
