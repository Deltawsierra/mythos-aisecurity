import type { Surface } from "@/components/sections/SectionBlend";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accent, plain } from "@/components/ui/Headline";
import { Scene, type SceneLayer } from "@/components/scenic/Scene";
import { CTA_LINKS } from "@/content/navigation";
import { CANONICAL } from "@/content/platform";
import { VISTAS } from "@/content/media";
import { CTA, SITE_FULL_NAME } from "@/lib/constants";

interface ClosingVistaProps {
  /** Headline; *starred* words take the gold accent. */
  title: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Custom scenery; pages normally pick one of the four G1 closing vistas instead. */
  layers?: SceneLayer[];
  /** G1 closing vista: a dawn temples, b valley road, c harbour, d moonlit. */
  vista?: keyof typeof VISTAS;
  /** Surface of the section above: the top cloud bank rises out of it. */
  from: Surface;
}

/**
 * The calm golden horizon that closes every page (Launch Guide S08): crest,
 * one headline, two CTAs, minimal motion near the conversion point, then the
 * stable footer.
 */
export function ClosingVista({
  title,
  body = CANONICAL.decisionAuthority,
  primary = { label: CTA.PRIMARY, href: CTA_LINKS.assessment },
  secondary = { label: CTA.DEMO, href: CTA_LINKS.demo },
  layers,
  vista = "a",
  from,
}: ClosingVistaProps) {
  const scenery = layers ?? [{ src: VISTAS[vista].src, mobileSrc: VISTAS[vista].phone, className: "object-[50%_60%]", parallax: 4 }];
  return (
    <Scene
      surface="charcoal"
      labelledBy="closing-title"
      layers={scenery}
      scrim="radial-gradient(ellipse 46% 44% at 50% 64%, rgba(18,21,23,0.8) 0%, rgba(18,21,23,0.5) 58%, rgba(18,21,23,0) 100%), linear-gradient(180deg, rgba(22,26,28,0) 58%, rgba(26,29,31,0.85) 93%, #1a1d1f 100%)"
      top={{ into: from, height: "clamp(9rem,18vw,18rem)" }}
      className="flex min-h-[80vh] items-center"
    >
      <Container className="relative pb-28 pt-[clamp(12rem,20vw,18rem)] text-center lg:pb-32">
        <div className="mx-auto max-w-3xl" data-reveal-group>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/brand/crest.webp"
            loading="lazy"
            alt=""
            aria-hidden="true"
            width={80}
            height={80}
            className="mx-auto h-20 w-20 drop-shadow-[0_10px_30px_rgba(18,21,23,0.6)]"
          />
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-champagne/85">{SITE_FULL_NAME}</p>
          <h2
            id="closing-title"
            aria-label={plain(title)}
            className="display-caps mt-4 font-display text-[2.3rem] text-ivory drop-shadow-[0_4px_24px_rgba(18,21,23,0.6)] sm:text-5xl lg:text-6xl"
          >
            <Accent text={title} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/90">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={primary.href} variant="primary" size="lg" arrow>
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </Scene>
  );
}
