export const SITE_NAME = "Mythos";
export const SITE_FULL_NAME = "Mythos AI Security";

/** Official company profiles (owner-supplied). Rendered in the footer and as schema.org sameAs. */
export const SOCIAL_PROFILES = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/mythos-ai-security" },
] as const;

/** Search for "Mythos" now mostly returns Anthropic's Claude Mythos models; say plainly that we are separate. */
export const NOT_AFFILIATED =
  "Mythos AI Security is an independent company. It is not affiliated with Anthropic or its Claude Mythos models.";

export const CTA = {
  PRIMARY: "Request Assessment",
  PLATFORM: "Explore the Platform",
  INVESTOR: "Request Investor Materials",
  DEMO: "Get a Demo",
  SAMPLE_REPORT: "Inspect a Sample Report",
  CONTACT: "Contact Mythos AI Security",
} as const;
