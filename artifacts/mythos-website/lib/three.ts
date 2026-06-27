/**
 * Shared constants + helpers for the homepage hero 3D crest.
 * Kept intentionally tiny: no global preload, no shared scene state.
 */

export const CREST_MODEL_PATH =
  "/models/optimized/homepage-mythos-crest.optimized.glb";
export const CREST_FALLBACK_IMAGE = "/images/mythos-crest-main.png";

/**
 * Optimized Athena shield + Achilles spear models, used as small decorative
 * floating accents in the lower /platform sections (Assurance Path + Release
 * Gate). Loaded lazily inside their own desktop-only, motion-gated canvases and
 * route-local preloaded on /platform only (see PlatformModelPreloader) — keep
 * them off the homepage and every other route.
 */
export const ATHENA_SHIELD_MODEL_PATH =
  "/models/optimized/athena-shield.optimized.glb";
export const ACHILLES_SPEAR_MODEL_PATH =
  "/models/optimized/achilles-spear.optimized.glb";

/** Device pixel ratio cap for the hero canvas (perf safety). */
export const CANVAS_DPR: [number, number] = [1, 1.5];

/**
 * Normalized world-space size (largest bounding-box dimension) the crest is
 * scaled to inside the scene. Sized to read as a large, dominant, free-floating
 * hero object while leaving generous safe padding so the crest is never cropped
 * — including at full cursor parallax + drag tilt + scroll drift. With the
 * camera at {@link CREST_CAMERA_Z}/fov 35 the visible height is ≈3.91 world
 * units, so this fills ≈64% of the frame, leaving generous padding so the crest
 * (lowered by {@link CREST_BASE_Y}) never clips top or bottom.
 */
export const CREST_TARGET_SIZE = 2.5;

/** Camera distance for the hero crest. Pulled back to add framing safe area. */
export const CREST_CAMERA_Z = 6.2;

/**
 * Resting downward offset (world units) so the crest sits lower in the (taller)
 * stage — clearing the top finial from the canvas edge and reading as visually
 * centered against the headline/CTAs to its left.
 */
export const CREST_BASE_Y = -0.22;

/**
 * Mutable interaction state shared (by reference) between the DOM pointer/scroll
 * handlers and the R3F render loop. Kept as a plain mutable object — written by
 * event handlers, read + damped inside useFrame — so interaction never triggers
 * React re-renders.
 */
export interface CrestPointerState {
  /** Normalized pointer X within the crest stage, -1 (left) .. 1 (right). */
  x: number;
  /** Normalized pointer Y within the crest stage, -1 (top) .. 1 (bottom). */
  y: number;
  /** Whether the pointer is currently over the crest stage. */
  inside: boolean;
  /** Proximity to stage center, 0 (edge/away) .. 1 (center). */
  proximity: number;
  /** Whether the user is click-dragging the crest. */
  dragging: boolean;
  /** Free spin about X (radians, unclamped) — vertical drag tilt. */
  dragX: number;
  /** Free spin about Y (radians, unclamped) — horizontal drag spin. */
  dragY: number;
  /** Angular velocity about X (rad/s) — drives release momentum. */
  velX: number;
  /** Angular velocity about Y (rad/s) — drives release momentum. */
  velY: number;
  /** Damped ambient X offset (idle/parallax) layered over the spin. */
  ambX: number;
  /** Damped ambient Y offset (idle/parallax/scroll) layered over the spin. */
  ambY: number;
  /** Hero scroll progress, 0 (top) .. 1 (hero scrolled out). */
  scroll: number;
}

export function createCrestPointerState(): CrestPointerState {
  return {
    x: 0,
    y: 0,
    inside: false,
    proximity: 0,
    dragging: false,
    dragX: 0,
    dragY: 0,
    velX: 0,
    velY: 0,
    ambX: 0,
    ambY: 0,
    scroll: 0,
  };
}

/** Cursor-facing parallax limits (radians). */
export const PARALLAX_LIMIT = { x: 0.08, y: 0.12 } as const;

/**
 * Free-spin drag sensitivity (radians of rotation per one stage-width of
 * horizontal / stage-height of vertical pointer travel). Dragging horizontally
 * spins the crest about Y; vertical drag tilts it about X. No clamp — the crest
 * can be spun fully around.
 */
export const CREST_DRAG_SENSITIVITY = { x: 2.2, y: 3.2 } as const;

/**
 * Release physics. On pointer-up the crest keeps the angular velocity it was
 * flung with and coasts ({@link CREST_SPIN_FRICTION} = exponential air drag),
 * while a spring ({@link CREST_HOME_SPRING}) eases it back to the nearest
 * visually-identical resting orientation (a whole number of turns from the
 * start). Grabbing the crest again cancels the momentum/return instantly.
 */
export const CREST_SPIN_FRICTION = 2.2;
export const CREST_HOME_SPRING = 6;

/** The hero visual panel only renders at Tailwind `lg` (1024px) and up. */
export const DESKTOP_MIN_WIDTH = 1024;

/**
 * Feature-detect WebGL. Returns false during SSR and whenever a context
 * cannot be acquired (driver blocklist, disabled, headless, etc.).
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}
