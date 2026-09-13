"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Tech stack layers — Database (bottom, widest) → UI (top, narrowest)
const LAYERS = [
  { name: "Database", y: -1.40, w: 3.40, d: 2.00, h: 0.10, color: "#F59E0B", phase: 0.00 },
  { name: "Backend",  y: -0.70, w: 2.90, d: 1.70, h: 0.10, color: "#FBBF24", phase: 1.26 },
  { name: "API",      y:  0.00, w: 2.40, d: 1.40, h: 0.10, color: "#C96500", phase: 2.51 },
  { name: "Frontend", y:  0.70, w: 1.90, d: 1.10, h: 0.10, color: "#FCD34D", phase: 3.77 },
  { name: "UI",       y:  1.40, w: 1.40, d: 0.80, h: 0.10, color: "#F59E0B", phase: 5.03 },
] as const;

// One layer: glass fill + amber edges + a subtle inner face glow
function StackLayer({
  config,
  isDark,
  stackRef,
}: {
  config: (typeof LAYERS)[number];
  isDark: boolean;
  stackRef: React.RefObject<THREE.Group | null>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgeRef = useRef<THREE.LineSegments>(null);
  const { w, d, h, color, y, phase } = config;

  const edgesGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(w, h, d);
    return new THREE.EdgesGeometry(box);
  }, [w, d, h]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const floatY = Math.sin(t * 0.55 + phase) * 0.055;
    if (meshRef.current) meshRef.current.position.y = floatY;
    if (edgeRef.current) {
      edgeRef.current.position.y = floatY;
      // Pulse the edge opacity
      const mat = edgeRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = isDark
        ? 0.70 + Math.sin(t * 1.8 + phase) * 0.20
        : 0.55 + Math.sin(t * 1.8 + phase) * 0.18;
    }
  });

  return (
    <group position={[0, y, 0]}>
      {/* Glass fill — very low opacity flat face */}
      <mesh ref={meshRef}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={isDark ? 0.055 : 0.040}
          roughness={0.1}
          metalness={0.3}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      {/* Amber wire edges — the main visual element */}
      <lineSegments ref={edgeRef} geometry={edgesGeo}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={isDark ? 0.72 : 0.58}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Rising data particles that flow upward between layers
function DataParticles({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 120;

  // Bake positions deterministically — each particle gets a lane inside the stack XZ bounds
  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      // Deterministic golden-angle spread within the footprint of the widest layer
      const theta = (i * 137.508 * Math.PI) / 180;
      const r = Math.sqrt((i + 0.5) / COUNT) * 1.55;
      positions[i * 3]     = Math.cos(theta) * r;
      positions[i * 3 + 1] = -1.5 + ((i * 47) % COUNT) / COUNT * 3.0; // spread across stack height
      positions[i * 3 + 2] = Math.sin(theta) * r * 0.65;
      speeds[i]  = 0.18 + (i % 7) * 0.04;
      phases[i]  = (i * 0.618) % 1.0;
    }
    return { positions, speeds, phases };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * 0.008;
      if (arr[i * 3 + 1] > 1.6) {
        arr[i * 3 + 1] = -1.6;
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#F59E0B"
        size={0.032}
        sizeAttenuation
        transparent
        opacity={isDark ? 0.60 : 0.28}
        depthWrite={false}
      />
    </points>
  );
}

// Connector lines between layer centroids — vertical spine
function SpineLines({ isDark }: { isDark: boolean }) {
  const geo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < LAYERS.length - 1; i++) {
      const a = LAYERS[i];
      const b = LAYERS[i + 1];
      // 4 corner connectors per gap, scaled to inner layer size
      const sx = Math.min(a.w, b.w) * 0.42;
      const sz = Math.min(a.d, b.d) * 0.42;
      for (const [dx, dz] of [[-sx, -sz], [sx, -sz], [sx, sz], [-sx, sz]]) {
        pts.push(new THREE.Vector3(dx, a.y + a.h / 2, dz));
        pts.push(new THREE.Vector3(dx, b.y - b.h / 2, dz));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial
        color="#F59E0B"
        transparent
        opacity={isDark ? 0.18 : 0.12}
        depthWrite={false}
      />
    </lineSegments>
  );
}

export function ParticleNetwork({ theme, isMobile }: { theme: number; isMobile: boolean }) {
  const isDark = theme > 0.5;
  const stackRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const st = ScrollTrigger.create({
      trigger: "#hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        cam.position.z = 7 + self.progress * 5;
        if (stackRef.current) stackRef.current.position.z = -self.progress * 1.5;
      },
    });
    return () => {
      cam.position.z = 7;
      st.kill();
    };
  }, [camera]);

  useFrame(({ clock }) => {
    if (!stackRef.current) return;
    const t = clock.getElapsedTime();
    // Slow Y rotation — reveals all faces, shows 3D depth
    stackRef.current.rotation.y = t * 0.14;
    // Gentle global tilt — breathes slowly
    stackRef.current.rotation.x = Math.sin(t * 0.09) * 0.08;
    stackRef.current.rotation.z = Math.cos(t * 0.07) * 0.03;
  });

  if (isMobile) return null;

  return (
    <group ref={stackRef}>
      {LAYERS.map((layer) => (
        <StackLayer key={layer.name} config={layer} isDark={isDark} stackRef={stackRef} />
      ))}
      <SpineLines isDark={isDark} />
      <DataParticles isDark={isDark} />
    </group>
  );
}
