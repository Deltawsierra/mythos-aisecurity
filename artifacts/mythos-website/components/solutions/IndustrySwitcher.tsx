"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SwitcherIndustry {
  slug: string;
  name: string;
  headline: string;
  risks: string[];
  image: string;
  position: string;
  /** Optional cut-out plane over the backdrop (e.g. a temple on its cliff). */
  overlay?: { src: string; className: string };
}

/**
 * Switch destination by industry (Launch Guide Solutions signature): tabs on
 * the left, the chosen industry's scene and first risks on the right, with a
 * link to its page. No autoplay; every panel stays in the page.
 */
export function IndustrySwitcher({ industries }: { industries: SwitcherIndustry[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const focused = tabs.current.findIndex((t) => t === document.activeElement);
    const from = focused === -1 ? active : focused;
    let next = from;
    if (e.key in step) next = (from + step[e.key] + industries.length) % industries.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = industries.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
      <div
        role="tablist"
        aria-label="Industries"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:content-start lg:overflow-visible lg:px-0 lg:pb-0"
        onKeyDown={onKeyDown}
      >
        {industries.map((ind, i) => (
          <button
            key={ind.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`industry-tab-${ind.slug}`}
            aria-selected={active === i}
            aria-controls={`industry-panel-${ind.slug}`}
            tabIndex={active === i ? 0 : -1}
            onClick={(e) => {
              setActive(i);
              e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
            }}
            className={cn(
              "shrink-0 whitespace-nowrap border px-4 py-2.5 text-left font-display text-lg leading-tight transition-colors lg:whitespace-normal lg:py-3 lg:text-xl",
              active === i ? "border-accent bg-panel text-fg" : "border-rule text-fg-muted hover:border-accent/60 hover:text-fg",
            )}
          >
            {ind.name}
          </button>
        ))}
      </div>
      {industries.map((ind, i) => (
        <div
          key={ind.slug}
          role="tabpanel"
          id={`industry-panel-${ind.slug}`}
          aria-labelledby={`industry-tab-${ind.slug}`}
          hidden={active !== i}
          className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden border border-bronze/30 shadow-[0_30px_60px_-34px_rgba(22,26,28,0.7)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ind.image} alt="" aria-hidden="true" loading="lazy" className="lc-fade absolute inset-0 h-full w-full object-cover" style={{ objectPosition: ind.position }} />
          {ind.overlay && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={ind.overlay.src} alt="" aria-hidden="true" loading="lazy" className={cn("absolute object-contain", ind.overlay.className)} />
          )}
          <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,21,23,0.1) 20%, rgba(18,21,23,0.92) 100%)" }} />
          <div className="relative p-6 sm:p-8">
            <p className="font-display text-3xl leading-tight text-ivory">{ind.headline}</p>
            <ul className="mt-4 grid gap-1.5 text-[15px] text-ivory/85">
              {ind.risks.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-champagne" />
                  {r}
                </li>
              ))}
            </ul>
            <Link
              href={`/solutions/${ind.slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-antique-gold bg-gradient-to-b from-champagne to-antique-gold px-5 py-2.5 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
            >
              Explore {ind.name}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
