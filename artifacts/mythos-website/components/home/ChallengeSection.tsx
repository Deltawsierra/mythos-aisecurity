import { Container } from "@/components/ui/Container";
import { CHALLENGE_MEDIA } from "@/content/media";
import { HOME_CHALLENGE } from "@/content/home";

const RISK_ICON: Record<(typeof HOME_CHALLENGE.risks)[number]["id"], string> = {
  "rapid-adoption": CHALLENGE_MEDIA.riskIcons.rapidAdoption,
  "attack-surfaces": CHALLENGE_MEDIA.riskIcons.attackSurfaces,
  "higher-stakes": CHALLENGE_MEDIA.riskIcons.higherStakes,
  "growing-uncertainty": CHALLENGE_MEDIA.riskIcons.growingUncertainty,
};

/**
 * The Challenge: the cracked-marble sculpture in warm daylight. The sky on the
 * left carries the copy under a bone wash; gold cracks light along a card's
 * edge on hover (decoration only — no content depends on it). The art drifts slowly against the scroll.
 */
export function ChallengeSection() {
  return (
    <section
      data-surface="bone"
      aria-labelledby="challenge-title"
      className="relative isolate overflow-hidden"
    >
      {/* Tablet/desktop art: the sculpture fills the section behind the copy. */}
      <div aria-hidden="true" className="absolute inset-0 hidden md:block">
        <div className="absolute inset-x-0 -inset-y-[8%]" data-parallax="4">
          <picture>
            <source media="(min-width: 1280px)" srcSet={CHALLENGE_MEDIA.desktopTextSafe.src} />
            <source media="(min-width: 768px)" srcSet={CHALLENGE_MEDIA.tablet.src} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CHALLENGE_MEDIA.desktopTextSafe.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover object-[64%_38%]"
            />
          </picture>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(245,240,231,0.97) 0%, rgba(245,240,231,0.9) 30%, rgba(245,240,231,0.45) 50%, rgba(245,240,231,0) 64%), linear-gradient(180deg, #f5f0e7 0%, rgba(245,240,231,0) 16%, rgba(245,240,231,0) 82%, #f5f0e7 100%)",
          }}
        />
      </div>

      {/* Phone art: the portrait crop sits above the copy. */}
      <div aria-hidden="true" className="relative h-[62vh] md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHALLENGE_MEDIA.mobile.src}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[55%_30%]"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #f5f0e7 0%, rgba(245,240,231,0) 22%, rgba(245,240,231,0) 70%, #f5f0e7 100%)" }}
        />
      </div>

      <Container className="relative z-10 pb-24 pt-4 md:py-28 lg:py-36">
        <div className="max-w-xl" data-reveal-group>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
            {HOME_CHALLENGE.eyebrow}
          </p>
          <h2 id="challenge-title" className="font-display text-5xl leading-[1.02] text-fg lg:text-6xl">
            {HOME_CHALLENGE.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-fg-muted">{HOME_CHALLENGE.body}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Where the uncertainty lives">
            {HOME_CHALLENGE.dimensions.map((dimension) => (
              <li
                key={dimension}
                className="border border-rule bg-bone/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-sm"
              >
                {dimension}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-12 grid max-w-2xl gap-3 sm:grid-cols-2" data-reveal-group>
          {HOME_CHALLENGE.risks.map((risk) => (
            <li
              key={risk.id}
              className="risk-card group relative flex gap-4 border border-rule bg-bone/80 p-5 backdrop-blur-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={RISK_ICON[risk.id]}
                alt=""
                aria-hidden="true"
                className="h-12 w-12 shrink-0 transition-[filter] duration-500 group-hover:drop-shadow-[0_0_10px_rgba(214,161,74,0.55)]"
              />
              <div>
                <h3 className="font-display text-xl leading-tight text-fg">{risk.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{risk.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
