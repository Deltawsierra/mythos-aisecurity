import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const TRADITIONAL = [
  "Are there known vulnerabilities?",
  "Are controls configured correctly?",
  "Are secrets exposed?",
  "Are permissions too broad?",
  "Are logs available?",
];

const AI_ASSURANCE = [
  "What can the AI retrieve?",
  "What can the AI do?",
  "Which model route handles the request?",
  "Can the AI be manipulated by retrieved content?",
  "Does it respect user permissions?",
  "Does it escalate correctly?",
  "Can humans verify the output?",
  "What evidence supports deployment?",
];

/**
 * Platform trust-clarity section. Frames AI deployment assurance as an added
 * layer around traditional security review — not a replacement for it.
 */
export function DeploymentAssuranceComparison() {
  return (
    <section
      className="border-b border-ivory/5 bg-charcoal py-20 lg:py-28"
      aria-labelledby="assurance-diff-heading"
    >
      <Container>
        <ScrollReveal className="mb-12 max-w-2xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
            Deployment Assurance
          </p>
          <h2
            id="assurance-diff-heading"
            className="mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl"
          >
            The question is not just &ldquo;is there a vulnerability?&rdquo;
          </h2>
          <p className="text-base leading-relaxed text-muted-stone">
            AI systems introduce a different review problem. A secure application
            can still have an AI workflow that retrieves the wrong data, follows
            hidden instructions, misuses tools, routes sensitive prompts to the
            wrong provider, or produces output that humans trust too easily.
            Mythos looks at the full deployment surface: access, behavior,
            evidence, remediation, and retest.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-2">
          <ScrollReveal x={-24} y={0}>
            <div className="h-full border border-ivory/8 bg-obsidian/50 p-7">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-stone/80">
                Traditional security review may ask
              </p>
              <ul className="flex flex-col gap-3" role="list">
                {TRADITIONAL.map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-stone"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3 shrink-0 bg-muted-stone/50"
                    />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal x={24} y={0}>
            <div
              className="h-full border border-bronze/25 bg-charcoal p-7"
              style={{ boxShadow: "inset 2px 0 0 rgba(166,106,50,0.6)" }}
            >
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-bronze">
                AI deployment assurance also asks
              </p>
              <ul className="flex flex-col gap-3" role="list">
                {AI_ASSURANCE.map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ivory/90"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3 shrink-0 bg-bronze/70"
                    />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal y={16}>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-stone/80">
            Mythos does not replace security review. It adds an AI deployment
            assurance layer around the systems, data, tools, and decisions that
            AI touches.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
