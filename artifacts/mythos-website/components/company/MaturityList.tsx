import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_MATURITY, type Maturity } from "@/content/company";
import { cn } from "@/lib/utils";

const TONE: Record<Maturity, string> = {
  Built: "border-state-verified text-state-verified",
  "In development": "border-state-stale text-state-stale",
  Internal: "border-state-observed text-state-observed",
  Specified: "border-fg/40 text-fg-muted",
  Exploratory: "border-fg/40 text-fg-muted",
};

/** Each product at its real maturity — on dark scenes. */
export function MaturityList() {
  return (
    <ul className="divide-y divide-rule border-y border-rule" data-reveal-group>
      {PRODUCT_MATURITY.map((p) => (
        <li key={p.name} className="grid gap-2 py-5 md:grid-cols-[17rem_9rem_1fr] md:items-baseline md:gap-6">
          <Link href={p.href} className="group inline-flex items-center gap-2 self-start">
            <span className="display-caps font-display text-2xl text-champagne">{p.name}</span>
            <ArrowRight size={14} aria-hidden="true" className="text-champagne transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className={cn("self-start justify-self-start border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]", TONE[p.maturity])}>{p.maturity}</span>
          <span className="text-[15px] leading-relaxed text-fg-muted">{p.note}</span>
        </li>
      ))}
    </ul>
  );
}
