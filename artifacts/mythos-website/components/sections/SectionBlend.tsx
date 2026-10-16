import { cn } from "@/lib/utils";

export type Surface = "obsidian" | "charcoal" | "abyss" | "navy" | "bone" | "ivory" | "parchment";

export const SURFACE_COLOR: Record<Surface, string> = {
  obsidian: "#121517",
  charcoal: "#161a1c",
  abyss: "#141b22",
  navy: "#152333",
  bone: "#ede4d5",
  ivory: "#ede4d5",
  parchment: "#e2d3bd",
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
  /* Luminous Olympus cloud layers (Batch 03 candidates). */
  "cloud-valley": "/assets/olympus/cloud-valley.webp",
  "atmospheric-cloud": "/assets/overlays/atmospheric-cloud.webp",
} as const;

export type BlendArt = keyof typeof BLEND_ART;

export interface BlendLayer {
  art: BlendArt;
  opacity?: number;
  /** Horizontal scroll drift in px, applied by PageMotion (data-drift). */
  drift?: number;
  blend?: "normal" | "screen" | "multiply";
}

interface SectionBlendProps {
  from: Surface;
  to: Surface;
  art?: BlendArt;
  /** Opacity of the atmosphere layer. */
  artOpacity?: number;
  /** Several atmosphere layers, back to front. Overrides `art`. */
  layers?: BlendLayer[];
  className?: string;
}

const DARK: Surface[] = ["obsidian", "charcoal", "abyss", "navy"];

type Rgb = [number, number, number];
const hexToRgb = (hex: string): Rgb => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
const rgbToHex = (c: Rgb) => `#${c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

/** Colour at position s (0–1) along evenly spaced key colours. */
function along(keys: Rgb[], s: number): Rgb {
  const span = keys.length - 1;
  const i = Math.min(span - 1, Math.floor(s * span));
  const t = s * span - i;
  return keys[i].map((v, k) => v + (keys[i + 1][k] - v) * t) as Rgb;
}

/**
 * Night and day meet through warm light, never through grey: a straight blend
 * from navy to bone passes through muddy slate, so dark↔light seams route
 * through dusk bronze and parchment tones. The path is sampled on a smoothstep
 * curve so the colour change starts and ends with zero slope — a linear ramp
 * that begins abruptly at a section edge reads as a line even with no step.
 */
function blendGradient(from: Surface, to: Surface): string {
  const a = SURFACE_COLOR[from];
  const b = SURFACE_COLOR[to];
  let path = [a, b];
  // Day and night meet through sunrise and dusk light, never through grey.
  if (DARK.includes(from) && !DARK.includes(to)) path = [a, "#2a2520", "#6e5a40", "#d2b98d", b];
  if (!DARK.includes(from) && DARK.includes(to)) path = [a, "#d6bf96", "#7a6446", "#2a2622", b];
  const keys = path.map(hexToRgb);
  const samples = 18;
  const stops = Array.from({ length: samples + 1 }, (_, i) => {
    const t = i / samples;
    const eased = t * t * (3 - 2 * t);
    return `${rgbToHex(along(keys, eased))} ${(t * 100).toFixed(1)}%`;
  });
  return `linear-gradient(180deg, ${stops.join(", ")})`;
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
  layers,
  className,
}: SectionBlendProps) {
  const stack: BlendLayer[] = layers ?? (art ? [{ art, opacity: artOpacity }] : []);
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-[clamp(160px,18vw,300px)] overflow-hidden", className)}
      style={{ background: blendGradient(from, to) }}
    >
      {/* The fade mask belongs to the band, not the art: the art is taller
          than the band, so a mask on it would leave clouds at the seams. */}
      <div className="mask-fade-y absolute inset-0">
        {stack.map((layer) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={layer.art}
            src={BLEND_ART[layer.art]}
            alt=""
            loading="lazy"
            data-drift={layer.drift}
            // Centred with offsets, not a transform: drift animates `x`.
            className="absolute -left-16 -top-[40%] h-[180%] w-[calc(100%+8rem)] max-w-none object-cover"
            style={{ opacity: layer.opacity ?? 0.8, mixBlendMode: layer.blend ?? "normal" }}
          />
        ))}
      </div>
    </div>
  );
}
