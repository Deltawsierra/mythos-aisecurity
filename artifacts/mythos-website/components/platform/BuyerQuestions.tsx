import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

interface Answer {
  question: string;
  answer: string;
  href: string;
  product: string;
}

/**
 * The five buyer questions (Launch Guide P02) as native disclosures: every
 * answer is in the page for search and assistive technology, and each one
 * opens onto the product that does the work.
 */
export function BuyerQuestions({ answers }: { answers: readonly Answer[] }) {
  return (
    <ol className="divide-y divide-rule border-y border-rule" data-reveal-group>
      {answers.map((a, i) => (
        <li key={a.question}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-baseline gap-5 py-5 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-xl text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-display text-[1.7rem] italic leading-tight text-fg sm:text-3xl">{a.question}</span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted sm:block">{a.product}</span>
              <Plus size={20} aria-hidden="true" className="shrink-0 self-center text-accent transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <div className="grid gap-4 pb-6 pl-10 sm:pl-12 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-2xl text-[16px] leading-relaxed text-fg-muted">{a.answer}</p>
              <Link href={a.href} className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Explore {a.product.split(" · ")[0]}
                <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
