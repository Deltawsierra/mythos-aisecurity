import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type SectionVariant = "obsidian" | "graphite";

interface UseCaseDeepDiveSectionProps {
  eyebrow?: string;
  title: string;
  id?: string;
  variant?: SectionVariant;
  /** Constrain the body to a comfortable reading measure for prose sections. */
  narrow?: boolean;
  children: ReactNode;
  className?: string;
}

const bgVariants: Record<SectionVariant, string> = {
  obsidian: "bg-obsidian",
  graphite: "bg-graphite",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Report-style section wrapper for the deep-dive pages. Provides the alternating
 * obsidian/graphite rhythm, an optional eyebrow, a labelled heading, and an
 * optional narrow reading measure. Keeps headings in document order so the page
 * has a clean h1 → h2 hierarchy.
 */
export function UseCaseDeepDiveSection({
  eyebrow,
  title,
  id,
  variant = "obsidian",
  narrow = false,
  children,
  className,
}: UseCaseDeepDiveSectionProps) {
  const headingId = `${id ?? slugify(title)}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "border-b border-ivory/5 py-14 lg:py-20",
        bgVariants[variant],
        className,
      )}
    >
      <Container>
        <div className={cn("min-w-0", narrow && "max-w-3xl")}>
          {eyebrow && (
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
              {eyebrow}
            </p>
          )}
          <h2
            id={headingId}
            className="mb-6 font-display text-2xl font-normal leading-tight text-ivory lg:text-3xl"
          >
            {title}
          </h2>
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </section>
  );
}
