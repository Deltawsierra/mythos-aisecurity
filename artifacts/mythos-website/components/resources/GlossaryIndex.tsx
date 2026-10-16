"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export interface GlossaryTerm {
  term: string;
  /** Plain-English definition. */
  plain: string;
  /** Optional precise / technical note. */
  technical?: string;
  /** Optional page that explains the term in depth. */
  href?: string;
}

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Searchable A–Z glossary. Every term renders in the page without script;
 * the search box only narrows what is shown.
 */
export function GlossaryIndex({ terms }: { terms: GlossaryTerm[] }) {
  const [q, setQ] = useState("");
  const sorted = useMemo(() => [...terms].sort((a, b) => a.term.localeCompare(b.term)), [terms]);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return sorted;
    return sorted.filter((t) => `${t.term} ${t.plain} ${t.technical ?? ""}`.toLowerCase().includes(needle));
  }, [q, sorted]);
  const letters = useMemo(() => [...new Set(sorted.map((t) => t.term[0].toUpperCase()))], [sorted]);
  const groups = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const t of shown) {
      const k = t.term[0].toUpperCase();
      map.set(k, [...(map.get(k) ?? []), t]);
    }
    return [...map.entries()];
  }, [shown]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-rule py-5 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">Search the glossary</span>
          <Search size={16} aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms and definitions"
            className="w-full border border-rule bg-panel py-2.5 pl-10 pr-4 text-[15px] text-fg placeholder:text-fg-muted/70 focus:border-accent focus:outline-none"
          />
        </label>
        <nav aria-label="Jump to letter" className="flex flex-wrap gap-1">
          {letters.map((l) => (
            <a key={l} href={`#letter-${l}`} className="flex h-8 w-8 items-center justify-center border border-rule font-display text-lg text-fg-muted hover:border-accent hover:text-fg">
              {l}
            </a>
          ))}
        </nav>
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-fg-muted">
        {shown.length === terms.length ? `${terms.length} terms` : `${shown.length} of ${terms.length} terms match`}
      </p>
      <div className="mt-6 grid gap-12">
        {groups.map(([letter, items]) => (
          <section key={letter} id={`letter-${letter}`} aria-labelledby={`letter-${letter}-title`} className="scroll-mt-28 grid gap-6 lg:grid-cols-[6rem_1fr]">
            <h2 id={`letter-${letter}-title`} className="font-display text-5xl leading-none text-accent">
              {letter}
            </h2>
            <dl className="divide-y divide-rule border-y border-rule">
              {items.map((t) => (
                <div key={t.term} id={slug(t.term)} className="scroll-mt-28 grid gap-1.5 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
                  <dt className="font-display text-2xl leading-tight text-fg">{t.term}</dt>
                  <dd className="text-[15px] leading-relaxed text-fg-muted">
                    <p className="text-fg">{t.plain}</p>
                    {t.technical && <p className="mt-1.5">{t.technical}</p>}
                    {t.href && (
                      <Link href={t.href} className="mt-2 inline-block text-[13px] font-semibold text-accent hover:underline">
                        Read more
                      </Link>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
        {groups.length === 0 && <p className="text-sm text-fg-muted">No term matches “{q}”.</p>}
      </div>
    </div>
  );
}
