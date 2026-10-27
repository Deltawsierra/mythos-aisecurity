# SEO changelog — site-v2

A running record of the SEO pass on the rebuilt site, one page at a time. Each page entry lists what was checked, what changed and anything left for later. Claims stay inside the Master Inventory (26 Oct 2026): Mythos records, tests, measures and signs; no page says secure, safe, certified or guaranteed.

**Targets used on every page:** title 30–60 characters including the " | Mythos AI Security" suffix; meta description 120–155 characters; one H1; a canonical URL; Open Graph and Twitter cards; descriptive link text; JSON-LD that only restates what the page shows.

## Baseline — 27 Oct 2026

Measured from the static export (46 pages):

- 32 titles over 60 characters (longest 89), 33 descriptions over 160 (longest 215).
- Every page carried only the site-wide Organization and WebSite JSON-LD: no breadcrumbs, no FAQ data.
- GA4 runs under Consent Mode v2, but only the header CTAs sent events. Form starts, completions and every in-page CTA went unmeasured, so there was no lead conversion to report on.
- No `llms.txt` for AI answer engines.
- Already sound: canonical on every indexable page, `robots.txt` allowing all crawlers with the sitemap, per-page 1200×630 social cards, `noindex` on 404 and `/demo`, decorative images marked `alt=""`, all primary copy in DOM text.

## Site-wide

- **Breadcrumb data.** Every inner page's hero now emits `BreadcrumbList` JSON-LD built from its visible breadcrumb trail (`components/scenic/ScenicHero.tsx`, `lib/seo.ts`).
- **FAQ data.** Every FAQ block emits `FAQPage` JSON-LD from its visible questions and answers (`components/platform/Faq.tsx`). This makes answers machine-readable for AI search; Google now shows FAQ rich results only for a few authority sites.
- **Conversion tracking.** `components/seo/AnalyticsBridge.tsx` sends one GA4 event per key link from a single delegated listener: request assessment, request demo, pricing CTA, use-case open, platform product open, Economic Exposure open and example report. Each event carries the link, its label, the page and the position (hero, body or footer). Header CTAs already tracked themselves, so they're skipped. The contact form now sends `form_started`, `form_completed`, `form_error` and the GA4 key event `generate_lead`, with the inquiry type only and never form contents. Consent Mode v2 still governs storage.
- **`llms.txt`.** A plain summary of Mythos for AI answer engines (`public/llms.txt`): what it does, the products, the three engagement offers, the evidence model, the standards map and links to the key pages, all in inventory wording.
- **Default description** (used where a page sets none) shortened to 132 characters.

**For Mythos to do outside the code:** in GA4, mark `generate_lead` as a key event. Verify the domain in Google Search Console and Bing Webmaster Tools, then submit `https://www.mythosaisecurity.com/sitemap.xml`. Set `LINKEDIN_PARTNER_ID` in `lib/consentScripts.ts` if LinkedIn ads are planned.

## Pages

### `/` Home
- Title: "AI Deployment Assurance | Mythos AI Security" (44) → "Mythos AI Security | Adversarial AI Testing & Assurance" (55). The brand leads for brand searches, followed by the category terms people search.
- Description (175 → 153): now names the work in searchable terms: mapping what AI can reach, testing agents and LLM apps under adversarial pressure, keeping signed evidence current.
- Kept: the H1 "Human Ambition Deserves a Stronger Guardian." is the brand line; the hero's category line and lede carry the keywords in visible text. All 79 images are decorative and correctly marked `alt=""`.

### `/platform/` Platform overview
- Title (68 → 60): "AI Assurance Platform: Map, Test, Prove".
- Description (170 → 146): one platform to map what an AI system can reach, test it under attack, sign the evidence and retest after change.
- Checked: one H1, canonical, social card, breadcrumbs now in JSON-LD, 46 decorative images with `alt=""`, 36 internal links. Keywords "AI assurance", "evidence" and "test" appear in the body.

### `/platform/spine/` SPINE
- Title (79 → 57): "SPINE: AI Assurance System of Record".
- Description (207 → 147): leads with what SPINE links and the release decision it recommends.
- Checked: one H1, canonical, breadcrumbs. "System of record" appears in the eyebrow and body.

### `/platform/athena/` Athena
- Title (71 → 57): "Athena: AI Exposure & Access Mapping".
- Description (187 → 149): what Athena maps, within scope, including what was not checked.
- Hero lede: names "an AI system" and "what it can access", so the page text carries the title's terms.
- **Recommendation (copy owner):** the H1 "See Every Risk. Understand Every Exposure. Prove Every Decision." is absolute; the inventory's rule is to say what was not measured. Consider "See the Exposure. Understand the Access. Prove the Decision." Not changed: brand headlines are your call.

### `/platform/achilles/` Achilles
- Title (71 → 57): "Achilles: AI Agent & LLM Red Teaming". "AI red teaming", "LLM red teaming" and "prompt injection" are the terms buyers search; the old title used none of them.
- Description (177 → 142): tests AI agents and LLM apps against permissions, tool boundaries and approvals, and reports what the AI did, not what it said.
- Body: the hero lede now says Achilles red-teams LLM applications and AI agents (prompt injection, jailbreaks, tool misuse). The Goal hijack card names direct prompt injection. Both are inventory capabilities (goal hijack, jailbreak resistance, agent and tool misuse). Before this change, "red team" and "LLM" appeared nowhere on the page.

### `/platform/validation/` Minotaur
- Title (59 → 59): "How Mythos Validates Itself — Minotaur" → "Minotaur: Validating AI Security Tests". The product name now leads, and the title says what it validates.
- Description (207 → 148): proving ground, planted answers, decoys, Validity Cards, nine release gates; every score is a floor. "Safe twins" is replaced by "decoys" here so the wording rule holds even in search snippets.
- Checked: "benchmark" and "validat" appear throughout the body.

### `/platform/evidence/` Evidence & Receipts
- Title (64 → 60): "Signed AI Evidence & Assurance Receipts".
- Description (212 → 151): every claim tied to its evidence, receipts that verify offline, a provenance chain, integrity stated plainly.

### `/platform/continuous-assurance/` Continuous Assurance
- Title (89 → 59): "Continuous AI Assurance & Revalidation". This was the longest title on the site.
- Description (197 → 151): which changes trigger a retest, and "No live monitoring", matching the inventory and the page.

### `/platform/economic-exposure/` Economic Exposure
- Title (81 → 56): "Economic Exposure: Quantify AI Risk".
- Description (190 → 145): a validated failure priced as a loss range (P10, P50, P90) with sources; decision support only.
- Body: the hero lede now opens "AI risk quantification you can take apart". "Quantify" had appeared nowhere on the page.

### `/platform/hermes/` Hermes
- Title (51 → 50): "Hermes: Physical AI Assurance" (colon, matching the other product titles).
- Description (182 → 137): vehicles, fleets and over-the-air updates; a scaffold today, every domain inconclusive. The scaffold status stays visible in search results.

### `/solutions/` Solutions hub
- Title (67 → 55): "AI Assurance Solutions by Industry".
- Description (200 → 146): the seven sectors named plainly; dropped "without one-size-fits-all promises", which spent characters without adding a search term.

### `/solutions/*` Industry pages (titles set in `content/industries.ts`)
Each checked for a single H1, a canonical, breadcrumbs and its sector terms in the body text (all present).

| Page | Title (was → now, with suffix) | Description |
|---|---|---|
| Financial Services & Insurance | 68 → 54, "AI Assurance for Banks & Insurers" (matches how buyers search) | 153, unchanged |
| Healthcare & Life Sciences | 64 → 60, "Healthcare & Life Sciences AI Assurance" | 143, unchanged |
| AI-Heavy SaaS | 51, unchanged | 151, unchanged |
| Regulated Enterprise | 59, unchanged | 157 → 151 |
| Public Sector & Mission | 61 → 55, "AI Assurance for the Public Sector" | 159 → 152 |
| Manufacturing & Critical Infrastructure | 77 → 57, "Critical Infrastructure AI Assurance" | 157 → 151 |
| Integrators & AI Vendors | 70 → 59, "AI Assurance for Integrators & Vendors" | 156 → 153 |

- Kept: every industry description says what Mythos does not promise (compliance, patient safety, authorization). That's a deliberate trust signal, so it stays in the snippet.

### `/use-cases/` Use-case library
- Title (66 → 60): "AI Use Cases: Deployment Risk Scenarios".
- Description (196 → 155). **Fixed a stale fact:** the old description said "Ten assessment scenarios and two strategic-horizon pages", but use case 12 was held from launch on 26 Oct. It now reads "Eleven AI workflows".

### `/use-cases/*` Use-case pages (search titles in `content/useCaseLibrary.ts`)
The title template was "{name} — Use Case 01", which spent 14 characters on a number nobody searches. Each page now has a `seoTitle` phrased as a buyer would search, falling back to the page name. H1s stay as the buyer's question, which suits how people phrase queries to AI assistants.

| # | New title (with suffix) | Description |
|---|---|---|
| 1 | Testing a Customer Support AI Agent (56) | 162 → 146 |
| 2 | RAG Assistant Permission Testing (53) | 172 → 151 |
| 3 | AI Agent Tool & Action Testing (51) | 151, unchanged |
| 4 | Evidence for Regulated AI Workflows (56) | 168 → 145 |
| 5 | Third-Party AI Vendor Risk Testing (55) | 163 → 144 |
| 6 | Enterprise Copilot Access Testing (54) | 152, unchanged |
| 7 | Coding Agent & AI Assistant Testing (56) | 152, unchanged |
| 8 | AI Decision Support Boundary Testing (57) | 166 → 149 |
| 9 | Public Sector Mission AI Evidence (54) | 169 → 153 |
| 10 | Cloud & Data Platform AI Access Mapping (60) | 159 → 141 |
| 11 | AI Vehicle & Physical Systems (Hermes) (59) | 169 → 151; keeps "a vehicle assurance scaffold" |

### `/pricing/` Pricing
- Title (72 → 55): "Pricing: AI Assessment & Assurance".
- Description (215 → 155): the three distinct offers, the Systems Under Assurance unit, and quotes after scoping. No prices, matching decision D03.
- The pricing FAQ now emits `FAQPage` data, so questions like "Do you certify AI as safe?" are machine-readable with Mythos' own answer.

### `/trust/` Trust Center
- Title (68 → 55): "Trust Center: Authorization & Data".
- Description (181 → 146): what is in place, what isn't built yet, and which certifications Mythos lacks. Candour as a trust signal.

### `/standards/` Standards & Control Mapping
- Title (74 → 57): "AI Control Mapping: NIST & OWASP LLM". Those framework names are what compliance buyers search.
- Description (189 → 151): the four mapped frameworks named, where mapping ends and audit begins, "Never a certificate".

### `/outputs/` What Mythos produces
- Title (80 → 57): "AI Assessment Deliverables & Outputs".
- Description (191 → 148).
- Hero lede: "output an engagement delivers" → "deliverable an AI assessment produces", so the body carries the title's terms.

### `/example-report/` Example report
- Title (83 → 57): "Sample AI Security Assessment Report". Matches the "sample AI assessment report" searches a buyer makes before a first call.
- Description (176 → 147): "fully synthetic" still comes first.

### `/company/` Company
- Title (68 → 56): "About Mythos: Principles & Products". "About" is how people look up a company they've just heard of.
- Description (138): unchanged; already in range.

### `/investors/` Investors
- Title (71 → 54): "Investors: The AI Assurance Layer".
- Description (165 → 149): the thesis in one line. No fundraising figures (standing rule).

### `/careers/` Careers
- Title (61 → 56): "Careers: Build Systems That Test AI".
- Description (158 → 148): still says plainly that no roles are open.

### `/partnerships/` Partnerships
- Title (56 → 46): "AI Assurance Partnerships".
- Description (181 → 152). The page itself still says no partners are listed; the snippet keeps the independence rules.

### `/contact/` Contact
- Title (57 → 58): "Contact Mythos: Request an Assessment". Says what the visitor can do here.
- Description (174 → 146).
- Tracking: this is the conversion page. The form now sends `form_started`, `form_completed` / `generate_lead` and `form_error` (see Site-wide).

### `/engagement/` How engagement starts
- Title (69 → 58): "How an AI Assessment Engagement Works".
- Description (171 → 153): the six steps from scoping to decision support.

### `/glossary/` Glossary
- Title (74 → 42): "AI Assurance Glossary".
- Description (184 → 134).
- Added `DefinedTermSet` JSON-LD. Every term carries its plain-English definition and a link to the page that covers it, so AI answer engines can quote Mythos' definitions directly.

### `/resources/` Resources
- Title (61 → 52): "Resources: AI Assurance Library".
- Description (172 → 148): lists what the library holds.

### `/privacy/` Privacy & Cookie Policy
- Unchanged: title 44, description 154. It already names Google Analytics and the visitor's choices.

### `/404/`, `/demo/`
- Both stay `noindex`. They inherited the old 196-character default description; the shorter site default (132) now applies.

## Result — 27 Oct 2026

Re-measured from a fresh build:

- All 44 indexable pages: titles 42–60 characters, descriptions 134–155, no duplicate titles or descriptions.
- Canonical on every indexable page and matching its sitemap URL. 44 URLs in the sitemap, none missing, none extra.
- JSON-LD on every inner page (`BreadcrumbList`), plus `FAQPage` on Pricing and Economic Exposure and `DefinedTermSet` on the Glossary. All blocks parse.
- `llms.txt` is served from the site root. Link check: 46 pages, 0 problems.
- Verified in a browser: an in-page Contact link sent `cta_request_assessment` with its URL, label, page path and position.

## Not changed, and what moves visibility next

1. **H1s stay brand lines.** Most H1s are mythic headlines ("Constantly Tested AI Never Fights Alone."). Titles, descriptions, eyebrows and ledes now carry the search terms, so the brand voice stays. If you ever want more ranking weight, put the category in the H1 (for example "Achilles: AI Agent Red Teaming. Constantly Tested AI Never Fights Alone.").
2. **Publish to be found.** The site has no articles. Resources says reports and guides will appear once written. The fastest route to visibility for a new brand is a few substantial, original pieces on the questions buyers ask: how to red-team an AI agent, what evidence an AI release decision needs, prompt-injection testing for RAG. Each would be a new indexable page that links to the products.
3. **Off-site signals.** Create the company LinkedIn page and any GitHub or research profiles, then add them as `sameAs` in the Organization JSON-LD (`app/layout.tsx`). Earn a few links from AI-security directories, OWASP-adjacent communities and partner sites.
4. **Measurement setup (in the tools, not the code).** In GA4, mark `generate_lead` as a key event and register `inquiry_type`, `location` and `link_text` as custom dimensions. Add the site to Google Search Console and Bing Webmaster Tools and submit the sitemap. Check Search Console's coverage report a week after launch.
5. **Copy recommendation:** the Athena H1 "See Every Risk…" (see the Athena entry).

## New page — `/resources/how-to-red-team-ai-agents/` (27 Oct 2026)

The first guide, by David Smith, published from the owner's draft with the approved review fixes.

- **Search setup.** Title "How to Red-Team an AI Agent" (48 with suffix). Description 149. Canonical set. A social card is rendered from the hero. The first paragraph gives the direct answer that search engines and AI assistants quote.
- **Structured data.** `TechArticle` (headline, author as a Person, published and research-checked dates, publisher, the 13 cited sources), `BreadcrumbList` and `FAQPage` for the six buyer questions. The Organization data now names David Smith as founder (owner-approved).
- **Links.** "Where Mythos fits" notes and the Mythos section now link Athena, Achilles, Minotaur, SPINE, Evidence & Receipts, Continuous Assurance, the example report and the glossary (the draft sent all three product links to /platform). External sources open in a new tab; all 13 return 200.
- **Accessibility.** The expected-vs-observed diagram has a full text description as alt text. A sticky table of contents sits on desktop. Tables use row headers.
- **Content fixes applied:** "plus six cross-channel chains"; planted-case scores read as floors for those cases; the Mythos section leads with what each part does, then its limit; "Access is modelled from the configuration you supply". The protection-capabilities paragraph stands on the owner's 27 Oct ruling (claim `article.protections-in-progress`, worded as in progress).
- **Lead capture.** The checklist PDF is hosted at `/assets/downloads/mythos-ai-agent-red-teaming-checklist.pdf` (free, no form). Its "Request an agent assessment" link now carries `utm_source=checklist&utm_medium=pdf&utm_campaign=agent-red-teaming`, so leads from the printed or forwarded PDF show up in GA4. On site, PDF downloads send `resource_download` and guide opens send `article_open`.
- **Discovery.** Linked from the top of the Resources hub (new "Guides and checklists" shelf), the Resources mega menu, the footer, the sitemap (45 URLs) and `llms.txt`. The Resources notice now says the first guide is here.
- **Company page.** New "Who is building Mythos" section naming David Smith (name, title and focus only), linking to the guide.
