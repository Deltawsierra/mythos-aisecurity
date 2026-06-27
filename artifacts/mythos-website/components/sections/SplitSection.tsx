import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

interface SplitSectionProps {
  badge?: string;
  headline: string;
  subline?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}

export function SplitSection({
  badge,
  headline,
  subline,
  cta,
  secondaryCta,
  children,
  reverse = false,
  className,
}: SplitSectionProps) {
  return (
    <section className={cn("py-20 lg:py-28 border-b border-ivory/5", className)}>
      <Container>
        <div
          className={cn(
            "grid lg:grid-cols-2 gap-12 lg:gap-20 items-start",
            reverse ? "lg:[&>*:first-child]:order-2" : "",
          )}
        >
          {/* Text column */}
          <div className="flex flex-col justify-center">
            {badge && (
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-bronze">
                {badge}
              </p>
            )}
            <h2 className="mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl">
              {headline}
            </h2>
            {subline && (
              <p className="mb-8 text-base leading-relaxed text-muted-stone max-w-lg">
                {subline}
              </p>
            )}
            {(cta || secondaryCta) && (
              <div className="flex flex-wrap gap-4">
                {cta && (
                  <Button href={cta.href} variant="primary" size="md">
                    {cta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button href={secondaryCta.href} variant="secondary" size="md">
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Content column */}
          <div>{children}</div>
        </div>
      </Container>
    </section>
  );
}
