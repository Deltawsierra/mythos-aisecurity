import { FOOTER_NAV } from "@/content/navigation";
import { USE_CASES } from "@/content/useCaseLibrary";

export interface IndexedPage {
  label: string;
  href: string;
  group: string;
}

/**
 * Every public page, for the 404 page finder. Built from the footer clusters
 * (one typed navigation source) plus the use-case scenarios.
 */
export const SITE_INDEX: IndexedPage[] = (() => {
  const seen = new Set<string>();
  const out: IndexedPage[] = [{ label: "Home", href: "/", group: "Mythos" }];
  for (const group of FOOTER_NAV) {
    for (const item of group.items) {
      const href = item.href.split("?")[0];
      if (seen.has(href)) continue;
      seen.add(href);
      out.push({ label: item.label, href, group: group.label });
    }
  }
  for (const u of USE_CASES) out.push({ label: u.title, href: `/use-cases/${u.slug}`, group: "Use cases" });
  for (const extra of [
    { label: "Trust Center", href: "/trust" },
    { label: "Privacy & Cookie Policy", href: "/privacy" },
  ]) {
    if (!seen.has(extra.href)) out.push({ ...extra, group: "Trust" });
  }
  return out;
})();
