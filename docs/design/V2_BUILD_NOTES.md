# Mythos v2 — Build Notes

How the v2 rebuild on `site-v2` is put together. The plan itself is the October
2026 website blueprint; this file records what has been built and the rules the
next phases build on.

## Locked decisions (14 Oct 2026)

| Decision | Outcome |
| --- | --- |
| Visual direction | Fused palette: the blueprint's navy, ivory/bone, bronze/gold and Cormorant Garamond, blended with the original obsidian. Dark and light sections meet through painted blends, never hard cuts. |
| "Opening the Vault" preloader | Retired. Headline and poster paint immediately. |
| Unfinished capabilities | Launch gate: write per the blueprint, but every specific claim lives in `content/claims.ts` and must be verified against the Master Inventory before merging. |
| `/demo` | Folded into `/contact?intent=demo`; `/demo` forwards there. |
| Public pricing depth | Open — decide at Phase 4. |

## Design system

- **Tokens** (`app/globals.css`): night field `obsidian → abyss → navy`, day
  field `bone / marble / ivory`, metals `bronze / antique-gold / deep-copper`,
  evidence-state colours `state-*`. Display font Cormorant Garamond
  (`font-display`), body Inter.
- **Surfaces:** put `data-surface="obsidian" | "navy" | "bone"` on a section and
  use `text-fg`, `text-fg-muted`, `text-accent`, `border-rule`, `bg-panel` inside
  it. The same component then reads correctly on dark and light. On bone, small
  accent text is deep copper (bronze is under 4.5:1 there).
- **Blends:** `components/sections/SectionBlend.tsx` paints the seam between two
  surfaces, with a Batch 10 atmosphere layer. Dark↔bone seams route through warm
  dawn/dusk tones instead of grey.
- **Media:** paths, sizes and character crops come from `content/media.ts`; crop
  posters and loops with `cropStyle()` from `lib/media.ts`.

## Content registries (single source of truth)

| File | Holds |
| --- | --- |
| `content/platform.ts` | Canonical lines, projects, lifecycle, evidence states, platform pages |
| `content/solutions.ts` | Industry verticals |
| `content/resources.ts` | Outputs, Standards, Glossary, Engagement, Partnerships |
| `content/claims.ts` | Every specific capability claim, with a verification status |
| `content/navigation.ts` | Mega menus and footer, built from the registries above |

## Routes

New in Phase 1, rendered by `components/scaffold/ScaffoldPage.tsx` until their
full build lands (all `noindex`):

- `/platform/[slug]` — athena, spine, achilles, validation, hermes,
  economic-exposure, evidence, continuous-assurance
- `/solutions/[slug]` — seven verticals
- `/outputs`, `/standards`, `/glossary`, `/engagement`, `/partnerships`

When a page gets its full build, set `built: true` on its registry entry (the
dynamic route stops generating it) and add the bespoke route.

## Release gate

Before merging `site-v2` into `main`:

```bash
MYTHOS_RELEASE_GATE=1 pnpm --filter @workspace/mythos-website build
```

The build fails and lists every unverified claim and remaining scaffold page
(`content/release.ts`). Normal builds are unaffected.

## Phase 2 — homepage prototype (14 Oct 2026)

Hero → dawn blend → Challenge → dusk blend → Assurance Lifecycle → final CTA
(`app/page.tsx`, `components/home/*`, copy in `content/home.ts`).

- **Hero:** Motion V1 temple loop at 1080p behind a column of shade; the poster
  paints first and the headline animates in with CSS only. The five buyer
  questions run along the bottom as the bridge into the Challenge.
- **Challenge:** the cracked-marble sculpture under a bone wash on the left;
  risk cards light a gold crack along their edge on hover.
- **Lifecycle:** the page's one pinned sequence. Native scroll moves a gold
  trace along the Batch 5 connector; medallions are inlined (`lib/inlineSvg.ts`)
  so the active one can turn and its inner ring spin. Each stage is a button
  that scrolls to its point. Phones get a vertical timeline.
- **Motion:** `components/home/HomeMotion.tsx` reads `data-parallax`,
  `data-drift`, `data-depth` and `data-reveal(-group)` from server-rendered
  markup, plus one warm cursor light on desktop. Videos use
  `components/media/LoopVideo.tsx` (poster first, tablet+ only, paused
  offscreen, alpha overlays skipped on Safari).
- **Reduced motion:** no videos, no pinning, no parallax; the lifecycle shows
  all five stages with their summaries.
- **Seams:** `SectionBlend` masks the band (not the art) and samples its colour
  path on a smoothstep curve, so no edge shows where sections meet.
- Retired with the old homepage: the 3D crest, `PageHero`, `PlatformPairSection`,
  `WhyMythos`, the vault preloader shim and their orphaned helpers.

Homepage sections still to build (tracked by the release gate via
`HOME_PENDING_SECTIONS`): platform architecture, SPINE + assurance teams, What
Mythos Produces, Industries.

## Not yet done

- The old `/use-cases#what-mythos-produces` and `#how-engagement-starts` anchors
  should forward to `/outputs` and `/engagement` (Phase 9 redirects).
- Existing pages (Home, Platform, Solutions, Pricing, Company, Investors,
  Careers, Trust, Contact, Use Cases, Example Report) still carry v1 copy.
