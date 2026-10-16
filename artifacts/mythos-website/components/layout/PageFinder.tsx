"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { IndexedPage } from "@/content/siteIndex";

/** A small page finder for the 404 page: filters the site index as you type. */
export function PageFinder({ pages }: { pages: IndexedPage[] }) {
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return pages.slice(0, 8);
    return pages.filter((p) => `${p.label} ${p.group}`.toLowerCase().includes(needle)).slice(0, 12);
  }, [q, pages]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Find a page</span>
        <Search size={16} aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a page — try “pricing” or “SPINE”"
          className="w-full border border-rule bg-panel py-3 pl-10 pr-4 text-[15px] text-fg placeholder:text-fg-muted/70 focus:border-accent focus:outline-none"
        />
      </label>
      <p aria-live="polite" className="sr-only">
        {shown.length} pages
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {shown.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className="group flex items-center justify-between gap-3 border border-rule bg-panel px-4 py-3 hover:border-accent">
              <span>
                <span className="block text-[15px] text-fg">{p.label}</span>
                <span className="block text-[11px] uppercase tracking-[0.16em] text-fg-muted">{p.group}</span>
              </span>
              <ArrowRight size={14} aria-hidden="true" className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
        {shown.length === 0 && <li className="text-sm text-fg-muted">No page matches “{q}”.</li>}
      </ul>
    </div>
  );
}
