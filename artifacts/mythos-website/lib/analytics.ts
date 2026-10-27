/**
 * Typed analytics events from the v2 blueprint (Section 15). Events go through
 * the GA4 gtag already bootstrapped in app/layout.tsx under Consent Mode v2, so
 * nothing is stored until the visitor opts in. Never pass form contents or other
 * sensitive values as event parameters.
 */
export type AnalyticsEvent =
  | "cta_request_assessment"
  | "cta_request_demo"
  | "investor_material_request"
  | "pricing_tier_view"
  | "pricing_cta"
  | "example_report_download"
  | "use_case_open"
  | "platform_project_open"
  | "economic_exposure_open"
  | "standards_filter_use"
  | "form_started"
  | "form_completed"
  | "generate_lead"
  | "form_error"
  | "video_start"
  | "video_complete";

type EventParams = Record<string, string | number | boolean>;

export function track(event: AnalyticsEvent, params?: EventParams): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, params ?? {});
}
