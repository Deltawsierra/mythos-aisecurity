// Build-time only: node:fs keeps this out of any client bundle.
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Read an SVG from /public at build time and return markup safe to inline
 * several times on one page: every id (and its url(#…) / href="#…" references)
 * gets `prefix`, and the root is marked decorative. Inline SVG lets motion reach
 * the asset's data-motion-part hooks, which an <img> cannot.
 */
export function inlineSvg(publicPath: string, prefix: string): string {
  const raw = readFileSync(path.join(process.cwd(), "public", publicPath), "utf8");
  return raw
    .replace(/\sid="([^"]+)"/g, (_, id: string) => ` id="${prefix}-${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id: string) => `url(#${prefix}-${id})`)
    .replace(/href="#([^"]+)"/g, (_, id: string) => `href="#${prefix}-${id}"`)
    .replace(/\srole="img"/, "")
    .replace(/\saria-label="[^"]*"/, "")
    .replace(/<svg\b/, '<svg aria-hidden="true" focusable="false"');
}
