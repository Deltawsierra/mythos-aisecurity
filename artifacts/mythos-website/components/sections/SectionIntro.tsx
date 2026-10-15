import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** id for the heading, so the section can aria-labelledby it. */
  id: string;
  align?: "left" | "center";
  className?: string;
}

/** Eyebrow, display heading and lede for a section. Reads its surface colours. */
export function SectionIntro({ eyebrow, title, lede, id, align = "left", className }: SectionIntroProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)} data-reveal-group>
      <p
        className={cn(
          "mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent",
          centered && "justify-center",
        )}
      >
        {!centered && <span aria-hidden="true" className="h-px w-8 bg-accent/60" />}
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-4xl leading-[1.05] text-fg lg:text-[3.25rem]">
        {title}
      </h2>
      {lede && <div className="mt-5 text-lg leading-relaxed text-fg-muted">{lede}</div>}
    </div>
  );
}
