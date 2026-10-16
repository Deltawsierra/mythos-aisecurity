import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accent, plain } from "@/components/ui/Headline";
import { CloudBank } from "@/components/scenic/Scene";
import { CTA_LINKS } from "@/content/navigation";
import { HOME_HERO } from "@/content/home";
import { OLYMPUS_MEDIA } from "@/content/media";
import { CTA } from "@/lib/constants";

/**
 * H01 — the guardian above Olympus (Launch Guide S00). The poster paints
 * first; the headline rises in CSS so nothing waits on JavaScript; clouds and
 * light drift only after settle. Depth planes, back to front: the marble city,
 * sun shafts, a dramatic sky shade that carries the copy, Athena, then a
 * sunlit cloud bank that dissolves into the Challenge's ivory stone.
 */
export function HomeHero() {
  return (
    <section
      data-surface="charcoal"
      aria-labelledby="home-hero-title"
      className="relative isolate -mt-16 flex min-h-[100svh] flex-col overflow-hidden lg:-mt-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-[3%]" data-depth="8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={OLYMPUS_MEDIA.marbleCity.src}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-[66%_40%] lg:object-[60%_42%]"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={OLYMPUS_MEDIA.sunrays}
          alt=""
          data-depth="16"
          className="absolute -inset-[3%] h-[106%] w-[106%] max-w-none object-cover opacity-60 mix-blend-screen"
        />
        {/* A storm-dark sky over the copy, as on plate R01; the lower world stays lit. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,21,23,0.9) 0%, rgba(18,21,23,0.62) 24%, rgba(18,21,23,0.22) 50%, rgba(18,21,23,0) 62%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 68% 40%, rgba(18,21,23,0.74) 0%, rgba(18,21,23,0.46) 55%, transparent 85%)",
          }}
        />
        {/* The guardian: desktop stands her left of the copy. */}
        <div className="absolute bottom-[7%] left-[1%] hidden h-[90%] lg:block xl:left-[4%]" data-depth="22">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={OLYMPUS_MEDIA.athena.src}
            alt=""
            className="hero-rise h-full w-auto max-w-none drop-shadow-[0_30px_50px_rgba(18,21,23,0.55)]"
            style={{ animationDelay: "160ms" }}
          />
        </div>
        <CloudBank edge={{ into: "ivory", height: "28%" }} at="bottom" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/overlays/gold-dust.webp"
          alt=""
          data-depth="30"
          className="absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] max-w-none object-cover opacity-60 mix-blend-screen"
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col pt-28 lg:pb-[30vh] lg:pt-[clamp(7.5rem,15vh,10rem)]">
        <div className="max-w-[36rem] lg:ml-auto lg:mr-[2%] lg:max-w-[38rem] xl:max-w-[42rem]">
          <p
            className="hero-rise mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne"
            style={{ animationDelay: "120ms" }}
          >
            <span aria-hidden="true" className="h-px w-10 bg-champagne/70" />
            {HOME_HERO.eyebrow}
          </p>
          <h1
            id="home-hero-title"
            aria-label={plain(HOME_HERO.headline)}
            className="hero-rise display-caps font-display text-[2.6rem] text-ivory drop-shadow-[0_4px_24px_rgba(18,21,23,0.55)] sm:text-[3.4rem] lg:text-[clamp(3rem,min(4.6vw,7.4vh),4.4rem)]"
            style={{ animationDelay: "240ms" }}
          >
            <Accent text={HOME_HERO.headline} />
          </h1>
          <p
            className="hero-rise mt-6 border-l border-champagne/50 pl-4 text-[15px] leading-relaxed text-ivory/90"
            style={{ animationDelay: "380ms" }}
          >
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.26em] text-champagne">
              {HOME_HERO.category}
            </span>
            {HOME_HERO.proofline}
          </p>
          <p className="hero-rise mt-5 max-w-[34rem] text-base leading-relaxed text-ivory/85" style={{ animationDelay: "460ms" }}>
            {HOME_HERO.body}
          </p>
          <div className="hero-rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: "560ms" }}>
            <Button href={CTA_LINKS.demo} variant="primary" size="lg" arrow>
              {CTA.DEMO}
            </Button>
            <Button href="/platform" variant="secondary" size="lg">
              {CTA.PLATFORM}
            </Button>
          </div>
        </div>

        {/* Phones and tablets: the guardian stands beneath the copy, feet in the clouds. */}
        <div aria-hidden="true" className="relative -mx-6 mt-6 h-[54svh] overflow-hidden lg:hidden">
          {/* Anchored at the head and cropped below the knee: she stands in the clouds. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={OLYMPUS_MEDIA.athena.src}
            alt=""
            className="absolute left-1/2 top-0 h-[124%] w-auto max-w-none -translate-x-1/2 drop-shadow-[0_24px_40px_rgba(18,21,23,0.5)]"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[38%]"
            style={{ background: "linear-gradient(0deg, #ede4d5 0%, rgba(232,220,200,0.92) 30%, rgba(232,220,200,0.45) 65%, rgba(232,220,200,0) 100%)" }}
          />
        </div>
      </Container>

      {/* A quiet ladder of what the guardian protects (decorative). */}
      <ul
        aria-hidden="true"
        className="hero-rise absolute right-6 top-[30%] z-10 hidden flex-col gap-2 border-l border-champagne/40 pl-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-ivory/70 2xl:flex"
        style={{ animationDelay: "900ms" }}
      >
        {HOME_HERO.ladder.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
