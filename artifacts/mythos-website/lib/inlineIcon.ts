// Build-time only: node:fs keeps this out of any client bundle.
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Inline a Batch 02 mono icon (currentColor strokes) so it takes the text
 * colour of its surface. Title, description and ids are stripped: the icon is
 * always decorative, and repeated icons must not duplicate ids.
 */
export function inlineIcon(publicPath: string): string {
  const raw = readFileSync(path.join(process.cwd(), "public", publicPath), "utf8");
  return raw
    .replace(/<title[^>]*>[\s\S]*?<\/title>/g, "")
    .replace(/<desc[^>]*>[\s\S]*?<\/desc>/g, "")
    .replace(/\s(?:id|role|aria-labelledby|aria-label|width|height)="[^"]*"/g, "")
    .replace(/<svg\b/, '<svg aria-hidden="true" focusable="false" width="100%" height="100%"');
}
