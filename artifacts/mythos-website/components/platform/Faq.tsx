import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd } from "@/lib/seo";

/** Plain questions and answers on native disclosures — all text stays in the page, mirrored as FAQPage data. */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <>
      <JsonLd data={faqLd(items)} />
      <ul className="divide-y divide-rule border-y border-rule" data-reveal-group>
        {items.map((item) => (
          <li key={item.q}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-2xl leading-snug text-fg">{item.q}</span>
                <Plus size={20} aria-hidden="true" className="mt-1 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-3xl pb-6 text-[16px] leading-relaxed text-fg-muted">{item.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
