"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Homepage motion, driven by attributes on server-rendered markup so the
 * sections themselves stay server components:
 *
 * - `data-parallax="8"`  scroll-scrubbed vertical drift, in % of the element
 * - `data-drift="60"`    scroll-scrubbed horizontal drift, in px (cloud layers)
 * - `data-depth="12"`    pointer parallax, in px (desktop, fine pointer only)
 * - `data-reveal`        fade-up once on entering the viewport; children of a
 *                        `data-reveal-group` stagger
 *
 * Blueprint motion rules: native scrolling only, slow acceleration and a
 * precise stop (no bounce), transform/opacity only. prefers-reduced-motion
 * skips all of it, leaving every element in its final, visible state.
 */
export function HomeMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax) || 6;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.6 },
            },
          );
        });

        root.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
          const px = Number(el.dataset.drift) || 50;
          gsap.fromTo(
            el,
            { x: -px / 2 },
            {
              x: px / 2,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 1 },
            },
          );
        });

        const reveal = (targets: HTMLElement[], trigger: HTMLElement) =>
          gsap.from(targets, {
            autoAlpha: 0,
            y: 28,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger, start: "top 82%", once: true },
          });
        root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
          reveal(Array.from(group.children) as HTMLElement[], group);
        });
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => reveal([el], el));
      });

      mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 1024px)", () => {
        const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => ({
          depth: Number(el.dataset.depth) || 8,
          x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3.out" }),
        }));
        const light = lightRef.current;
        const lx = light && gsap.quickTo(light, "x", { duration: 0.9, ease: "power3.out" });
        const ly = light && gsap.quickTo(light, "y", { duration: 0.9, ease: "power3.out" });
        if (light) gsap.to(light, { autoAlpha: 1, duration: 1.2 });

        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(-nx * l.depth);
            l.y(-ny * l.depth);
          });
          lx?.(e.clientX);
          ly?.(e.clientY);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
          window.removeEventListener("pointermove", onMove);
          if (light) gsap.set(light, { autoAlpha: 0 });
        };
      });

      // Fonts and media change layout after first paint.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope },
  );

  return (
    <div ref={scope}>
      {/* One warm cursor light for the whole page (desktop only). */}
      <div
        ref={lightRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[5] -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full opacity-0 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(214,161,74,0.085) 0%, rgba(214,161,74,0.03) 35%, transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}
