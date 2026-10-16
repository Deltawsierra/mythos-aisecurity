import { SPINE_CORE_MEDIA } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * A slow bronze orbit around the SPINE core with a ledger of changes passing
 * through it (Launch Guide: continuous assurance visual). Decorative; the
 * rings turn over minutes and stop under reduced motion.
 */
export function OrbitFigure({ entries, className }: { entries: string[]; className?: string }) {
  return (
    <div className={cn("relative aspect-square", className)} data-depth="16">
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(229,197,143,0.35), transparent 70%)" }} />
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g className="orbit-slow" style={{ transformOrigin: "200px 200px" }}>
          <ellipse cx="200" cy="200" rx="190" ry="78" fill="none" stroke="#d0a45a" strokeOpacity="0.55" strokeWidth="1.5" />
          <circle cx="390" cy="200" r="5" fill="#e5c58f" />
        </g>
        <g className="orbit-slow-reverse" style={{ transformOrigin: "200px 200px" }}>
          <ellipse cx="200" cy="200" rx="170" ry="120" fill="none" stroke="#b8823f" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(32 200 200)" />
          <circle cx="56" cy="110" r="4" fill="#d0a45a" />
        </g>
        <circle cx="200" cy="200" r="182" fill="none" stroke="#e5c58f" strokeOpacity="0.18" strokeDasharray="2 8" />
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SPINE_CORE_MEDIA.cutout.src} alt="" className="core-sway absolute inset-[22%] w-[56%] drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]" />
      <ul aria-hidden="true" className="absolute -bottom-2 left-1/2 w-[86%] -translate-x-1/2 border border-champagne/30 bg-charcoal/75 px-4 py-2 font-mono text-[11px] leading-relaxed text-champagne/90 backdrop-blur-sm">
        {entries.map((entry) => (
          <li key={entry} className="truncate">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
