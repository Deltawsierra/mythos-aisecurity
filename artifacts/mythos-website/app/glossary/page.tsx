import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { Container } from "@/components/ui/Container";
import { PageMotion } from "@/components/motion/PageMotion";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { GlossaryIndex } from "@/components/resources/GlossaryIndex";
import { GLOSSARY } from "@/content/glossary";
import { OLYMPUS_MEDIA, SCENES } from "@/content/media";

export const metadata: Metadata = {
  title: "AI Assurance Glossary — The Language in Plain English",
  description:
    "Plain-English definitions of the terms used across Mythos: evidence states, receipts, scope, effective access, retests and deployment decisions — with planned things marked as planned.",
  alternates: { canonical: "/glossary/" },
  ...socialImage("glossary", "The Language of AI Assurance, in Plain English — Mythos AI Security"),
};

/** AI Assurance Glossary — Launch Guide §04 /glossary. */
export default function GlossaryPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow="AI Assurance Glossary"
        headline="The Language of AI Assurance, *in Plain English.*"
        lede="Definitions for the terms you will meet on this site and in a Mythos report. Where something is planned rather than built, the definition says so."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
        current="Glossary"
        primaryCta={{ label: "Search the Terms", href: "#glossary" }}
        secondaryCta={{ label: "Standards & Mapping", href: "/standards" }}
        planes={[{ src: SCENES.glossary.src, mobileSrc: SCENES.glossary.phone, className: "-inset-[3%]", position: "55% 50%", depth: 6, priority: true }]}
        compact
        into="ivory"
      />
      <section id="glossary" data-surface="ivory" aria-label="Glossary terms" className="scroll-mt-24 pb-24 pt-8">
        <Container>
          <GlossaryIndex terms={GLOSSARY} />
        </Container>
      </section>
    </PageMotion>
  );
}
