import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScaffoldPage, scaffoldMetadata } from "@/components/scaffold/ScaffoldPage";
import { SOLUTION_PAGES, getSolutionPage } from "@/content/solutions";
import { INDUSTRY_MEDIA } from "@/content/media";

// Static export: pre-render exactly the registered industry pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTION_PAGES.filter((page) => !page.built).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  return page ? scaffoldMetadata(page) : {};
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) notFound();

  return (
    <ScaffoldPage
      page={page}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
      ]}
      art={
        page.media
          ? { kind: "scene", src: INDUSTRY_MEDIA[page.media].hero.src }
          : { kind: "emblem", src: "/assets/ornaments/temple-linework.svg" }
      }
      secondaryCta={{ label: "View Pricing", href: "/pricing" }}
    />
  );
}
