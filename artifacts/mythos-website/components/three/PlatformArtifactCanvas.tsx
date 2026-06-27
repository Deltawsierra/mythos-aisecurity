"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { CANVAS_DPR } from "@/lib/three";
import { AthenaShieldModel } from "./models/AthenaShieldModel";
import { AchillesSpearModel } from "./models/AchillesSpearModel";

export type PlatformArtifactKind = "spear" | "shield";

interface ArtifactConfig {
  targetSize: number;
  baseY: number;
  /** Resting rotation [x, y, z] in radians. */
  baseRotation: [number, number, number];
  /** Idle hover amplitude (world units) + speed. */
  bobAmp: number;
  bobSpeed: number;
  /** Very slow continuous idle yaw (rad/s). */
  idleYawSpeed: number;
  /** Total scroll-linked yaw swing across the section (rad). */
  scrollYawRange: number;
  /** Subtle idle x-tilt amplitude (rad). */
  tiltAmp: number;
}

/**
 * Per-artifact pose/motion. Both objects are small floating accents: a gentle
 * hover, a barely-there idle yaw, and a scroll-linked yaw of ~16-18 degrees
 * tied to how far the parent section has scrolled. The spear additionally
 * rests on a diagonal and rolls slightly with scroll.
 */
const CONFIG: Record<PlatformArtifactKind, ArtifactConfig> = {
  shield: {
    targetSize: 2.3,
    baseY: 0,
    baseRotation: [-0.08, -0.35, 0],
    bobAmp: 0.06,
    bobSpeed: 0.9,
    idleYawSpeed: 0.06,
    scrollYawRange: 0.3,
    tiltAmp: 0.04,
  },
  spear: {
    targetSize: 2.7,
    baseY: 0,
    baseRotation: [0.12, 0.5, -0.62],
    bobAmp: 0.07,
    bobSpeed: 1.0,
    idleYawSpeed: 0.05,
    scrollYawRange: 0.32,
    tiltAmp: 0.05,
  },
};

interface FloatingModelProps {
  kind: PlatformArtifactKind;
  scrollRef: MutableRefObject<number>;
  onReady?: () => void;
}

/**
 * The floating model itself. Reads the section's scroll progress (0..1) from a
 * mutable ref each frame — never via React state — so scrolling never triggers
 * re-renders. No pointer handlers: this object is purely decorative.
 */
function FloatingModel({ kind, scrollRef, onReady }: FloatingModelProps) {
  const cfg = CONFIG[kind];
  const groupRef = useRef<THREE.Group>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  useEffect(() => {
    onReadyRef.current?.();
  }, []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.getElapsedTime();
    const progress = scrollRef.current ?? 0;

    g.position.y = cfg.baseY + Math.sin(t * cfg.bobSpeed + phase) * cfg.bobAmp;

    // Centre the scroll swing so the object sits at its resting pose mid-section.
    const scrollYaw = (progress - 0.5) * cfg.scrollYawRange;
    const idleYaw = t * cfg.idleYawSpeed;

    g.rotation.set(
      cfg.baseRotation[0] + Math.sin(t * 0.5 + phase) * cfg.tiltAmp,
      cfg.baseRotation[1] + idleYaw + scrollYaw,
      cfg.baseRotation[2] + (kind === "spear" ? scrollYaw * 0.4 : 0),
    );
  });

  return (
    <group ref={groupRef} position={[0, cfg.baseY, 0]} rotation={cfg.baseRotation}>
      {kind === "spear" ? (
        <AchillesSpearModel targetSize={cfg.targetSize} />
      ) : (
        <AthenaShieldModel targetSize={cfg.targetSize} />
      )}
    </group>
  );
}

/** Warm, forge-toned lighting tuned for a small bronze accent object. */
function ArtifactLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#ffd9a8" />
      <directionalLight position={[-4, 1, -3]} intensity={0.7} color="#a66a32" />
      <pointLight position={[0, -2, 3]} intensity={0.5} color="#ff9d3b" />
    </>
  );
}

interface PlatformArtifactCanvasProps {
  kind: PlatformArtifactKind;
  /** When false the render loop is parked (offscreen). */
  active?: boolean;
  /** Mutable section scroll progress (0..1), updated by the wrapper. */
  scrollRef: MutableRefObject<number>;
  onReady?: () => void;
}

/**
 * Transparent R3F canvas hosting a single decorative floating artifact (shield
 * or spear) for the lower /platform sections. Loaded client-side only and only
 * when the wrapper decides to render 3D (desktop + motion + WebGL). No
 * postprocessing or shadows; DPR is capped via CANVAS_DPR.
 */
export default function PlatformArtifactCanvas({
  kind,
  active = true,
  scrollRef,
  onReady,
}: PlatformArtifactCanvasProps) {
  return (
    <Canvas
      dpr={CANVAS_DPR}
      camera={{ position: [0, 0, 6], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent", pointerEvents: "none" }}
      frameloop={active ? "always" : "never"}
    >
      <ArtifactLights />
      <Environment resolution={128}>
        <Lightformer
          intensity={1.4}
          position={[2, 3, 4]}
          scale={[6, 6, 1]}
          color="#ffce93"
        />
        <Lightformer
          intensity={0.7}
          position={[-3, 1, -2]}
          scale={[5, 5, 1]}
          color="#a66a32"
        />
      </Environment>
      <Suspense fallback={null}>
        <FloatingModel kind={kind} scrollRef={scrollRef} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
