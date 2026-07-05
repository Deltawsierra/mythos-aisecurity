/**
 * Consent-gated third-party integration for Google Analytics 4 (Consent Mode v2)
 * and the LinkedIn Insight Tag.
 *
 * GA4 is loaded on every page from the root layout (see app/layout.tsx), but it
 * starts with every consent signal defaulted to "denied". Under Consent Mode,
 * that means GA sets no analytics cookies and sends only cookieless, aggregated
 * pings until the visitor opts in. The functions below flip the GA consent
 * signals via gtag('consent','update',...) as the visitor makes choices in the
 * cookie UI — the tag itself is already present, so nothing needs to be injected
 * for analytics.
 *
 * The LinkedIn Insight Tag (marketing) is still fully load-gated: nothing loads
 * until the visitor opts in to marketing, and only when a partner ID is set.
 *
 * To finish enabling LinkedIn:
 *   1. Set LINKEDIN_PARTNER_ID (e.g. "1234567").
 *   2. Confirm it is listed in /privacy and the cookie settings copy.
 */

export const GA_MEASUREMENT_ID = "G-NZ4W73J9MG";
const LINKEDIN_PARTNER_ID = "";

const isDev = process.env.NODE_ENV !== "production";

let marketingLoaded = false;

/** The global gtag defined by the Consent Mode bootstrap in app/layout.tsx. */
function getGtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  return typeof w.gtag === "function" ? w.gtag : null;
}

function injectScript(src: string, id: string, attrs: Record<string, string> = {}) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("script");
  el.id = id;
  el.src = src;
  el.async = true;
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.head.appendChild(el);
}

export function enableAnalytics(): void {
  if (!GA_MEASUREMENT_ID) return;
  const gtag = getGtag();
  if (!gtag) {
    if (isDev) {
      console.info(
        "[consent] analytics granted before gtag was ready; it will apply on the next load.",
      );
    }
    return;
  }
  // Upgrade GA from the denied default to full analytics (cookies + user-level
  // measurement). GA4 does not log or store IP addresses, so no anonymize_ip
  // flag is needed.
  gtag("consent", "update", { analytics_storage: "granted" });
}

export function disableAnalytics(): void {
  if (!GA_MEASUREMENT_ID) return;
  const gtag = getGtag();
  if (!gtag) return;
  // Return GA to the cookieless, consent-denied state. Honored by gtag.js even
  // after it has loaded.
  gtag("consent", "update", { analytics_storage: "denied" });
}

export function enableMarketing(): void {
  // Track the marketing choice through Google's advertising consent signals too,
  // so Consent Mode stays accurate even though we do not run Google Ads today.
  const gtag = getGtag();
  if (gtag) {
    gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
  }

  if (!LINKEDIN_PARTNER_ID) {
    if (isDev) {
      console.info(
        "[consent] marketing granted — no LINKEDIN_PARTNER_ID configured; nothing loaded.",
      );
    }
    return;
  }
  if (marketingLoaded) return;
  marketingLoaded = true;

  const w = window as unknown as { _linkedin_partner_id?: string; _linkedin_data_partner_ids?: string[] };
  w._linkedin_partner_id = LINKEDIN_PARTNER_ID;
  w._linkedin_data_partner_ids = w._linkedin_data_partner_ids || [];
  w._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
  injectScript(
    "https://snap.licdn.com/li.lms-analytics/insight.min.js",
    "linkedin-insight",
  );
}

export function disableMarketing(): void {
  const gtag = getGtag();
  if (gtag) {
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  // The LinkedIn tag has no documented runtime kill switch; gating load is the
  // control. If it was loaded this session, a full reload clears it.
}

export function applyConsent(consent: {
  analytics: boolean;
  marketing: boolean;
}): void {
  if (consent.analytics) enableAnalytics();
  else disableAnalytics();

  if (consent.marketing) enableMarketing();
  else disableMarketing();
}
