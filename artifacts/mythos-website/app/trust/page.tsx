import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { BadgeX, Check, Hourglass, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { BACKDROPS, OLYMPUS_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "Trust Center: Authorization & Data",
  description:
    "How Mythos handles authorization, test scope, evidence integrity and data: what's in place, what is not built yet, and which certifications it lacks.",
  alternates: { canonical: "/trust/" },
  ...socialImage("trust", "Trust Requires More Than a Claim — Mythos AI Security"),
};

/*
 * Trust Center (Launch Guide §14), checked against the 26 Oct Mythos Master
 * Inventory: "in place" lists what its capability and safety sections describe;
 * "designed, not yet built" lists its limits and work queue. Scope and data
 * terms come from the services agreement template. No badges.
 */

const SCOPE_NAMES = [
  "In-scope and out-of-scope targets",
  "Prohibited actions",
  "Testing windows and escalation contacts",
  "Testing mode",
  "Constraints such as rate limits, safety controls and third-party dependencies",
];

const IN_PLACE = [
  { name: "Scope checked at launch", body: "Every scan passes one gate that checks target bounds, consent, the engagement’s authority and its testing window before it starts." },
  { name: "Constrained network reach", body: "Outbound traffic goes only to allowlisted destinations, with pinned DNS, size and time ceilings, and credentials stripped across origins." },
  { name: "A stop always gets through", body: "No control, failed read, flood or kill switch may block, delay or drop a stop, pause or revoke. Every engine tests this." },
  { name: "Three-tier failsafe", body: "Pause, stand-down and terminate are signed operator commands. Stand-down, release and terminate need two distinct operators." },
  { name: "Signed, verifiable evidence", body: "Receipts are DSSE-signed and verify offline; Athena evidence packs are Ed25519-signed with Merkle proofs. That proves origin, not correctness." },
  { name: "An attributed record", body: "Every outbound effect is a row in a hash-chained ledger with the authority it ran under. Approvals and remediation checks are chained too." },
  { name: "No raw secrets in evidence", body: "Achilles evidence is redacted to content hashes in storage, and a leaked customer secret is reported as a masked fingerprint." },
  { name: "Pinned, guarded core", body: "Every engine pins Mythos-Core by commit behind a pin guard, and an advisories register fails CI on an affected version." },
  { name: "Secret scanning, safe loading", body: "Secret scanning with push protection runs in CI. Models load as data-only JSON with a checksum — never pickle." },
  { name: "A restore drill", body: "Backups are tested by a drill that actually restores one, and a chain-birth registry detects a wiped and reseeded chain." },
  { name: "Runs on Windows", body: "Every repository’s CI includes a Windows run, and stop paths are checked on Windows first." },
  { name: "Honest states", body: "A vendor’s statement caps at supported, unknown never counts as a pass, and an empty or unfinished scan never reads as Ready." },
];

const DESIGNED = [
  "External anchoring of the engine record — designed, not built",
  "Runtime monitor-coverage measurement",
  "An enforcing request gateway — today it is monitor-only and fails open",
  "A customer-run or third-party identity collector",
  "Achilles scan results signed into the platform record",
  "An independent witness of external effects",
  "Safe, isolated intake of customer files",
  "Dashboard sign-in through the backend’s accounts and roles",
];

const RESPONSIBILITIES = [
  "Confirm you own or control every system in scope, and have authority to approve testing.",
  "Get internal approvals and any third-party consents — hosting providers, vendors, affiliates.",
  "Provide access, contacts and any credentials through the agreed scoped process — never public forms.",
  "Back up systems and data, and keep recovery plans ready before testing.",
  "Keep an escalation contact available during testing windows, and tell your own incident team.",
  "Keep deliverables for internal use unless Mythos agrees otherwise.",
];

/** Trust Center — Launch Guide §14. */
export default function TrustPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow="Trust Center"
        headline="Trust Requires *More Than a Claim.*"
        lede="How Mythos AI Security approaches authorization, testing scope, evidence integrity, human decisions and the data you share — including what is not built yet."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
        current="Trust"
        primaryCta={{ label: "How Engagement Starts", href: "/engagement" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
        planes={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 55%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.athenaR6.src, className: "right-[4%] bottom-[6%] h-[84%] w-[34%]", fit: "contain", position: "50% 100%", depth: 14, desktopOnly: true },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.45, position: "100% 0%", depth: 10 },
        ]}
        into="ivory"
      />

      {/* Authorization and scope */}
      <section data-surface="ivory" aria-labelledby="scope-title" className="pb-24 pt-10">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro id="scope-title" eyebrow="Authorization and scope" title={<Accent text="Nothing is tested *without written permission.*" />} caps />
            <p className="mt-6 text-[17px] leading-relaxed text-fg">
              Mythos tests only systems you own or control, under your written authorization and a written Authorized Scope. Destructive testing happens only if you
              approve it explicitly, in writing — and Mythos can pause work that has become unsafe or out of scope.
            </p>
          </div>
          <div className="border border-rule bg-panel p-7 lg:mt-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Every Authorized Scope names</p>
            <ul className="mt-4 grid gap-2.5" data-reveal-group>
              {SCOPE_NAMES.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[15px] leading-relaxed text-fg">
                  <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-state-verified-ink" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* In place today */}
      <section data-surface="parchment" aria-labelledby="inplace-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="inplace-title" eyebrow="In place today" title={<Accent text="How the engines *handle your systems.*" />} lede="Described generally on purpose — enough to judge the controls, not enough to defeat them." caps />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {IN_PLACE.map((c) => (
              <li key={c.name} className="border border-rule bg-panel p-5">
                <ShieldCheck size={18} aria-hidden="true" className="text-state-verified-ink" />
                <p className="mt-3 font-display text-xl leading-snug text-fg">{c.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Designed, not built */}
      <Scene
        surface="navy"
        labelledBy="designed-title"
        layers={[{ src: BACKDROPS.b.src, mobileSrc: BACKDROPS.b.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="designed-title" eyebrow="Designed, not yet built" title={<Accent text="What we will not *claim yet.*" />} lede="These are specified or planned. Until they ship, they are not part of how Mythos runs." caps />
          <ul className="grid gap-2.5 sm:grid-cols-2" data-reveal-group>
            {DESIGNED.map((d) => (
              <li key={d} className="flex items-start gap-3 border border-rule bg-panel px-4 py-3.5 text-[15px] leading-relaxed text-fg">
                <Hourglass size={15} aria-hidden="true" className="mt-1 shrink-0 text-state-stale" />
                {d}
              </li>
            ))}
          </ul>
        </Container>
      </Scene>

      {/* Certifications */}
      <section data-surface="ivory" aria-labelledby="certs-title" className="pb-24 pt-8">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="certs-title" eyebrow="Certifications" title={<Accent text="A plain statement, *not a badge.*" />} caps />
          <div className="grid gap-4 lg:pt-10">
            <p className="flex items-start gap-3 border-l-2 border-state-contradicted bg-panel px-5 py-4 text-[16px] leading-relaxed text-fg">
              <BadgeX size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-state-contradicted-ink" />
              Mythos does not hold SOC 2, ISO/IEC 27001, FedRAMP, CMMC, HITRUST or FIPS validation, has had no external audit, and does not certify customers’ compliance.
            </p>
            <p className="text-[15px] leading-relaxed text-fg-muted">
              Findings are advisory. Mythos does not guarantee it will find every weakness, and it does not certify an AI system as safe. Findings are mapped to the NIST
              SP 800-53, OWASP, OWASP LLM and DoD Zero Trust controls they touch — evidence of gaps, never a certificate.
            </p>
          </div>
        </Container>
      </section>

      {/* Responsibilities and data */}
      <section data-surface="parchment" aria-labelledby="shared-title" className="py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionIntro id="shared-title" eyebrow="Shared responsibility" title={<Accent text="What we ask *of you.*" />} lede="Mythos relies on your authorization and does not verify it independently — so these matter." caps />
            <ol className="mt-8 grid gap-2.5" data-reveal-group>
              {RESPONSIBILITIES.map((r, i) => (
                <li key={r} className="flex gap-4 border border-rule bg-panel px-5 py-3.5 text-[15px] leading-relaxed text-fg">
                  <span className="font-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {r}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid content-start gap-6 lg:pt-[4.5rem]">
            <div className="border border-rule bg-panel p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Your data</p>
              <p className="mt-3 text-[15px] leading-relaxed text-fg">
                Retention, deletion and data-use terms are set in each engagement agreement — ask for them during scoping. We don’t publish a standard retention period, and
                we don’t promise one we haven’t agreed with you.
              </p>
            </div>
            <div className="border border-rule bg-panel p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">This website’s forms</p>
              <p className="mt-3 text-[15px] leading-relaxed text-fg">
                Submissions go to one Mythos inbox, are rate-limited and are not logged in production. Please don’t submit credentials, secrets or regulated data.
              </p>
            </div>
            <div className="border border-rule bg-panel p-7">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                <Mail size={13} aria-hidden="true" />
                Reporting a security issue
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-fg">
                Report issues with this website to{" "}
                <a href="mailto:info@mythosaisecurity.com" className="font-semibold text-accent hover:underline">
                  info@mythosaisecurity.com
                </a>
                . A report does not authorize testing beyond normal use of the site. We don’t yet publish a formal vulnerability disclosure policy.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="Start with *a written scope.*"
        secondary={{ label: "How Engagement Starts", href: "/engagement" }}
        vista="d"
      />
    </PageMotion>
  );
}
