import type { MetadataRoute } from "next";
import { USE_CASES } from "@/content/useCaseLibrary";
import { PLATFORM_PAGES } from "@/content/platform";
import { SOLUTION_PAGES } from "@/content/solutions";
import { RESOURCE_PAGES } from "@/content/resources";
import { releaseBlockers } from "@/content/release";

const BASE_URL = "https://www.mythosaisecurity.com";

// Public, indexable routes only. API routes live in the separate api-server
// artifact and are intentionally excluded; /demo now forwards to /contact.
const STATIC_ROUTES = [
  "/",
  "/platform",
  "/solutions",
  "/use-cases",
  "/resources",
  "/resources/how-to-red-team-ai-agents",
  "/resources/what-frontier-ai-cyber-capabilities-mean-for-ai-agents",
  "/ai-risk-explained",
  "/pricing",
  "/example-report",
  "/investors",
  "/company",
  "/contact",
  "/careers",
  "/trust",
  "/privacy",
  ...Object.values(RESOURCE_PAGES).map((page) => page.href),
];

// Static export: the sitemap is generated once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Launch gate: the release build (MYTHOS_RELEASE_GATE=1) refuses to finish
  // while any claim is unverified or any scaffold page remains. The sitemap is
  // generated exactly once per build, which makes it the natural checkpoint.
  if (process.env.MYTHOS_RELEASE_GATE === "1") {
    const blockers = releaseBlockers();
    if (blockers.length > 0) {
      throw new Error(`Release gate failed:\n- ${blockers.join("\n- ")}`);
    }
  }

  const lastModified = new Date();
  const entry = (route: string, priority: number): MetadataRoute.Sitemap[number] => ({
    // trailingSlash is enabled in next.config, so canonical URLs end with "/".
    url: `${BASE_URL}${route === "/" ? "/" : `${route}/`}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    ...STATIC_ROUTES.map((route) => entry(route, route === "/" ? 1 : 0.8)),
    ...PLATFORM_PAGES.map((page) => entry(page.href, 0.8)),
    ...SOLUTION_PAGES.map((page) => entry(page.href, 0.7)),
    ...USE_CASES.map((u) => entry(`/use-cases/${u.slug}`, u.horizon ? 0.4 : 0.6)),
  ];
}
