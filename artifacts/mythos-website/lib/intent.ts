/**
 * The contact form preselects its inquiry type from `?intent=` when it mounts.
 * A same-page navigation (already on /contact, then clicking "Request Demo")
 * doesn't remount it, so CTAs also announce the intent and a mounted form
 * switches in place.
 */
export const INTENT_EVENT = "mythos:intent";

export function announceIntent(intent: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string>(INTENT_EVENT, { detail: intent }));
}
