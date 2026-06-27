# Three.js / WebGL Component Rules

This directory is reserved for cinematic 3D scenes using Three.js, React Three Fiber, and Drei.

## Approved use cases

- Mythos crest hero reveal
- Athena + Achilles assurance-loop visualization
- Platform architecture visual
- Demo theater section
- Final shield CTA section

Do not make the entire site a WebGL canvas. 3D is a selective enhancement, not the default.

## Required rules for all 3D components

### Client-only rendering

All Three.js components must be `"use client"` and lazy-loaded:

```tsx
"use client";
import dynamic from "next/dynamic";

const SceneName = dynamic(() => import("@/components/three/SceneName"), {
  ssr: false,
  loading: () => <PosterFallback />,
});
```

### Text stays in DOM

Never render primary copy, headings, CTAs, or body text inside a canvas or as Three.js `<Text>`.
All readable content must be real HTML/DOM elements — accessible to screen readers and search engines.

### Performance

- Cap device pixel ratio: `gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))`
- Use instancing or `BufferGeometry` for repeated particles — never hundreds of individual meshes
- Keep mobile scenes lighter than desktop (fewer particles, simpler materials)
- Avoid unnecessary post-processing passes

### Cleanup on unmount

Every component must dispose of all resources when unmounted:

```tsx
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
  };
}, []);
```

### Reduced motion

Respect `prefers-reduced-motion`. Either pause all animations or skip the scene entirely:

```tsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

### GSAP integration

Use `@gsap/react` for scroll-triggered and timeline animations.
Do not scatter raw `gsap.to()` calls outside of dedicated animation hooks or effects.
Keep animation logic isolated and composable.

### Fallbacks

Every 3D section must provide a static poster image or CSS fallback for:
- Users with `prefers-reduced-motion`
- Mobile devices below a performance threshold
- Browsers without WebGL support
