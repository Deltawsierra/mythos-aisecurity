import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ScaffoldPage,
  scaffoldMetadata,
  type ScaffoldArt,
} from "@/components/scaffold/ScaffoldPage";
import { PLATFORM_PAGES, getPlatformPage } from "@/content/platform";
import { LIFECYCLE_MEDALLIONS, SPINE_CORE_MEDIA } from "@/content/media";

// Static export: pre-render exactly the registered platform pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return PLATFORM_PAGES.filter((page) => !page.built).map((page) => ({ slug: page.slug }));
}

const ART: Record<string, ScaffoldArt> = {
  athena: { kind: "character", project: "athena" },
  spine: { kind: "cutout", src: SPINE_CORE_MEDIA.cutout.src },
  achilles: { kind: "character", project: "achilles" },
  validation: { kind: "character", project: "minotaur" },
  hermes: { kind: "character", project: "hermes" },
  "economic-exposure": { kind: "cutout", src: SPINE_CORE_MEDIA.cutout.src },
  evidence: { kind: "emblem", src: "/assets/evidence/assurance-receipt.svg" },
  "continuous-assurance": { kind: "emblem", src: LIFECYCLE_MEDALLIONS.revalidate },
};

const SECONDARY_CTA: Record<string, { label: string; href: string }> = {
  athena: { label: "See SPINE", href: "/platform/spine" },
  spine: { label: "Explore Economic Exposure", href: "/platform/economic-exposure" },
  achilles: { label: "See SPINE", href: "/platform/spine" },
  validation: { label: "See Trust & Security", href: "/trust" },
  hermes: { label: "See Economic Exposure", href: "/platform/economic-exposure" },
  "economic-exposure": {
    label: "See Financial Services",
    href: "/solutions/financial-services-insurance",
  },
  evidence: { label: "View Example Report", href: "/example-report" },
  "continuous-assurance": { label: "Explore Pricing", href: "/pricing" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  return page ? scaffoldMetadata(page) : {};
}

export default async function PlatformDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) notFound();

  return (
    <ScaffoldPage
      page={page}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Platform", href: "/platform" },
      ]}
      art={ART[slug]}
      secondaryCta={SECONDARY_CTA[slug]}
    />
  );
}
