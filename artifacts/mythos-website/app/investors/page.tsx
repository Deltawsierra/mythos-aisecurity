import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { FlaskConical } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { MaturityList } from "@/components/company/MaturityList";
import { INVESTORS } from "@/content/company";
import { BACKDROPS, OLYMPUS_MEDIA, SCENES, scenePlanes } from "@/content/media";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Investors: The AI Assurance Layer",
  description:
    "The thesis behind Mythos AI Security: deployment assurance as a category, one consequential workflow as the wedge, and evidence that survives change as the moat.",
  alternates: { canonical: "/investors/" },
  ...socialImage("investors", "Building the Assurance Layer for Operational AI — Mythos AI Security"),
};

const c = INVESTORS;
const CONVERSATION = { label: "Request an Investor Conversation", href: "/contact?intent=investor" };

/** Investors — Launch Guide §12 /investors. No fundraising figures. */
export default function InvestorsPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={c.hero.lede}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
        ]}
        current="Investors"
        primaryCta={CONVERSATION}
        secondaryCta={{ label: "Explore the Platform", href: "/platform" }}
        planes={scenePlanes(SCENES.investors, "60% 50%")}
        into="ivory"
      />

      {/* Category */}
      <section data-surface="ivory" aria-labelledby="category-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="category-title" eyebrow={c.category.eyebrow} title={<Accent text={c.category.title} />} lede={c.category.lede} caps />
          <ul className="mt-12 grid gap-3 lg:grid-cols-3" data-reveal-group>
            {c.category.items.map((item) => {
              const ours = "ours" in item && item.ours;
              return (
                <li key={item.name} className={cn("border p-6", ours ? "border-antique-gold bg-panel shadow-[0_30px_60px_-40px_rgba(22,26,28,0.55)]" : "border-rule")}>
                  {ours && <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Where Mythos AI Security sits</span>}
                  <p className={cn("font-display text-2xl text-fg", ours && "mt-2")}>{item.name}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Thesis */}
      <section data-surface="parchment" aria-labelledby="thesis-title" className="py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="thesis-title" eyebrow={c.thesis.eyebrow} title={<Accent text={c.thesis.title} />} caps />
          <ol className="relative grid gap-4 border-l border-accent/40 pl-8" data-reveal-group>
            {c.thesis.items.map((t, i) => (
              <li key={t.name} className="relative">
                <span aria-hidden="true" className="absolute -left-[2.45rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-panel font-display text-sm text-accent">
                  {i + 1}
                </span>
                <p className="font-display text-2xl leading-tight text-fg">{t.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{t.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Maturity */}
      <Scene
        surface="navy"
        labelledBy="maturity-title"
        layers={[{ src: BACKDROPS.a.src, mobileSrc: BACKDROPS.a.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="maturity-title" eyebrow="Where things stand" title={<Accent text="The product, *at its real maturity.*" />} lede="Built, in development, specified or exploratory — the same labels each product page uses." caps />
          <div className="mt-12">
            <MaturityList />
          </div>
        </Container>
      </Scene>

      {/* Moat as hypotheses + what we share */}
      <section data-surface="ivory" aria-labelledby="moat-title" className="pb-16 pt-8">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionIntro id="moat-title" eyebrow={c.moat.eyebrow} title={<Accent text={c.moat.title} />} lede={c.moat.lede} caps />
            <ul className="mt-8 grid gap-2.5" data-reveal-group>
              {c.moat.items.map((m) => (
                <li key={m} className="flex items-center gap-3 border border-rule bg-panel px-4 py-3">
                  <span className="inline-flex shrink-0 items-center gap-1.5 border border-state-stale px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-state-stale-ink">
                    <FlaskConical size={11} aria-hidden="true" />
                    Hypothesis
                  </span>
                  <span className="text-[15px] text-fg">{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pt-24">
            <div className="border border-antique-gold/50 bg-panel p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{c.share.eyebrow}</p>
              <p className="mt-3 font-display text-3xl leading-tight text-fg">
                <Accent text={c.share.title} />
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{c.share.body}</p>
            </div>
          </div>
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="Talk to us *about the thesis.*"
        primary={CONVERSATION}
        secondary={{ label: "About Mythos AI Security", href: "/company" }}
        vista="c"
      />
    </PageMotion>
  );
}
