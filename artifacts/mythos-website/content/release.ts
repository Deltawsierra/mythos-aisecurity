import { UNVERIFIED_CLAIMS } from "@/content/claims";
import { PLATFORM_PAGES, type ScaffoldPage } from "@/content/platform";
import { SOLUTION_PAGES } from "@/content/solutions";
import { RESOURCE_PAGES } from "@/content/resources";

/**
 * Everything that must be resolved before site-v2 merges to main: claims not
 * yet checked against the Master Inventory, and routes still showing their
 * scaffold. Enforced by building with MYTHOS_RELEASE_GATE=1 (see app/sitemap.ts).
 */
export function releaseBlockers(): string[] {
  const pages: ScaffoldPage[] = [
    ...PLATFORM_PAGES,
    ...SOLUTION_PAGES,
    ...Object.values(RESOURCE_PAGES),
  ];
  const scaffolds = pages.filter((page) => !page.built);

  return [
    ...UNVERIFIED_CLAIMS.map((claim) => `Unverified claim ${claim.id}: "${claim.text}"`),
    ...scaffolds.map((page) => `Scaffold page ${page.href}`),
  ];
}
