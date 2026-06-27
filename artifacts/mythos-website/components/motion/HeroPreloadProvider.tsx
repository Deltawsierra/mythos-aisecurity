"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DESKTOP_MIN_WIDTH, isWebGLAvailable } from "@/lib/three";
import { BlackVaultPreloader } from "./BlackVaultPreloader";

/** Hard ceiling so the loader can never trap the visitor. */
const VAULT_TIMEOUT_MS = 7000;

/**
 * init    — pre-detection (SSR / first client render): no loader, hero held.
 * loading — desktop 3D path: vault loader visible while the GLB streams in.
 * exiting — model ready (or timed out / failed): loader fading out.
 * done    — loader gone; hero may animate in.
 */
type Phase = "init" | "loading" | "exiting" | "done";

interface HeroPreloadValue {
  /** Desktop + WebGL + motion-allowed → the 3D crest / vault path is in use. */
  shouldUse3D: boolean;
  /**
   * True if the safety timeout fired before the GLB was ready. Terminal for
   * this page load: the crest must stay on the PNG fallback so a late GLB load
   * can never re-introduce the PNG → 3D swap the loader exists to hide.
   */
  timedOut: boolean;
  /** True once the loader is fully gone and the hero entrance may play. */
  revealed: boolean;
  /** The crest calls this once the GLB is truly ready (fades the loader out). */
  markReady: () => void;
  /** The crest calls this on WebGL/load failure (exits the loader to the PNG). */
  markFailed: () => void;
}

const HeroPreloadContext = createContext<HeroPreloadValue>({
  shouldUse3D: false,
  timedOut: false,
  revealed: true,
  markReady: () => {},
  markFailed: () => {},
});

export function useHeroPreload(): HeroPreloadValue {
  return useContext(HeroPreloadContext);
}

// Runs before paint on the client; no-op on the server (avoids SSR warning).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Coordinates the "Opening the Black Vault" homepage preload. Owns the single
 * source of truth for whether the desktop 3D crest path is in use, and gates
 * both the vault loader and the hero entrance on the crest's true readiness.
 *
 * The loader is rendered in the very first (SSR / pre-hydration) frame so it
 * covers the hero from the first paint — there is no PNG flash before it. A
 * pre-paint inline script (see app/layout.tsx) adds a `vault-skip` class to
 * <html> for non-3D environments (mobile / tablet / reduced-motion / no-WebGL),
 * which hides the loader via CSS so those visitors see the hero immediately.
 * Detection then runs here in a layout effect to drive the readiness gating.
 */
export function HeroPreloadProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("init");
  const [shouldUse3D, setShouldUse3D] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.innerWidth >= DESKTOP_MIN_WIDTH;
    const use3D = !reduced && desktop && isWebGLAvailable();
    setShouldUse3D(use3D);
    setPhase(use3D ? "loading" : "done");
  }, []);

  // Safety timeout: if the GLB is too slow / never resolves, exit to the PNG.
  // This effect only subscribes while loading and re-runs (clearing the timer)
  // the moment the phase changes — so if the timer fires, we are still loading.
  // We latch `timedOut` so the crest stays on the PNG and never late-swaps.
  useEffect(() => {
    if (phase !== "loading") return;
    const id = window.setTimeout(() => {
      setTimedOut(true);
      setPhase("exiting");
    }, VAULT_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  const markReady = useCallback(() => {
    setPhase((p) => (p === "loading" ? "exiting" : p));
  }, []);

  const markFailed = useCallback(() => {
    setPhase((p) => (p === "loading" ? "exiting" : p));
  }, []);

  const handleExited = useCallback(() => setPhase("done"), []);

  const value = useMemo<HeroPreloadValue>(
    () => ({
      shouldUse3D,
      timedOut,
      revealed: phase === "done",
      markReady,
      markFailed,
    }),
    [shouldUse3D, timedOut, phase, markReady, markFailed],
  );

  // Render the loader from the very first frame (including SSR / `init`) so it
  // covers the hero before hydration. Non-3D visitors never see it: the
  // pre-paint script hides it via the `vault-skip` CSS class, and the layout
  // effect then advances them straight to `done` (unmounting it).
  const showLoader = phase !== "done";

  return (
    <HeroPreloadContext.Provider value={value}>
      {children}
      {showLoader && (
        <BlackVaultPreloader
          exiting={phase === "exiting"}
          onExited={handleExited}
        />
      )}
    </HeroPreloadContext.Provider>
  );
}
