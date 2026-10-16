import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import Link from "next/link";
import { ArrowRight, Ban, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { CharacterNiche } from "@/components/scenic/CharacterNiche";
import { PhysicalLoop } from "@/components/platform/PhysicalLoop";
import { LayerSelector } from "@/components/platform/LayerSelector";
import { VModel } from "@/components/platform/VModel";
import { ComponentVsSystem } from "@/components/platform/ComponentVsSystem";
import { EvidenceTimeline } from "@/components/platform/EvidenceTimeline";
import {
  HERMES_COPY,
  HERMES_DOMAINS,
  HERMES_LAYERS,
  HERMES_LOOP,
  HERMES_OUTLINE,
  HERMES_SCOPE,
  HERMES_TRAIL,
  HERMES_VMODEL,
} from "@/content/hermes";
import { OLYMPUS_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "Hermes — Physical AI Assurance",
  description:
    "Hermes extends the Mythos evidence philosophy toward physical AI — starting with vehicles, fleets and over-the-air updates. An early foundation, with no vehicle safety certification or crash-prevention claims.",
  alternates: { canonical: "/platform/hermes/" },
  ...socialImage("platform-hermes", "Physical AI Deserves a Safer Tomorrow — Mythos AI Security"),
};

const SKY = "radial-gradient(ellipse 45% 55% at 40% 55%, rgba(229,197,143,0.42), transparent 70%), radial-gradient(ellipse 35% 45% at 75% 45%, rgba(91,143,199,0.32), transparent 70%)";
const INQUIRY = "/contact?intent=general";
const c = HERMES_COPY;

/** Hermes — Physical AI Assurance. Launch Guide R07 (HE01–HE08). */
export default function HermesPage() {
  return (
    <PageMotion>
      {/* HE01 */}
      <ScenicHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={
          <>
            {c.hero.lede}
            <span className="mt-3 block border-l border-champagne/50 pl-3 text-[15px] text-champagne/90">{c.hero.scope}</span>
          </>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/platform" },
        ]}
        current="Hermes"
        primaryCta={{ label: "Discuss Physical AI Assurance", href: INQUIRY }}
        secondaryCta={{ label: "Explore the Platform", href: "/platform" }}
        planes={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 35%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.viaduct.src, className: "-inset-x-[6%] bottom-[16%] h-[26%]", fit: "contain", position: "50% 100%", depth: 12, drift: 80 },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.5, position: "100% 0%", depth: 10 },
        ]}
        figure={<CharacterNiche project="hermes" glow={SKY} className="absolute bottom-[30%] right-[9%] h-[56%]" />}
        mobileFigure={<CharacterNiche project="hermes" glow={SKY} className="relative mx-auto h-[44svh]" />}
        into="ivory"
      />

      {/* Status: what Hermes is today, and what it will never claim. */}
      <section data-surface="ivory" aria-labelledby="status-title" className="pb-20 pt-10">
        <Container>
          <SectionIntro id="status-title" eyebrow={c.status.eyebrow} title={<Accent text={c.status.title} />} lede={c.status.lede} caps />
          <div className="mt-10 grid gap-3 md:grid-cols-2" data-reveal-group>
            <div className="border-l-2 border-state-stale bg-panel px-5 py-4">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-fg">
                <Check size={13} aria-hidden="true" />
                Today
              </p>
              <ul className="mt-2 grid gap-1.5 text-[15px] text-fg-muted">
                {c.status.today.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="border-l-2 border-state-contradicted bg-panel px-5 py-4">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-fg">
                <Ban size={13} aria-hidden="true" />
                Hermes does not
              </p>
              <ul className="mt-2 grid gap-1.5 text-[15px] text-fg-muted">
                {c.status.never.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* HE02 */}
      <section data-surface="ivory" aria-labelledby="loop-title" className="border-t border-rule pb-24 pt-20">
        <Container>
          <SectionIntro id="loop-title" eyebrow={c.loop.eyebrow} title={<Accent text={c.loop.title} />} lede={c.loop.lede} caps />
          <div className="mt-12">
            <PhysicalLoop stages={HERMES_LOOP} />
          </div>
        </Container>
      </section>

      {/* HE03 */}
      <Scene
        surface="navy"
        labelledBy="layers-title"
        layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="layers-title" eyebrow={c.layers.eyebrow} title={<Accent text={c.layers.title} />} lede={c.layers.lede} caps />
          <div className="mt-12">
            <LayerSelector layers={HERMES_LAYERS} />
          </div>
        </Container>
      </Scene>

      {/* HE04 */}
      <section data-surface="ivory" aria-labelledby="vmodel-title" className="pb-24 pt-8">
        <Container>
          <SectionIntro id="vmodel-title" eyebrow={c.vmodel.eyebrow} title={<Accent text={c.vmodel.title} />} lede={c.vmodel.lede} caps />
          <div className="mt-12" data-reveal>
            <VModel {...HERMES_VMODEL} />
          </div>
          <p className="mt-4 text-sm text-fg-muted">Illustrative. Your lifecycle, gates and standards stay your own.</p>
        </Container>
      </section>

      {/* HE05 */}
      <section data-surface="parchment" aria-labelledby="scope-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="scope-title" eyebrow={c.scope.eyebrow} title={<Accent text={c.scope.title} />} lede={c.scope.lede} caps />
          <div className="mt-12">
            <ComponentVsSystem rows={HERMES_SCOPE} />
          </div>
        </Container>
      </section>

      {/* HE06 */}
      <section data-surface="ivory" aria-labelledby="domains-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="domains-title" eyebrow={c.domains.eyebrow} title={<Accent text={c.domains.title} />} lede={c.domains.lede} caps />
          <ul className="mt-12 grid gap-4 md:grid-cols-3" data-reveal-group>
            {HERMES_DOMAINS.map((d) => (
              <li key={d.name}>
                <Link
                  href={d.href}
                  className="group flex h-full flex-col border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)] transition-[border-color,box-shadow] duration-500 hover:border-antique-gold/60"
                >
                  <span
                    className={
                      d.status === "First focus"
                        ? "self-start border border-state-verified px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-state-verified-ink"
                        : "self-start border border-rule px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted"
                    }
                  >
                    {d.status}
                  </span>
                  <span className="mt-4 font-display text-2xl leading-tight text-fg">{d.name}</span>
                  <span className="mt-2 text-[15px] leading-relaxed text-fg-muted">{d.body}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-accent">
                    {d.link}
                    <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* HE07 */}
      <Scene
        surface="charcoal"
        labelledBy="trail-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.viaduct.src, className: "!object-contain object-[50%_100%] opacity-50", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 75%, rgba(22,26,28,0.78) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="trail-title" eyebrow={c.trail.eyebrow} title={<Accent text={c.trail.title} />} lede={c.trail.lede} caps />
          <EvidenceTimeline events={HERMES_TRAIL} caption="Hypothetical update trail · synthetic" />
        </Container>
      </Scene>

      {/* HE08 */}
      <section data-surface="parchment" aria-labelledby="outline-title" className="pb-16 pt-8">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro id="outline-title" eyebrow={c.outline.eyebrow} title={<Accent text={c.outline.title} />} lede={c.outline.lede} caps />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={INQUIRY} variant="primary" size="md" arrow>
                Discuss Physical AI Assurance
              </Button>
            </div>
          </div>
          <figure className="border border-rule bg-cream p-6 shadow-[0_30px_60px_-40px_rgba(22,26,28,0.55)] sm:p-8">
            <figcaption className="flex items-center justify-between border-b border-rule pb-3">
              <span className="font-display text-lg uppercase tracking-[0.18em] text-fg">Assessment evidence outline</span>
              <span className="border border-state-stale px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-state-stale-ink">Illustrative</span>
            </figcaption>
            <ol className="mt-4 divide-y divide-rule">
              {HERMES_OUTLINE.map((s, i) => (
                <li key={s.name} className="grid grid-cols-[2.5rem_1fr] gap-2 py-3">
                  <span className="font-display text-xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold text-fg">{s.name}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-fg-muted">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 border-t border-rule pt-3 text-xs leading-relaxed text-fg-muted">
              Not a safety case, a certification or a compliance statement. The safety case and every safety decision stay with your team.
            </p>
          </figure>
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="Talk to us about *physical AI.*"
        body="Tell us what you are building or reviewing. We will be clear about what Hermes can and cannot evidence today."
        primary={{ label: "Discuss Physical AI Assurance", href: INQUIRY }}
        secondary={{ label: "Explore the Platform", href: "/platform" }}
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.viaduct.src, className: "!object-contain object-[50%_86%]", parallax: 6, drift: 60 },
          { src: OLYMPUS_MEDIA.sunbeams, blend: "screen", opacity: 0.55, className: "object-[80%_0%]" },
        ]}
      />
    </PageMotion>
  );
}
