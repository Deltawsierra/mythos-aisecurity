"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  /** Cinematic looping background clip. Root-relative to /public. */
  src: string;
  /** Always-present poster/fallback image (shown before/instead of the video). */
  poster: string;
  className?: string;
}

/**
 * Full-bleed cinematic background for a page hero: a looping clip covering the
 * entire section. Shared by the /platform and /solutions heroes.
 *
 * The poster <img> is ALWAYS rendered (SSR / no-JS / mobile / reduced-motion
 * safe), so server and first-client render match — no hydration mismatch, no
 * layout shift. The looping <video> only mounts on tablet/desktop with motion
 * allowed, cross-fades in once it can actually play, and pauses while scrolled
 * out of view. Purely decorative: aria-hidden + pointer-events-none, no
 * controls, no audio. It carries NO darkening overlays — the hero owns the
 * left-weighted readability gradient so this layer simply fills the section.
 */
export function HeroVideo({ src, poster, className }: HeroVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Allow the video only on wider screens with motion allowed.
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

  // Lazy-mount once near the viewport (the hero is above the fold, so this is
  // effectively immediate, but it keeps the pattern consistent and SSR-safe).
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

  // Drop back to the poster whenever the clip is torn down (scrolled away /
  // disabled by a resize or reduced-motion toggle) or its source changes, so
  // the next playthrough cross-fades up from the poster instead of flashing a
  // not-yet-decoded frame at full opacity.
  useEffect(() => {
    if (!active) setPlaying(false);
  }, [active, src]);

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
          /* autoplay blocked — poster stays visible */
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
      aria-hidden="true"
      className={cn("pointer-events-none overflow-hidden bg-obsidian", className)}
    >
      {/* Poster — always present, fills the section. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Cinematic loop — mounted only on wider, motion-allowed screens. Cross-
          fades over the poster once it actually starts playing. */}
      {active && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out",
            playing ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
