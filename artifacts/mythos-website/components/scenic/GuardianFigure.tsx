import { GUARDIAN_FIGURES, type GuardianFigureId } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * A guardian's full-length cut-out standing in its page's scene, sized by
 * height from `className`. `glow` is an optional radial light behind the
 * figure; `small` serves the 900px-tall rendition (phones).
 */
export function GuardianFigure({ id, glow, small, className }: { id: GuardianFigureId; glow?: string; small?: boolean; className?: string }) {
  const f = GUARDIAN_FIGURES[id];
  return (
    <div className={cn("pointer-events-none", className)} data-depth="18">
      {glow && <div aria-hidden="true" className="absolute -inset-x-[40%] inset-y-0 blur-3xl" style={{ background: glow }} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={small ? f.small : f.src}
        width={f.width}
        height={f.height}
        alt=""
        className="relative mx-auto h-full w-auto max-w-none drop-shadow-[0_30px_45px_rgba(0,0,0,0.6)]"
      />
    </div>
  );
}
