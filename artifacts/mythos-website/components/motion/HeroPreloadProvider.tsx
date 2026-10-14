/**
 * The "Opening the Black Vault" preloader is retired in v2: the hero headline
 * and poster paint immediately and media fades in once ready. This shim keeps
 * the legacy hero pieces (HeroMotion, HeroBackgroundVideo, HeroCrest3D)
 * compiling with "always revealed, no 3D crest" until the Phase 2 homepage
 * replaces them — delete it then.
 */
interface HeroPreloadValue {
  shouldUse3D: boolean;
  timedOut: boolean;
  revealed: boolean;
  markReady: () => void;
  markFailed: () => void;
}

const NO_PRELOAD: HeroPreloadValue = {
  shouldUse3D: false,
  timedOut: false,
  revealed: true,
  markReady: () => {},
  markFailed: () => {},
};

export function useHeroPreload(): HeroPreloadValue {
  return NO_PRELOAD;
}
