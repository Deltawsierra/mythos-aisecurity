"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LoopVideoProps {
  /** Always rendered first — the LCP image and the reduced-motion fallback. */
  poster: string;
  sources: { src: string; type: string }[];
  className?: string;
  /** Applied to both the poster and the video. */
  mediaClassName?: string;
  /** Only mount the video at or above this width (default 768px). */
  minWidth?: number;
  /**
   * Transparent VP9 overlay: skipped where alpha WebM isn't supported (Safari),
   * and rendered without a poster since it is purely additive.
   */
  overlay?: boolean;
  /** Skip lazy mounting for above-the-fold media. */
  eager?: boolean;
}

const isSafari = () =>
  typeof navigator !== "undefined" &&
  /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

/**
 * Decorative cinematic loop. The poster paints immediately; the <video> mounts
 * only on wider, motion-allowed screens near the viewport, cross-fades in once
 * it is actually playing, and pauses while offscreen. No audio, no controls.
 */
export function LoopVideo({
  poster,
  sources,
  className,
  mediaClassName,
  minWidth = 768,
  overlay = false,
  eager = false,
}: LoopVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(eager);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (overlay && isSafari()) return;
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`);
    const evaluate = () => setEnabled(motionOk.matches && wide.matches);
    evaluate();
    motionOk.addEventListener("change", evaluate);
    wide.addEventListener("change", evaluate);
    return () => {
      motionOk.removeEventListener("change", evaluate);
      wide.removeEventListener("change", evaluate);
    };
  }, [minWidth, overlay]);

  useEffect(() => {
    if (eager) return;
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  const active = enabled && inView;

  useEffect(() => {
    if (!active) setPlaying(false);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const v = videoRef.current;
    const wrap = wrapRef.current;
    if (!v) return;
    const tryPlay = () => {
      v.play()?.catch(() => {
        /* autoplay blocked — poster stays */
      });
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
    <div ref={wrapRef} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {!overlay && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          fetchPriority={eager ? "high" : undefined}
          className={cn("absolute inset-0 h-full w-full object-cover", mediaClassName)}
        />
      )}
      {active && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out",
            playing ? "opacity-100" : "opacity-0",
            mediaClassName,
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={overlay ? undefined : poster}
          onPlaying={() => setPlaying(true)}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </div>
  );
}
