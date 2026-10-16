"use client";

import { useEffect } from "react";

/**
 * Forwards retired in-page anchors to the pages that replaced them. Fragments
 * never reach the server, so this has to happen in the browser.
 */
export function HashRedirect({ map }: { map: Record<string, string> }) {
  useEffect(() => {
    const target = map[window.location.hash];
    if (target) window.location.replace(target);
  }, [map]);
  return null;
}
