import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

interface MythosScenarioSignatureProps {
  variant?: "default" | "graphite";
  className?: string;
}

/**
 * Closing signature block for a full scenario briefing — a quiet, executive
 * sign-off that appears after the write-up and before the final CTA. Reuses the
 * existing site crest asset (no new or placeholder logo). A bronze divider sets
 * it apart like the end of a formal Mythos document.
 */
export function MythosScenarioSignature({
  variant = "default",
  className,
}: MythosScenarioSignatureProps) {
  return (
    <section
      aria-label="Mythos signature"
      className={cn(
        variant === "graphite" ? "bg-graphite" : "bg-obsidian",
        className,
      )}
    >
      <Container>
        <div className="mx-auto max-w-3xl border-t border-bronze/30 py-12 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer-logo.png"
            alt="Mythos AI Security logo"
            width={52}
            height={52}
            style={{ display: "block" }}
            className="mx-auto mb-5 opacity-90"
          />
          <p className="font-display text-lg font-normal text-ivory">
            Mythos AI Security
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-stone">
            Evidence-first AI deployment assurance.
          </p>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-bronze/80">
            Authorized. Scoped. Human-controlled.
          </p>
        </div>
      </Container>
    </section>
  );
}
