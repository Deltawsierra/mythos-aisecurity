# Mythos Website — Site Content Map (Internal)

Internal content reference for the Mythos AI Security marketing site
(`artifacts/mythos-website`). Documents each route's purpose, messaging, the
canonical product descriptions, repetition that was removed, and claims that
still need product-status confirmation.

**Do not expose this file publicly.** It lives in the repo `docs/` folder and is
not part of the Next.js static export (only `app/` routes are exported).

Strategic authority: *Mythos AI Deployment Assurance Roadmap Handbook* (Version
1.0, June 2026). Implementation authority: this repository.

---

## Canonical product descriptions

Use these consistently. Do not reword per page.

- **Category:** AI Deployment Assurance.
- **Thesis:** Mythos helps organizations determine whether high-risk AI systems
  are safe enough to deploy and operate — through independent validation,
  structured evidence, and continuous revalidation. ("Safe enough to deploy" is a
  determination supported by validation and evidence, never a guarantee.)
- **Athena — offensive security and evidence engine:** finds risk and produces
  proof. Maps exposure, validates weaknesses, organizes findings, produces
  structured evidence, supports remediation and retesting.
- **Achilles — AI assurance and validation engine:** validates whether AI can be
  trusted to operate within defined boundaries. Tests agents, RAG, prompts,
  tools, permissions, approvals, and routes; supports release decisions and
  revalidation.
- **Relationship:** complementary parts of one platform. Athena's findings inform
  Achilles' validation scope; Achilles' behavioral findings feed back into
  assurance and evidence. Stated in full only once (homepage pairing section).

### Six assurance questions (full list owned by `/platform` only)
1. What can the AI see?
2. Where does the request go?
3. What can the AI do?
4. Can it be tricked?
5. Can we prove the result?
6. Will it stay safe?

### Capability vocabulary (distributed, not repeated on every page)
AI Context Map · AI Route Map · Agent Behavior Test · Goal Hijack Test ·
Permission Boundary Test · RAG Leakage Test · Provider Boundary Check ·
AI Execution Receipt · Evidence Pack · Retest Proof · Continuous AI Watch ·
Change Risk Alert.

---

## Route map

### `/` — Homepage
- **Purpose:** define the category, establish trust, show the paired platform,
  convert qualified buyers.
- **Primary message:** AI is shipping faster than teams can validate it; Mythos
  closes the validation gap.
- **Supporting:** the validation gap, Athena + Achilles roles (concise),
  capability strip, target markets, demo + investor paths.
- **CTAs:** Primary "Request Platform Access"; Secondary "Explore the Platform";
  tertiary "Investor Overview"; "Request Full Demo Video".
- **Owns:** the single intentional "Two Engines. One Assurance Loop." heading.

### `/platform`
- **Purpose:** canonical product explanation.
- **Owns:** the full six-assurance-questions list, Athena deep dive, Achilles
  deep dive, evidence pack, continuous assurance, deployment model.
- **Note:** larger Forge + Gate redesign deferred to a later approved phase.

### `/solutions`
- **Purpose:** buyer- and use-case-specific problems.
- **Segments:** AI-Heavy SaaS; Finance & Insurance; Healthcare & Life Sciences;
  Regulated & Defense; Systems Integrators.
- **Each segment:** Buyer Risk → What Mythos Validates → Evidence You Receive.
  (Avoids repeating the full Athena/Achilles description per segment.)

### `/demo`
- **Purpose:** explain what a scoped engagement covers.
- **Flow:** one defined AI system → explicit authorization → scope → validation
  tests → Evidence Pack → executive readout → remediation review → retest → path
  to subscription.

### `/investors`
- **Purpose:** category, market timing, paired platform, assessment-to-
  subscription business model, why Mythos can become a distinct assurance layer.
- **Withheld behind deck request:** funding amounts, runway, allocation tables,
  hiring plans, private projections, confidential roadmap detail.

### `/company`
- **Purpose:** mission, operating principle (authorization-first,
  evidence-driven, human-accountable), what Mythos is / is not.

### `/contact`
- **Purpose:** route inquiries.
- **Inquiry types:** Request Platform Access (primary) · Assessment Inquiry ·
  Request Full Demo Video · Investor / Partner Inquiry · General Contact.
- Card CTA labels match their inquiry-type headings.

---

## CTA normalization

- **Primary:** Request Platform Access
- **Secondary:** Explore the Platform
- **Additional:** Request Full Demo Video · Request Investor Deck · Contact Mythos
- **Homepage-sanctioned tertiary:** Investor Overview (navigates to `/investors`)
- No off-list variants (no "Get Started", "Begin Validation", "Enter the
  Platform", "Unlock Access", "Start Your Journey", "Discover Assurance").

## Metadata

- Root template `%s | Mythos AI Security`; root default
  `Mythos AI Security — AI Deployment Assurance` (used by homepage; homepage no
  longer sets its own title, which previously double-branded).
- Per-route titles front-load category/value language; each route has a distinct
  description.

---

## Repeated phrases removed or reduced

- "blind trust" / "cannot afford blind trust" — removed.
- "evidence-backed" — removed.
- "validate your AI systems" — removed as a stock slogan.
- "Two Engines. One Assurance Loop." — reduced to a single major heading
  (homepage).
- "systems that cannot fail", "two engines", "assurance loop", "high-stakes" —
  kept but limited to a single intentional use each; duplicate cross-page uses
  removed.
- Company mission blockquote — kept only on `/company` (removed from the homepage
  final CTA).
- Paired Athena/Achilles explanation — full version stated once (homepage);
  other pages reference roles without repeating the full description.

## Claims requiring product-status confirmation

The handbook marks most named capabilities as **Planned** or **prototype**, not
production. Confirm status before presenting any of the following as live,
shipping features (currently framed as platform capabilities / what the platform
validates, not as proven production functionality):

- AI Context Map, AI Route Map (handbook: Planned)
- RAG Leakage Test, Goal Hijack Test, Agent Behavior Test, Permission Boundary
  Test (handbook: Planned)
- AI Execution Receipt, Provider Boundary Check (handbook: Planned / High)
- Continuous AI Watch, Change Risk Alert (handbook: Planned, Priority 3)
- Achilles "AI-vs-AI Validation" and pre-deployment/continuous testing (handbook:
  Planned / core concept)
- Athena dashboard, engagement tracking, finding management, compliance mapping,
  evidence export (handbook: Current / prototype) — likely safe to describe as
  existing, but confirm "prototype" vs "production" before strengthening.

## Confidential handbook details intentionally excluded from public copy

- Funding ($30M launch round, expandable to $50M), use-of-funds, runway.
- Pricing ($25K–$75K entry packages, etc.) and tier pricing.
- Hiring timeline and headcount plans.
- Named partners (e.g., Pasqal, QCi) and partnership mechanics.
- Internal case studies and named beachhead specifics.
- 36-month execution roadmap and internal metrics.

## Tier / package naming status

- Handbook tier system: **Launch · Growth · Enterprise · Mission**.
- An earlier plan used different mythic tier names.
- **No subscription tier names appear anywhere in the current public copy**, so
  there is no mixed-naming to correct. Do not publish tier names until the
  approved public strategy confirms the current system.
- Handbook entry-package names (AI Readiness Assessment, Agent Safety Assessment,
  AI Data Exposure Assessment, AI Compliance Evidence Package, Custom High-Risk
  AI Assessment) are intentionally **not** published yet, to avoid implying
  fixed, productized inclusions before approval.
