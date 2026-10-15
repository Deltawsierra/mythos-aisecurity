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
- **Motion:** `components/motion/PageMotion.tsx` reads `data-parallax`,
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

## Phase 3 — platform pages (started 14 Oct 2026)

Built: **Platform Overview** (`app/platform/page.tsx`, copy in
`content/platformOverview.ts`), **SPINE** (`app/platform/spine/page.tsx`,
copy in `content/spine.ts`), **Athena** (`app/platform/athena/page.tsx`,
`content/athena.ts`) and **Achilles** (`app/platform/achilles/page.tsx`,
`content/achilles.ts`). Still scaffolds: Validation (Minotaur), Hermes,
Economic Exposure, Evidence, Continuous Assurance.

- **Shared pieces:** `InnerHero`, `HeroArt`, `SectionIntro`, `ClosingCta`
  (components/sections) and, in components/platform, `ArchitectureMap`
  (interactive), `AuthorityChain`, `EvidenceStates`, `ChangeFlow`,
  `ExposurePreview`, `OutputsGrid`, `ProjectGrid`, `LifecycleStrip`,
  `AssuranceGraph`, `SpineBlocks`, `Portrait`. `PageMotion` (formerly
  HomeMotion) now drives motion on every v2 page.
- **Vocabulary** follows the SPINE Technical Foundation Spec where it differs
  from the blueprint: six decision states (Ready … Paused), the evidence-
  strength ladder, policy effects (any deny wins; unknown escalates),
  SUPERSEDES vs INVALIDATES, and the change pipeline.
- **Claims:** every SPINE/platform capability is in `content/claims.ts` with a
  `note` summarising what the internal docs say. Key conflicts the Master
  Inventory must settle: the claims engine and INVALIDATES wiring, receipt
  signing/verification, vendor/incident packs, coverage manifests.
  **Economic Exposure is "specified only" in its 7 Oct spec**, so platform
  pages use forward wording ("is designed to"); the homepage hero still says
  "quantifies the business exposure" and probably needs the same treatment.
- Illustrative numbers (loss range, receipt fields, authority example) are
  labeled as illustrative/fictional on the page.
- **Athena / Achilles pieces:** `CharacterPanel` (poster → idle loop in view →
  engaged loop on hover/focus, desktop with motion only), `SystemMap`
  (illustrative system drawn in discovery waves, ending on an attested route and
  an undeclared one), `GroupList` (native `<details>`), `DifferentialEvidence`,
  `CoveragePanel`, `HandoffFlow`, `ChainFlow`, `ActionGate`; `NextLinks`
  (components/sections) is now shared with SPINE.
- **Athena claims:** checks are grouped by the question they answer because the
  sources name no scanner families; the scanner count is registered but not
  used in copy. Route/endpoint discovery is BUILD-NEW (the flagship scan was a
  mock), differential evidence and the coverage manifest were not found in the
  sources — both appear as illustrated concepts and are in the claims register.
- **Achilles claims:** six capability families are built; MCP/tool integrity
  and action/approval authority use "designed to". The Action Gate is not built
  and internal docs warn against presenting assessment as runtime enforcement,
  so the gate section shows what Achilles *tests* (should vs observed), with a
  one-line forward note on the reference Action Gate. Rejected for copy: "32
  scenarios" (training lessons, not a test corpus) and "six cross-channel chains"
  (not found); cross-channel chains and release comparison use forward wording.
- Retired: the v1 platform sections and the whole v1 3D pipeline
  (shield/spear/crest scenes, `lib/three.ts`).

## Not yet done

- **Contrast:** v1 pages still use `text-bronze` (3.8:1 on navy) and faded
  `text-bronze/70` for small text. v2 components use `text-bronze-bright` on
  dark surfaces and `text-state-*-ink` / `text-deep-copper` on light ones. Sweep
  any v1 page that survives to launch (Phase 9 accessibility QA).
- `public/models/` (6.5 MB of v1 GLBs) is no longer referenced on site-v2;
  remove before launch unless the SPINE-core GLB work reuses it.

- The old `/use-cases#what-mythos-produces` and `#how-engagement-starts` anchors
  should forward to `/outputs` and `/engagement` (Phase 9 redirects).
- Existing pages (Home, Platform, Solutions, Pricing, Company, Investors,
  Careers, Trust, Contact, Use Cases, Example Report) still carry v1 copy.
