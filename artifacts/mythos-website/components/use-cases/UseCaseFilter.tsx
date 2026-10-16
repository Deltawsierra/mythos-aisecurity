"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterCard {
  slug: string;
  number: number;
  title: string;
  question: string;
  image: string;
  horizon?: boolean;
  facets: Record<FacetKey, string[]>;
}

export type FacetKey = "industry" | "product" | "risk";

export interface Facet {
  key: FacetKey;
  label: string;
  options: { value: string; label: string }[];
}

/**
 * The use-case library (Launch Guide §10): filter by industry, product and
 * risk theme. Filter state lives in the URL (?industry=…&product=…&risk=…)
 * so a filtered view can be shared; the full list renders without script.
 */
export function UseCaseFilter({ cards, facets }: { cards: FilterCard[]; facets: Facet[] }) {
  const [active, setActive] = useState<Partial<Record<FacetKey, string>>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next: Partial<Record<FacetKey, string>> = {};
    for (const f of facets) {
      const v = params.get(f.key);
      if (v && f.options.some((o) => o.value === v)) next[f.key] = v;
    }
    setActive(next);
  }, [facets]);

  const apply = (next: Partial<Record<FacetKey, string>>) => {
    setActive(next);
    const params = new URLSearchParams(window.location.search);
    for (const f of facets) {
      if (next[f.key]) params.set(f.key, next[f.key]!);
      else params.delete(f.key);
    }
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  };

  const choose = (key: FacetKey, value: string | undefined) => {
    const next = { ...active, [key]: value };
    if (!value) delete next[key];
    apply(next);
  };

  const shown = useMemo(
    () => cards.filter((c) => (Object.entries(active) as [FacetKey, string][]).every(([k, v]) => c.facets[k].includes(v))),
    [cards, active],
  );
  const filtered = Object.keys(active).length > 0;

  return (
    <div>
      <div className="grid gap-5 border-y border-rule py-6 lg:grid-cols-3" role="group" aria-label="Filter use cases">
        {facets.map((f) => (
          <fieldset key={f.key} className="min-w-0">
            <legend className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{f.label}</legend>
            <div className="flex flex-wrap gap-1.5">
              {f.options.map((o) => {
                const on = active[f.key] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => choose(f.key, on ? undefined : o.value)}
                    className={cn(
                      "border px-2.5 py-1 text-[13px] transition-colors",
                      on ? "border-accent bg-panel font-semibold text-fg" : "border-rule text-fg-muted hover:border-accent/60 hover:text-fg",
                    )}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-fg-muted">
          Showing {shown.length} of {cards.length} scenarios
        </p>
        {filtered && (
          <button type="button" onClick={() => apply({})} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
            <X size={13} aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/use-cases/${c.slug}`}
              className="group flex h-full flex-col border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-antique-gold/60"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Use case {String(c.number).padStart(2, "0")}
                  {c.horizon && " · Strategic horizon"}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" aria-hidden="true" loading="lazy" className="h-14 w-14 shrink-0 object-contain" />
              </div>
              <span className="mt-2 font-display text-2xl leading-tight text-fg">{c.title}</span>
              <span className="mt-2 text-sm italic leading-relaxed text-fg-muted">“{c.question}”</span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-accent">
                Read the scenario
                <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-6 text-sm text-fg-muted">No scenario matches all of those filters. Clear one to see more.</p>}
    </div>
  );
}
