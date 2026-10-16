import type { Metadata } from "next";

/**
 * Per-page social card (Open Graph + Twitter). Images are pre-rendered at
 * 1200×630 from each page's hero art and headline into
 * public/assets/social/pages/<key>.jpg (see docs/design/V2_BUILD_NOTES.md);
 * the homepage keeps the default card set in app/layout.tsx.
 */
export function socialImage(key: string, alt: string): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `/assets/social/pages/${key}.jpg`;
  return {
    openGraph: {
      siteName: "Mythos AI Security",
      type: "website",
      images: [{ url, width: 1200, height: 630, alt }],
    },
    twitter: { card: "summary_large_image", images: [url] },
  };
}
