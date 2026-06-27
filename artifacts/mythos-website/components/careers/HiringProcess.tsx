import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { HIRING_STEPS } from "@/data/careers";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

export function HiringProcess() {
  return (
    <section
      className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
      aria-labelledby="process-heading"
    >
      <Container>
        <ScrollReveal>
          <div className="mb-12 max-w-xl">
            <p className={EYEBROW}>Hiring process</p>
            <h2 id="process-heading" className={HEADING}>
              How hiring works at Mythos.
            </h2>
            <p className={BODY}>
              A focused, respectful process designed to find signal — for both
              sides — without wasting your time.
            </p>
          </div>
        </ScrollReveal>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIRING_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col border-t-2 border-t-bronze/40 bg-charcoal p-7"
            >
              <span className="mb-4 font-display text-2xl font-normal text-bronze/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-base font-semibold text-ivory">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-stone">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
