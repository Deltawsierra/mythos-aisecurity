"use client";

import { useEffect, useRef, useState } from "react";
import type { PresenceMedia } from "@/content/media";
import { cn } from "@/lib/utils";

/** Safari plays VP9 WebM without its alpha; until the HEVC-alpha exports arrive it keeps the stills. */
const isSafari = () => /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent);

/** Presence loops run only on desktop with a hovering pointer and motion allowed; everyone else gets the poster. */
export function usePresenceMotion() {
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    if (isSafari()) return;
    const q = window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (min-width: 1024px)");
    const update = () => setMotion(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  return motion;
}

/**
 * A presence character inside a card: backdrop, still, and (when `state` is set) the loop over
 * them. The still hides once the loop is playing so its baked light doesn't double the live
 * effects. The loop exists only while the card is in view (off-screen = paused, never
 * downloaded early). Fills its positioned parent.
 */
export function PresenceFigure({ media, state, position }: { media: PresenceMedia; state: "idle" | "engaged" | null; position?: string }) {
  // Poster and loop share one framing, so they always line up.
  const frame = { objectPosition: position, transform: media.scale ? `scale(${media.scale})` : undefined, transformOrigin: position ?? "50% 0%" };
  const ref = useRef<HTMLSpanElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);
  const src = state && onScreen ? media[state] : null;
  const fit = "absolute inset-0 h-full w-full object-cover";

  useEffect(() => {
    const el = ref.current;
    if (!el || !state) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, [state]);

  return (
    <span ref={ref} className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={media.backdrop} alt="" loading="lazy" className={fit} />
      <span aria-hidden="true" className="absolute inset-0 bg-charcoal/35" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={media.poster} alt="" loading="lazy" className={cn(fit, src && playing === src && "opacity-0")} style={frame} />
      {src && (
        <video
          key={src}
          className={fit}
          style={frame}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          onPlaying={() => setPlaying(src)}
        />
      )}
    </span>
  );
}
