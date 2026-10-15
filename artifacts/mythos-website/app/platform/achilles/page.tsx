import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageMotion } from "@/components/motion/PageMotion";
import { InnerHero } from "@/components/sections/InnerHero";
import { SectionBlend } from "@/components/sections/SectionBlend";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { NextLinks, type NextLink } from "@/components/sections/NextLinks";
import { CharacterPanel } from "@/components/platform/CharacterPanel";
import { GroupList } from "@/components/platform/GroupList";
import { ChainFlow } from "@/components/platform/ChainFlow";
import { ActionGate } from "@/components/platform/ActionGate";
import { HandoffFlow } from "@/components/platform/HandoffFlow";
import {
  ACHILLES_AUTHORITY_QUESTIONS,
  ACHILLES_CHAIN,
  ACHILLES_COPY,
  ACHILLES_EFFECTS,
  ACHILLES_FAMILIES,
  ACHILLES_GATE_TESTS,
  ACHILLES_HANDOFF,
} from "@/content/achilles";

export const metadata: Metadata = {
  title: "Achilles — Test the AI",
  description:
    "Achilles tests whether an AI system can cause an effect it was not authorized to cause — across turns, tools and approvals — and records what actually happened, not what the agent said.",
  alternates: { canonical: "/platform/achilles/" },
};

const NEXT: NextLink[] = [
  { eyebrow: "Minotaur", title: "Who tests the tester", href: "/platform/validation" },
  { eyebrow: "SPINE", title: "Where observed effects become claims", href: "/platform/spine" },
  { eyebrow: "Evidence & Receipts", title: "Results you can verify for yourself", href: "/platform/evidence" },
];

const TURNS = [1, 2, 3, 4, 5, 6];

/** Achilles — Test the AI (blueprint Section 7). */
export default function AchillesPage() {
  const c = ACHILLES_COPY;
  return (
    <PageMotion>
      <InnerHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={c.hero.lede}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/platform" },
        ]}
        current="Achilles"
        secondaryCta={{ label: "See SPINE", href: "/platform/spine" }}
        art={<CharacterPanel project="achilles" />}
      />

      <SectionBlend
        from="abyss"
        to="bone"
        layers={[
          { art: "dark-clouds", opacity: 0.8, drift: 60 },
          { art: "ivory-clouds", opacity: 0.85, drift: -80 },
        ]}
      />

      <section data-surface="bone" aria-labelledby="families-title" className="pb-24 pt-6">
        <Container>
          <SectionIntro id="families-title" eyebrow={c.families.eyebrow} title={c.families.title} lede={c.families.lede} />
          <div className="mt-12">
            <GroupList groups={ACHILLES_FAMILIES} columns={2} />
          </div>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="chains-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="chains-title" eyebrow={c.chains.eyebrow} title={c.chains.title} lede={c.chains.lede} />
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
                Pressure that builds over a conversation — scored on whether the policy still holds at the end, and whether
                legitimate requests still get through.
              </p>
            </figure>
            <div className="border border-rule bg-panel p-6" data-reveal>
              <ChainFlow steps={ACHILLES_CHAIN} label="Across channels · illustrative chain" />
            </div>
          </div>
        </Container>
      </section>

      <SectionBlend
        from="bone"
        to="navy"
        layers={[
          { art: "ivory-clouds-alt", opacity: 0.5, drift: 50 },
          { art: "dark-clouds-alt", opacity: 0.7, drift: -60 },
        ]}
      />

      <section data-surface="navy" aria-labelledby="gate-title" className="relative overflow-hidden pb-24 pt-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/transitions/transition-bronze-particles.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
        />
        <Container className="relative">
          <SectionIntro id="gate-title" align="center" eyebrow={c.gate.eyebrow} title={c.gate.title} lede={c.gate.lede} />
          <div className="mt-14">
            <ActionGate tests={ACHILLES_GATE_TESTS} title="Illustrative requests" />
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-fg-muted">{c.gate.footnote}</p>
        </Container>
      </section>

      <section data-surface="navy" aria-labelledby="questions-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="questions-title" eyebrow={c.questions.eyebrow} title={c.questions.title} lede={c.questions.lede} />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {ACHILLES_AUTHORITY_QUESTIONS.map((q) => (
              <li key={q.name} className="border border-rule bg-panel p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{q.name}</p>
                <p className="mt-3 font-display text-2xl leading-snug text-fg">{q.question}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <SectionBlend
        from="navy"
        to="bone"
        layers={[
          { art: "dark-clouds", opacity: 0.6, drift: 50 },
          { art: "ivory-clouds", opacity: 0.85, drift: -70 },
        ]}
      />

      <section data-surface="bone" aria-labelledby="effects-title" className="pb-24 pt-6">
        <Container>
          <SectionIntro id="effects-title" eyebrow={c.effects.eyebrow} title={c.effects.title} />
          <ul className="mt-12 grid gap-3 lg:grid-cols-3" data-reveal-group>
            {ACHILLES_EFFECTS.map((effect) => (
              <li key={effect.name} className="flex gap-4 border border-rule bg-panel p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={effect.icon} alt="" aria-hidden="true" className="h-12 w-12 shrink-0" />
                <div>
                  <p className="font-display text-2xl leading-tight text-fg">{effect.name}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{effect.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="handoff-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="handoff-title" eyebrow={c.handoff.eyebrow} title={c.handoff.title} lede={c.handoff.lede} />
          <div className="mt-12">
            <HandoffFlow steps={ACHILLES_HANDOFF} />
          </div>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="next-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="next-title" eyebrow={c.next.eyebrow} title={c.next.title} />
          <NextLinks items={NEXT} />
        </Container>
      </section>

      <SectionBlend
        from="bone"
        to="navy"
        layers={[
          { art: "ivory-clouds-alt", opacity: 0.5, drift: 50 },
          { art: "dark-clouds-alt", opacity: 0.7, drift: -60 },
        ]}
      />

      <ClosingCta
        title="Find out what your agents can actually do."
        secondary={{ label: "See How Mythos Validates Itself", href: "/platform/validation" }}
      />
    </PageMotion>
  );
}
