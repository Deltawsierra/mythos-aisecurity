import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accent, plain } from "@/components/ui/Headline";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { Scene } from "@/components/scenic/Scene";
import { ClaimInvalidation } from "@/components/home/ClaimInvalidation";
import { AssuranceTeams } from "@/components/home/AssuranceTeams";
import { ExposurePreview } from "@/components/platform/ExposurePreview";
import { ReportPreview } from "@/components/platform/ReportPreview";
import { CTA_LINKS } from "@/content/navigation";
import { OLYMPUS_MEDIA } from "@/content/media";
import { SOLUTION_PAGES } from "@/content/solutions";
import { ENGAGEMENT_STEPS, ENGAGEMENT_NOTE } from "@/data/engagementSteps";
import {
  HOME_CONSEQUENCE,
  HOME_ENGAGE,
  HOME_FINAL,
  HOME_PROOF,
  HOME_SECTORS,
  HOME_TEAMS,
  HOME_TRUTH,
} from "@/content/home";
import { CTA } from "@/lib/constants";

/** H06 — SPINE truth on parchment: the proof surface after the dark reveal. */
export function TruthSection() {
  return (
    <section data-surface="parchment" aria-labelledby="truth-title" className="relative py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionIntro
              id="truth-title"
              eyebrow={HOME_TRUTH.eyebrow}
              title={<Accent text={HOME_TRUTH.headline} />}
              lede={HOME_TRUTH.lede}
              caps
            />
            <Link href="/platform/spine" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              Explore SPINE
              <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div data-reveal>
            <ClaimInvalidation />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** H07 — the four roles in a dusk sky, energy kept to their own lanes. */
export function TeamsSection() {
  return (
    <Scene
      surface="charcoal"
      labelledBy="teams-title"
      layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
      scrim="linear-gradient(180deg, rgba(22,26,28,0.25) 0%, rgba(22,26,28,0.82) 26%, rgba(22,26,28,0.93) 60%, rgba(22,26,28,0.8) 100%)"
      top={{ into: "parchment", height: "clamp(8rem,15vw,15rem)" }}
      bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
      className="pb-[clamp(12rem,18vw,18rem)] pt-[clamp(10rem,18vw,18rem)]"
    >
      <Container>
        <SectionIntro
          id="teams-title"
          align="center"
          eyebrow={HOME_TEAMS.eyebrow}
          title={<Accent text={HOME_TEAMS.headline} />}
          lede={HOME_TEAMS.lede}
          caps
        />
        <div className="mt-12">
          <AssuranceTeams />
        </div>
      </Container>
    </Scene>
  );
}

/** H08 — business consequence: a technical finding becomes a bounded decision. */
export function ConsequenceSection() {
  return (
    <section data-surface="ivory" aria-labelledby="consequence-title" className="relative pb-28 pt-16 lg:pb-32">
      <Container>
        <SectionIntro
          id="consequence-title"
          eyebrow={HOME_CONSEQUENCE.eyebrow}
          title={<Accent text={HOME_CONSEQUENCE.headline} />}
          lede={HOME_CONSEQUENCE.lede}
          caps
        />
        <ol className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="From finding to decision" data-reveal-group>
          {HOME_CONSEQUENCE.chain.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="border border-rule bg-cream px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg">{step}</span>
              {i < HOME_CONSEQUENCE.chain.length - 1 && <ChevronRight size={16} aria-hidden="true" className="text-accent" />}
            </li>
          ))}
        </ol>
        <div className="mt-8" data-reveal>
          <ExposurePreview />
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-muted">
          Illustrative scenario — synthetic data. {HOME_CONSEQUENCE.note}
        </p>
      </Container>
    </section>
  );
}

/** H09 — six sectors, each with its own environment art. */
export function SectorsSection() {
  return (
    <Scene
      surface="ivory"
      labelledBy="sectors-title"
      layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", opacity: 0.55, parallax: 4 }]}
      scrim="linear-gradient(180deg, rgba(237,228,213,0.2) 0%, rgba(237,228,213,0.55) 50%, rgba(237,228,213,0.2) 100%)"
      top={{ into: "ivory", height: "clamp(7rem,14vw,14rem)" }}
      bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
      className="pb-[clamp(9rem,14vw,14rem)] pt-[clamp(9rem,16vw,16rem)]"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionIntro
            id="sectors-title"
            eyebrow={HOME_SECTORS.eyebrow}
            title={<Accent text={HOME_SECTORS.headline} />}
            lede={HOME_SECTORS.lede}
            caps
          />
          <Link href="/solutions" className="group inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold text-accent">
            Explore all industries
            <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6" data-reveal-group>
          {HOME_SECTORS.cards.map((card) => {
            const page = SOLUTION_PAGES.find((s) => s.slug === card.slug)!;
            return (
              <li key={card.slug}>
                <Link
                  href={page.href}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden border border-bronze/30 shadow-[0_26px_50px_-30px_rgba(22,26,28,0.7)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-antique-gold/70"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ objectPosition: card.position }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(18,21,23,0) 35%, rgba(18,21,23,0.92) 100%)" }}
                  />
                  <span className="relative p-4">
                    <span className="block font-display text-xl leading-tight text-ivory">{page.navLabel}</span>
                    <span className="mt-1 block text-xs leading-snug text-ivory/75">{page.navDescription}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-fg-muted">
          Building or integrating AI for others?{" "}
          <Link href="/solutions/integrators-vendors" className="font-semibold text-accent underline-offset-4 hover:underline">
            Systems integrators and AI vendors
          </Link>
        </p>
      </Container>
    </Scene>
  );
}

/** H10 — buyer proof: native synthetic report pages, not screenshots. */
export function ProofSection() {
  return (
    <section data-surface="parchment" aria-labelledby="proof-title" className="relative pb-16 pt-12 lg:pb-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <SectionIntro
              id="proof-title"
              eyebrow={HOME_PROOF.eyebrow}
              title={<Accent text={HOME_PROOF.headline} />}
              lede={HOME_PROOF.lede}
              caps
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/example-report" variant="primary" size="md" arrow>
                {CTA.SAMPLE_REPORT}
              </Button>
              <Button href="/outputs" variant="secondary" size="md">
                What Mythos AI Security produces
              </Button>
            </div>
          </div>
          <ReportPreview />
        </div>
      </Container>
    </section>
  );
}

/** H11 — how engagement starts: four steps, then the next conversation. */
export function EngageSection() {
  return (
    <section data-surface="parchment" aria-labelledby="engage-title" className="relative pb-[clamp(10rem,16vw,14rem)] pt-4">
      <Container>
        <div className="mythos-rule mb-16" aria-hidden="true" />
        <SectionIntro
          id="engage-title"
          eyebrow={HOME_ENGAGE.eyebrow}
          title={<Accent text={HOME_ENGAGE.headline} />}
          lede={HOME_ENGAGE.lede}
          caps
        />
        <ol className="relative mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-bronze/0 via-bronze/60 to-bronze/0 lg:block"
          />
          {ENGAGEMENT_STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-bronze/60 bg-cream font-display text-xl text-accent">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl text-fg">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col gap-5 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
            {ENGAGEMENT_NOTE} Mythos AI Security supplies the evidence; your team keeps every decision.
          </p>
          <Button href={CTA_LINKS.assessment} variant="primary" size="md" arrow className="shrink-0">
            Request an Assessment
          </Button>
        </div>
      </Container>
    </section>
  );
}

/** H12 — the final vista: a calm golden horizon, minimal motion near the CTA. */
export function FinalVista() {
  return (
    <Scene
      surface="charcoal"
      labelledBy="final-title"
      layers={[
        { src: OLYMPUS_MEDIA.panorama.src, className: "object-[50%_45%]", parallax: 4 },
        { src: OLYMPUS_MEDIA.sunrays, blend: "screen", opacity: 0.7, className: "object-[50%_45%]" },
        { src: OLYMPUS_MEDIA.mist, opacity: 0.9, className: "object-[50%_45%]", drift: 50 },
      ]}
      scrim="radial-gradient(ellipse 44% 46% at 50% 60%, rgba(18,21,23,0.64) 0%, rgba(18,21,23,0.34) 60%, rgba(18,21,23,0) 100%), linear-gradient(180deg, rgba(22,26,28,0) 62%, rgba(26,29,31,0.85) 93%, #1a1d1f 100%)"
      top={{ into: "parchment", height: "clamp(9rem,18vw,18rem)" }}
      className="flex min-h-[94vh] items-center"
    >
      <Container className="relative pb-28 pt-[clamp(12rem,20vw,18rem)] text-center lg:pb-36">
        <div className="mx-auto max-w-3xl" data-reveal-group>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/brand/crest.webp"
            loading="lazy"
            alt=""
            aria-hidden="true"
            width={96}
            height={96}
            className="mx-auto h-24 w-24 drop-shadow-[0_10px_30px_rgba(18,21,23,0.6)]"
          />
          <h2
            id="final-title"
            aria-label={plain(HOME_FINAL.headline)}
            className="display-caps mt-6 font-display text-[2.6rem] text-ivory drop-shadow-[0_4px_24px_rgba(18,21,23,0.6)] sm:text-6xl lg:text-7xl"
          >
            <Accent text={HOME_FINAL.headline} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/90">{HOME_FINAL.body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={CTA_LINKS.demo} variant="primary" size="lg" arrow>
              {CTA.DEMO}
            </Button>
            <Button href={CTA_LINKS.assessment} variant="secondary" size="lg">
              Request an Assessment
            </Button>
          </div>
        </div>
      </Container>
    </Scene>
  );
}
