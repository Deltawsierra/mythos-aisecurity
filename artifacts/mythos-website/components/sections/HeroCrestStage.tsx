import { HeroCrest3D } from "@/components/three/HeroCrest3D";

interface HeroCrestStageProps {
  fallbackSrc: string;
}

/**
 * Free-floating homepage-hero crest environment. Unlike the boxed
 * command-frame panel used elsewhere, this has NO solid rectangle, border, or
 * hard crop — just an atmospheric dark glow, faint concentric bronze rings, and
 * a soft interface arc behind a large, free-floating crest. Purely decorative
 * (aria-hidden); the crest itself (HeroCrest3D) owns the PNG fallback + 3D.
 */
export function HeroCrestStage({ fallbackSrc }: HeroCrestStageProps) {
  return (
    <div
      className="relative mx-auto overflow-visible"
      style={{
        width: "min(100%, 620px)",
        height: "clamp(560px, 78vh, 820px)",
      }}
      aria-hidden="true"
    >
      {/* Atmospheric dark/bronze gradient — the "command chamber" depth. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 57%, rgba(26,21,15,0.85) 0%, rgba(14,11,8,0.4) 45%, rgba(10,8,6,0) 72%)",
        }}
      />

      {/* Faint concentric bronze rings (no box). */}
      {[40, 58, 76].map((pct, i) => (
        <div
          key={pct}
          className="absolute left-1/2 top-[57%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: `${pct}%`,
            aspectRatio: "1",
            border: `1px solid rgba(166, 106, 50, ${0.14 - i * 0.035})`,
          }}
        />
      ))}

      {/* Faint outer interface arc. */}
      <div
        className="absolute left-1/2 top-[57%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "90%",
          aspectRatio: "1",
          borderTop: "1px solid rgba(166, 106, 50, 0.10)",
          borderLeft: "1px solid rgba(166, 106, 50, 0.04)",
          borderRight: "1px solid rgba(166, 106, 50, 0.07)",
          borderBottom: "1px solid transparent",
        }}
      />

      {/* Soft breathing ember glow centered behind the crest. */}
      <div
        className="ember-soft-glow absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 175px at 50% 57%, rgba(166,106,50,0.14) 0%, transparent 100%)",
        }}
      />

      {/* The free-floating crest (transparent canvas + PNG fallback). */}
      <HeroCrest3D fallbackSrc={fallbackSrc} />
    </div>
  );
}
