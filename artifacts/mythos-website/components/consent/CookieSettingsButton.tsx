"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/lib/consent";

/** Footer trigger that reopens the cookie settings modal. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))
      }
    >
      Cookie Settings
    </button>
  );
}
