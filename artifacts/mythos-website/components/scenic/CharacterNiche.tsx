import { CHARACTER_MEDIA, type ProjectId } from "@/content/media";
import { cropStyle } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * A guardian standing in a carved arch on a stone ledge — the character
 * poster framed as part of the architecture rather than as a card. `glow` is
 * one or two radial lights behind the arch (CSS backgrounds), kept to the
 * figure so colour never washes the page.
 */
export function CharacterNiche({ project, glow, className }: { project: ProjectId; glow?: string; className?: string }) {
  const media = CHARACTER_MEDIA[project];
  const { left = 0, top = 0 } = media.crop;
  const aspect = (media.poster.width * (100 - left)) / (media.poster.height * (100 - top));
  return (
    <div className={cn("flex flex-col items-center", className)} data-depth="18">
      {glow && <div aria-hidden="true" className="absolute -inset-x-[30%] inset-y-0 blur-3xl" style={{ background: glow }} />}
      <div
        className="relative h-full overflow-hidden rounded-t-full border-2 border-champagne/60 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),inset_0_0_0_6px_rgba(22,26,28,0.45)]"
        style={{ aspectRatio: aspect }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.poster.src} alt="" style={cropStyle(media.crop)} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 62%, rgba(18,21,23,0.6) 100%)" }} />
      </div>
      <div
        aria-hidden="true"
        className="relative h-4 w-[118%] border-t border-champagne/60 bg-gradient-to-b from-[#6b5636] to-[#2a241c] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
}
