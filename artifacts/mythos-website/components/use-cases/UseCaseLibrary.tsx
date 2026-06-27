"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  USE_CASES,
  USE_CASE_FILTERS,
  type UseCase,
} from "@/data/useCases";
import { DEEP_DIVE_SLUG_BY_NUMBER } from "@/data/useCaseSlugs";

function DetailList({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze/80">
        {label}
      </p>
      <ul className="flex flex-col gap-1.5" role="list">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-stone"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-px w-3 shrink-0 bg-bronze/60"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function UseCaseDetail({ useCase }: { useCase: UseCase }) {
  return (
    <div
      id={`uc-detail-${useCase.id}`}
      className="mt-6 border-t border-bronze/20 pt-6"
    >
      {useCase.statusNote && (
        <p className="mb-5 border-l-2 border-l-ember/60 bg-obsidian/40 px-4 py-3 text-xs leading-relaxed text-muted-stone/90">
          {useCase.statusNote}
        </p>
      )}

      <div className="mb-6">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze/80">
          Scenario
        </p>
        <p className="text-sm leading-relaxed text-muted-stone">
          {useCase.scenario}
        </p>
      </div>

      <div className="mb-6">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze/80">
          What gets reviewed
        </p>
        <ul className="flex flex-wrap gap-2" role="list">
          {useCase.reviews.map((r) => (
            <li
              key={r}
              className="border border-ivory/10 bg-obsidian/40 px-2.5 py-1 text-[11px] text-muted-stone"
            >
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <DetailList label="Example findings" items={useCase.exampleFindings} />
        <DetailList label="Customer receives" items={useCase.customerReceives} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze/80">
            Projects assigned
          </p>
          <p className="text-sm leading-relaxed text-ivory/90">
            {useCase.projectsAssigned}
          </p>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze/80">
            Decision supported
          </p>
          <p className="text-sm leading-relaxed text-muted-stone">
            {useCase.decisionSupported}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Filterable use-case library. Filter chips narrow the grid by category; each
 * card expands an inline accordion-style detail panel (only one open at a time).
 * No drawer/modal — robust for static export, responsive grids, and keyboard
 * users. Expansion uses aria-expanded / aria-controls.
 */
export function UseCaseLibrary() {
  const [filter, setFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visible =
    filter === "All"
      ? USE_CASES
      : USE_CASES.filter((u) => u.category === filter);

  const selectFilter = (next: string) => {
    setFilter(next);
    // Close an open card if it is filtered out of the new view.
    if (
      expandedId &&
      next !== "All" &&
      !USE_CASES.some((u) => u.id === expandedId && u.category === next)
    ) {
      setExpandedId(null);
    }
  };

  return (
    <div>
      {/* Filter chips */}
      <div
        className="flex flex-wrap gap-2.5"
        role="group"
        aria-label="Filter use cases by category"
      >
        {USE_CASE_FILTERS.map((chip) => {
          const active = filter === chip;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => selectFilter(chip)}
              aria-pressed={active}
              className={cn(
                "border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                active
                  ? "border-bronze bg-bronze/15 text-ivory"
                  : "border-ivory/10 text-muted-stone hover:border-bronze/40 hover:text-ivory",
              )}
            >
              {chip}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-stone/60">
        Showing {visible.length} of {USE_CASES.length} scenarios
      </p>

      {/* Cards */}
      <div className="mt-7 grid items-start gap-5 lg:grid-cols-2">
        {visible.map((useCase) => {
          const open = expandedId === useCase.id;
          const number = String(useCase.number).padStart(2, "0");
          const deepDiveSlug = DEEP_DIVE_SLUG_BY_NUMBER[useCase.number];
          const fullHref = deepDiveSlug ? `/use-cases/${deepDiveSlug}` : null;
          return (
            <article
              key={useCase.id}
              className={cn(
                "flex flex-col border bg-charcoal p-6 transition-colors duration-300",
                open ? "border-bronze/50" : "border-ivory/8 hover:border-bronze/30",
              )}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <span className="font-display text-2xl font-normal leading-none text-bronze/60">
                  {number}
                </span>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <span className="border border-ivory/12 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-stone">
                    {useCase.category}
                  </span>
                  {useCase.status && (
                    <span className="border border-ember/40 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-ember">
                      {useCase.status}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="mb-2.5 font-display text-xl font-normal leading-snug text-ivory">
                {useCase.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-stone">
                {useCase.summary}
              </p>

              <div className="mt-4 flex items-start gap-2.5">
                <TriangleAlert
                  size={15}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-ember/80"
                />
                <p className="text-sm leading-relaxed text-muted-stone/85">
                  <span className="font-semibold text-ivory/80">Risk: </span>
                  {useCase.risk}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-antique-gold">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-antique-gold/80"
                  />
                  {useCase.project}
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setExpandedId(open ? null : useCase.id)}
                    aria-expanded={open}
                    aria-controls={`uc-detail-${useCase.id}`}
                    className="inline-flex items-center gap-1.5 border border-bronze/40 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors duration-200 hover:border-bronze hover:bg-bronze/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                  >
                    {open ? "Hide Scenario" : "Review Scenario"}
                    <ChevronDown
                      size={13}
                      strokeWidth={2}
                      aria-hidden="true"
                      className={cn(
                        "transition-transform duration-200",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                  {fullHref && (
                    <Link
                      href={fullHref}
                      className="inline-flex items-center gap-1.5 border border-bronze/40 bg-bronze/10 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors duration-200 hover:border-bronze hover:bg-bronze/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                      aria-label={`Read full scenario: ${useCase.title}`}
                    >
                      Read Full Scenario
                      <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>

              {open && <UseCaseDetail useCase={useCase} />}
            </article>
          );
        })}
      </div>
    </div>
  );
}
