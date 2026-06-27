import { cn } from "@/lib/utils";

interface HeroCrestFallbackProps {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * Static PNG crest. Used as:
 *  - the no-JS / SSR render
 *  - the visible loading state while the GLB streams in
 *  - the permanent fallback for mobile / reduced-motion / no-WebGL / load errors
 *
 * Matches the original hero crest treatment (size + warm drop-shadow) so the
 * swap to/from 3D is visually seamless. Purely decorative.
 */
export function HeroCrestFallback({
  src,
  alt = "Mythos crest",
  className,
}: HeroCrestFallbackProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="relative"
        style={{
          filter:
            "drop-shadow(0 0 24px rgba(166,106,50,0.35)) drop-shadow(0 0 8px rgba(166,106,50,0.2))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={300}
          height={300}
          style={{ display: "block", background: "transparent" }}
        />
      </div>
    </div>
  );
}
