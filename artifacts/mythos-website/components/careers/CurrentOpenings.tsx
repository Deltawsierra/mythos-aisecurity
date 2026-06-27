import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { JOB_OPENINGS } from "@/data/careers";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

export function CurrentOpenings() {
  const hasOpenings = JOB_OPENINGS.length > 0;

  return (
    <section
      id="current-openings"
      className="scroll-mt-24 border-b border-ivory/5 bg-graphite py-20 lg:py-28"
      aria-labelledby="openings-heading"
    >
      <Container>
        <ScrollReveal>
          <div className="mb-12 max-w-xl">
            <p className={EYEBROW}>Current openings</p>
            <h2 id="openings-heading" className={HEADING}>
              Open roles at Mythos.
            </h2>
            <p className={BODY}>
              Mythos hires deliberately and posts roles as they open. When there
              are none listed, the Open Talent application below is the way in.
            </p>
          </div>
        </ScrollReveal>

        {hasOpenings ? (
          <StaggerReveal className="flex flex-col gap-4">
            {JOB_OPENINGS.map((role) => (
              <div
                key={role.id}
                className="flex flex-col gap-4 border border-ivory/8 bg-charcoal p-7 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="mb-1 font-display text-xl font-normal text-ivory">
                    {role.title}
                  </h3>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-bronze/80">
                    {role.team} · {role.location} · {role.type}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-stone">
                    {role.summary}
                  </p>
                </div>
                <div className="shrink-0">
                  <Button href="#open-talent" variant="secondary" size="md">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </StaggerReveal>
        ) : (
          <ScrollReveal>
            <div className="mx-auto max-w-2xl border border-bronze/25 bg-charcoal p-8 text-center lg:p-10">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-bronze">
                No open roles right now
              </p>
              <h3 className="mb-4 font-display text-2xl font-normal leading-tight text-ivory">
                We're not actively hiring for a specific role today.
              </h3>
              <p className={`${BODY} mx-auto mb-8 max-w-md`}>
                But we are always interested in exceptional people. Introduce
                yourself through Open Talent and we will reach out if there is a
                fit — now or down the line.
              </p>
              <Button href="#open-talent" variant="primary" size="lg">
                Apply to Open Talent
              </Button>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}
