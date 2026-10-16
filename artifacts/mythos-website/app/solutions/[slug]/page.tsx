import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/solutions/IndustryPage";
import { INDUSTRIES, getIndustry } from "@/content/industries";

// Static export: pre-render exactly the seven industry pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: `/solutions/${industry.slug}/` },
    ...socialImage(`solutions-${industry.slug}`, `${industry.hero.headline.replaceAll("*", "").replace(/\.$/, "")} — Mythos AI Security`),
  };
}

/** Industry pages — Launch Guide Section 09. */
export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  return <IndustryPage c={industry} />;
}
