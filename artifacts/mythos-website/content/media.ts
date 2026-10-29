/**
 * Media manifest for the v2 rebuild. Every path is root-relative to /public.
 * Provenance, conversions and the files deliberately left out are recorded in
 * docs/design/ASSET_INVENTORY.md.
 */

import type { HeroPlane } from "@/components/scenic/ScenicHero";

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
  emblem?: string;
  /** The Batch 4 posters carry a baked card-frame edge; crops were measured per character and checked at every corner. */
  crop: MediaCrop;
  /** Where the face sits in the poster (% of width/height) and how far to zoom for a portrait medallion. */
  face: { x: number; y: number; zoom: number };
  /** A ready-cropped square face (owner art, 28 Oct), used instead of `face` on the poster. */
  medallion?: string;
}

export interface TeamMedia {
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

export interface SceneArt extends ImageAsset {
  /** 1080x1920 portrait composition for phones. */
  phone: string;
  /** Parallax planes, back to front, framed exactly like `src`: [file, studio motion budget in source px]. */
  layers?: readonly (readonly [string, number])[];
}

/**
 * Scenes whose layered masters passed the 27 Oct parallax review: the planes
 * rebuild the flat hero exactly and leave no holes at the studio's certified
 * offsets (11 / 18 / 32 source px, back to front). Desktop translation only;
 * phones and tablets keep the flat art. Minotaur's pairing is marked
 * provisional by the studio; it matches the approved hero all the same.
 */
const LAYERED: Record<string, readonly number[]> = {
  "scenes/platform": [11, 18, 32],
  "scenes/spine": [11, 18, 32],
  "scenes/achilles": [11, 18, 32],
  "scenes/minotaur": [11, 18, 32],
  "scenes/economic-exposure": [11, 18, 32],
  "scenes/evidence": [11, 18, 32],
  "scenes/continuous-assurance": [11, 32],
  // The front layer was the painted flying Hermes; the page now stands his full-length figure instead.
  "scenes/hermes": [11, 18],
  "scenes/athena": [11, 32],
  "scenes/resources": [11, 32],
  "scenes/company": [11, 18, 32],
  "scenes/careers": [11, 18, 32],
  "scenes/partnerships": [11, 18, 32],
  "scenes/not-found": [11, 18, 32],
  "scenes/standards": [11, 18, 32],
  "scenes/pricing": [11, 32],
  "scenes/outputs": [11, 18, 32],
  "scenes/glossary": [11, 18, 32],
  "scenes/investors": [11, 18, 32],
  "use-cases/uc-01": [11, 32],
  "use-cases/uc-02": [11, 32],
  "use-cases/uc-03": [11, 32],
  "use-cases/uc-04": [11, 18, 32],
  "use-cases/uc-05": [11, 32],
  "use-cases/uc-06": [11, 32],
  "use-cases/uc-07": [11, 32],
  "use-cases/uc-08": [11, 32],
  "use-cases/uc-09": [11, 32],
  "use-cases/uc-10": [11, 32],
  "use-cases/uc-11": [11, 32],
};

const art = (dir: string, key: string): SceneArt => ({
  src: `/assets/${dir}/${key}-hero.webp`,
  phone: `/assets/${dir}/${key}-phone.webp`,
  width: 1920,
  height: 1080,
  layers: LAYERED[`${dir}/${key}`]?.map((motion, i) => [`/assets/${dir}/layers/${key}-l${i}.webp`, motion] as const),
});

/**
 * Pointer depth per plane. PageMotion moves a plane by up to half its depth;
 * at 0.75 x the studio budget, the smallest desktop hero (1024 px wide, cover
 * from a 2720 px canvas) still stays inside each plane's certified offset.
 */
const LAYER_DEPTH = 0.75;

/**
 * Hero planes for a scene: the layered stack on desktop where the masters are
 * in hand (flat art below lg, phone art below md), else the single flat plane.
 */
export function scenePlanes(scene: SceneArt, position: string): HeroPlane[] {
  const frame = { className: "-inset-[3%]", position };
  if (!scene.layers) return [{ ...frame, src: scene.src, mobileSrc: scene.phone, depth: 6, priority: true }];
  return scene.layers.map(([src, motion], i) =>
    i === 0
      ? { ...frame, src, mobileSrc: scene.phone, tabletSrc: scene.src, depth: Math.round(motion * LAYER_DEPTH), priority: true }
      : { ...frame, src, depth: Math.round(motion * LAYER_DEPTH), desktopOnly: true },
  );
}

/**
 * Final art collection (27 Oct 2026), approved in the art review: flattened
 * scene composites (declared ~1.6x upscales) at 1920x1080 with the studio's
 * own phone compositions, layered for desktop parallax where LAYERED lists
 * them. Achilles and Athena are painted into their scenes, so those pages
 * drop their separate figures; Hermes now stands as a separate figure.
 */
export const SCENES = {
  platform: art("scenes", "platform"),
  spine: art("scenes", "spine"),
  achilles: art("scenes", "achilles"),
  minotaur: art("scenes", "minotaur"),
  economicExposure: art("scenes", "economic-exposure"),
  evidence: art("scenes", "evidence"),
  continuousAssurance: art("scenes", "continuous-assurance"),
  // Flat tablet and phone art rebuilt from the two clean layers, without the painted Hermes.
  hermes: { ...art("scenes", "hermes"), src: "/assets/scenes/hermes-clean-hero.webp", phone: "/assets/scenes/hermes-clean-phone.webp" },
  athena: art("scenes", "athena"),
  resources: art("scenes", "resources"),
  solutionsHub: art("scenes", "solutions-hub"),
  publicSector: art("scenes", "public-sector-mission"),
  regulatedEnterprise: art("scenes", "regulated-enterprise"),
  integratorsVendors: art("scenes", "integrators-vendors"),
  financialServices: art("scenes", "financial-services"),
  company: art("scenes", "company"),
  careers: art("scenes", "careers"),
  partnerships: art("scenes", "partnerships"),
  notFound: art("scenes", "not-found"),
  standards: art("scenes", "standards"),
  pricing: art("scenes", "pricing"),
  outputs: art("scenes", "outputs"),
  glossary: art("scenes", "glossary"),
  investors: art("scenes", "investors"),
} as const;

/** 3:4 industry cards (art-directed, 600x800). */
export const SCENE_CARDS = {
  publicSector: "/assets/scenes/public-sector-mission-card.webp",
  regulatedEnterprise: "/assets/scenes/regulated-enterprise-card.webp",
  integratorsVendors: "/assets/scenes/integrators-vendors-card.webp",
  financialServices: "/assets/scenes/financial-services-card.webp",
} as const;

/** Phone compositions for scenes whose desktop art predates the final collection. */
export const PHONE_ART = {
  marbleCity: "/assets/olympus/marble-city-phone.webp",
  panorama: "/assets/olympus/panorama-phone.webp",
  healthcare: "/assets/industries/healthcare-life-sciences-phone.webp",
  manufacturing: "/assets/industries/manufacturing-critical-infrastructure-phone.webp",
} as const;

/** G6 use-case plates, in use-case order (1-11; the twelfth serves the held use case). */
export const USE_CASE_ART: SceneArt[] = Array.from({ length: 11 }, (_, i) => art("use-cases", `uc-${String(i + 1).padStart(2, "0")}`));

/** G1 closing vistas (1920x800, 1080x1350 phone): a dawn temples, b valley road, c harbour, d moonlit. */
export const VISTAS = Object.fromEntries(
  (["a", "b", "c", "d"] as const).map((v) => [v, { src: `/assets/vistas/vista-${v}.webp`, phone: `/assets/vistas/vista-${v}-phone.webp` }]),
) as Record<"a" | "b" | "c" | "d", { src: string; phone: string }>;

/** G2 quiet dark backdrops for charcoal and navy bands: a night sky, b colonnade, c library. */
export const BACKDROPS = Object.fromEntries(
  (["a", "b", "c"] as const).map((v) => [v, { src: `/assets/backdrops/backdrop-${v}.webp`, phone: `/assets/backdrops/backdrop-${v}-phone.webp` }]),
) as Record<"a" | "b" | "c", { src: string; phone: string }>;

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
  /** Medallion centres in canvas pixels. Raised into the sky above the bridge (owner, 29 Oct; was y 666). */
  centers: [218, 620, 1024, 1428, 1830],
  centerY: 455,
  /** The gold energy path through the five centres (the original wave, shifted up with them). */
  path: "M217 455 C345 394 489 499 620 455S894 400 1024 455S1289 502 1428 455S1704 410 1830 455",
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
    crop: { left: 1, top: 1 },
    face: { x: 52, y: 21, zoom: 3.2 },
    medallion: "/assets/characters/medallions/athena.webp",
  },
  spine: {
    poster: poster("/assets/characters/spine-poster.webp", 631, 1164),
    emblem: "/assets/characters/emblems/spine-emblem.svg",
    crop: { left: 3.5, top: 1.5 },
    face: { x: 52, y: 19, zoom: 3.2 },
    medallion: "/assets/characters/medallions/spine.webp",
  },
  achilles: {
    poster: poster("/assets/characters/achilles-poster.webp", 643, 1164),
    emblem: "/assets/characters/emblems/achilles-emblem.svg",
    crop: { left: 5, top: 2 },
    face: { x: 72, y: 19, zoom: 3.2 },
  },
  minotaur: {
    poster: poster("/assets/characters/minotaur-poster.webp", 631, 1164),
    crop: { left: 5.5, top: 2 },
    face: { x: 64, y: 22, zoom: 3 },
    medallion: "/assets/characters/medallions/minotaur.webp",
  },
  hermes: {
    poster: poster("/assets/characters/hermes-poster.webp", 655, 1164),
    emblem: "/assets/characters/emblems/hermes-emblem.svg",
    crop: { left: 8.5, top: 2 },
    // His face is at the poster's right edge (~93% across), so the portrait
    // aligns right rather than centring it.
    face: { x: 100, y: 23, zoom: 3.4 },
    medallion: "/assets/characters/medallions/hermes.webp",
  },
};

export type GuardianFigureId = "hermes" | "spine" | "minotaur";

/**
 * Full-length guardian cut-outs (owner art, 28 Oct; alpha, trimmed, metadata
 * stripped): each stands in its own product page's hero. `small` is the
 * 900px-tall rendition for phones.
 */
export const GUARDIAN_FIGURES: Record<GuardianFigureId, ImageAsset & { small: string }> = {
  hermes: { ...poster("/assets/characters/full/hermes-full.webp", 976, 1439), small: "/assets/characters/full/hermes-full-900.webp" },
  spine: { ...poster("/assets/characters/full/spine-full.webp", 954, 1523), small: "/assets/characters/full/spine-full-900.webp" },
  minotaur: { ...poster("/assets/characters/full/minotaur-full.webp", 806, 1600), small: "/assets/characters/full/minotaur-full-900.webp" },
};

/** Team kit emblems (27 Oct): White, the "Ivory Evidence Oracle", serves the evaluator. */
const team = (id: TeamId, emblem: string): TeamMedia => ({
  emblem: `/assets/teams/emblems/${emblem}-team-emblem.svg`,
});

export type PresenceId = ProjectId | "red" | "blue" | "purple" | "white" | "green";

export interface PresenceMedia {
  /** Idle native-card still (alpha), resized to card width. */
  poster: string;
  /** VP9-alpha WebM, 5 s at 20 fps. Safari needs the HEVC-alpha exports, which are not delivered yet. */
  idle: string;
  engaged: string;
  /** Opaque card-shaped backdrop painted behind the transparent figure. */
  backdrop: string;
  /** object-position for art wider than the card (also the zoom origin). */
  position?: string;
  /** Zoom on poster and loop together, so a padded frame's cut edge sits below the card. */
  scale?: number;
}

/**
 * Owner half-body card art and loops (29 Oct; Athena added the same day): 800x1000 VP9-alpha, 5 s at
 * 20 fps, poster framed exactly as the loop. Wider than the card, so
 * `position` keeps each face and attribute in frame; the figure's lower crop
 * sits ~4% above the frame's bottom, so `scale` pushes it below the card edge.
 */
const HALF_BODY: Partial<Record<PresenceId, { position: string; scale: number }>> = {
  athena: { position: "68% 0%", scale: 1.06 },
  hermes: { position: "100% 0%", scale: 1.06 },
  minotaur: { position: "73% 0%", scale: 1.06 },
  spine: { position: "85% 0%", scale: 1.06 },
};

/**
 * 27 Oct "Current Presence" loops: source-locked figures where only light, motes and trails
 * move. Native-card renditions, used as delivered: the card must hide the figure's cut edges,
 * so they are only ever cropped further in, never shown wider.
 */
export const presence = (id: PresenceId): PresenceMedia => ({
  poster: HALF_BODY[id] ? `/assets/presence/${id}-card.webp` : `/assets/presence/${id}-poster.webp`,
  // Replaced media always gets a new file name: the host caches assets for up to a day
  // (max-age 3600, stale-while-revalidate 86400), so reusing a name would keep showing old art.
  idle: HALF_BODY[id] ? `/assets/presence/${id}-half-idle.webm` : `/assets/presence/${id}-idle.webm`,
  engaged: HALF_BODY[id] ? `/assets/presence/${id}-half-engaged.webm` : `/assets/presence/${id}-engaged.webm`,
  backdrop: !(id in CHARACTER_MEDIA)
    ? "/assets/presence/team-backdrop.webp"
    : id === "athena" || id === "hermes"
      ? `/assets/presence/${id}-backdrop-clean.webp`
      : `/assets/presence/${id}-backdrop.webp`,
  ...HALF_BODY[id],
});

/** The evaluator borrows White's art until it has its own. */
export const TEAM_PRESENCE: Record<TeamId, PresenceId> = { red: "red", blue: "blue", purple: "purple", evaluator: "white" };

export const TEAM_MEDIA: Record<TeamId, TeamMedia> = {
  red: team("red", "red"),
  blue: team("blue", "blue"),
  purple: team("purple", "purple"),
  evaluator: team("evaluator", "white"),
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
