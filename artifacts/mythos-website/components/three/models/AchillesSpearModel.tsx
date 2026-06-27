"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ACHILLES_SPEAR_MODEL_PATH } from "@/lib/three";

interface AchillesSpearModelProps {
  /** Largest bounding-box dimension the model is normalized to (world units). */
  targetSize?: number;
}

/**
 * Loads the optimized Achilles spear GLB, centered at the origin and normalized
 * to `targetSize`. Must live inside an R3F <Canvas>.
 *
 * Used as a decorative floating accent in the lower /platform sections. Route-
 * local preloaded on /platform only (see PlatformModelPreloader); never loaded
 * on the homepage or any other route.
 */
export function AchillesSpearModel({ targetSize = 2.5 }: AchillesSpearModelProps) {
  const { scene } = useGLTF(ACHILLES_SPEAR_MODEL_PATH);

  const model = useMemo(() => {
    const root = scene.clone(true);

    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    root.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    root.scale.setScalar(targetSize / maxDim);

    return root;
  }, [scene, targetSize]);

  return <primitive object={model} />;
}
