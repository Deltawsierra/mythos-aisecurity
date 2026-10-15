"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CHARACTER_MEDIA } from "@/content/media";
import { PROJECTS } from "@/content/platform";
import { cropStyle } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * The five projects as cards. The poster is the default (and the reduced-motion
 * state); on hover or focus, desktop browsers cross-fade to the character's
 * engaged loop (idle where no engaged loop exists).
 */
export function ProjectGrid() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (min-width: 1024px)");
    const update = () => setMotion(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" data-reveal-group>
      {PROJECTS.map((p) => {
        const media = CHARACTER_MEDIA[p.id];
        const live = motion && hovered === p.id;
        return (
          <li key={p.id}>
            <Link
              href={p.href}
              onPointerEnter={() => setHovered(p.id)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(p.id)}
              onBlur={() => setHovered(null)}
              className="group block focus-visible:outline-none"
            >
              <span
                // One frame shape for every card; object-fit absorbs each
                // character's slightly different crop.
                className="relative block aspect-[52/100] overflow-hidden border border-bronze/30 transition-[border-color,box-shadow] duration-500 group-hover:border-antique-gold/70 group-hover:shadow-[0_30px_60px_-30px_rgba(214,161,74,0.45)] group-focus-visible:ring-2 group-focus-visible:ring-antique-gold"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media.poster.src} alt="" loading="lazy" style={cropStyle(media.crop)} />
                {live && (
                  <video
                    className="lc-fade"
                    style={cropStyle(media.crop)}
                    src={media.engaged ?? media.idle}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 50%, rgba(5,5,5,0.92) 100%)" }}
                />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-display text-3xl leading-none text-ivory">{p.name}</span>
                  <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-antique-gold">{p.tagline}</span>
                </span>
              </span>
              <span className="mt-3 block text-sm leading-relaxed text-fg-muted">{p.role}</span>
              <span className={cn("mt-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent")}>
                Explore {p.name}
                <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
