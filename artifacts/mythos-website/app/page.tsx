import type { Metadata } from "next";
import { HomeMotion } from "@/components/home/HomeMotion";
import { HomeHero } from "@/components/home/HomeHero";
import { ChallengeSection } from "@/components/home/ChallengeSection";
import { LifecycleSection } from "@/components/home/LifecycleSection";
import { FinalCta, HomePendingSections } from "@/components/home/FinalCta";
import { SectionBlend } from "@/components/sections/SectionBlend";

export const metadata: Metadata = {
  title: { absolute: "AI Deployment Assurance | Mythos AI Security" },
  description:
    "Mythos independently verifies what AI agents and systems can access, what authority they have, how they behave and what they can affect — with evidence that stays current as systems change.",
};

/**
 * v2 homepage prototype (blueprint Phase 2): Hero → flowing clouds →
 * cracked-marble Challenge → darkening transition → Assurance Lifecycle,
 * closing on the Olympus landscape. One continuous world: every seam between
 * sections is painted, never cut.
 */
export default function HomePage() {
  return (
    <HomeMotion>
      <HomeHero />
      <SectionBlend
        from="abyss"
        to="bone"
        layers={[
          { art: "dark-clouds", opacity: 0.85, drift: 70 },
          { art: "ivory-clouds", opacity: 0.9, drift: -90 },
          { art: "marble-dust", opacity: 0.9, drift: 40, blend: "screen" },
        ]}
        className="-mt-px"
      />
      <ChallengeSection />
      <SectionBlend
        from="bone"
        to="navy"
        layers={[
          { art: "ivory-clouds-alt", opacity: 0.55, drift: 60 },
          { art: "dark-clouds-alt", opacity: 0.75, drift: -70 },
        ]}
      />
      <LifecycleSection />
      <HomePendingSections />
      <FinalCta />
    </HomeMotion>
  );
}
