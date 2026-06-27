import { Compass, Brain, FileSearch } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { HeroVideo } from "./HeroVideo";

const POINTS = [
  {
    term: "System",
    desc: "Map exposure and data flows",
    Icon: Compass,
  },
  {
    term: "AI",
    desc: "Evaluate behavior and controls",
    Icon: Brain,
  },
  {
    term: "Evidence",
    desc: "Review findings and release decisions",
    Icon: FileSearch,
  },
];

/**
 * /platform hero — a clean cinematic summary section. The shield/spear
 * release-gate loop is the full-section background (with an always-present image
 * fallback for mobile / reduced-motion / no-JS); a left-weighted dark gradient
 * keeps the copy readable while the shield + spear stay visible on the right.
 * Left column only: eyebrow, serif headline (with bronze "system / AI /
 * evidence"), body copy, a glowing horizon divider, and three icon supporting
 * points. No CTA buttons, process row, outcome cards, callouts, or strips.
 */
export function PlatformHero() {
  return (
    <section
      data-section="platform-hero"
      aria-label="Page hero"
      className="relative isolate -mt-16 overflow-hidden border-b border-ivory/5 bg-obsidian lg:-mt-20"
    >
      {/* Full-bleed background: cinematic shield/spear loop + image fallback. */}
      <HeroVideo
        src="/video/platform-release-gate-loop.mp4"
        poster="/images/platform/platform-release-gate-poster.png"
        className="absolute inset-0"
      />

      {/* Desktop: dark on the left, fully transparent by mid-page so the shield
          and spear read clearly on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.86) 24%, rgba(5,5,5,0.55) 44%, rgba(5,5,5,0.18) 60%, rgba(5,5,5,0) 76%)",
        }}
      />
      {/* Mobile/tablet: a gentler all-over scrim so stacked copy stays readable
          while the background art still shows through. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.86) 0%, rgba(5,5,5,0.62) 42%, rgba(5,5,5,0.74) 100%)",
        }}
      />
      {/* Top + bottom cinematic vignette (blends under the header and into the
          next section). */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.5) 0%, transparent 20%, transparent 70%, rgba(5,5,5,0.9) 100%)",
        }}
      />
      {/* Bottom divider glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(166,106,50,0.3) 30%, rgba(166,106,50,0.3) 70%, transparent)",
        }}
      />

      <Container className="relative z-10 flex min-h-[88svh] items-center pt-28 pb-20 lg:min-h-[94vh] lg:pt-32 lg:pb-28">
        <ScrollReveal x={-24} y={0} className="w-full max-w-xl lg:max-w-[36rem]">
          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-icon-small.png"
              alt=""
              width={22}
              height={22}
              aria-hidden="true"
              className="h-5 w-5 shrink-0 opacity-90"
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-bronze">
              The Mythos Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl font-normal leading-[1.1] text-ivory sm:text-5xl lg:text-[3.7rem] lg:leading-[1.08]">
            See the <span className="text-antique-gold">system.</span>
            <br />
            Test the <span className="text-antique-gold">AI.</span>
            <br />
            Review the <span className="text-antique-gold">evidence.</span>
          </h1>

          {/* Body copy */}
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-stone sm:text-lg">
            Mythos helps teams understand system exposure, evaluate AI behavior,
            and make release decisions with evidence before deployment.
          </p>

          {/* Glowing horizon divider */}
          <div
            aria-hidden="true"
            className="my-9 h-px w-full max-w-sm"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(166,106,50,0.5) 25%, rgba(255,200,120,0.9) 50%, rgba(166,106,50,0.5) 75%, transparent 100%)",
              boxShadow: "0 0 14px rgba(214,161,74,0.55)",
            }}
          />

          {/* Supporting points */}
          <dl className="flex flex-col gap-7 sm:flex-row sm:gap-0">
            {POINTS.map(({ term, desc, Icon }, i) => (
              <div
                key={term}
                className={
                  i > 0
                    ? "flex items-start gap-3 sm:flex-1 sm:border-l sm:border-ivory/12 sm:pl-5"
                    : "flex items-start gap-3 sm:flex-1 sm:pr-5"
                }
              >
                <Icon
                  className="mt-0.5 h-6 w-6 shrink-0 text-bronze"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory">
                    {term}
                  </dt>
                  <dd className="mt-1 text-[13px] leading-snug text-muted-stone">
                    {desc}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </Container>
    </section>
  );
}
