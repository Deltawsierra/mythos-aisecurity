import { ArrowUpRight, Landmark, Plus } from "lucide-react";
import type { Situation } from "@/content/plainEnglish";
import { OpenOnHash } from "./OpenOnHash";

const PARTS: { key: "meaning" | "example" | "examine" | "evidence"; label: string }[] = [
  { key: "meaning", label: "What this means" },
  { key: "example", label: "For example (made up)" },
  { key: "examine", label: "What we would examine" },
  { key: "evidence", label: "What you receive" },
];

/**
 * The five-minute guide: a question per situation on native disclosures, each
 * opening the same five-part answer. All text stays in the page.
 */
export function SituationGuide({ items }: { items: readonly Situation[] }) {
  return (
    <>
      <OpenOnHash />
      <nav aria-label="Jump to a situation" className="flex flex-wrap gap-2">
        {items.map((s) => (
          <a
            key={s.id}
            href={`#situation-${s.id}`}
            className="border border-rule bg-panel px-3 py-1.5 text-[13px] text-fg transition-colors hover:border-antique-gold/70"
          >
            {s.tag}
          </a>
        ))}
      </nav>
      <ul className="mt-8 grid gap-3" data-reveal-group>
        {items.map((s) => (
          <li key={s.id}>
            <details id={`situation-${s.id}`} className="group scroll-mt-28 border border-rule bg-panel open:border-antique-gold/60">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{s.tag}</span>
                  <span className="mt-2 block font-display text-[1.6rem] leading-snug text-fg sm:text-[1.85rem]">{s.question}</span>
                  <span className="mt-1.5 block text-[16px] leading-relaxed text-fg-muted">{s.short}</span>
                </span>
                <Plus size={22} aria-hidden="true" className="mt-6 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <div className="border-t border-rule px-5 pb-6 pt-5 sm:px-6">
                <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
                  {PARTS.map((p) => (
                    <div key={p.key}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{p.label}</dt>
                      <dd className="mt-2 text-[16px] leading-relaxed text-fg">{s[p.key]}</dd>
                    </div>
                  ))}
                </dl>
                {s.ifNot && <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">{s.ifNot}</p>}
                {s.source && (
                  <a href={s.source.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-accent underline-offset-4 hover:underline">
                    {s.source.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
                <div className="mt-6 flex items-start gap-3 border-l-2 border-antique-gold bg-[var(--surface-bg)] px-4 py-3">
                  <Landmark size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  <p className="text-[16px] leading-relaxed text-fg">
                    <span className="font-semibold">Ask the board: </span>
                    {s.board}
                  </p>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
