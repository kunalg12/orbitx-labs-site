import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Returns true if the device has a coarse pointer (touch/mobile) */
export function useMobileGL(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowCPU =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency < 4;
    setIsMobile(coarse || lowCPU);
  }, []);

  return isMobile;
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
