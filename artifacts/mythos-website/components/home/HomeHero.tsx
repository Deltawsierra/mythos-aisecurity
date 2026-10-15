import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LoopVideo } from "@/components/media/LoopVideo";
import { CTA_LINKS } from "@/content/navigation";
import { HOME_HERO } from "@/content/home";
import { HERO_MEDIA } from "@/content/media";
import { CTA } from "@/lib/constants";

/**
 * Homepage hero. Depth planes, back to front: the Athena temple loop (poster
 * paints first), a warm light layer, readability scrims, gold dust. Copy sits
 * just right of the Athena statue so she guards the message. Entrance is pure
 * CSS so nothing above the fold waits on JavaScript.
 */
export function HomeHero() {
  return (
    <section
      data-surface="obsidian"
      aria-labelledby="home-hero-title"
      className="relative isolate -mt-16 flex min-h-[100svh] flex-col overflow-hidden lg:-mt-20"
    >
      <div className="absolute -inset-6" data-depth="10">
        <LoopVideo
          eager
          poster={HERO_MEDIA.poster.src}
          sources={[
            { src: HERO_MEDIA.loopWebm, type: "video/webm" },
            { src: HERO_MEDIA.loopMp4, type: "video/mp4" },
          ]}
          mediaClassName="object-[22%_50%] lg:object-[30%_50%]"
        />
      </div>
      <div className="absolute -inset-6 opacity-70 mix-blend-screen" data-depth="20">
        <LoopVideo
          overlay
          poster=""
          sources={[{ src: HERO_MEDIA.lightOverlay, type: "video/webm" }]}
          mediaClassName="object-[30%_50%]"
        />
      </div>

      {/* Readability: a column of shade behind the copy that leaves Athena lit,
          a soft top for the header, and a fall into the abyss below. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            // The downward fade is listed first so it paints on top: the
            // hero must end on exactly the abyss colour the next blend starts on.
            "linear-gradient(180deg, rgba(5,5,5,0.7) 0%, rgba(8,18,28,0) 20%, rgba(8,18,28,0) 52%, rgba(8,18,28,0.55) 76%, #08121c 100%), linear-gradient(90deg, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.62) 20%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.08) 76%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/overlays/gold-dust.webp"
        alt=""
        aria-hidden="true"
        data-depth="32"
        className="pointer-events-none absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] object-cover opacity-70 mix-blend-screen"
      />

      <Container className="relative z-10 flex flex-1 items-center pb-12 pt-32 lg:pt-36">
        <div className="max-w-[42rem] lg:ml-[clamp(0px,11vw,190px)]">
          <p
            className="hero-rise mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-antique-gold"
            style={{ animationDelay: "120ms" }}
          >
            <span aria-hidden="true" className="h-px w-10 bg-antique-gold/70" />
            {HOME_HERO.eyebrow}
          </p>
          <h1
            id="home-hero-title"
            className="hero-rise font-display text-[3.4rem] leading-[0.98] text-ivory sm:text-7xl lg:text-[5.6rem]"
            style={{ animationDelay: "240ms" }}
          >
            {HOME_HERO.headline}
          </h1>
          <p
            className="hero-rise mt-8 max-w-xl text-lg leading-relaxed text-ivory/80"
            style={{ animationDelay: "420ms" }}
          >
            {HOME_HERO.body}
          </p>
          <div className="hero-rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: "560ms" }}>
            <Button href={CTA_LINKS.assessment} variant="primary" size="lg" className="bronze-glow">
              {CTA.PRIMARY}
            </Button>
            <Button href="/platform" variant="secondary" size="lg">
              {CTA.PLATFORM}
            </Button>
          </div>
        </div>
      </Container>

      {/* The five questions — the bridge into the challenge below. */}
      <div className="hero-rise relative z-10" style={{ animationDelay: "800ms" }}>
        <div className="mythos-rule" aria-hidden="true" />
        <Container>
          <ol className="grid grid-cols-1 gap-x-6 gap-y-3 py-7 sm:grid-cols-2 lg:flex lg:items-baseline lg:justify-between">
            {HOME_HERO.questions.map((question, index) => (
              <li key={question} className="flex items-baseline gap-3">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-bronze-bright">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl italic text-ivory/90">{question}</span>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}
