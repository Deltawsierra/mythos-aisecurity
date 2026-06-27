import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardVariant = "default" | "problem" | "engine" | "market" | "capability" | "principle";

interface FeatureCardProps {
  title: string;
  description?: string;
  tag?: string;
  children?: ReactNode;
  variant?: CardVariant;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "border border-ivory/8 bg-charcoal p-6 hover:border-bronze/30 transition-colors duration-300",
  problem:
    "border-l-2 border-l-bronze/60 border border-ivory/5 bg-charcoal p-6 hover:border-l-bronze transition-colors duration-300",
  engine:
    "border border-bronze/25 bg-graphite p-8 hover:border-bronze/50 transition-colors duration-300",
  market:
    "border border-ivory/8 bg-charcoal p-7 hover:border-bronze/30 transition-colors duration-300 text-center",
  capability:
    "border border-ivory/6 bg-charcoal/50 px-5 py-4 hover:border-bronze/30 hover:bg-charcoal transition-colors duration-200",
  principle:
    "border-l-2 border-l-bronze/40 pl-5 py-2",
};

export function FeatureCard({
  title,
  description,
  tag,
  children,
  variant = "default",
  className,
}: FeatureCardProps) {
  return (
    <div className={cn(variantStyles[variant], className)}>
      {tag && (
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-bronze/70">
          {tag}
        </p>
      )}
      <h3
        className={cn(
          "font-display font-normal text-ivory",
          variant === "engine" ? "text-2xl mb-3" : "text-lg mb-2",
          variant === "capability" ? "text-sm font-sans font-medium" : "",
          variant === "principle" ? "text-base font-sans font-semibold" : "",
          variant === "market" ? "text-xl mb-0" : "",
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "leading-relaxed text-muted-stone",
            variant === "capability" ? "hidden" : "text-sm mt-2",
            variant === "principle" ? "text-sm mt-1 text-muted-stone/80" : "",
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
