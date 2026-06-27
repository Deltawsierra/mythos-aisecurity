import { cn } from "@/lib/utils";
import Link from "next/link";
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
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-bronze text-ivory border border-bronze hover:bg-antique-gold hover:border-antique-gold transition-colors duration-200",
  secondary:
    "bg-transparent text-ivory border border-ivory/20 hover:border-ivory/50 hover:bg-ivory/5 transition-colors duration-200",
  ghost:
    "bg-transparent text-muted-stone hover:text-ivory transition-colors duration-200 border border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-[10px] px-4 py-2 tracking-[0.18em]",
  md: "text-[10px] px-5 py-2.5 tracking-[0.18em]",
  lg: "text-[11px] px-7 py-3.5 tracking-[0.2em]",
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
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold uppercase",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/70 focus-visible:ring-offset-1 focus-visible:ring-offset-obsidian",
    variantClasses[variant],
    sizeClasses[size],
    className,
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
        {children}
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
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
