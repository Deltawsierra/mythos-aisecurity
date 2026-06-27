"use client";

import { useEffect, useRef, useState } from "react";
import { useHeroPreload } from "@/components/motion/HeroPreloadProvider";

interface HeroBackgroundVideoProps {
  /** Decorative forge-atmosphere clip. Root-relative to /public. */
  src?: string;
  /** Video layer opacity (0–1). Brief target range: 0.32–0.48. */
  opacity?: number;
}

/**
 * Decorative forge-atmosphere video that sits BEHIND the homepage hero text,
 * CTAs, and the 3D crest. It is purely cosmetic: `aria-hidden` and
 * `pointer-events-none`, so it never covers or blocks interactive elements.
 *
 * The clip only mounts on larger screens (tablet/desktop) with motion allowed.
 * On mobile, with `prefers-reduced-motion`, and during SSR / first paint, a
 * static obsidian + bronze-glow gradient stands in instead — which also means
 * server and first-client render match, so there is no hydration mismatch and
 * no layout shift. Readability overlays keep the left text column dark and let
 * the crest side stay slightly warmer.
 */
export function HeroBackgroundVideo({
  src = "/video/mythos-hero-forge-enhanced.mp4",
  opacity = 0.42,
}: HeroBackgroundVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Hold the clip until the hero is revealed (Black Vault loader done / crest
  // GLB ready, or the loader's timeout). This keeps video decode from competing
  // with the above-the-fold crest load and lets the forge atmosphere appear
  // with the hero. Outside a HeroPreloadProvider this defaults to true.
  const { revealed } = useHeroPreload();
  const active = enabled && revealed;

  // Decide on the client whether to mount the video: only on wider screens with
  // no reduced-motion preference. Re-evaluates if either condition changes.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const wideEnough = window.matchMedia("(min-width: 768px)");
    const evaluate = () => setEnabled(motionOk.matches && wideEnough.matches);
    evaluate();
    motionOk.addEventListener("change", evaluate);
    wideEnough.addEventListener("change", evaluate);
    return () => {
      motionOk.removeEventListener("change", evaluate);
      wideEnough.removeEventListener("change", evaluate);
    };
  }, []);

  // Nudge autoplay (some browsers won't auto-start a muted video) and pause the
  // clip while the hero is scrolled fully out of view to save decode/GPU work.
  useEffect(() => {
    if (!active) return;
    const v = videoRef.current;
    const wrap = wrapRef.current;
    if (!v) return;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* autoplay blocked — static gradient fallback stays visible */
        });
      }
    };

    tryPlay();

    if (!wrap || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) tryPlay();
          else v.pause();
        }
      },
      { threshold: 0 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [active]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Static forge-toned fallback — always present. Shows on mobile,
          reduced-motion, SSR/first paint, and if the video never loads. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 56% at 73% 50%, rgba(166,106,50,0.18) 0%, rgba(26,21,15,0.22) 40%, rgba(5,5,5,0) 72%)",
        }}
      />

      {/* Forge atmosphere clip — mounted only on wider, motion-allowed screens
          and once the hero is revealed. */}
      {active && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Left-side darkening — keeps the headline + CTA column calm/readable. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.62) 34%, rgba(5,5,5,0.3) 60%, rgba(5,5,5,0.1) 100%)",
        }}
      />

      {/* Vignette + top/bottom fade so sparks never wash out nav or edges. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 85% at 50% 45%, transparent 42%, rgba(5,5,5,0.5) 100%), linear-gradient(180deg, rgba(5,5,5,0.4) 0%, transparent 20%, transparent 74%, rgba(5,5,5,0.55) 100%)",
        }}
      />
    </div>
  );
}
