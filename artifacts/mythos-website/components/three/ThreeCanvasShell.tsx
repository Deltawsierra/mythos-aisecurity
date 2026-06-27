"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import {
  CANVAS_DPR,
  CREST_CAMERA_Z,
  type CrestPointerState,
} from "@/lib/three";
import { HeroCrestModel } from "./HeroCrestModel";

/**
 * Warm bronze/gold base lighting with a quick "warms into view" reveal and a
 * gentle breathing. Intensities are capped to keep the scene dark/cinematic
 * (no overexposure). No blue/cyan, no shadows. Must render inside <Canvas>.
 */
function CrestLights({ animate }: { animate: boolean }) {
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);
  const startRef = useRef<number | null>(null);

  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.getElapsedTime();
    if (startRef.current === null) startRef.current = t;
    const elapsed = t - startRef.current;

    const p = Math.min(elapsed / 0.9, 1);
    const ease = 1 - Math.pow(1 - p, 3);

    if (ambRef.current) ambRef.current.intensity = 0.22 + 0.26 * ease;
    if (keyRef.current) {
      keyRef.current.intensity = 0.2 + 1.55 * ease + Math.sin(t * 0.5) * 0.1 * ease;
    }
    if (rimRef.current) rimRef.current.intensity = 1.25 * ease;
  });

  return (
    <>
      <ambientLight ref={ambRef} intensity={0.22} color="#caa46a" />
      <directionalLight
        ref={keyRef}
        position={[2.4, 3, 4]}
        intensity={0.2}
        color="#f0b566"
      />
      <directionalLight
        ref={rimRef}
        position={[-3.5, 1.2, -3]}
        intensity={0}
        color="#b8763a"
      />
      <hemisphereLight args={["#3a2c1c", "#0a0807", 0.32]} />
    </>
  );
}

/**
 * Cursor-reactive warm highlight. A bronze/gold point light that follows the
 * normalized pointer across the crest and intensifies as the pointer nears the
 * center — "responding to inspection". Values are damped (no flashiness) and
 * fall to zero when the pointer leaves. No bloom/postprocessing.
 */
function CursorLight({ pointer }: { pointer: CrestPointerState }) {
  const ref = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    const l = ref.current;
    if (!l) return;
    const targetX = pointer.inside ? pointer.x * 2.4 : 0;
    const targetY = pointer.inside ? -pointer.y * 1.8 : 0.6;
    l.position.x = THREE.MathUtils.damp(l.position.x, targetX, 8, delta);
    l.position.y = THREE.MathUtils.damp(l.position.y, targetY, 8, delta);
    const targetI = pointer.inside ? 1.4 + pointer.proximity * 5 : 0;
    l.intensity = THREE.MathUtils.damp(l.intensity, targetI, 4, delta);
  });

  return (
    <pointLight
      ref={ref}
      color="#f5c074"
      distance={14}
      decay={2}
      position={[0, 0.6, 3.2]}
      intensity={0}
    />
  );
}

interface ThreeCanvasShellProps {
  onModelLoaded?: () => void;
  /** When false the render loop is paused (panel scrolled out of view). */
  active?: boolean;
  /** Shared interaction state (pointer / drag / scroll). */
  pointer: CrestPointerState;
}

/**
 * Isolated R3F canvas for the homepage hero crest only. Transparent so the
 * free-floating hero environment shows through. Capped DPR, no postprocessing,
 * no particles, no shadows. The canvas itself has pointer-events disabled
 * (interaction is captured on the DOM wrapper) and is aria-hidden. The render
 * loop pauses (frameloop "never") whenever the panel is offscreen.
 */
export default function ThreeCanvasShell({
  onModelLoaded,
  active = true,
  pointer,
}: ThreeCanvasShellProps) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={CANVAS_DPR}
        camera={{ position: [0, 0, CREST_CAMERA_Z], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none", background: "transparent" }}
        frameloop={active ? "always" : "never"}
      >
        <CrestLights animate />
        <CursorLight pointer={pointer} />
        <Environment resolution={64} frames={1}>
          <Lightformer
            intensity={2}
            color="#f0b566"
            position={[2, 2, 3]}
            scale={[6, 6, 1]}
          />
          <Lightformer
            intensity={1}
            color="#a66a32"
            position={[-3, 1, -2]}
            scale={[5, 5, 1]}
          />
          <Lightformer
            intensity={0.6}
            color="#caa46a"
            position={[0, -2.5, 2]}
            scale={[6, 3, 1]}
          />
        </Environment>
        <Suspense fallback={null}>
          <HeroCrestModel animate pointer={pointer} onLoaded={onModelLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
}
