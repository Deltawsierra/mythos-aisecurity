"use client";

import { useEffect, useRef, useState } from "react";
import { CHARACTER_MEDIA, type ProjectId } from "@/content/media";
import { cropStyle } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * A project character in a constrained panel (blueprint M5: character
 * presence). Poster first; on desktop with motion allowed the idle loop fades
 * in while the panel is in view, and the engaged loop takes over on hover or
 * focus within the hero. Reduced motion and phones keep the poster.
 */
export function CharacterPanel({ project, className }: { project: ProjectId; className?: string }) {
  const media = CHARACTER_MEDIA[project];
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [engagedSeen, setEngagedSeen] = useState(false);
  const [playing, setPlaying] = useState({ idle: false, engaged: false });

  useEffect(() => {
    if (engaged) setEngagedSeen(true);
  }, [engaged]);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 1024px)");
    const update = () => setEnabled(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Engage when the pointer or keyboard focus is anywhere in the hero.
  useEffect(() => {
    const host = ref.current?.closest("section");
    if (!host) return;
    const on = () => setEngaged(true);
    const off = () => setEngaged(false);
    host.addEventListener("pointerenter", on);
    host.addEventListener("pointerleave", off);
    host.addEventListener("focusin", on);
    host.addEventListener("focusout", off);
    return () => {
      host.removeEventListener("pointerenter", on);
      host.removeEventListener("pointerleave", off);
      host.removeEventListener("focusin", on);
      host.removeEventListener("focusout", off);
    };
  }, []);

  const live = enabled && inView;
  // Show the engaged loop only once it is actually playing; idle covers until then.
  const shown = engaged && playing.engaged ? "engaged" : playing.idle ? "idle" : null;
  const { left = 0, top = 0 } = media.crop;
  const aspect = (media.poster.width * (100 - left)) / (media.poster.height * (100 - top));

  return (
    <div ref={ref} className={cn("relative mx-auto w-full max-w-[24rem]", className)} aria-hidden="true" data-depth="10">
      <div
        className="absolute -inset-10 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(214,161,74,0.22) 0%, rgba(11,31,51,0.4) 50%, transparent 72%)" }}
      />
      <div
        className="relative overflow-hidden border border-bronze/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
        style={{ aspectRatio: aspect }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.poster.src} alt="" style={cropStyle(media.crop)} />
        {live &&
          (["idle", "engaged"] as const).map((state) => {
            const src = state === "idle" ? media.idle : media.engaged;
            // The engaged loop loads only after the visitor first engages.
            if (!src || (state === "engaged" && !engagedSeen)) return null;
            return (
              <video
                key={state}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                onPlaying={() => setPlaying((p) => ({ ...p, [state]: true }))}
                className={cn("transition-opacity duration-[900ms] ease-out", shown === state ? "opacity-100" : "opacity-0")}
                style={cropStyle(media.crop)}
              />
            );
          })}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(5,5,5,0.55) 100%)" }} />
      </div>
      <div className="mythos-rule mt-5" />
    </div>
  );
}
