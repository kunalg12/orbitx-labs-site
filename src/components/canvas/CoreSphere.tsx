"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CoreSphereProps {
  theme: number;
  isMobile?: boolean;
}

// Glowing amber core that sits inside the stack at the API layer —
// the "processing heart" peeking through the transparent layer gaps.
export function CoreSphere({ theme, isMobile = false }: CoreSphereProps) {
  const glowRef = useRef<THREE.Mesh>(null);
  const isDark = theme > 0.5;

  useFrame(({ clock }) => {
    if (isMobile || !glowRef.current) return;
    const t = clock.getElapsedTime();
    const mat = glowRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.55 + Math.sin(t * 2.4) * 0.22 + Math.sin(t * 4.1) * 0.08;
  });

  if (isMobile) return null;

  return (
    <group>
      {/* Core orb at the stack's center (API layer height = y≈0) */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.55} depthWrite={false} />
      </mesh>

      {/* Point light from core — illuminates inner faces of layers from inside */}
      <pointLight
        position={[0, 0, 0]}
        intensity={isDark ? 1.8 : 1.3}
        color="#F59E0B"
        distance={4}
        decay={2}
      />
    </group>
  );
}
