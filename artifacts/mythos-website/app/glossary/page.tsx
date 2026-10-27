import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { Container } from "@/components/ui/Container";
import { PageMotion } from "@/components/motion/PageMotion";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { GlossaryIndex } from "@/components/resources/GlossaryIndex";
import { GLOSSARY } from "@/content/glossary";
import { OLYMPUS_MEDIA, SCENES, scenePlanes } from "@/content/media";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Assurance Glossary",
  description:
    "Plain-English definitions of AI assurance terms: evidence states, receipts, scope, effective access, retests and deployment decisions.",
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
        planes={scenePlanes(SCENES.glossary, "55% 50%")}
        compact
        into="ivory"
      />
      <section id="glossary" data-surface="ivory" aria-label="Glossary terms" className="scroll-mt-24 pb-24 pt-8">
        <Container>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "DefinedTermSet",
              "@id": `${absoluteUrl("/glossary")}#terms`,
              name: "AI Assurance Glossary",
              url: absoluteUrl("/glossary"),
              hasDefinedTerm: GLOSSARY.map((g) => ({ "@type": "DefinedTerm", name: g.term, description: g.plain, ...(g.href ? { url: absoluteUrl(g.href) } : {}) })),
            }}
          />
          <GlossaryIndex terms={GLOSSARY} />
        </Container>
      </section>
    </PageMotion>
  );
}
