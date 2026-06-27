"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoPanelPlaceholderProps {
  src?: string;
  webmSrc?: string;
  poster?: string;
  controls?: boolean;
  autoPlay?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

export function VideoPanelPlaceholder({
  src = "/video/assurance-forge-loop.mp4",
  webmSrc,
  poster = "/images/assurance-forge-poster.png",
  controls = false,
  autoPlay = true,
  label = "Assurance Forge · Mythos Chamber Preview",
  description = "Cinematic preview of the Mythos assurance forge — Athena and Achilles operating as a paired validation system inside the Mythos chamber.",
  className,
}: VideoPanelPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  // Lazy-load: only mount the video once the panel is near the viewport, so the
  // (large) clip never loads above the fold. The poster holds the frame until
  // then, keeping a stable aspect ratio with no layout shift.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Some browsers/devices won't auto-start a scroll-mounted muted video; nudge it.
  useEffect(() => {
    if (!inView || !autoPlay) return;
    const v = videoRef.current;
    if (!v) return;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        /* autoplay blocked — poster stays visible, acceptable for a teaser */
      });
    }
  }, [inView, autoPlay]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: "16/9" }}
      role="img"
      aria-label={description}
    >
      {/* Outer bronze frame + subtle persistent bronze glow */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          border: "1px solid rgba(166,106,50,0.4)",
          boxShadow:
            "0 0 52px rgba(166,106,50,0.14), 0 0 14px rgba(166,106,50,0.1), inset 0 0 30px rgba(12,10,8,0.5)",
        }}
        aria-hidden="true"
      />

      {/* Corner accents */}
      {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map(
        (cls, i) => (
          <div
            key={i}
            className={cn("absolute z-20 w-6 h-6 border-bronze/60 pointer-events-none", cls)}
            aria-hidden="true"
          />
        ),
      )}

      {/* Obsidian backdrop — shows if the poster itself fails to load */}
      <div
        className="absolute inset-0 z-0 bg-graphite"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 45%, rgba(26,23,19,0.95) 0%, rgba(12,10,8,0.99) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Poster frame — holds the panel before/while the video loads */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-[1] w-full h-full object-cover"
      />

      {/* Video element (lazy-mounted when near viewport) */}
      {inView && (
        <video
          ref={videoRef}
          className="absolute inset-0 z-[2] w-full h-full object-cover bg-transparent"
          poster={poster}
          autoPlay={autoPlay}
          muted
          loop
          playsInline
          controls={controls}
          preload="metadata"
          aria-hidden="true"
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Bottom label overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 px-4 py-2 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(5,5,5,0.78) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <p
          style={{
            fontSize: "8px",
            letterSpacing: "0.3em",
            color: "rgba(166, 106, 50, 0.55)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
