// Shared motion language for the Mythos site.
// Premium, slow, controlled — defense-tech / mythic-luxury.

export const DURATION = {
  uiSmall: 0.5,
  ui: 0.7,
  hero: 1.2,
  heroLong: 1.5,
  connector: 1.2,
} as const;

export const EASE = {
  out: "power3.out",
  strong: "power4.out",
  expo: "expo.out",
} as const;

export const STAGGER = {
  card: 0.1,
  tight: 0.08,
} as const;

export const REVEAL = {
  y: 28,
  x: 44,
} as const;

// Default ScrollTrigger entry point — reveal a touch before fully in view.
export const SCROLL_START = "top 82%";

// Reduced-motion fallback: a quick, simple fade with no movement.
export const REDUCED_DURATION = 0.4;
