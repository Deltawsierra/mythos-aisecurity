import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { PARTNERSHIPS } from "@/content/company";
import { OLYMPUS_MEDIA } from "@/content/media";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Partnerships — Build Trust Together",
  description:
    "How integrators, consultancies, platform vendors, researchers and insurers could work with Mythos — and the independence rules that keep evidence honest. No partners are listed yet.",
  alternates: { canonical: "/partnerships/" },
  ...socialImage("partnerships", "Build Trust Together — Mythos AI Security"),
};

const c = PARTNERSHIPS;
const DISCUSS = { label: "Discuss a Partnership", href: "/contact?intent=partner" };

/** Partnerships — Launch Guide §12 /partnerships. No partners exist, so none are named. */
export default function PartnershipsPage() {
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
        current="Partnerships"
        primaryCta={DISCUSS}
        secondaryCta={{ label: "For Integrators & Vendors", href: "/solutions/integrators-vendors" }}
        planes={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 55%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.waterfallCliffs.src, className: "-left-[6%] bottom-[10%] h-[52%] w-[44%] -scale-x-100", fit: "contain", position: "0% 100%", depth: 10, desktopOnly: true },
          { src: OLYMPUS_MEDIA.viaduct.src, className: "inset-x-[-6%] bottom-[12%] h-[30%]", fit: "contain", position: "50% 100%", depth: 12 },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.45, position: "100% 0%", depth: 10 },
        ]}
        copySide="right"
        into="ivory"
      />

      {/* Kinds of partnership */}
      <section data-surface="ivory" aria-labelledby="types-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="types-title" eyebrow={c.types.eyebrow} title={<Accent text={c.types.title} />} lede={c.types.lede} caps />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {c.types.items.map((t) => (
              <li key={t.name} className="flex flex-col border border-rule bg-panel p-6">
                <span
                  className={cn(
                    "self-start border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]",
                    t.status === "Planned" ? "border-state-stale text-state-stale-ink" : "border-rule text-fg-muted",
                  )}
                >
                  {t.status}
                </span>
                <p className="mt-3 font-display text-2xl leading-tight text-fg">{t.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{t.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Independence rules */}
      <Scene
        surface="charcoal"
        labelledBy="rules-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.viaduct.src, className: "!object-contain object-[50%_100%] opacity-45", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 75%, rgba(22,26,28,0.78) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="rules-title" eyebrow={c.rules.eyebrow} title={<Accent text={c.rules.title} />} caps />
          <ul className="grid gap-3" data-reveal-group>
            {c.rules.items.map((r) => (
              <li key={r} className="flex items-start gap-3 border border-rule bg-panel px-5 py-4 text-[15px] leading-relaxed text-fg">
                <ShieldCheck size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-champagne" />
                {r}
              </li>
            ))}
          </ul>
        </Container>
      </Scene>

      {/* How it starts */}
      <section data-surface="parchment" aria-labelledby="start-title" className="pb-16 pt-8">
        <Container>
          <SectionIntro id="start-title" eyebrow={c.start.eyebrow} title={<Accent text={c.start.title} />} caps />
          <ol className="mt-12 grid gap-3 md:grid-cols-3" data-reveal-group>
            {c.start.steps.map((s, i) => (
              <li key={s.name} className="border border-rule bg-panel p-6">
                <span className="font-display text-3xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-2xl text-fg">{s.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="Build trust *into what you deliver.*"
        primary={DISCUSS}
        secondary={{ label: "About Mythos", href: "/company" }}
        layers={[
          { src: OLYMPUS_MEDIA.panorama.src, className: "object-[55%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.sunrays, blend: "screen", opacity: 0.6, className: "object-[55%_45%]" },
        ]}
      />
    </PageMotion>
  );
}
