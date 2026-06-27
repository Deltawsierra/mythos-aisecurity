/**
 * Consent-gated third-party script scaffold.
 *
 * Nothing third-party loads until the visitor opts in to the relevant category.
 * No real measurement IDs are configured yet, so every loader below is a no-op
 * until you fill in the IDs. When you do, the consent UI already calls these on
 * every decision, so analytics/marketing will load only after opt-in.
 *
 * To go live:
 *   1. Set GA_MEASUREMENT_ID (e.g. "G-XXXXXXXXXX") to enable GA4 (analytics).
 *   2. Set LINKEDIN_PARTNER_ID (e.g. "1234567") to enable the LinkedIn Insight
 *      Tag (marketing).
 *   3. Confirm both are listed in /privacy and the cookie settings copy.
 */

const GA_MEASUREMENT_ID = "G-NZ4W73J9MG";
const LINKEDIN_PARTNER_ID = "";

const isDev = process.env.NODE_ENV !== "production";

let analyticsLoaded = false;
let marketingLoaded = false;

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
  if (!GA_MEASUREMENT_ID) {
    if (isDev) {
      console.info(
        "[consent] analytics granted — no GA_MEASUREMENT_ID configured; nothing loaded.",
      );
    }
    return;
  }
  if (analyticsLoaded) return;
  analyticsLoaded = true;

  injectScript(
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    "ga4-loader",
  );
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: string]: unknown;
  };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  };
  w.gtag("js", new Date());
  // GA4 does not log or store IP addresses, so the legacy Universal Analytics
  // `anonymize_ip` flag is a no-op here and is intentionally omitted to match
  // the wording in /privacy.
  w.gtag("config", GA_MEASUREMENT_ID);
}

export function disableAnalytics(): void {
  if (!GA_MEASUREMENT_ID) return;
  // Honored by gtag.js even after it has loaded.
  (window as unknown as Record<string, unknown>)[
    `ga-disable-${GA_MEASUREMENT_ID}`
  ] = true;
}

export function enableMarketing(): void {
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
