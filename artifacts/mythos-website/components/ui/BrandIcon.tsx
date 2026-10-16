import { inlineIcon } from "@/lib/inlineIcon";
import { cn } from "@/lib/utils";

/** A Batch 02 brand icon, inlined so it follows `currentColor`. Server only. */
export function BrandIcon({ src, className }: { src: string; className?: string }) {
  return <span aria-hidden="true" className={cn("inline-block shrink-0", className)} dangerouslySetInnerHTML={{ __html: inlineIcon(src) }} />;
}
