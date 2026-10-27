import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { NextLinks, type NextLink } from "@/components/sections/NextLinks";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { GroupList } from "@/components/platform/GroupList";
import { ChainFlow } from "@/components/platform/ChainFlow";
import { ActionGate } from "@/components/platform/ActionGate";
import { ApprovalBinding } from "@/components/platform/ApprovalBinding";
import { EffectLedger } from "@/components/platform/EffectLedger";
import { RetestComparison } from "@/components/platform/RetestComparison";
import { HandoffFlow } from "@/components/platform/HandoffFlow";
import {
  ACHILLES_AUTHORITY_QUESTIONS,
  ACHILLES_CHAIN,
  ACHILLES_COPY,
  ACHILLES_FAMILIES,
  ACHILLES_GATE_TESTS,
  ACHILLES_HANDOFF,
  ACHILLES_LEDGER,
} from "@/content/achilles";
import { BACKDROPS, OLYMPUS_MEDIA, SCENES } from "@/content/media";
import { CTA_LINKS } from "@/content/navigation";
import { CTA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Achilles — Constantly Tested AI Never Fights Alone",
  description:
    "Achilles challenges AI systems and agents against declared permissions, tool boundaries, approvals and expected effects — and reports what the AI actually did, not what it said.",
  alternates: { canonical: "/platform/achilles/" },
  ...socialImage("platform-achilles", "Constantly Tested AI Never Fights Alone — Mythos AI Security"),
};

const NEXT: NextLink[] = [
  { eyebrow: "Minotaur", title: "Who tests the tester", href: "/platform/validation" },
  { eyebrow: "SPINE", title: "Where observed effects become claims", href: "/platform/spine" },
  { eyebrow: "Use case", title: "AI agents with tools and actions", href: "/use-cases/ai-agent-tools-actions" },
];

const TURNS = [1, 2, 3, 4, 5, 6];
const c = ACHILLES_COPY;

/** Achilles — Launch Guide R05 (AC01–AC09). */
export default function AchillesPage() {
  return (
    <PageMotion>
      {/* AC01 — the arena: red and blue held to the edges of the scene. */}
      <ScenicHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={c.hero.lede}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/platform" },
        ]}
        current="Achilles"
        primaryCta={{ label: "Explore the Validation Method", href: "/platform/validation" }}
        secondaryCta={{ label: CTA.DEMO, href: CTA_LINKS.demo }}
        planes={[{ src: SCENES.achilles.src, mobileSrc: SCENES.achilles.phone, className: "-inset-[3%]", position: "62% 50%", depth: 6, priority: true }]}
        into="ivory"
      />

      {/* AC02 */}
      <section data-surface="ivory" aria-labelledby="families-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="families-title" eyebrow={c.families.eyebrow} title={<Accent text={c.families.title} />} lede={c.families.lede} caps />
          <div className="mt-12">
            <GroupList groups={ACHILLES_FAMILIES} columns={2} />
          </div>
        </Container>
      </section>

      {/* AC03 */}
      <section data-surface="parchment" aria-labelledby="chains-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="chains-title" eyebrow={c.chains.eyebrow} title={<Accent text={c.chains.title} />} lede={c.chains.lede} caps />
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.6fr]">
            <figure className="border border-rule bg-panel p-6" data-reveal>
              <figcaption className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Across turns</figcaption>
              <div aria-hidden="true" className="mt-6 flex h-24 items-end gap-2">
                {TURNS.map((t) => (
                  <span
                    key={t}
                    className="flex-1 bg-gradient-to-t from-bronze to-antique-gold"
                    style={{ height: `${22 + t * 13}%`, opacity: 0.25 + t * 0.12 }}
                  />
                ))}
              </div>
              <div aria-hidden="true" className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-fg-muted">
                <span>Turn 1</span>
                <span>Turn 6</span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-fg">
                Crescendo pressure that builds over a conversation — scored on signals in the target’s response, never on the
                model’s own account of what it did.
              </p>
            </figure>
            <div className="border border-rule bg-panel p-6" data-reveal>
              <ChainFlow steps={ACHILLES_CHAIN} label="One of six chains · illustrative" />
            </div>
          </div>
        </Container>
      </section>

      {/* AC04 */}
      <Scene
        surface="navy"
        labelledBy="gate-title"
        layers={[{ src: BACKDROPS.a.src, mobileSrc: BACKDROPS.a.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="gate-title" align="center" eyebrow={c.gate.eyebrow} title={<Accent text={c.gate.title} />} lede={c.gate.lede} caps />
          <div className="mt-14">
            <ActionGate tests={ACHILLES_GATE_TESTS} title="Illustrative requests" />
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-fg-muted">{c.gate.footnote}</p>
        </Container>
      </Scene>

      {/* AC05 */}
      <section data-surface="ivory" aria-labelledby="questions-title" className="pb-24 pt-8">
        <Container>
          <SectionIntro id="questions-title" eyebrow={c.questions.eyebrow} title={<Accent text={c.questions.title} />} lede={c.questions.lede} caps />
          <div className="mt-12">
            <ApprovalBinding />
          </div>
          <ul className="mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-3" aria-label="Where authority leaks" data-reveal-group>
            {ACHILLES_AUTHORITY_QUESTIONS.map((q) => (
              <li key={q.name} className="border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{q.name}</p>
                <p className="mt-3 font-display text-xl leading-snug text-fg">{q.question}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* AC06 */}
      <section data-surface="parchment" aria-labelledby="effects-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="effects-title" eyebrow={c.effects.eyebrow} title={<Accent text={c.effects.title} />} lede={c.effects.lede} caps />
          <div className="mt-12">
            <EffectLedger rows={ACHILLES_LEDGER} />
          </div>
        </Container>
      </section>

      {/* AC07 */}
      <section data-surface="ivory" aria-labelledby="retest-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="retest-title" eyebrow={c.retest.eyebrow} title={<Accent text={c.retest.title} />} lede={c.retest.lede} caps />
          <div className="mt-12">
            <RetestComparison />
          </div>
        </Container>
      </section>

      {/* AC08 */}
      <section data-surface="parchment" aria-labelledby="handoff-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="handoff-title" eyebrow={c.handoff.eyebrow} title={<Accent text={c.handoff.title} />} lede={c.handoff.lede} caps />
          <div className="mt-12">
            <HandoffFlow steps={ACHILLES_HANDOFF} />
          </div>
          <div className="mt-24">
            <SectionIntro id="next-title" eyebrow={c.next.eyebrow} title={<Accent text={c.next.title} />} caps />
            <NextLinks items={NEXT} />
          </div>
        </Container>
      </section>

      {/* AC09 */}
      <ClosingVista
        from="parchment"
        title="Find out what your agents *can actually do.*"
        primary={{ label: "Request an Agent Authority Assessment", href: CTA_LINKS.assessment }}
        secondary={{ label: "How Mythos Validates Itself", href: "/platform/validation" }}
        vista="a"
      />
    </PageMotion>
  );
}
