import { CHARACTER_MEDIA, type ProjectId } from "@/content/media";
import { cn } from "@/lib/utils";

/** A character's face inside a gold medallion ring. Decorative. */
export function Portrait({ project, className }: { project: ProjectId; className?: string }) {
  const { poster, face, medallion } = CHARACTER_MEDIA[project];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block aspect-square overflow-hidden rounded-full border-2 border-antique-gold/80 bg-obsidian shadow-[0_0_0_4px_rgba(18,21,23,0.85),0_0_0_5px_rgba(184,130,63,0.55),0_18px_40px_-14px_rgba(0,0,0,0.9)]",
        className,
      )}
      style={
        medallion
          ? { backgroundImage: `url(${medallion})`, backgroundSize: "cover", backgroundPosition: "50% 50%" }
          : {
              backgroundImage: `url(${poster.src})`,
              backgroundSize: `${face.zoom * 100}% auto`,
              backgroundPosition: `${face.x}% ${face.y}%`,
            }
      }
    />
  );
}
