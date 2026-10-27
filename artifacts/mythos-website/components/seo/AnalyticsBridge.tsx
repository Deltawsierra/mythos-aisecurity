"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * One delegated click listener that turns the site's key links into GA4
 * events, so every CTA is measured without wiring each button. Header and
 * mobile-nav CTAs track themselves (SiteHeader) and are skipped here. Only the
 * link's destination, its visible label and the page path are sent (PDF
 * downloads and guide opens included) — never
 * form contents. Consent Mode v2 still governs what GA stores.
 */
function classify(url: URL): AnalyticsEvent | null {
  const p = url.pathname;
  if (p.endsWith(".pdf")) return "resource_download";
  if (p.startsWith("/resources/") && p.length > "/resources/".length) return "article_open";
  if (p.startsWith("/contact")) return url.searchParams.get("intent") === "demo" ? "cta_request_demo" : "cta_request_assessment";
  if (p.startsWith("/use-cases/") && p.length > "/use-cases/".length) return "use_case_open";
  if (p.startsWith("/platform/economic-exposure")) return "economic_exposure_open";
  if (/^\/platform\/(athena|spine|achilles|validation|hermes)/.test(p)) return "platform_project_open";
  if (p.startsWith("/example-report")) return "example_report_download";
  return null;
}

export function AnalyticsBridge() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.closest("header, [data-track-skip]")) return;
      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      const event = classify(url);
      if (!event) return;
      const from = window.location.pathname;
      track(from.startsWith("/pricing") && event.startsWith("cta_") ? "pricing_cta" : event, {
        link_url: url.pathname + url.search,
        link_text: (a.textContent ?? "").trim().slice(0, 80),
        page_path: from,
        location: a.closest("footer") ? "footer" : a.closest("[aria-labelledby='page-title']") ? "hero" : "body",
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
