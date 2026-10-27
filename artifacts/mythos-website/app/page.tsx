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
  title: { absolute: "Mythos AI Security | Adversarial AI Testing & Assurance" },
  description:
    "Mythos AI Security maps what AI systems can reach, tests agents and LLM apps under adversarial pressure and keeps signed evidence current as they change.",
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
