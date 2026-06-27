"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ATHENA_SHIELD_MODEL_PATH } from "@/lib/three";

interface AthenaShieldModelProps {
  /** Largest bounding-box dimension the model is normalized to (world units). */
  targetSize?: number;
}

/**
 * Loads the optimized Athena shield GLB, centered at the origin and normalized
 * to `targetSize`. Must live inside an R3F <Canvas>.
 *
 * Used as a decorative floating accent in the lower /platform sections. Route-
 * local preloaded on /platform only (see PlatformModelPreloader); never loaded
 * on the homepage or any other route.
 */
export function AthenaShieldModel({ targetSize = 2.5 }: AthenaShieldModelProps) {
  const { scene } = useGLTF(ATHENA_SHIELD_MODEL_PATH);

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
