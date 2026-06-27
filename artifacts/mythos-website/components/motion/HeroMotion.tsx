"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, REDUCED_DURATION } from "@/lib/motion";
import { useHeroPreload } from "./HeroPreloadProvider";

/**
 * Cinematic hero entrance. Wraps the (server-rendered) hero and sequences the
 * reveal of its [data-animate="hero-*"] markers: eyebrow → headline → subcopy
 * → visual panel fades and rises in.
 *
 * IMPORTANT: the visual panel entrance must NOT use a `scale` transform. That
 * panel contains the R3F <Canvas>, and R3F sizes the canvas from the wrapper's
 * getBoundingClientRect(), which includes CSS transforms. A scale would lock the
 * canvas to a scaled size and make the 3D crest snap-resize on the first scroll.
 * Only size-neutral transforms (translate / opacity) are safe here.
 *
 * The entrance is built paused (its `from` start-states applied immediately so
 * the hero stays hidden) and only plays once {@link useHeroPreload} reports the
 * page is `revealed`. On mobile / reduced-motion / no-WebGL there is no vault
 * loader, so `revealed` is true from the first frame and the hero plays at
 * once. On the desktop 3D path it plays as the vault loader fades out — so the
 * hero enters with the 3D crest already present.
 *
 * Reduced-motion: a single quick fade, no travel or scale.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const { revealed } = useHeroPreload();

  // Build the (paused) entrance once. `from` tweens render their start-state
  // immediately, so the hero is held hidden until we play it.
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          normal: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const reduced = !!ctx.conditions?.reduced;
          const all = q("[data-animate^='hero-']");

          if (reduced) {
            animRef.current = gsap.from(all, {
              autoAlpha: 0,
              duration: REDUCED_DURATION,
              stagger: 0.05,
              paused: true,
            });
            return;
          }

          const tl = gsap.timeline({
            paused: true,
            defaults: { ease: EASE.out, clearProps: "transform" },
          });

          tl.from(q("[data-animate='hero-badge']"), {
            autoAlpha: 0,
            y: 14,
            duration: 0.5,
          })
            .from(
              q("[data-animate='hero-headline']"),
              { autoAlpha: 0, y: 24, duration: 0.9 },
              "-=0.32",
            )
            .from(
              q("[data-animate='hero-subline']"),
              { autoAlpha: 0, y: 18, duration: 0.6 },
              "-=0.62",
            )
            .from(
              q("[data-animate='hero-visual']"),
              {
                // Size-neutral fade + rise only. NO `scale` — see the note in
                // this component's doc comment: a scale transform on this
                // canvas-containing wrapper makes the 3D crest snap-resize on
                // the first scroll.
                autoAlpha: 0,
                y: 18,
                duration: 1.1,
                ease: EASE.expo,
              },
              "-=0.85",
            );

          animRef.current = tl;
        },
      );

      return () => {
        mm.revert();
        animRef.current = null;
      };
    },
    { scope: ref },
  );

  // Play the entrance once the page is revealed (vault loader gone, or no
  // loader at all). Runs in a layout effect so there is no hidden-hero flash.
  useGSAP(
    () => {
      if (revealed) animRef.current?.play(0);
    },
    { dependencies: [revealed], scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
