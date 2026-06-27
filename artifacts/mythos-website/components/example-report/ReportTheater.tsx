"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { REPORT_PAGES } from "@/data/exampleReport";

const pad = (n: number) => String(n).padStart(2, "0");
const TOTAL = REPORT_PAGES.length;

/**
 * Scroll-driven "report theater". On desktop the right column is a vertical
 * stack of all 12 report pages and the left column is sticky, updating its
 * explanation to match the page currently crossing the viewport center (tracked
 * with IntersectionObserver — no fragile GSAP pinning). On mobile it falls back
 * to stacked image-first cards. An accessible lightbox provides the "open
 * larger" view with keyboard navigation. Honors prefers-reduced-motion.
 */
export function ReportTheater() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  // Track which page is at the viewport center to drive the sticky panel.
  useEffect(() => {
    const nodes = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index ?? "0",
            );
            setActive(idx);
          }
        });
      },
      // Bias the "active" band to the vertical center of the viewport so
      // exactly one page is considered active at a time.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, idx));
      const node = sectionRefs.current[clamped];
      if (node) {
        node.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "center",
        });
      }
      setActive(clamped);
    },
    [reduced],
  );

  const current = REPORT_PAGES[active];

  return (
    <div className="relative">
      {/* Small, persistent fictional-data label near the viewer. */}
      <p className="mb-6 inline-flex items-center gap-2 border border-bronze/25 bg-obsidian/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-bronze/90">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-bronze"
        />
        Sample report — fictional data for demonstration only
      </p>

      {/* ── Desktop: sticky explanation + scrolling page stack ── */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:gap-14">
        <div className="relative">
          <div className="sticky top-28">
            <StickyPanel
              active={active}
              onPrev={() => goTo(active - 1)}
              onNext={() => goTo(active + 1)}
              onOpen={() => setLightbox(active)}
            />
            <PageRail active={active} onSelect={goTo} />
          </div>
        </div>

        <ol className="flex flex-col gap-20" aria-label="Report pages">
          {REPORT_PAGES.map((p, i) => (
            <li
              key={p.id}
              id={`report-page-${p.page}`}
              data-index={i}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="scroll-mt-28"
            >
              <ReportFrame
                index={i}
                active={i === active}
                onOpen={() => setLightbox(i)}
                eager={i === 0}
              />
            </li>
          ))}
        </ol>
      </div>

      {/* ── Mobile / tablet: stacked image-first cards ── */}
      <ol className="flex flex-col gap-12 lg:hidden" aria-label="Report pages">
        {REPORT_PAGES.map((p, i) => (
          <li key={p.id} id={`report-page-m-${p.page}`} className="scroll-mt-24">
            <MobileCard index={i} onOpen={() => setLightbox(i)} eager={i === 0} />
          </li>
        ))}
      </ol>

      {lightbox !== null && (
        <Lightbox
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={(idx) =>
            setLightbox(Math.max(0, Math.min(TOTAL - 1, idx)))
          }
          reduced={reduced}
        />
      )}

      {/* Screen-reader live region announcing the active page on desktop. */}
      <p className="sr-only" aria-live="polite">
        Showing page {current.page} of {TOTAL}: {current.title}
      </p>
    </div>
  );
}

/* ── Sticky explanation panel (desktop) ───────────────────── */
function StickyPanel({
  active,
  onPrev,
  onNext,
  onOpen,
}: {
  active: number;
  onPrev: () => void;
  onNext: () => void;
  onOpen: () => void;
}) {
  const p = REPORT_PAGES[active];
  const progress = ((active + 1) / TOTAL) * 100;

  return (
    <div className="border border-bronze/20 bg-charcoal/60 p-6 backdrop-blur-sm">
      <span
        aria-hidden="true"
        className="mb-5 block h-px w-full bg-gradient-to-r from-transparent via-bronze/50 to-transparent"
      />
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-bronze">
          {p.label}
        </p>
        <p className="font-display text-sm text-muted-stone">
          <span className="text-ivory">{pad(p.page)}</span> / {pad(TOTAL)}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-px w-full bg-ivory/10" aria-hidden="true">
        <div
          className="h-px bg-bronze transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h3 className="mt-5 font-display text-xl font-normal leading-snug text-ivory">
        {p.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-stone">
        {p.description}
      </p>

      <p className="mt-4 border-l-2 border-bronze/40 pl-3 text-xs leading-relaxed text-ivory/80">
        <span className="font-semibold uppercase tracking-[0.16em] text-bronze/80">
          Useful because{" "}
        </span>
        {p.useful}
      </p>

      <div className="mt-6 flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={active === 0}
          aria-label="Previous page"
          className="inline-flex h-9 w-9 items-center justify-center border border-ivory/15 text-muted-stone transition-colors duration-200 hover:border-bronze/50 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={active === TOTAL - 1}
          aria-label="Next page"
          className="inline-flex h-9 w-9 items-center justify-center border border-ivory/15 text-muted-stone transition-colors duration-200 hover:border-bronze/50 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onOpen}
          className="ml-auto inline-flex items-center gap-1.5 border border-bronze/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-antique-gold transition-colors duration-200 hover:border-bronze hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
        >
          <Maximize2 size={13} aria-hidden="true" />
          Open larger
        </button>
      </div>
    </div>
  );
}

/* ── Compact numbered page rail (desktop jump nav) ────────── */
function PageRail({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <nav className="mt-5" aria-label="Jump to report page">
      <ul className="grid grid-cols-6 gap-1.5">
        {REPORT_PAGES.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Go to page ${p.page}: ${p.title}`}
              aria-current={i === active ? "true" : undefined}
              className={cn(
                "flex h-9 w-full items-center justify-center border text-[11px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                i === active
                  ? "border-bronze bg-bronze/15 text-ivory"
                  : "border-ivory/10 text-muted-stone hover:border-bronze/45 hover:text-ivory",
              )}
            >
              {pad(p.page)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── Large framed report image (desktop stack) ────────────── */
function ReportFrame({
  index,
  active,
  onOpen,
  eager,
}: {
  index: number;
  active: boolean;
  onOpen: () => void;
  eager: boolean;
}) {
  const p = REPORT_PAGES[index];
  return (
    <figure
      className={cn(
        "group relative mx-auto max-w-2xl border bg-obsidian/40 p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] transition-colors duration-500",
        active ? "border-bronze/45" : "border-ivory/10",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.image}
        alt={p.alt}
        width={p.width}
        height={p.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : undefined}
        className="block h-auto w-full"
      />
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open page ${p.page} larger: ${p.title}`}
        className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 border border-bronze/40 bg-obsidian/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-antique-gold opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:border-bronze hover:text-ivory focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60 group-hover:opacity-100"
      >
        <Maximize2 size={12} aria-hidden="true" />
        Larger
      </button>
      <figcaption className="sr-only">
        Page {p.page} of {TOTAL}: {p.title}. {p.description}
      </figcaption>
    </figure>
  );
}

/* ── Mobile stacked card (image first, snippet below) ─────── */
function MobileCard({
  index,
  onOpen,
  eager,
}: {
  index: number;
  onOpen: () => void;
  eager: boolean;
}) {
  const p = REPORT_PAGES[index];
  return (
    <article className="border border-bronze/20 bg-charcoal/50 p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-bronze">
          {p.label}
        </p>
        <p className="font-display text-xs text-muted-stone">
          <span className="text-ivory">{pad(p.page)}</span> / {pad(TOTAL)}
        </p>
      </div>

      <figure className="relative border border-ivory/10 bg-obsidian/40 p-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.alt}
          width={p.width}
          height={p.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full"
        />
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open page ${p.page} larger: ${p.title}`}
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 border border-bronze/40 bg-obsidian/80 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-antique-gold backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
        >
          <Maximize2 size={12} aria-hidden="true" />
          Larger
        </button>
      </figure>

      <h3 className="mt-4 font-display text-lg font-normal leading-snug text-ivory">
        {p.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-stone">
        {p.description}
      </p>
      <p className="mt-3 border-l-2 border-bronze/40 pl-3 text-xs leading-relaxed text-ivory/80">
        <span className="font-semibold uppercase tracking-[0.16em] text-bronze/80">
          Useful because{" "}
        </span>
        {p.useful}
      </p>
    </article>
  );
}

/* ── Accessible lightbox ("open larger") ──────────────────── */
function Lightbox({
  index,
  onClose,
  onNavigate,
  reduced,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (idx: number) => void;
  reduced: boolean;
}) {
  const p = REPORT_PAGES[index];
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Focus management + body scroll lock.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, []);

  // Keyboard: Escape closes, arrows navigate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onNavigate(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onNavigate(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="fixed inset-0 z-[120] flex flex-col bg-obsidian/95 backdrop-blur-sm"
    >
      {/* Click-away backdrop */}
      <button
        type="button"
        aria-label="Close enlarged view"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        tabIndex={-1}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between gap-4 border-b border-ivory/10 px-5 py-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-bronze">
            {p.label} · {pad(p.page)} / {pad(TOTAL)}
          </p>
          <h2
            id={titleId}
            className="truncate font-display text-base font-normal text-ivory"
          >
            {p.title}
          </h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close enlarged view"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-ivory/20 text-muted-stone transition-colors duration-200 hover:border-bronze/50 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Image stage */}
      <div className="relative z-10 flex flex-1 items-center justify-center gap-3 overflow-auto p-4 sm:gap-5 sm:p-6">
        <button
          type="button"
          onClick={() => onNavigate(index - 1)}
          disabled={index === 0}
          aria-label="Previous page"
          className="hidden h-11 w-11 shrink-0 items-center justify-center border border-ivory/20 text-muted-stone transition-colors duration-200 hover:border-bronze/50 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60 disabled:cursor-not-allowed disabled:opacity-30 sm:inline-flex"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.alt}
          width={p.width}
          height={p.height}
          decoding="async"
          className={cn(
            "max-h-full w-auto max-w-full border border-bronze/30 object-contain shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]",
            reduced ? "" : "transition-opacity duration-200",
          )}
        />

        <button
          type="button"
          onClick={() => onNavigate(index + 1)}
          disabled={index === TOTAL - 1}
          aria-label="Next page"
          className="hidden h-11 w-11 shrink-0 items-center justify-center border border-ivory/20 text-muted-stone transition-colors duration-200 hover:border-bronze/50 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60 disabled:cursor-not-allowed disabled:opacity-30 sm:inline-flex"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      {/* Bottom: description + mobile nav */}
      <div className="relative z-10 border-t border-ivory/10 px-5 py-4">
        <p id={descId} className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-stone">
          {p.description}
        </p>
        <div className="mt-3 flex items-center justify-between sm:hidden">
          <button
            type="button"
            onClick={() => onNavigate(index - 1)}
            disabled={index === 0}
            className="inline-flex items-center gap-1.5 border border-ivory/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-stone disabled:opacity-30"
          >
            <ChevronLeft size={14} aria-hidden="true" /> Prev
          </button>
          <button
            type="button"
            onClick={() => onNavigate(index + 1)}
            disabled={index === TOTAL - 1}
            className="inline-flex items-center gap-1.5 border border-ivory/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-stone disabled:opacity-30"
          >
            Next <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-muted-stone/40">
          Sample report — fictional data for demonstration only
        </p>
      </div>
    </div>
  );
}
