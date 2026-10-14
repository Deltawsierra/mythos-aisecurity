/**
 * Launch-gate claim register.
 *
 * Every specific, checkable capability claim (counts, named mechanisms, "Mythos
 * does X today") is written here once and referenced by id from page copy.
 * Before site-v2 merges to main, each entry must be checked against the Mythos
 * Master Inventory: verified claims keep present tense; anything still
 * unfinished is reworded with forward verbs ("is designed to…", "extends into…").
 */
export type ClaimStatus =
  | "unverified" // not yet checked against the Master Inventory
  | "verified" // confirmed shipped — present tense allowed
  | "forward"; // confirmed unfinished — must use forward-looking wording

export interface Claim {
  id: string;
  text: string;
  status: ClaimStatus;
  /** Where the wording came from, for the reviewer. */
  source: string;
}

export const CLAIMS: Claim[] = [
  {
    id: "athena.scanner-count",
    text: "27 scanners",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — Athena page",
  },
  {
    id: "achilles.capability-families",
    text: "8 capability families",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — Achilles page",
  },
  {
    id: "achilles.scenario-count",
    text: "32 scenarios",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — Achilles page",
  },
  {
    id: "achilles.cross-channel-chains",
    text: "six cross-channel chains",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — Achilles page",
  },
];

export function getClaim(id: string): Claim {
  const claim = CLAIMS.find((c) => c.id === id);
  if (!claim) throw new Error(`Unknown claim id: ${id}`);
  return claim;
}

/** Claims that still block a merge to main. */
export const UNVERIFIED_CLAIMS = CLAIMS.filter((c) => c.status === "unverified");
