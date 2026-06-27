import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PRICING_FAQ } from "@/data/pricing";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING = "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";

export function PricingFAQ() {
  return (
    <section
      className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
      aria-labelledby="faq-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal>
            <p className={EYEBROW}>FAQ</p>
            <h2 id="faq-heading" className={HEADING}>
              Pricing questions
            </h2>
            <p className="text-base leading-relaxed text-muted-stone">
              Straight answers on scope, packages, add-ons, and the limits of
              what Mythos does and does not claim.
            </p>
          </ScrollReveal>

          <ScrollReveal x={24} y={0}>
            <div className="border-t border-ivory/8">
              {PRICING_FAQ.map((item) => (
                <details
                  key={item.question}
                  className="group border-b border-ivory/8"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60 [&::-webkit-details-marker]:hidden">
                    <span className="text-base font-medium text-ivory">
                      {item.question}
                    </span>
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-bronze transition-transform duration-300 group-open:rotate-180"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-5 pr-9 text-sm leading-relaxed text-muted-stone">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
