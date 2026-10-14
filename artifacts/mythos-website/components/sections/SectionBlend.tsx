import { cn } from "@/lib/utils";

export type Surface = "obsidian" | "abyss" | "navy" | "bone";

const SURFACE_COLOR: Record<Surface, string> = {
  obsidian: "#050505",
  abyss: "#08121c",
  navy: "#0b1f33",
  bone: "#f5f0e7",
};

/** Batch 10 atmosphere layers, chosen by the light they sit in. */
const BLEND_ART = {
  "ivory-clouds": "/assets/transitions/transition-ivory-cloud-01.webp",
  "ivory-clouds-alt": "/assets/transitions/transition-ivory-cloud-02.webp",
  "dark-clouds": "/assets/transitions/transition-dark-cloud-01.webp",
  "dark-clouds-alt": "/assets/transitions/transition-dark-cloud-02.webp",
  "mountain-fog": "/assets/transitions/transition-mountain-fog.webp",
  "sunlight-haze": "/assets/transitions/transition-sunlight-haze.webp",
  "marble-dust": "/assets/transitions/transition-marble-dust.webp",
  "bronze-particles": "/assets/transitions/transition-bronze-particles.webp",
} as const;

interface SectionBlendProps {
  from: Surface;
  to: Surface;
  art?: keyof typeof BLEND_ART;
  /** Opacity of the atmosphere layer. */
  artOpacity?: number;
  className?: string;
}

const DARK: Surface[] = ["obsidian", "abyss", "navy"];

/**
 * Night and day meet through warm light, never through grey: a straight blend
 * from navy to bone passes through muddy slate, so dark↔light seams route
 * through dusk bronze and parchment tones.
 */
function blendGradient(from: Surface, to: Surface): string {
  const a = SURFACE_COLOR[from];
  const b = SURFACE_COLOR[to];
  if (DARK.includes(from) && to === "bone") {
    return `linear-gradient(180deg, ${a} 0%, #1c2229 26%, #5e5240 52%, #c9b893 78%, ${b} 100%)`;
  }
  if (from === "bone" && DARK.includes(to)) {
    return `linear-gradient(180deg, ${a} 0%, #cdbd99 22%, #6a5c47 48%, #1d2530 74%, ${b} 100%)`;
  }
  return `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;
}

/**
 * The seam between two sections, painted instead of cut: a gradient from one
 * surface to the next with an atmosphere layer drifting across it. Purely
 * decorative. "The content has sections. The world does not."
 */
export function SectionBlend({
  from,
  to,
  art,
  artOpacity = 0.8,
  className,
}: SectionBlendProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-[clamp(160px,18vw,300px)] overflow-hidden", className)}
      style={{ background: blendGradient(from, to) }}
    >
      {art && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={BLEND_ART[art]}
          alt=""
          loading="lazy"
          className="mask-fade-y absolute inset-x-0 top-1/2 h-[180%] w-full -translate-y-1/2 object-cover"
          style={{ opacity: artOpacity }}
        />
      )}
    </div>
  );
}
