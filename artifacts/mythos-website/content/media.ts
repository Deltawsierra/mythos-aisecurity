/**
 * Media manifest for the v2 rebuild. Every path is root-relative to /public.
 * Provenance, conversions and the files deliberately left out are recorded in
 * docs/design/ASSET_INVENTORY.md.
 */

/** Percent of the source image's width (left/right) or height (top/bottom) to hide. */
export interface MediaCrop {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
}

export type ProjectId = "athena" | "spine" | "achilles" | "minotaur" | "hermes";
export type TeamId = "red" | "blue" | "purple" | "evaluator";
export type IndustryId =
  | "financial-services"
  | "insurance"
  | "healthcare-life-sciences"
  | "technology-ai-saas"
  | "manufacturing-critical-infrastructure";

export interface CharacterMedia {
  poster: ImageAsset;
  idle: string;
  /** Hover/focus loop. Absent where the delivered loop is not usable yet. */
  engaged?: string;
  emblem?: string;
  /**
   * The Batch 4 posters (and the Motion V2 loops rendered from them) carry a
   * baked card-frame edge. One crop serves both poster and loop; values were
   * measured per character and checked at every corner.
   */
  crop: MediaCrop;
  /** Where the face sits in the poster (% of width/height) and how far to zoom for a portrait medallion. */
  face: { x: number; y: number; zoom: number };
}

export interface TeamMedia {
  poster: ImageAsset;
  idle: string;
  engaged: string;
  emblem: string;
}

export interface IndustryMedia {
  /** Pre-trimmed of the sheet gutter it was cut from; no crop needed. */
  card: ImageAsset;
  hero: ImageAsset;
}

const poster = (src: string, width: number, height: number): ImageAsset => ({
  src,
  width,
  height,
});

/**
 * Luminous Olympus scenery (Launch Guide, 16 Oct). Batch 03 candidates at
 * native size — no faux 4K. The panorama is cropped to drop banners painted
 * with the unapproved Batch 01 monogram; its sun and mist layers share the
 * crop. `athenaR6` is the W1-05 R6 Athena (painted, formal styling; trimmed
 * from the 2208×3264 master, a declared 2× enlargement) on the homepage and
 * the Athena page; the Batch 04 stand-in `athena` remains on Trust, where
 * the figure stands on the right and R6 would face off the page.
 */
export const OLYMPUS_MEDIA = {
  marbleCity: poster("/assets/olympus/marble-city.webp", 1672, 941),
  cloudSea: poster("/assets/olympus/cloud-sea.webp", 1672, 941),
  cloudValley: "/assets/olympus/cloud-valley.webp",
  panorama: poster("/assets/olympus/panorama.webp", 1612, 809),
  sunrays: "/assets/olympus/panorama-sunrays.webp",
  mist: "/assets/olympus/panorama-mist.webp",
  athena: poster("/assets/olympus/athena-guardian.webp", 1024, 1536),
  athenaR6: poster("/assets/athena/athena-figure-r6.webp", 1195, 1800),
  /* Batch 03 cut-outs (alpha, trimmed): compose each page's own scene. */
  cliffTemple: poster("/assets/olympus/cliff-temple.webp", 1429, 815),
  viaduct: poster("/assets/olympus/viaduct.webp", 1568, 411),
  mountains: poster("/assets/olympus/mountains.webp", 1656, 369),
  waterfallCliffs: poster("/assets/olympus/waterfall-cliffs.webp", 1164, 764),
  evergreenCliff: poster("/assets/olympus/evergreen-cliff.webp", 1140, 890),
  sunbeams: "/assets/olympus/sunbeams.webp",
} as const;

/**
 * Interim flat heroes from the Wave 2 art delivery (19 Oct): delivered layers
 * flattened at their native 1672×941 with solid alpha clamped to 255. Flat
 * until rebuilt layered masters arrive. Continuous Assurance leaves out the
 * painted ring and Hermes the painted figure, because those pages draw their
 * own orbit and character. Resources uses the final-look image (its layers
 * have no floor).
 */
export const INTERIM_SCENES = {
  publicSector: poster("/assets/scenes/public-sector-mission-hero.webp", 1672, 941),
  /** 3:4 crop of the same scene for the homepage sector card. */
  publicSectorCard: poster("/assets/scenes/public-sector-mission-card.webp", 480, 640),
  continuousAssurance: poster("/assets/scenes/continuous-assurance-hero.webp", 1672, 941),
  hermes: poster("/assets/scenes/hermes-hero.webp", 1672, 941),
  athena: poster("/assets/scenes/athena-hero.webp", 1672, 941),
  resources: poster("/assets/scenes/resources-hero.webp", 1672, 941),
} as const;

/**
 * Batch 06 causeway layers on a shared 2048×1152 canvas (the placeholder
 * colonnade is left out) and the Batch 07 journey medallions, registered at
 * y = 666 on the bridge.
 */
export const CAUSEWAY_MEDIA = {
  size: { width: 2048, height: 1152 },
  layers: {
    sky: "/assets/causeway/sky.webp",
    mountains: "/assets/causeway/mountains.webp",
    gorge: "/assets/causeway/gorge.webp",
    bridge: "/assets/causeway/bridge.webp",
    sunbeams: "/assets/causeway/sunbeams.webp",
    mist: "/assets/causeway/mist.webp",
  },
  medallions: {
    discover: "/assets/causeway/medallion-discover.svg",
    understand: "/assets/causeway/medallion-understand.svg",
    protect: "/assets/causeway/medallion-protect.svg",
    respond: "/assets/causeway/medallion-respond.svg",
    strengthen: "/assets/causeway/medallion-strengthen.svg",
  },
  halo: "/assets/causeway/medallion-halo.svg",
  /** Medallion centres in canvas pixels (Batch 06/07 scene registration). */
  centers: [218, 620, 1024, 1428, 1830],
  centerY: 666,
  /** The gold energy path through the five centres. */
  path: "M217 666 C345 605 489 710 620 666S894 611 1024 666S1289 713 1428 666S1704 621 1830 666",
} as const;

export const CHALLENGE_MEDIA = {
  desktop: poster("/assets/challenge/challenge-sculpture-desktop.webp", 2560, 1440),
  /** Use when DOM copy sits on the left; still needs a readability gradient. */
  desktopTextSafe: poster(
    "/assets/challenge/challenge-sculpture-desktop-textsafe.webp",
    2560,
    1440,
  ),
  tablet: poster("/assets/challenge/challenge-sculpture-tablet.webp", 1800, 1350),
  mobile: poster("/assets/challenge/challenge-sculpture-mobile.webp", 1200, 1600),
  poster: poster("/assets/challenge/challenge-sculpture-poster.webp", 1920, 1080),
  marbleTexture: "/assets/challenge/marble-texture.webp",
  riskIcons: {
    attackSurfaces: "/assets/challenge/risk-attack-surfaces.svg",
    growingUncertainty: "/assets/challenge/risk-growing-uncertainty.svg",
    higherStakes: "/assets/challenge/risk-higher-stakes.svg",
    rapidAdoption: "/assets/challenge/risk-rapid-adoption.svg",
  },
} as const;

export const LIFECYCLE_MEDALLIONS = {
  discover: "/assets/lifecycle/lifecycle-medallion-discover.svg",
  understand: "/assets/lifecycle/lifecycle-medallion-understand.svg",
  test: "/assets/lifecycle/lifecycle-medallion-test.svg",
  prove: "/assets/lifecycle/lifecycle-medallion-prove.svg",
  revalidate: "/assets/lifecycle/lifecycle-medallion-revalidate.svg",
} as const;

export const CHARACTER_MEDIA: Record<ProjectId, CharacterMedia> = {
  athena: {
    poster: poster("/assets/characters/athena-poster.webp", 640, 1164),
    idle: "/assets/characters/athena-idle.webm",
    engaged: "/assets/characters/athena-engaged.webm",
    crop: { left: 1, top: 1 },
    face: { x: 52, y: 21, zoom: 3.2 },
  },
  spine: {
    poster: poster("/assets/characters/spine-poster.webp", 631, 1164),
    idle: "/assets/characters/spine-idle.webm",
    engaged: "/assets/characters/spine-engaged.webm",
    emblem: "/assets/characters/emblems/spine-emblem.svg",
    crop: { left: 3.5, top: 1.5 },
    face: { x: 52, y: 19, zoom: 3.2 },
  },
  achilles: {
    poster: poster("/assets/characters/achilles-poster.webp", 643, 1164),
    idle: "/assets/characters/achilles-idle.webm",
    engaged: "/assets/characters/achilles-engaged.webm",
    emblem: "/assets/characters/emblems/achilles-emblem.svg",
    crop: { left: 5, top: 2 },
    face: { x: 60, y: 19, zoom: 3.2 },
  },
  minotaur: {
    poster: poster("/assets/characters/minotaur-poster.webp", 631, 1164),
    idle: "/assets/characters/minotaur-idle.webm",
    // minotaur-engaged.webm withheld: 3.2s instead of 5s, visible jump at the loop.
    crop: { left: 5.5, top: 2 },
    face: { x: 64, y: 22, zoom: 3 },
  },
  hermes: {
    poster: poster("/assets/characters/hermes-poster.webp", 655, 1164),
    idle: "/assets/characters/hermes-idle.webm",
    engaged: "/assets/characters/hermes-engaged.webm",
    emblem: "/assets/characters/emblems/hermes-emblem.svg",
    crop: { left: 8.5, top: 2 },
    // His face is at the poster's right edge (~93% across), so the portrait
    // aligns right rather than centring it.
    face: { x: 100, y: 23, zoom: 3.4 },
  },
};

// The evaluator uses the white-team figure until it has art of its own.
const team = (id: string): TeamMedia => ({
  poster: poster(`/assets/teams/${id}-team-poster.webp`, 540, 960),
  idle: `/assets/teams/${id}-team-idle.webm`,
  engaged: `/assets/teams/${id}-team-engaged.webm`,
  emblem: `/assets/teams/emblems/${id}-team-emblem.svg`,
});

export const TEAM_MEDIA: Record<TeamId, TeamMedia> = {
  red: team("red"),
  blue: team("blue"),
  purple: team("purple"),
  evaluator: team("white"),
};

// Government / Mission is withheld until its card no longer depicts the US Capitol.
export const INDUSTRY_MEDIA: Record<IndustryId, IndustryMedia> = {
  "financial-services": {
    card: poster("/assets/industries/financial-services-card.webp", 600, 829),
    hero: poster("/assets/industries/financial-services-hero.webp", 1920, 1080),
  },
  insurance: {
    card: poster("/assets/industries/insurance-card.webp", 600, 829),
    hero: poster("/assets/industries/insurance-hero.webp", 1920, 1080),
  },
  "healthcare-life-sciences": {
    card: poster("/assets/industries/healthcare-life-sciences-card.webp", 600, 833),
    hero: poster("/assets/industries/healthcare-life-sciences-hero.webp", 1920, 1080),
  },
  "technology-ai-saas": {
    card: poster("/assets/industries/technology-ai-saas-card.webp", 600, 843),
    hero: poster("/assets/industries/technology-ai-saas-hero.webp", 1920, 1080),
  },
  "manufacturing-critical-infrastructure": {
    card: poster(
      "/assets/industries/manufacturing-critical-infrastructure-card.webp",
      600,
      845,
    ),
    hero: poster(
      "/assets/industries/manufacturing-critical-infrastructure-hero.webp",
      1920,
      1080,
    ),
  },
};

export const SPINE_CORE_MEDIA = {
  cutout: poster("/assets/spine/spine-core-cutout.webp", 1181, 1161),
  hero: poster("/assets/spine/spine-core-hero.webp", 1920, 1080),
  poster: poster("/assets/spine/spine-core-poster.webp", 1600, 1600),
  orbitBackground: "/assets/spine/spine-core-orbit-background.svg",
} as const;

export const EVIDENCE_STATE_ICONS = {
  declared: "/assets/evidence/states/evidence-declared.svg",
  observed: "/assets/evidence/states/evidence-observed.svg",
  verified: "/assets/evidence/states/evidence-verified.svg",
  unknown: "/assets/evidence/states/evidence-unknown.svg",
  stale: "/assets/evidence/states/evidence-stale.svg",
  contradicted: "/assets/evidence/states/evidence-contradicted.svg",
} as const;

/** Athena check-group medallions (gold on transparent, from AthenaPageAssets). */
export const ATHENA_ICONS = {
  surfaces: "/assets/athena/athena-surfaces.webp",
  routes: "/assets/athena/athena-routes.webp",
  identity: "/assets/athena/athena-identity.webp",
  cloudPosture: "/assets/athena/athena-cloud-posture.webp",
  pipeline: "/assets/athena/athena-pipeline.webp",
  dataLifecycle: "/assets/athena/athena-data-lifecycle.webp",
  personalContext: "/assets/athena/athena-personal-context.webp",
  remediation: "/assets/athena/athena-remediation.webp",
} as const;

/** Default social card (homepage); per-page cards live in /assets/social/pages (see lib/social.ts). */
export const SOCIAL_MEDIA = {
  ogDefault: poster("/assets/social/pages/home.jpg", 1200, 630),
} as const;
