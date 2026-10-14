import type { CSSProperties } from "react";
import type { MediaCrop } from "@/content/media";

/**
 * Style for an <img>/<video> inside an `overflow-hidden`, `relative` frame that
 * hides the given crop. The element is enlarged and offset so the remaining
 * region exactly fills the frame when the frame matches that region's aspect
 * ratio; `object-fit: cover` absorbs any small mismatch.
 */
export function cropStyle({
  left = 0,
  top = 0,
  right = 0,
  bottom = 0,
}: MediaCrop): CSSProperties {
  const visibleW = 100 - left - right;
  const visibleH = 100 - top - bottom;
  return {
    position: "absolute",
    width: `${(100 * 100) / visibleW}%`,
    height: `${(100 * 100) / visibleH}%`,
    left: `${(-left * 100) / visibleW}%`,
    top: `${(-top * 100) / visibleH}%`,
    maxWidth: "none",
    objectFit: "cover",
  };
}
