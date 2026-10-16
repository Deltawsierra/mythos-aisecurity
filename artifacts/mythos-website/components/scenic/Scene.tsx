import type { CSSProperties, ReactNode } from "react";
import { SURFACE_COLOR, type Surface } from "@/components/sections/SectionBlend";
import { cn } from "@/lib/utils";

/** One painted plane behind a section's content, back to front. */
export interface SceneLayer {
  src: string;
  /** Portrait source for phones (below md). */
  mobileSrc?: string;
  /** Positioning and object-position classes for the <img>. */
  className?: string;
  opacity?: number;
  blend?: CSSProperties["mixBlendMode"];
  /** Scroll-scrubbed vertical drift, % (PageMotion data-parallax). */
  parallax?: number;
  /** Pointer parallax, px (PageMotion data-depth). */
  depth?: number;
  /** Scroll-scrubbed horizontal drift, px (PageMotion data-drift). */
  drift?: number;
  /** Above-the-fold art: load eagerly with high priority. */
  priority?: boolean;
}

/** Sunlit (or dusk) cloud bank at one edge, dissolving into a surface colour. */
export interface CloudEdge {
  /** The colour the edge resolves to — the neighbouring section's surface. */
  into: Surface;
  tone?: "sunlit" | "dusk";
  /** Height of the bank as a share of the section, e.g. "34%". */
  height?: string;
}

interface SceneProps {
  surface: Surface;
  labelledBy?: string;
  id?: string;
  layers?: SceneLayer[];
  /** Readability scrim painted over the art (a CSS background). */
  scrim?: string;
  top?: CloudEdge;
  bottom?: CloudEdge;
  className?: string;
  children: ReactNode;
}

const CLOUD_ART = {
  sunlit: ["/assets/olympus/cloud-valley.webp", "/assets/transitions/transition-ivory-cloud-01.webp"],
  dusk: ["/assets/transitions/transition-dark-cloud-01.webp", "/assets/olympus/cloud-valley.webp"],
} as const;

/** A cloud bank at one edge of a positioned parent. Decorative; use inside aria-hidden art. */
export function CloudBank({ edge, at }: { edge: CloudEdge; at: "top" | "bottom" }) {
  const color = SURFACE_COLOR[edge.into];
  const tone = edge.tone ?? "sunlit";
  const [back, front] = CLOUD_ART[tone];
  const toEdge = at === "top" ? "0deg" : "180deg";
  // Clouds rise out of nothing (mask), then dissolve into the neighbouring
  // surface (colour ramp painted over them), so the bank has no edge of its own.
  const mask = `linear-gradient(${toEdge}, transparent 0%, #000 48%)`;
  return (
    <div className={cn("absolute inset-x-0", at === "top" ? "top-0" : "bottom-0")} style={{ height: edge.height ?? "34%" }}>
      <div className="absolute inset-0 overflow-hidden" style={{ WebkitMaskImage: mask, maskImage: mask }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={back}
          alt=""
          loading="lazy"
          data-drift="70"
          className={cn(
            "absolute -left-16 h-[150%] w-[calc(100%+8rem)] max-w-none object-cover",
            at === "top" ? "-top-[40%] rotate-180" : "-bottom-[30%]",
          )}
          style={{ opacity: tone === "sunlit" ? 0.95 : 0.7 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={front}
          alt=""
          loading="lazy"
          data-drift="-90"
          className={cn(
            "absolute -left-16 h-[120%] w-[calc(100%+8rem)] max-w-none object-cover",
            at === "top" ? "-top-[20%] rotate-180" : "-bottom-[18%]",
          )}
          style={{ opacity: tone === "sunlit" ? 0.85 : 0.6, mixBlendMode: tone === "sunlit" ? "screen" : "normal" }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(${toEdge}, transparent 0%, transparent 38%, ${color}a6 70%, ${color} 93%)` }}
      />
    </div>
  );
}

/**
 * A section of the continuous world (Launch Guide: ScenicPageShell). Painted
 * planes sit behind the content and move only through PageMotion's attribute
 * hooks; sunlit cloud banks at either edge dissolve the art into the
 * neighbouring section's colour so the page reads as one landscape. Every
 * plane is decorative and aria-hidden; all meaning lives in the DOM content.
 */
export function Scene({ surface, labelledBy, id, layers = [], scrim, top, bottom, className, children }: SceneProps) {
  return (
    <section
      id={id}
      data-surface={surface}
      aria-labelledby={labelledBy}
      className={cn("relative isolate overflow-hidden", className)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {layers.map((layer) => (
          <div
            key={layer.src}
            className="absolute inset-x-0 -inset-y-[6%]"
            data-parallax={layer.parallax}
            data-depth={layer.depth}
            data-drift={layer.drift}
          >
            <picture>
              {layer.mobileSrc && <source media="(max-width: 767px)" srcSet={layer.mobileSrc} />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={layer.src}
                alt=""
                loading={layer.priority ? "eager" : "lazy"}
                fetchPriority={layer.priority ? "high" : undefined}
                className={cn("absolute inset-0 h-full w-full object-cover", layer.className)}
                style={{ opacity: layer.opacity ?? 1, mixBlendMode: layer.blend }}
              />
            </picture>
          </div>
        ))}
        {scrim && <div className="absolute inset-0" style={{ background: scrim }} />}
        {top && <CloudBank edge={top} at="top" />}
        {bottom && <CloudBank edge={bottom} at="bottom" />}
      </div>
      {children}
    </section>
  );
}
