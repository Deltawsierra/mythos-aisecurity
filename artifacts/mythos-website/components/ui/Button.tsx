import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  /** Render a native download anchor (e.g. for a static PDF asset). */
  download?: boolean | string;
  /** Trailing arrow that nudges forward on hover. */
  arrow?: boolean;
}

// Luminous Olympus CTAs: a gold pill with a charcoal label (7.6:1 — ivory on
// gold fails), and an outline pill that takes the current surface's colours.
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-full border border-antique-gold bg-gradient-to-b from-champagne to-antique-gold text-charcoal shadow-[0_10px_28px_-14px_rgba(208,164,90,0.75)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-14px_rgba(208,164,90,0.9)]",
  secondary:
    "rounded-full border border-fg/35 bg-transparent text-fg hover:-translate-y-0.5 hover:border-fg/70 hover:bg-fg/5",
  ghost: "border border-transparent bg-transparent text-fg-muted hover:text-fg",
};

/** For an outline CTA over painted art: it can land on bright cloud or marble,
 * so a dark glass backing keeps its label legible whatever sits behind it. */
export const OUTLINE_ON_ART = "bg-charcoal/55 backdrop-blur-sm hover:bg-charcoal/70";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "gap-1.5 px-4 py-2 text-[13px]",
  md: "gap-2 px-5 py-2.5 text-sm",
  lg: "gap-2 px-7 py-3.5 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  target,
  rel,
  download,
  arrow,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "group/button inline-flex items-center justify-center font-semibold tracking-[0.01em]",
    "transition-[transform,box-shadow,border-color,background-color,color] duration-200",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
  const content = arrow ? (
    <>
      {children}
      <ArrowRight size={size === "lg" ? 16 : 14} aria-hidden="true" className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
    </>
  ) : (
    children
  );

  // Downloads (and explicit blank-target links) point at static assets, not
  // app routes — render a native anchor so the `download` attribute and direct
  // navigation work without Next's client router.
  if (href !== undefined && download !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        download={download}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={rel}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
