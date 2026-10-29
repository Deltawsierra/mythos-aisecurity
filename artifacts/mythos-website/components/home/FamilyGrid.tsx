"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { presence } from "@/content/media";
import { PROJECTS } from "@/content/platform";
import { HOME_FAMILY } from "@/content/home";
import { PresenceFigure, usePresenceMotion } from "@/components/scenic/PresenceFigure";

/**
 * The five guardians (Launch Guide H05), each on its own page's scene: poster
 * first; desktop with motion allowed plays the character's engaged presence
 * loop on hover or focus — one card at a time, never autoplaying the whole row.
 */
export function FamilyGrid() {
  const [hovered, setHovered] = useState<string | null>(null);
  const motion = usePresenceMotion();

  return (
    <ul className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-5" data-reveal-group>
      {HOME_FAMILY.products.map((item) => {
        const project = PROJECTS.find((p) => p.id === item.id)!;
        const media = presence(item.id);
        const live = motion && hovered === item.id;
        return (
          <li key={item.id}>
            <Link
              href={project.href}
              onPointerEnter={() => setHovered(item.id)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(item.id)}
              onBlur={() => setHovered(null)}
              className="group block"
            >
              <span className="relative block aspect-[52/100] overflow-hidden border border-champagne/30 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:border-champagne/80 group-hover:shadow-[0_36px_70px_-30px_rgba(208,164,90,0.5)]">
                <PresenceFigure media={media} state={live ? "engaged" : null} position={media.position} />
                <span aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(18,21,23,0.88) 100%)" }} />
                {item.badge && (
                  <span className="absolute left-3 top-3 border border-champagne/50 bg-charcoal/75 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-champagne backdrop-blur-sm">
                    {item.badge}
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="display-caps block font-display text-[1.7rem] leading-none text-ivory">{project.name}</span>
                </span>
              </span>
              <span className="mt-4 block font-display text-xl italic text-champagne">{item.line}</span>
              <span className="mt-1.5 block text-sm leading-relaxed text-fg-muted">{item.body}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-fg">
                Explore {project.name}
                <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
