"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DESKTOP_MIN_WIDTH, isWebGLAvailable } from "@/lib/three";

// Pulls in drei (+ useGLTF.preload) only once the gate below passes, so the
// Three chunk is never downloaded by clients that will never render 3D.
const PlatformModelPreloadInner = dynamic(
  () => import("./PlatformModelPreloadInner"),
  { ssr: false },
);

/**
 * Route-local GLB preloader, mounted only on /platform. A lightweight client
 * gate checks desktop + motion + WebGL and only then dynamically imports the
 * inner preloader (which pulls in drei and calls useGLTF.preload). This warms
 * the shield + spear GLBs early in the page load for the lower sections, while
 * keeping the models — and the Three bundle — off mobile, reduced-motion,
 * no-WebGL clients, and every other route.
 */
export function PlatformModelPreloader() {
  const [canPreload, setCanPreload] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const desktopMql = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    // One-way: warm the GLBs as soon as the gate first passes (incl. a later
    // resize from mobile to desktop) and keep them warm thereafter.
    const evaluate = () => {
      if (desktopMql.matches && !reduceMql.matches && isWebGLAvailable()) {
        setCanPreload(true);
      }
    };
    evaluate();
    desktopMql.addEventListener("change", evaluate);
    reduceMql.addEventListener("change", evaluate);
    return () => {
      desktopMql.removeEventListener("change", evaluate);
      reduceMql.removeEventListener("change", evaluate);
    };
  }, []);

  return canPreload ? <PlatformModelPreloadInner /> : null;
}
