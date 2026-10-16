import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { notFound } from "next/navigation";
import { UseCasePage } from "@/components/use-cases/UseCasePage";
import { USE_CASES, getUseCase } from "@/content/useCaseLibrary";

// Static export: pre-render exactly the twelve scenarios.
export const dynamicParams = false;

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) return {};
  return {
    title: `${u.title} — Use Case ${String(u.number).padStart(2, "0")}`,
    description: u.metaDescription,
    alternates: { canonical: `/use-cases/${u.slug}/` },
    ...socialImage(`use-cases-${u.slug}`, `${u.question.replaceAll("*", "")} — Mythos AI Security`),
  };
}

/** Use-case scenarios — Launch Guide §10. */
export default async function UseCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = USE_CASES.findIndex((u) => u.slug === slug);
  if (i === -1) notFound();
  return <UseCasePage c={USE_CASES[i]} prev={USE_CASES[i - 1]} next={USE_CASES[i + 1]} />;
}
