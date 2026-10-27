/**
 * Structured-data helpers (schema.org JSON-LD). Only facts already on the page:
 * breadcrumbs mirror the visible trail, FAQ answers mirror the visible text.
 */
export const SITE_URL = "https://www.mythosaisecurity.com";

/** Absolute, trailing-slash URL for a site path (trailingSlash is on in next.config). */
export function absoluteUrl(path: string): string {
  const clean = path.split(/[?#]/)[0];
  return `${SITE_URL}${clean === "/" ? "/" : `${clean.replace(/\/$/, "")}/`}`;
}

export function breadcrumbLd(crumbs: readonly { label: string; href: string }[], current: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: absoluteUrl(c.href) })),
      // Google accepts the current page as the last item without a URL.
      { "@type": "ListItem", position: crumbs.length + 1, name: current },
    ],
  };
}

export function faqLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}
