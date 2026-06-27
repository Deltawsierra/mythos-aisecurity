import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { ADDON_GROUPS, ADDON_PRICING_NOTE } from "@/data/pricing";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING = "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

export function AddOns() {
  return (
    <section
      className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
      aria-labelledby="addons-heading"
    >
      <Container>
        <ScrollReveal className="mb-12 max-w-2xl">
          <p className={EYEBROW}>Add-ons</p>
          <h2 id="addons-heading" className={HEADING}>
            Add scope where the risk surface expands.
          </h2>
          <p className={`${BODY} mb-5`}>
            Add-ons are available for teams that need additional systems,
            workflows, evidence requirements, retest cycles, executive
            briefings, or strategic horizon review.
          </p>
          <p className="border-l-2 border-bronze/40 pl-4 text-sm leading-relaxed text-antique-gold/90">
            {ADDON_PRICING_NOTE}
          </p>
        </ScrollReveal>

        <StaggerReveal className="grid gap-5 lg:grid-cols-3" stagger={0.08}>
          {ADDON_GROUPS.map((group) => (
            <div
              key={group.label}
              className="flex h-full flex-col border border-ivory/8 bg-charcoal p-7"
            >
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
                {group.label}
              </p>
              <ul className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-3 shrink-0 bg-bronze/70"
                      />
                      <span className="text-sm leading-relaxed text-ivory/90">
                        {item.name}
                      </span>
                    </div>
                    {item.note && (
                      <p className="ml-6 mt-2 border-l-2 border-bronze/30 pl-3 text-xs leading-relaxed text-muted-stone/70">
                        {item.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
