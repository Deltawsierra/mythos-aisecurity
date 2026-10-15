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
export type TeamId = "red" | "blue" | "purple" | "green" | "white";
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

export const HERO_MEDIA = {
  poster: poster("/assets/hero/hero-athena-poster.webp", 1920, 1080),
  /** Lanczos upscale of the 720p render; swap in a native 1080p render when available. */
  loopWebm: "/assets/hero/hero-athena-loop-1080.webm",
  loopMp4: "/assets/hero/hero-athena-loop-720.mp4",
  /** Transparent VP9 layer: Chromium/Firefox only, optional enhancement. */
  lightOverlay: "/assets/hero/hero-light-overlay.webm",
} as const;

export const CTA_MEDIA = {
  poster: poster("/assets/cta/cta-olympus-poster.avif", 1600, 667),
  loopWebm: "/assets/cta/cta-olympus-loop.webm",
  loopMp4: "/assets/cta/cta-olympus-loop.mp4",
  /** Transparent VP9 layer: Chromium/Firefox only, optional enhancement. */
  mistOverlay: "/assets/cta/cta-mist-overlay.webm",
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
    poster: poster("/assets/characters/athena-poster.webp", 880, 1600),
    idle: "/assets/characters/athena-idle.webm",
    engaged: "/assets/characters/athena-engaged.webm",
    crop: { left: 1, top: 1 },
    face: { x: 52, y: 21, zoom: 3.2 },
  },
  spine: {
    poster: poster("/assets/characters/spine-poster.webp", 867, 1600),
    idle: "/assets/characters/spine-idle.webm",
    engaged: "/assets/characters/spine-engaged.webm",
    emblem: "/assets/characters/emblems/spine-emblem.svg",
    crop: { left: 3.5, top: 1.5 },
    face: { x: 52, y: 19, zoom: 3.2 },
  },
  achilles: {
    poster: poster("/assets/characters/achilles-poster.webp", 884, 1600),
    idle: "/assets/characters/achilles-idle.webm",
    engaged: "/assets/characters/achilles-engaged.webm",
    emblem: "/assets/characters/emblems/achilles-emblem.svg",
    crop: { left: 5, top: 2 },
    face: { x: 60, y: 19, zoom: 3.2 },
  },
  minotaur: {
    poster: poster("/assets/characters/minotaur-poster.webp", 867, 1600),
    idle: "/assets/characters/minotaur-idle.webm",
    // minotaur-engaged.webm withheld: 3.2s instead of 5s, visible jump at the loop.
    crop: { left: 5.5, top: 2 },
    face: { x: 64, y: 22, zoom: 3 },
  },
  hermes: {
    poster: poster("/assets/characters/hermes-poster.webp", 901, 1600),
    idle: "/assets/characters/hermes-idle.webm",
    engaged: "/assets/characters/hermes-engaged.webm",
    emblem: "/assets/characters/emblems/hermes-emblem.svg",
    crop: { left: 8.5, top: 2 },
    // His face is at the poster's right edge (~93% across), so the portrait
    // aligns right rather than centring it.
    face: { x: 100, y: 23, zoom: 3.4 },
  },
};

const team = (id: TeamId): TeamMedia => ({
  poster: poster(`/assets/teams/${id}-team-poster.webp`, 960, 1707),
  idle: `/assets/teams/${id}-team-idle.webm`,
  engaged: `/assets/teams/${id}-team-engaged.webm`,
  emblem: `/assets/teams/emblems/${id}-team-emblem.svg`,
});

export const TEAM_MEDIA: Record<TeamId, TeamMedia> = {
  red: team("red"),
  blue: team("blue"),
  purple: team("purple"),
  green: team("green"),
  white: team("white"),
};

// Government / Mission is withheld until its card no longer depicts the US Capitol.
export const INDUSTRY_MEDIA: Record<IndustryId, IndustryMedia> = {
  "financial-services": {
    card: poster("/assets/industries/financial-services-card.webp", 1086, 1500),
    hero: poster("/assets/industries/financial-services-hero.webp", 1920, 1080),
  },
  insurance: {
    card: poster("/assets/industries/insurance-card.webp", 1086, 1500),
    hero: poster("/assets/industries/insurance-hero.webp", 1920, 1080),
  },
  "healthcare-life-sciences": {
    card: poster("/assets/industries/healthcare-life-sciences-card.webp", 1080, 1500),
    hero: poster("/assets/industries/healthcare-life-sciences-hero.webp", 1920, 1080),
  },
  "technology-ai-saas": {
    card: poster("/assets/industries/technology-ai-saas-card.webp", 1068, 1500),
    hero: poster("/assets/industries/technology-ai-saas-hero.webp", 1920, 1080),
  },
  "manufacturing-critical-infrastructure": {
    card: poster(
      "/assets/industries/manufacturing-critical-infrastructure-card.webp",
      1038,
      1462,
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

export const DECISION_STATUS_ICONS = {
  approved: "/assets/status/status-approved.svg",
  blocked: "/assets/status/status-blocked.svg",
  revalidate: "/assets/status/status-revalidate.svg",
  revoked: "/assets/status/status-revoked.svg",
  warning: "/assets/status/status-warning.svg",
  evidenceCurrent: "/assets/status/status-evidence-current.svg",
} as const;

export const SOCIAL_MEDIA = {
  ogDefault: poster("/assets/social/og-default.jpg", 1200, 630),
  ogEconomicExposure: poster("/assets/social/og-economic-exposure.jpg", 1200, 630),
  ogSpine: poster("/assets/social/og-spine.jpg", 1200, 630),
} as const;
