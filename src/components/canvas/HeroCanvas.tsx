"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { ParticleNetwork } from "./ParticleNetwork";
import { CoreSphere } from "./CoreSphere";
import { useTheme } from "@/components/layout/ThemeProvider";

interface HeroCanvasProps {
  isMobile: boolean;
}

export function HeroCanvas({ isMobile }: HeroCanvasProps) {
  const { theme } = useTheme();
  const themeValue = theme === "dark" ? 1 : 0;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: ready ? 1 : 0,
        transition: "opacity 1000ms ease",
        pointerEvents: "none",
      }}
    >
      <Canvas
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        camera={{ fov: 56, position: [0, 0, 7], near: 0.1, far: 100 }}
        style={{ width: "100%", height: "100%" }}
      >
        <AdaptiveDpr pixelated />

        {/* Even ambient — illuminates all layer faces equally so edges read clearly */}
        <ambientLight intensity={0.55} color="#E8D4B8" />

        {/* Top-front key — warms upper layers, creates face contrast from edge glow */}
        <pointLight position={[3, 5, 5]} intensity={1.8} color="#FFFFFF" />

        {/* Amber from inside the stack — the "data processing" warmth */}
        <pointLight position={[0, 0, 3]} intensity={1.4} color="#F59E0B" distance={7} decay={2} />

        {/* Back separation — keeps layers from merging into background in dark mode */}
        <pointLight position={[-5, 0, -4]} intensity={0.55} color="#FBBF24" distance={12} decay={2} />

        {/* Bottom lift — no hard shadow under the base layer */}
        <pointLight position={[0, -4, 2]} intensity={0.28} color="#C8D4E8" />

        <Suspense fallback={null}>
          {/*
            Intentional +0.7 X offset: shifts orbital group right so the left arc of
            tilted/rotating rings clears the canvas left boundary. At half-width ≈ 6.6
            world units, 0.7 is ~10% — orbit appears centered to eye because the
            canvas itself starts at the page midpoint (left: 50% in the hero layout).
            Do not zero this out: it prevents left-edge ring clipping.
          */}
          <group position={[0.4, 0, 0]}>
            <ParticleNetwork theme={themeValue} isMobile={isMobile} />
            <CoreSphere theme={themeValue} isMobile={isMobile} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
