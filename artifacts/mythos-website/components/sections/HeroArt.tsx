import { CHARACTER_MEDIA, type ProjectId } from "@/content/media";
import { cropStyle } from "@/lib/media";
import { cn } from "@/lib/utils";

export type HeroArtSpec =
  /** A project character poster, cropped of its baked frame. */
  | { kind: "character"; project: ProjectId }
  /** Cut-out art floating on the hero (e.g. the SPINE core). */
  | { kind: "cutout"; src: string; spin?: boolean }
  /** A vector emblem or medallion. */
  | { kind: "emblem"; src: string };

/** Right-hand hero art for inner pages. Decorative. */
export function HeroArt({ art }: { art: HeroArtSpec }) {
  if (art.kind === "character") {
    const media = CHARACTER_MEDIA[art.project];
    const { left = 0, top = 0 } = media.crop;
    const aspect = (media.poster.width * (100 - left)) / (media.poster.height * (100 - top));
    return (
      <div className="relative mx-auto w-full max-w-[24rem]" aria-hidden="true" data-depth="10">
        <div
          className="absolute -inset-10 rounded-full opacity-70 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(214,161,74,0.22) 0%, rgba(11,31,51,0.4) 50%, transparent 72%)",
          }}
        />
        <div
          className="relative overflow-hidden border border-bronze/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
          style={{ aspectRatio: aspect }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.poster.src} alt="" style={cropStyle(media.crop)} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(5,5,5,0.55) 100%)" }} />
        </div>
        <div className="mythos-rule mt-5" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true" data-depth="14">
      <div
        className="absolute inset-0 rounded-full opacity-80 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(214,161,74,0.2) 0%, rgba(21,48,74,0.35) 50%, transparent 72%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={art.src}
        alt=""
        className={cn(
          art.kind === "cutout" ? "relative w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]" : "relative mx-auto w-3/4",
          art.kind === "cutout" && art.spin && "core-sway",
        )}
      />
    </div>
  );
}
