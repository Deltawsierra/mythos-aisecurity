# Mythos v2 — Staged Asset Inventory

Approved art for the v2 rebuild lives in `artifacts/mythos-website/public/assets/`
(served at `/assets/...`). Paths, dimensions and crop values are typed in
`artifacts/mythos-website/content/media.ts`; use that manifest rather than
hard-coding paths. Staged 14 Oct 2026 from the asset drops in Downloads:
Batches 1–13, Motion V1–V3, Production Assets v1, Asset Fixes v2, Small Fixes
Patch v3, Targeted Fixes v4.

The current live site does not reference anything in `/assets/` yet.

## Layout

| Folder | Contents | Source |
| --- | --- | --- |
| `hero/` | 1080p poster, 1080p WebM loop (Lanczos upscale), 720p MP4 fallback, light overlay | Patch v3, Motion V1 |
| `cta/` | Olympus poster (AVIF), WebM + MP4 loop, mist overlay | Motion V1 |
| `challenge/` | Cracked-marble sculpture (desktop, text-safe, tablet, mobile, poster), 4 risk icons, marble texture | Production v1, Batch 3 |
| `lifecycle/` | Discover → Understand → Test → Prove → Revalidate medallions, rings, connector, pulse, pedestal | Batch 5 |
| `characters/` | Athena, SPINE, Achilles, Minotaur, Hermes posters + idle/engaged loops; `emblems/`; `fx/` overlays | Batch 4, Motion V2, Batch 6 |
| `teams/` | Red/Blue/Purple/Green/White posters + idle/engaged loops; `emblems/`; `paths/` cycle graphics | Batch 7, Motion V3, Batch 8 |
| `spine/` | SPINE Assurance Core cutout, hero, poster, orbit background | Fixes v2 |
| `evidence/` | `states/` Declared, Observed, Verified, Unknown, Stale, Contradicted; receipt, evidence pack, change event, INVALIDATES, deployment gate, authority chain, retest proof | Patch v3, Batch 13 |
| `status/` | Approved, Blocked, Revalidate, Revoked, Warning, Evidence Current | Batch 12 |
| `ornaments/` | Greek key, corner, dividers, laurel wreath (v3), seal, assurance ring, temple linework, nodes | Batch 11, Patch v3 |
| `ui/` | CTA arrow, nav arrow, nav chevron, scroll spear | Batch 1 |
| `industries/` | Card + hero for Financial Services, Insurance, Healthcare & Life Sciences, Technology / AI SaaS, Manufacturing / Critical Infrastructure | Production v1 (cards), Fixes v2 (heroes) |
| `transitions/` | Cloud, fog, dust, particle, haze, vignette layers + temple silhouette | Batch 10 |
| `overlays/` | Atmospheric cloud, gold dust | Production v1 |
| `textures/` | Footer stone | Batch 9 |
| `social/` | Open Graph images (1200×630): default, Economic Exposure, SPINE | Fixes v2 (default), Targeted Fixes v4 |
| `athena/` | Eight gold check-group medallions (480×480 WebP, transparent outside the medallion) | AthenaPageAssets (1)–(8), staged 14 Oct 2026 |

Economic Exposure chart mockups are kept as design reference only in
`docs/design/asset-reference/economic-exposure/`. The blueprint calls for native
charts with DOM text, and their labels (e.g. "FIE 1.3.2", "B — Supported") must
be checked against product terminology before reuse.

## Changes made while staging

- **PNG → WebP:** marble texture (1.8 MB → 45 KB), atmospheric cloud
  (1.2 MB → 222 KB), gold dust, and three character FX overlays. Transparency kept.
- **Team posters:** resized 1440×2560 → 960×1707 (≈360 KB → ≈115 KB each).
- **Challenge risk icons:** removed the baked label text and white card, and
  set a square viewBox from each icon's rendered bounds. Labels belong in DOM text.
- **Industry cards:** trimmed the neighbouring-card sliver and dark sheet gutter
  baked into the left edge (8.2–10% of width), plus the top/right gutter on
  Manufacturing. Re-encoded at WebP q90.
- **Athena medallions:** the eight AthenaPageAssets PNGs were flood-filled from
  the corners to remove the dark sheet (threshold 38; icons 1 and 6 re-cut at 6
  where the fill leaked into the gold rim), cropped square and saved as 480×480
  WebP. Mapping: 1 surfaces, 2 remediation, 3 cloud posture, 4 identity,
  5 data lifecycle, 6 pipeline, 7 routes, 8 personal context. Typed as
  `ATHENA_ICONS` in `content/media.ts`. The Achilles dashboard mockups from the
  same drop were not used: they show real vendor/model names and invented metrics.
- `ui/nav-arrow-right.svg` and `ui/nav-chevron-down.svg` use `currentColor`;
  inline them (or use as a CSS mask) so they take the text colour. As an `<img>`
  they render black.

## Character crop values

The Batch 4 posters and the Motion V2 loops rendered from them carry a baked
card-frame edge. Crop in the page layer with `cropStyle()` from `lib/media.ts`,
one rule per character for both poster and loop:

| Character | Left | Top |
| --- | --- | --- |
| Athena | 1% | 1% |
| SPINE | 3.5% | 1.5% |
| Achilles | 5% | 2% |
| Minotaur | 5.5% | 2% |
| Hermes | 8.5% | 2% |

Measured on a 1% grid and checked at all four corners of each poster and of every
idle/engaged loop. The values in Patch v3's crop note (1.5%, Hermes 3%) leave the
frame visible and should not be used. Team posters and loops need no crop.

## Not staged

| File(s) | Reason |
| --- | --- |
| Batch 1 marks + wordmarks | Would replace the current crest; wordmarks are live Georgia `<text>`. Keep the existing logo. |
| Batch 1 divider, section marker | Divider near-invisible; superseded by Batch 11. |
| Batch 2 (all) | Geometric placeholders; superseded by the Motion V1 hero. |
| Batch 3 face, cracks overlay, fragments, cloud transition, energy line, step medallion | Placeholders or superseded by the Challenge sculpture and Batch 5. |
| Batch 4 Athena + Minotaur emblems | Hard to read at small sizes. |
| Batch 6 Hermes route lines, wing trail, Minotaur labyrinth | Off-palette teal/orange; the V2 loops already include FX. |
| Batch 9 industry scenes, CTA landscape, CTA clouds/rays | Flat placeholders; superseded by Production v1 art and the Motion V1 CTA. |
| Batch 11 laurel wreath | Replaced by Patch v3 laurel. |
| Batch 12 Verified/Unknown/Stale/Contradicted, Batch 13 claim icons | Superseded by the unified Patch v3 evidence-state family. |
| Motion V1 720p hero WebM + AVIF poster | Superseded by the 1080p poster/loop (720p MP4 kept as fallback). |
| Motion V1 `hero-cloud-loop` | Almost no visible motion. |
| Motion V1 `hero-waterfall-loop` | Crude shapes; the hero scene has no waterfall. |
| Motion V2 `minotaur-engaged.webm` | 3.2 s instead of 5 s; visible jump at the loop point. |
| v4 `minotaur-engaged.webm` | No jump now (3.0 s), but the last frame repeats the first and three mid-loop frames are held, so it stutters. |
| Government / Mission card, hero, mobile crop | Depicts the US Capitol and flag. |
| Industry mobile crops | Near-duplicates of the cards. |
| Production v1 ornaments, lifecycle, social | Redundant or replaced in Fixes v2. |
| Fixes v2 OG economic-exposure + SPINE | 1920×1080 instead of 1200×630; replaced by the v4 re-exports. |
| Fixes v2 OG platform | Lifecycle line omits "Understand". |
| v4 OG platform | Lifecycle out of order ("Understand" first); the added dark panel has a hard edge across the statue's face. |
| Fixes v2 square social image | Gold text over bright marble is hard to read. |
| v4 square social image | Readable, but the text box covers the statue's eyes; sans-serif caps don't match the other OG headlines. |
| Fixes v2 `IndustryHero.tsx` + CSS module | Rebuild in Tailwind as a server component; the baked heroes already include the blur. |
| PNG fallbacks for SVGs (lifecycle, evidence states, laurel), SPINE cutout PNG, hero poster JPG | SVG/WebP versions cover every target browser. |

## Open items

- Native 1080p render of the hero loop (current loop is an upscale; still carries
  a VP9 `alpha_mode` flag it doesn't need).
- `minotaur-engaged.webm` without the repeated final frame and the three held
  mid-loop frames.
- Government / Mission art without the Capitol.
- Platform OG (lifecycle order Discover → Understand → Test → Prove → Revalidate,
  blended panel) and square social image (text box off the face, serif headline),
  or generate them in code from the crest and approved art.
- Transparent VP9 overlays (`hero-light-overlay`, `cta-mist-overlay`) don't render
  transparently in Safari. Load them only where supported.
- 3D GLBs (marble fragments, lifecycle medallion, SPINE core) — not produced.
