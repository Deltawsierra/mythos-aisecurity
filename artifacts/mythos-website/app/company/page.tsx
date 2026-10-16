import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { MaturityList } from "@/components/company/MaturityList";
import { COMPANY } from "@/content/company";
import { OLYMPUS_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "Company — Built to Put Evidence Behind Ambition",
  description:
    "Why Mythos exists, the principles behind its evidence, where each product stands today, and how Mythos works with the people it tests for.",
  alternates: { canonical: "/company/" },
  ...socialImage("company", "Built to Put Evidence Behind Ambition — Mythos AI Security"),
};

const c = COMPANY;

/** Company — Launch Guide §12 /company. */
export default function CompanyPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={c.hero.lede}
        breadcrumbs={[{ label: "Home", href: "/" }]}
        current="Company"
        primaryCta={{ label: "Explore the Platform", href: "/platform" }}
        secondaryCta={{ label: "Get in Touch", href: "/contact" }}
        planes={[
          { src: OLYMPUS_MEDIA.marbleCity.src, className: "-inset-[3%]", position: "80% 35%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.5, position: "100% 0%", depth: 10 },
        ]}
        into="ivory"
      />

      {/* Mission */}
      <section data-surface="ivory" aria-labelledby="mission-title" className="pb-24 pt-10">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro id="mission-title" eyebrow={c.mission.eyebrow} title={<Accent text={c.mission.title} />} caps />
          <div className="grid content-start gap-5 text-lg leading-relaxed text-fg lg:pt-10" data-reveal-group>
            {c.mission.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section data-surface="parchment" aria-labelledby="principles-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="principles-title" eyebrow={c.principles.eyebrow} title={<Accent text={c.principles.title} />} lede={c.principles.lede} caps />
          <ol className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {c.principles.items.map((p, i) => (
              <li key={p.name} className="border border-rule bg-panel p-6">
                <span className="font-display text-3xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-2xl leading-tight text-fg">{p.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Products at their real maturity */}
      <Scene
        surface="navy"
        labelledBy="products-title"
        layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="products-title" eyebrow={c.products.eyebrow} title={<Accent text={c.products.title} />} lede={c.products.lede} caps />
          <div className="mt-12">
            <MaturityList />
          </div>
        </Container>
      </Scene>

      {/* How we work */}
      <section data-surface="ivory" aria-labelledby="work-title" className="pb-24 pt-8">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="work-title" eyebrow={c.work.eyebrow} title={<Accent text={c.work.title} />} caps />
          <ul className="grid gap-3 sm:grid-cols-2" data-reveal-group>
            {c.work.items.map((w) => (
              <li key={w.name} className="border-l-2 border-accent/60 bg-panel px-5 py-4">
                <p className="font-display text-xl text-fg">{w.name}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{w.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Relationships */}
      <section data-surface="parchment" aria-labelledby="connect-title" className="pb-16 pt-24">
        <Container>
          <SectionIntro id="connect-title" eyebrow={c.relationships.eyebrow} title={<Accent text={c.relationships.title} />} caps />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {c.relationships.items.map((r) => (
              <li key={r.name}>
                <Link href={r.href} className="group flex h-full flex-col border border-rule bg-panel p-6 transition-colors hover:border-antique-gold/60">
                  <span className="font-display text-2xl text-fg">{r.name}</span>
                  <span className="mt-2 text-[15px] leading-relaxed text-fg-muted">{r.body}</span>
                  <span className="mt-auto pt-4 text-accent">
                    <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="Put evidence *behind your next AI decision.*"
        secondary={{ label: "Explore the Platform", href: "/platform" }}
        layers={[
          { src: OLYMPUS_MEDIA.panorama.src, className: "object-[55%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.sunrays, blend: "screen", opacity: 0.6, className: "object-[55%_45%]" },
        ]}
      />
    </PageMotion>
  );
}
