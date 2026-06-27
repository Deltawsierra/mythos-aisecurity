/**
 * Cookie-consent state, storage, and Global Privacy Control (GPC) detection.
 *
 * Categories:
 *   - necessary: always on (no toggle); required for the site to function.
 *   - analytics: off by default; opt-in.
 *   - marketing: off by default; opt-in.
 *
 * Everything here is browser-only and guarded for SSR so it is safe to import
 * into client components rendered by a server layout.
 */

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export interface StoredConsent {
  version: number;
  decidedAt: string;
  /** Whether a GPC signal was present when the decision was recorded. */
  gpc: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CONSENT_STORAGE_KEY = "mythos.cookie-consent.v1";
export const CONSENT_VERSION = 1;
export const OPEN_COOKIE_SETTINGS_EVENT = "mythos:open-cookie-settings";

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

/** Detect a Global Privacy Control opt-out signal from the browser. */
export function detectGPC(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

export function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      decidedAt:
        typeof parsed.decidedAt === "string"
          ? parsed.decidedAt
          : new Date().toISOString(),
      gpc: Boolean(parsed.gpc),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

export function writeStoredConsent(
  state: ConsentState,
  gpc: boolean,
): StoredConsent {
  const stored: StoredConsent = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    gpc,
    analytics: state.analytics,
    marketing: state.marketing,
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* storage may be unavailable (private mode / quota) — fail quietly */
    }
  }
  return stored;
}

export function toConsentState(stored: StoredConsent): ConsentState {
  return {
    necessary: true,
    analytics: stored.analytics,
    marketing: stored.marketing,
  };
}
