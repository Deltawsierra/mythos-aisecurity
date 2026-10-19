import type { Metadata } from "next";
import { PageMotion } from "@/components/motion/PageMotion";
import { HomeHero } from "@/components/home/HomeHero";
import { ChallengeSection } from "@/components/home/ChallengeSection";
import { JourneyCauseway } from "@/components/home/JourneyCauseway";
import { AssuranceCycle } from "@/components/home/AssuranceCycle";
import { ProductFamily } from "@/components/home/ProductFamily";
import {
  ConsequenceSection,
  EngageSection,
  FinalVista,
  ProofSection,
  SectorsSection,
  TeamsSection,
  TruthSection,
} from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: { absolute: "AI Deployment Assurance | Mythos AI Security" },
  description:
    "Mythos is the assurance layer for operational AI: evidence about what AI can reach, what authority it has, how it behaves and what it affects — kept current as systems change.",
  alternates: { canonical: "/" },
};

/**
 * The homepage as one continuous world (Launch Guide Section 07, H01–H12):
 * guardian → challenge → causeway → cycle → family → truth → teams →
 * consequence → sectors → proof → engagement → vista. Dark reveals alternate
 * with warm stone; every seam is a cloud bank or a gold thread, never a cut.
 */
export default function HomePage() {
  return (
    <PageMotion>
      <HomeHero />
      <ChallengeSection />
      <JourneyCauseway />
      <AssuranceCycle />
      <ProductFamily />
      <TruthSection />
      <TeamsSection />
      <ConsequenceSection />
      <SectorsSection />
      <ProofSection />
      <EngageSection />
      <FinalVista />
    </PageMotion>
  );
}
