"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import {
  ATHENA_SHIELD_MODEL_PATH,
  ACHILLES_SPEAR_MODEL_PATH,
} from "@/lib/three";

/**
 * Warms the optimized shield + spear GLBs so the lower-section floating
 * artifacts can mount instantly once scrolled to.
 *
 * Imported ONLY by PlatformModelPreloader, and only after its desktop + motion
 * + WebGL gate passes — so the three/drei chunk and the GLBs never download on
 * mobile / reduced-motion / no-WebGL clients, nor on any route other than
 * /platform.
 */
export default function PlatformModelPreloadInner() {
  useEffect(() => {
    useGLTF.preload(ATHENA_SHIELD_MODEL_PATH);
    useGLTF.preload(ACHILLES_SPEAR_MODEL_PATH);
  }, []);

  return null;
}
