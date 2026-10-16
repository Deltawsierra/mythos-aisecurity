import type { HeroPlane } from "@/components/scenic/ScenicHero";
import type { TimelineEvent } from "@/components/platform/EvidenceTimeline";

/** One industry page's content (Launch Guide Section 09, modules 01–08). */
export interface IndustryContent {
  slug: string;
  /** Short name used on cards and in breadcrumbs. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    /** Headline; *starred* words take the gold accent. */
    headline: string;
    lede: string;
    primaryCta: { label: string; href: string };
    planes: HeroPlane[];
  };
  risks: { title: string; lede: string; items: { name: string; body: string }[] };
  capabilities: {
    title: string;
    lede: string;
    items: { product: "Athena" | "SPINE" | "Achilles" | "Economic Exposure" | "Hermes"; does: string; output: string }[];
  };
  impact: { title: string; lede: string; items: { name: string; body: string }[] };
  useCases: { title: string; slugs: string[] };
  controls: {
    title: string;
    lede: string;
    items: { name: string; status: "mapped" | "reference"; note: string }[];
  };
  proof: { title: string; lede: string; scenario: string; events: TimelineEvent[] };
  questions: { title: string; items: string[] };
  closing: { title: string; body: string };
  /** Starting engagement name (never a price). */
  startingPoint: string;
}
