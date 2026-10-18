import { useSyncExternalStore } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function subscribeMobile(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(pointer: coarse)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getMobileSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const lowCPU =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency < 4;
  return coarse || lowCPU;
}

function getMobileServerSnapshot(): boolean {
  return false;
}

/** Returns true if the device has a coarse pointer (touch/mobile) */
export function useMobileGL(): boolean {
  return useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}
