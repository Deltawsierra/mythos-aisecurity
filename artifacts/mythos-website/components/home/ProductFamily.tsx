import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { Accent } from "@/components/ui/Headline";
import { Scene } from "@/components/scenic/Scene";
import { FamilyGrid } from "@/components/home/FamilyGrid";
import { OLYMPUS_MEDIA } from "@/content/media";
import { HOME_FAMILY } from "@/content/home";

/**
 * H05 — the product family (Launch Guide S05). The causeway's light becomes an
 * Olympus horizon; the landscape dims so five guardians stand out, and Mythos
 * Core runs beneath them as the shared foundation.
 */
export function ProductFamily() {
  return (
    <Scene
      surface="charcoal"
      labelledBy="family-title"
      layers={[{ src: OLYMPUS_MEDIA.panorama.src, className: "object-[50%_30%]", parallax: 5 }]}
      // Length stops, not percentages: on phones the section is many screens
      // tall, and the heading must sit in shade right below the cloud bank.
      scrim="linear-gradient(180deg, rgba(22,26,28,0.12) 0, rgba(22,26,28,0.62) clamp(14rem,24vw,24rem), rgba(22,26,28,0.9) clamp(24rem,40vw,40rem), #161a1c clamp(40rem,62vw,64rem))"
      top={{ into: "ivory", height: "clamp(9rem,18vw,18rem)" }}
      bottom={{ into: "parchment", height: "clamp(7rem,10vw,11rem)" }}
      className="pb-[clamp(10rem,14vw,13rem)] pt-[clamp(12rem,22vw,22rem)]"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionIntro
            id="family-title"
            eyebrow={HOME_FAMILY.eyebrow}
            title={<Accent text={HOME_FAMILY.headline} />}
            lede={HOME_FAMILY.lede}
            caps
          />
          <Link
            href="/platform"
            className="group inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold text-champagne hover:text-ivory"
          >
            Explore the platform
            <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14">
          <FamilyGrid />
        </div>

        <Link
          href="/platform#architecture-title"
          className="group mt-14 flex flex-col gap-2 border-y border-champagne/30 bg-[linear-gradient(90deg,rgba(208,164,90,0)_0%,rgba(208,164,90,0.10)_50%,rgba(208,164,90,0)_100%)] px-6 py-5 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-5"
          data-reveal
        >
          <span className="display-caps font-display text-xl tracking-[0.12em] text-champagne">{HOME_FAMILY.core.name}</span>
          <span className="hidden h-4 w-px bg-champagne/40 sm:block" aria-hidden="true" />
          <span className="text-sm text-fg-muted transition-colors group-hover:text-ivory">{HOME_FAMILY.core.body}</span>
        </Link>
      </Container>
    </Scene>
  );
}
