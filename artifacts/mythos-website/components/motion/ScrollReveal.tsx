"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  DURATION,
  EASE,
  REVEAL,
  SCROLL_START,
  REDUCED_DURATION,
} from "@/lib/motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Vertical travel distance (px). */
  y?: number;
  /** Horizontal travel distance (px). Use negative for "from left", positive for "from right". */
  x?: number;
  delay?: number;
  duration?: number;
  /** ScrollTrigger start string. */
  start?: string;
}

/**
 * Reusable fade / slide-up (or slide-in) reveal for a single block.
 * Uses gsap.from so content stays visible if JS never runs (no permanent CSS opacity:0).
 * Honors prefers-reduced-motion via gsap.matchMedia (opacity-only, no travel).
 */
export function ScrollReveal({
  children,
  className,
  style,
  y = REVEAL.y,
  x = 0,
  delay = 0,
  duration = DURATION.ui,
  start = SCROLL_START,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          normal: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const reduced = !!ctx.conditions?.reduced;
          gsap.from(el, {
            autoAlpha: 0,
            y: reduced ? 0 : y,
            x: reduced ? 0 : x,
            duration: reduced ? REDUCED_DURATION : duration,
            delay: reduced ? 0 : delay,
            ease: EASE.out,
            clearProps: "transform",
            scrollTrigger: { trigger: el, start, once: true },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
