import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LoopVideo } from "@/components/media/LoopVideo";
import { CTA_LINKS } from "@/content/navigation";
import { HOME_FINAL_CTA, HOME_PENDING_SECTIONS } from "@/content/home";
import { CTA_MEDIA } from "@/content/media";
import { CTA } from "@/lib/constants";

/** Draft marker for homepage sections later phases still build. */
export function HomePendingSections() {
  return (
    <section data-surface="navy" data-scaffold="home" aria-labelledby="home-pending-title" className="relative pb-20 pt-6">
      <Container>
        <div className="mx-auto max-w-4xl border border-dashed border-rule px-6 py-8 sm:px-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">Draft · v2 prototype</p>
          <h2 id="home-pending-title" className="mt-3 font-display text-2xl text-fg">
            Coming next on this page
          </h2>
          <ol className="mt-5 grid gap-x-8 gap-y-2 text-sm text-fg-muted sm:grid-cols-2">
            {HOME_PENDING_SECTIONS.map((section, index) => (
              <li key={section} className="flex gap-3">
                <span className="font-display text-accent">{String(index + 1).padStart(2, "0")}</span>
                {section}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/**
 * The closing landscape: the Motion V1 Olympus loop with mist drifting across
 * it, rising out of the navy above and settling into the footer below.
 */
export function FinalCta() {
  return (
    <section
      data-surface="obsidian"
      aria-labelledby="final-cta-title"
      className="relative isolate flex min-h-[86vh] items-center overflow-hidden"
    >
      <LoopVideo
        poster={CTA_MEDIA.poster.src}
        sources={[
          { src: CTA_MEDIA.loopWebm, type: "video/webm" },
          { src: CTA_MEDIA.loopMp4, type: "video/mp4" },
        ]}
        mediaClassName="object-[50%_62%]"
      />
      <div className="absolute -inset-6 opacity-60 mix-blend-screen" data-depth="16">
        <LoopVideo overlay poster="" sources={[{ src: CTA_MEDIA.mistOverlay, type: "video/webm" }]} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0b1f33 0%, rgba(11,31,51,0.55) 16%, rgba(5,5,5,0.2) 42%, rgba(5,5,5,0.35) 70%, #0b1f33 100%), radial-gradient(ellipse 55% 45% at 50% 50%, rgba(5,5,5,0.55) 0%, transparent 75%)",
        }}
      />

      <Container className="relative z-10 py-28 text-center" >
        <div className="mx-auto max-w-2xl" data-reveal-group>
          <h2 id="final-cta-title" className="font-display text-5xl leading-[1.02] text-ivory lg:text-6xl">
            {HOME_FINAL_CTA.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/80">{HOME_FINAL_CTA.body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={CTA_LINKS.assessment} variant="primary" size="lg" className="bronze-glow">
              {CTA.PRIMARY}
            </Button>
            <Button href={CTA_LINKS.demo} variant="secondary" size="lg">
              {CTA.DEMO}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
