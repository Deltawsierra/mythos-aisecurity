"use client";

import { useEffect, useRef, useState } from "react";

interface SectionBackgroundVideoProps {
  /** Cinematic chamber clip. Root-relative to /public. */
  src: string;
  /** Video layer opacity (0–1). */
  opacity?: number;
}

/**
 * Cinematic background video that sits BEHIND an entire section's content.
 *
 * Purely decorative: `aria-hidden` and `pointer-events-none`, so it never covers
 * or blocks interactive elements. The clip lazy-mounts (via IntersectionObserver)
 * only on tablet/desktop with motion allowed; on mobile, under
 * `prefers-reduced-motion`, during SSR / first paint, or if the video never
 * loads, a static forge-toned gradient stands in instead. Server and first-client
 * render therefore match (no hydration mismatch, no layout shift). Layered
 * readability overlays keep the content above it crisp.
 */
export function SectionBackgroundVideo({
  src,
  opacity = 0.5,
}: SectionBackgroundVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(false);

  // Decide on the client whether the video is allowed: only on wider screens
  // with no reduced-motion preference. Re-evaluates if either condition changes.
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

  // Lazy-mount only once the section nears the viewport so the clip never loads
  // until it is needed.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = enabled && inView;

  // Nudge autoplay (some browsers won't auto-start a muted video) and pause the
  // clip while the section is scrolled out of view to save decode/GPU work.
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
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Static forge-toned fallback — always present. Shows on mobile,
          reduced-motion, SSR/first paint, and if the video never loads. Bronze
          glow on the Athena (left) side, warmer ember glow on the Achilles
          (right) side, so the section reads well even with no video. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 48% 56% at 26% 42%, rgba(166,106,50,0.18) 0%, transparent 66%), radial-gradient(ellipse 48% 56% at 74% 46%, rgba(255,157,59,0.16) 0%, transparent 66%), radial-gradient(ellipse 120% 92% at 50% 40%, rgba(26,21,15,0.26) 0%, rgba(5,5,5,0) 78%)",
        }}
      />

      {/* Cinematic chamber clip — mounted only on wider, motion-allowed screens
          and once the section nears the viewport. */}
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

      {/* Base darkening — only while the clip plays, to tame bright frames and
          keep headings, body copy, and frosted cards readable. Skipped in the
          fallback state so the bronze/ember glows stay visible. */}
      {active && <div className="absolute inset-0 bg-obsidian/55" />}

      {/* Vignette + top/bottom fade so the clip never washes out edges or the
          adjoining sections. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 105% 90% at 50% 45%, transparent 38%, rgba(5,5,5,0.55) 100%), linear-gradient(180deg, rgba(5,5,5,0.7) 0%, transparent 16%, transparent 80%, rgba(5,5,5,0.8) 100%)",
        }}
      />
    </div>
  );
}
