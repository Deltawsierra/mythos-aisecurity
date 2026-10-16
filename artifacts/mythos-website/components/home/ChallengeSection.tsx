import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { CHALLENGE_MEDIA } from "@/content/media";
import { HOME_CHALLENGE } from "@/content/home";

/**
 * H02 — the Challenge (Launch Guide S01–S03). The cracked-marble guardian in
 * warm daylight on the right; a broad ivory reading field on the left with
 * four native concern cards. The fracture's glow resolves into a slender gold
 * line that carries down into the causeway below.
 */
export function ChallengeSection() {
  return (
    <section data-surface="ivory" aria-labelledby="challenge-title" className="relative isolate overflow-hidden">
      {/* Tablet/desktop art: the sculpture fills the section behind the copy. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden md:block">
        <div className="absolute inset-x-0 -inset-y-[8%]" data-parallax="4">
          <picture>
            <source media="(min-width: 1280px)" srcSet={CHALLENGE_MEDIA.desktopTextSafe.src} />
            <source media="(min-width: 768px)" srcSet={CHALLENGE_MEDIA.tablet.src} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CHALLENGE_MEDIA.desktopTextSafe.src} alt="" loading="lazy" className="h-full w-full object-cover object-[64%_38%]" />
          </picture>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(237,228,213,0.98) 0%, rgba(237,228,213,0.92) 32%, rgba(237,228,213,0.5) 52%, rgba(237,228,213,0) 66%), linear-gradient(180deg, #ede4d5 0%, rgba(237,228,213,0) 14%, rgba(237,228,213,0) 80%, #ede4d5 100%)",
          }}
        />
      </div>

      {/* Phone art: the portrait crop sits above the copy. */}
      <div aria-hidden="true" className="relative h-[58vh] md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CHALLENGE_MEDIA.mobile.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[55%_30%]" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #ede4d5 0%, rgba(237,228,213,0) 22%, rgba(237,228,213,0) 70%, #ede4d5 100%)" }}
        />
      </div>

      <Container className="relative z-10 pb-28 pt-2 md:py-28 lg:pb-40 lg:pt-28">
        <div className="max-w-[40rem]" data-reveal-group>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
            {HOME_CHALLENGE.eyebrow}
          </p>
          <h2 id="challenge-title" className="display-caps font-display text-[2.3rem] text-fg sm:text-5xl lg:text-[3.6rem]">
            <Accent text={HOME_CHALLENGE.headline} />
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">{HOME_CHALLENGE.body}</p>
        </div>

        <ul className="mt-12 grid max-w-[44rem] gap-3 sm:grid-cols-2" data-reveal-group>
          {HOME_CHALLENGE.concerns.map((concern) => (
            <li key={concern.id} className="risk-card group relative flex gap-4 border border-rule bg-cream/85 p-5 backdrop-blur-md">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bronze/40 bg-ivory text-bronze-deep">
                <BrandIcon src={concern.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">{concern.title}</h3>
                <p className="mt-1 font-display text-xl leading-tight text-fg">{concern.question}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{concern.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      {/* The fracture's glow becomes the thread into the causeway. */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-28 w-px -translate-x-1/2"
        style={{ background: "linear-gradient(180deg, rgba(208,164,90,0) 0%, #d0a45a 60%, #e5c58f 100%)", boxShadow: "0 0 12px 1px rgba(208,164,90,0.55)" }}
      />
    </section>
  );
}
