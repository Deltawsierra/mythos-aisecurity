import { cn } from "@/lib/utils";
import { createElement, type ElementType, type ReactNode } from "react";

interface SectionProps {
  className?: string;
  children: ReactNode;
  as?: ElementType;
  id?: string;
}

export function Section({
  className,
  children,
  as: Tag = "section",
  id,
}: SectionProps) {
  return createElement(
    Tag,
    { id, className: cn("py-16 lg:py-24", className) },
    children,
  );
}
