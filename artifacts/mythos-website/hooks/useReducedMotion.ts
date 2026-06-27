"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 *
 * Returns `true` when the user has requested reduced motion, in which case
 * GSAP (and any other JS-driven) animations should be skipped or replaced
 * with instant state changes. CSS-level reductions are handled separately in
 * `globals.css`.
 *
 * SSR-safe: returns `false` on the server and during the first client render,
 * then syncs to the real value after mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia(QUERY);
    setReduced(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
