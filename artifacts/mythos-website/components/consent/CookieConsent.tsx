"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { applyConsent } from "@/lib/consentScripts";
import {
  DEFAULT_CONSENT,
  OPEN_COOKIE_SETTINGS_EVENT,
  detectGPC,
  readStoredConsent,
  toConsentState,
  writeStoredConsent,
  type ConsentState,
} from "@/lib/consent";

interface ToggleProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}

function ConsentToggle({
  id,
  title,
  description,
  checked,
  disabled,
  onChange,
}: ToggleProps) {
  return (
    <div className="flex items-start gap-3 border-t border-ivory/5 py-4 first:border-t-0">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-bronze disabled:opacity-60"
      />
      <label htmlFor={id} className="flex-1 cursor-pointer">
        <span className="block text-sm font-semibold text-ivory">
          {title}
          {disabled && (
            <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-bronze">
              Always on
            </span>
          )}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-stone/70">
          {description}
        </span>
      </label>
    </div>
  );
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [gpc, setGpc] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_CONSENT);
  const panelRef = useRef<HTMLDivElement>(null);

  const commit = useCallback(
    (next: ConsentState) => {
      writeStoredConsent(next, gpc);
      applyConsent(next);
      setDraft(next);
      setShowBanner(false);
      setShowSettings(false);
    },
    [gpc],
  );

  /* Initialize from storage / GPC after mount — keeps SSR output empty so there
     is no hydration mismatch and no flash. */
  useEffect(() => {
    const stored = readStoredConsent();
    const gpcOn = detectGPC();
    setGpc(gpcOn);

    if (stored) {
      const state = toConsentState(stored);
      setDraft(state);
      applyConsent(state);
    } else if (gpcOn) {
      // Treat GPC as a valid opt-out: record a denied decision silently and
      // skip the banner. Visitors can still opt in via Cookie Settings.
      const denied: ConsentState = {
        necessary: true,
        analytics: false,
        marketing: false,
      };
      writeStoredConsent(denied, true);
      applyConsent(denied);
      setDraft(denied);
    } else {
      setShowBanner(true);
    }
    setMounted(true);
  }, []);

  /* Footer "Cookie Settings" reopen + Escape to close the modal. */
  useEffect(() => {
    function openSettings() {
      const stored = readStoredConsent();
      if (stored) setDraft(toConsentState(stored));
      setShowSettings(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () =>
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (!showSettings) return;
    panelRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setShowSettings(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showSettings]);

  if (!mounted) return null;

  const acceptAll = () =>
    commit({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () =>
    commit({ necessary: true, analytics: false, marketing: false });
  const savePreferences = () => commit(draft);

  return (
    <>
      {/* Banner ─────────────────────────────────────────────── */}
      {showBanner && !showSettings && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-ivory/10 bg-charcoal/95 backdrop-blur-sm"
        >
          <Container>
            <div className="flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-stone">
                We use necessary cookies to run this site. With your consent we
                also use optional analytics and marketing cookies. See our{" "}
                <Link
                  href="/privacy"
                  className="text-bronze underline-offset-4 hover:underline"
                >
                  Privacy &amp; Cookie Policy
                </Link>
                .
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="md" onClick={acceptAll}>
                  Accept all
                </Button>
                <Button variant="secondary" size="md" onClick={rejectAll}>
                  Reject all
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setShowSettings(true)}
                >
                  Cookie settings
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Settings modal ─────────────────────────────────────── */}
      {showSettings && (
        <div
          className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
        >
          <button
            type="button"
            aria-label="Close cookie settings"
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          />
          <div
            ref={panelRef}
            tabIndex={-1}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-ivory/10 bg-graphite p-7 shadow-2xl focus:outline-none sm:m-4"
          >
            <h2
              id="cookie-settings-title"
              className="text-lg font-semibold text-ivory"
            >
              Cookie settings
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-stone/70">
              Choose which optional cookies Mythos may use. Necessary cookies are
              always on. Read more in our{" "}
              <Link
                href="/privacy"
                className="text-bronze underline-offset-4 hover:underline"
              >
                Privacy &amp; Cookie Policy
              </Link>
              .
            </p>

            {gpc && (
              <p className="mt-4 border border-bronze/30 bg-bronze/5 px-3 py-2 text-xs leading-relaxed text-muted-stone">
                A Global Privacy Control signal was detected in your browser, so
                analytics and marketing are off by default. You can still opt in
                below.
              </p>
            )}

            <div className="mt-5">
              <ConsentToggle
                id="consent-necessary"
                title="Necessary"
                description="Required for the site to load and function. These cannot be turned off."
                checked
                disabled
              />
              <ConsentToggle
                id="consent-analytics"
                title="Analytics"
                description="Help us understand how the site is used so we can improve it. No analytics scripts load without your consent."
                checked={draft.analytics}
                onChange={(next) =>
                  setDraft((d) => ({ ...d, analytics: next }))
                }
              />
              <ConsentToggle
                id="consent-marketing"
                title="Marketing"
                description="Used to measure and improve outreach. No marketing scripts load without your consent."
                checked={draft.marketing}
                onChange={(next) =>
                  setDraft((d) => ({ ...d, marketing: next }))
                }
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ivory/5 pt-5">
              <Button variant="primary" size="md" onClick={savePreferences}>
                Save preferences
              </Button>
              <Button variant="secondary" size="md" onClick={acceptAll}>
                Accept all
              </Button>
              <Button variant="ghost" size="md" onClick={rejectAll}>
                Reject all
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
