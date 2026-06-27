"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  DURATION,
  EASE,
  REVEAL,
  STAGGER,
  SCROLL_START,
  REDUCED_DURATION,
} from "@/lib/motion";

interface StaggerRevealProps {
  children: ReactNode;
  /** Classes for the container itself (e.g. grid classes). */
  className?: string;
  style?: CSSProperties;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
}

/**
 * Reveals the direct children of the container in a staggered fade-up as the
 * container scrolls into view. The container element carries the layout
 * classes (typically a grid), so it acts as a drop-in for the grid wrapper.
 */
export function StaggerReveal({
  children,
  className,
  style,
  y = REVEAL.y,
  stagger = STAGGER.card,
  duration = DURATION.ui,
  start = SCROLL_START,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = gsap.utils.toArray<HTMLElement>(el.children);
      if (items.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          normal: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const reduced = !!ctx.conditions?.reduced;
          gsap.from(items, {
            autoAlpha: 0,
            y: reduced ? 0 : y,
            duration: reduced ? REDUCED_DURATION : duration,
            ease: EASE.out,
            stagger: reduced ? 0.03 : stagger,
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
