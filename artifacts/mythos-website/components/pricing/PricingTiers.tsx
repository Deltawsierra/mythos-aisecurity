import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { TIERS } from "@/data/pricing";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING = "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

export function PricingTiers() {
  return (
    <section
      className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
      aria-labelledby="tiers-heading"
    >
      <Container>
        <ScrollReveal className="mb-12 max-w-2xl">
          <p className={EYEBROW}>Packages</p>
          <h2 id="tiers-heading" className={HEADING}>
            Recurring assurance packages for growing AI deployment needs.
          </h2>
          <p className={BODY}>
            Recurring packages support teams that need ongoing review as AI
            systems change through new models, prompts, data sources, tools,
            vendors, permissions, workflows, and deployment stages.
          </p>
        </ScrollReveal>

        <StaggerReveal
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          stagger={0.08}
        >
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="flex h-full flex-col border border-ivory/8 bg-charcoal p-7 transition-colors duration-300 hover:border-bronze/40"
            >
              <h3 className="font-display text-2xl font-normal text-ivory">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mt-4 mb-6">
                {tier.startingAt && (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-bronze/70">
                    Starting at
                  </p>
                )}
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-normal text-antique-gold">
                    {tier.price}
                  </span>
                  {tier.cadence && (
                    <span className="text-sm text-muted-stone">
                      {tier.cadence}
                    </span>
                  )}
                </p>
              </div>

              <p className="mb-6 border-l-2 border-bronze/40 pl-4 text-sm leading-relaxed text-muted-stone">
                <span className="font-semibold text-ivory">Best for:</span>{" "}
                {tier.bestFor}
              </p>

              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze/70">
                Includes
              </p>
              <ul className="mb-6 flex flex-col gap-2.5">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-stone"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-2.5 shrink-0 bg-bronze/70"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-stone/50">
                Good for
              </p>
              <ul className="mb-8 flex flex-wrap gap-2">
                {tier.goodFor.map((item) => (
                  <li
                    key={item}
                    className="border border-ivory/8 bg-obsidian/60 px-2.5 py-1 text-[11px] leading-snug text-muted-stone/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button
                  href={tier.cta.href}
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  {tier.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </StaggerReveal>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-stone/70">
          Every package begins with a scoped conversation. Published prices are
          starting points — final scope depends on the AI systems, workflows,
          and evidence requirements involved.
        </p>
      </Container>
    </section>
  );
}
