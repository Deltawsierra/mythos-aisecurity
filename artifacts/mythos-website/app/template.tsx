import type { ReactNode } from "react";

/**
 * Per-route entry transition. A `template.tsx` (unlike `layout.tsx`) remounts
 * on every navigation, so this wrapper re-triggers a short, subtle fade each
 * time the route changes. The fade is opacity-only (see `.route-fade-in` in
 * globals.css) — intentionally no transform, which would break position:sticky
 * and GSAP/ScrollTrigger measurements. prefers-reduced-motion is honored
 * globally, so motion-sensitive users get an instant swap.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-fade-in">{children}</div>;
}
