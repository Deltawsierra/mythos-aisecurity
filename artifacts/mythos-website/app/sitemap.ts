import type { MetadataRoute } from "next";
import { USE_CASE_DEEP_DIVES } from "@/data/useCaseDeepDives";

const BASE_URL = "https://www.mythosaisecurity.com";

// Public, indexable routes only. API routes live in the separate api-server
// artifact and are intentionally excluded.
const STATIC_ROUTES = [
  "/",
  "/platform",
  "/solutions",
  "/use-cases",
  "/pricing",
  "/demo",
  "/investors",
  "/company",
  "/contact",
  "/careers",
  "/trust",
  "/privacy",
];

// Static export: the sitemap is generated once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // trailingSlash is enabled in next.config, so canonical URLs end with "/".
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route === "/" ? "/" : `${route}/`}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const deepDiveEntries: MetadataRoute.Sitemap = USE_CASE_DEEP_DIVES.map(
    (deepDive) => ({
      url: `${BASE_URL}/use-cases/${deepDive.slug}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...deepDiveEntries];
}
