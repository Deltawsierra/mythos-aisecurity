"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  CREST_BASE_Y,
  CREST_HOME_SPRING,
  CREST_MODEL_PATH,
  CREST_SPIN_FRICTION,
  CREST_TARGET_SIZE,
  PARALLAX_LIMIT,
  type CrestPointerState,
} from "@/lib/three";

const TWO_PI = Math.PI * 2;

interface HeroCrestModelProps {
  /** When false, the model is held static (no drift / interaction). */
  animate?: boolean;
  /** Shared interaction state (pointer / drag / scroll). */
  pointer: CrestPointerState;
  /** Fired once the GLB scene is available (used to fade out the PNG). */
  onLoaded?: () => void;
}

/**
 * The Mythos crest GLB, centered + normalized. Must live inside an R3F <Canvas>.
 * Motion is restrained and fully damped (no snap / wobble):
 *  - idle: barely-there float + a few degrees of slow drift
 *  - cursor-facing parallax (small, limited)
 *  - limited click-drag inspect that eases back to the composed pose on release
 *  - subtle scroll-linked rotate + up/right drift (scale stays constant)
 * No shadows, no postprocessing.
 */
export function HeroCrestModel({
  animate = true,
  pointer,
  onLoaded,
}: HeroCrestModelProps) {
  const { scene } = useGLTF(CREST_MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);
  const startRef = useRef<number | null>(null);
  const firedRef = useRef(false);

  // Clone, center at origin and normalize scale once per loaded scene.
  const model = useMemo(() => {
    const root = scene.clone(true);

    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    root.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    root.scale.setScalar(CREST_TARGET_SIZE / maxDim);

    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && "envMapIntensity" in mat) {
          mat.envMapIntensity = 0.9;
        }
      }
    });

    return root;
  }, [scene]);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    onLoaded?.();
  }, [onLoaded]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    if (!animate) {
      g.rotation.set(0, 0, 0);
      g.position.set(0, 0, 0);
      g.scale.setScalar(1);
      return;
    }

    // Clamp delta so a long stall (tab blur / scrolled offscreen) can't fling
    // the spin physics with one huge step.
    const dt = Math.min(delta, 1 / 30);
    const t = state.clock.getElapsedTime();
    if (startRef.current === null) startRef.current = t;
    const elapsed = t - startRef.current;

    // Near-static settle so the crest never "pops"/grows over the PNG.
    const reveal = Math.min(elapsed / 0.7, 1);
    const revealEase = 1 - Math.pow(1 - reveal, 3);

    const p = pointer;

    // While held, rotation tracks the pointer 1:1 (set in the DOM handler) and
    // angular velocity is measured there in event-time. On release, coast under
    // exponential friction while a spring eases the crest back toward the
    // nearest resting orientation (a whole number of turns from the start, so
    // the return is always the short way home).
    if (!p.dragging) {
      const friction = Math.exp(-CREST_SPIN_FRICTION * dt);
      p.velY *= friction;
      p.velX *= friction;

      const homeY = Math.round(p.dragY / TWO_PI) * TWO_PI;
      const homeX = Math.round(p.dragX / TWO_PI) * TWO_PI;
      p.velY += (homeY - p.dragY) * CREST_HOME_SPRING * dt;
      p.velX += (homeX - p.dragX) * CREST_HOME_SPRING * dt;

      p.dragY += p.velY * dt;
      p.dragX += p.velX * dt;

      // Snap to a clean rest once close + slow (prevents endless micro-wobble).
      if (Math.abs(homeY - p.dragY) < 0.0008 && Math.abs(p.velY) < 0.01) {
        p.dragY = homeY;
        p.velY = 0;
      }
      if (Math.abs(homeX - p.dragX) < 0.0008 && Math.abs(p.velX) < 0.01) {
        p.dragX = homeX;
        p.velX = 0;
      }
    }

    // Idle: slow drift + a gentle, visible hover float.
    const idleY = Math.sin(t * 0.22) * 0.05;
    const idleFloat = Math.sin(t * 0.7) * 0.085;

    // Cursor-facing parallax (small; suppressed mid-drag so it never fights the
    // free spin), plus scroll-linked rotation. Layered as a damped ambient
    // offset ON TOP of the spin so dragging itself stays crisp and 1:1.
    const parY = p.inside && !p.dragging ? p.x * PARALLAX_LIMIT.y : 0;
    const parX = p.inside && !p.dragging ? p.y * PARALLAX_LIMIT.x : 0;
    const scrollRotY = p.scroll * 0.16;

    p.ambY = THREE.MathUtils.damp(p.ambY, idleY + parY + scrollRotY, 8, dt);
    p.ambX = THREE.MathUtils.damp(p.ambX, parX, 8, dt);

    g.rotation.y = p.dragY + p.ambY;
    g.rotation.x = p.dragX + p.ambX;

    // Scroll drift kept small so the (already padded) crest top never clips.
    const targetPosY = CREST_BASE_Y + idleFloat + p.scroll * 0.12;
    const targetPosX = p.scroll * 0.08;
    g.position.y = THREE.MathUtils.damp(g.position.y, targetPosY, 4, dt);
    g.position.x = THREE.MathUtils.damp(g.position.x, targetPosX, 4, dt);

    // Scale is the on-load settle ONLY (0.99 → 1.0) and is intentionally
    // independent of scroll, so the crest never resizes once the hero is loaded.
    const targetScale = 0.99 + 0.01 * revealEase;
    const s = THREE.MathUtils.damp(g.scale.x, targetScale, 5, dt);
    g.scale.setScalar(s);
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}
