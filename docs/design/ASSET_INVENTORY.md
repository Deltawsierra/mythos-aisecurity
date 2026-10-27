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
| `social/pages/` | 45 generated Open Graph cards (1200×630), one per page incl. `home.jpg` (the site default) | `scripts/generate-og-pages.py`, 16 Oct 2026 |
| `brand/` | Crest (`crest.webp`, 288 px tall; `crest-512.png` for structured data), flat footer crest (`crest-flat.webp`), gold M monogram (`monogram.webp`). App icons live in `app/` (`favicon.ico` 16/32/48 from the small M, `icon.png` 192 gold M, `apple-icon.png` 180 crest on charcoal) | Brand R2 (`Mythos_Updated_Crest_Brand_and_UI_Groups_R2.zip`), staged 16 Oct 2026 |
| `athena/` | Eight gold check-group medallions (480×480 WebP, transparent outside the medallion) | AthenaPageAssets (1)–(8), staged 14 Oct 2026 |
| `olympus/` | Marble city (1672×941), cloud sea, cloud layer (alpha), panorama (1612×809, cropped) + its sun and mist layers, Batch 04 Athena (1024×1536 alpha); trimmed alpha cut-outs: cliff temple, viaduct, mountains, waterfall cliffs, evergreen cliff, sunbeams | Batch 03 candidates, Batch 04 R4 source — staged 16 Oct 2026 |
| `causeway/` | Batch 06 layers on a 2048×1152 canvas (sky, mountains, gorge, bridge, sunbeams, mist) + Batch 07 journey medallions, halo, energy path | Batches 06/07 Integrated R1 — staged 16 Oct 2026 |
| `icons/` | 18 Batch 02 mono icons (currentColor strokes) | Batch 02 COMPLETE — staged 16 Oct 2026 |

Economic Exposure chart mockups are kept as design reference only in
`docs/design/asset-reference/economic-exposure/`. The blueprint calls for native
charts with DOM text, and their labels (e.g. "FIE 1.3.2", "B — Supported") must
be checked against product terminology before reuse.

## Changes made while staging

- **Presence loops (27 Oct):** `/assets/presence/<id>-{idle,engaged}.webm` are the studio's
  native-card VP9-alpha loops, byte-identical to the "Current Presence" portable packs (receipts
  checked). `<id>-poster.webp` is the idle native-card poster resized to 560 px wide;
  `<product>-backdrop.webp` is each product page's scene pre-cut to the 52:100 card and
  `team-backdrop.webp` is backdrop A at 9:14. Homepage product cards play the engaged loop on
  hover/focus only (Launch Guide H05); the selected team card plays its idle loop and a hovered or
  focused team card its engaged loop (H07). Loops run only at >=1024 px with a hovering pointer
  and motion allowed, only while on screen, and never in Safari until the HEVC-alpha exports
  arrive. The old Motion V2 character loops and the static team portraits were removed. Green's
  loop is not staged (not an inventory role).
- **Parallax layers (27 Oct):** `/assets/scenes/layers/<key>-l<n>.webp` and
  `/assets/use-cases/layers/uc-NN-l<n>.webp`, back to front, for 30 scenes:
  the 21 that passed the parallax review (W2-07–09, W2-11–16, W4-01, W4-03–05,
  W4-07–09, W4-14, W4-15, W4-18–20) plus the nine "Original Paired Layers"
  packages (F3 Careers, V2 Pricing, C4 Minotaur (marked provisional by the
  studio), G6-01–04, G6-07, G6-08). Every stack was checked against the live
  flat hero before encoding (correlation 0.996–0.999). Each plane is
  centre-cropped to the flat hero's frame and cover-fit to 1920×1080 the same
  way, so the stack rebuilds the flat image at rest; L0 is opaque RGB WebP q78,
  upper planes alpha WebP q80 (about 200–730 KB a stack, against 200–340 KB
  flat). The studio motion budgets (11 / 18 / 32 source px) are listed in
  `LAYERED` (`content/media.ts`); `scenePlanes()` sets pointer depth to 0.75 ×
  the budget so the smallest desktop hero stays inside it. Desktop only (lg,
  fine pointer): tablets get the flat hero, phones the phone art, and the upper
  planes resolve to a blank source below lg so they are never downloaded.
  W4-21 (G6-12) is not staged: it belongs to the held use case. The Mac HEVC
  alpha handoff (27 Oct) is a conversion kit with no movies; nothing staged.
- **Athena R6 (24 Oct, trial):** `/assets/athena/athena-figure-r6.webp`, the
  W1-05 R6 assembled export (2208×3264, a declared 2× enlargement) trimmed to the
  figure plus 24 px and resized to 1195×1800 (387 KB). It replaces the Batch 04
  stand-in on the homepage and the Athena page; the stand-in stays on Trust,
  where the figure stands on the right and R6 would face off the page. Open with
  the studio: the gown split from mid-thigh and the high-heeled sandals.

- **Weight pass (19 Oct):** large WebPs re-encoded at quality 80 where the
  result stayed at or above 37 dB PSNR and saved at least 15% (challenge
  sculpture, character and SPINE posters, two industry cards, sky and cloud
  plates): about 3.2 MB less. The two `sunbeams.webp` overlays are only ever
  drawn with `mix-blend-mode: screen`, so they are flattened onto black and
  stored without alpha, which looks identical under screen and cuts them from
  387 KB and 112 KB to 28 KB and 6 KB. `footer-stone.webp` shows at 16%
  opacity in luminosity blend, so it is now a 1600×800 greyscale (503 → 13 KB).
  `cloud-valley.webp`, the hero cloud bank and most pages' LCP element, is
  re-encoded at quality 70 / alpha 70 (507 → 224 KB, 38 dB), and
  `athena-guardian.webp` at quality 85 (460 → 389 KB, 38 dB); `marble-city.webp`
  and `panorama.webp` at quality 82 (398 → 337 KB and 349 → 292 KB, 37 dB).
  The unused homepage hero loops and CTA loops (`/assets/hero/*`,
  `cta-olympus-loop.*`, `cta-mist-overlay.webm`; about 1.2 MB) are removed
  with their `HERO_MEDIA` / `CTA_MEDIA` registries; they remain in git history.

- **Interim Wave 2 heroes (19 Oct):** `/assets/scenes/*-hero.webp`, 1672×941
  (the delivered native size; nothing upscaled). Each is the delivered L0–L4
  layers flattened, with solid alpha (250–254) clamped to 255 first:
  W2-02 → `public-sector-mission-hero`; W2-13 without the painted ring (L3)
  → `continuous-assurance-hero`; W2-14 without the painted Hermes (L3) →
  `hermes-hero`, where 0.14% of the frame had no sky behind it and was filled
  from the surrounding sky; W2-15 → `athena-hero`. `resources-hero` is the
  W2-16 final-look image, because its layers have no floor. These are flat
  stand-ins until rebuilt layered masters pass review.

- **PNG → WebP:** marble texture (1.8 MB → 45 KB), atmospheric cloud
  (1.2 MB → 222 KB), gold dust, and three character FX overlays. Transparency kept.
- **Team posters:** resized 1440×2560 → 960×1707 (≈360 KB → ≈115 KB each), then
  on 19 Oct to 540×960 (≈58 KB each): the homepage cards show them about 208 px wide.
- **Character posters (19 Oct):** 1600 → 1164 px tall (≈640 wide, 61–80 KB). The
  family cards show them ~230 px wide and the hero niches ~255 px; 1164 still
  covers a 2× laptop screen.
- **Industry cards (19 Oct):** 600 px wide (422 → 169 KB for the five); they show
  at 188 px on the homepage and up to ~272 px in the Solutions menu feature.
- **Public Sector card (19 Oct):** `scenes/public-sector-mission-card.webp`, a
  480×640 crop of the B1 interim scene, replaces the borrowed insurance card in
  the homepage sector grid.
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
- **Luminous Olympus (16 Oct):** the Batch 03 panorama is cropped 330 px from
  the left so the banners painted with the unapproved Batch 01 monogram don't
  appear; its registered sun and mist layers share the crop. The Batch 06
  placeholder colonnade (B06-04) is left out. The Batch 04 Athena is a
  stand-in (different Athena from `characters/`, heeled sandals hidden in
  clouds). Not staged: Batch 01 logo set (brand decision), Batch 03/04 parallax
  layers (lasso cut-outs, ghosting), Batch 05 scene (overlay crosses the face;
  current challenge art is better), Groups 08–10 code (reference only).
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
| Batch 1 marks + wordmarks | Superseded by Brand R2 (the four-point crest the user confirmed on 16 Oct). The double-peak monogram is retired. |
| Brand R2 SVG lockups, simplified vector crests, monochrome lockups | The SVG crest and wordmark are derived approximations pending brand sign-off, and the monochrome charcoal/ivory lockups still use the retired double-peak M. The site sets the MYTHOS wordmark as live text beside the raster crest instead. |
| Brand R2 Groups 08–10 (nav, drawer, tokens) | The site's navigation and tokens were already integrated from R1; R2 only swaps branding inside the standalone demos. Reference only. |
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

- `minotaur-engaged.webm` without the repeated final frame and the three held
  mid-loop frames.
- Government / Mission art without the Capitol.
- Square (1080×1080) social image. Per-page 1200×630 cards are now generated
  in code from the crest and each page's hero.
- An authoritative vector master of the detailed crest and the official
  wordmark typography (Brand R2 delivers the crest as a 761×904 raster).
- 3D GLBs (marble fragments, lifecycle medallion, SPINE core) — not produced.
