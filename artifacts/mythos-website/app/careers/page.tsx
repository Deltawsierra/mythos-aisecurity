import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { CAREERS } from "@/content/company";
import { OLYMPUS_MEDIA, SCENES } from "@/content/media";

export const metadata: Metadata = {
  title: "Careers — Build the Systems That Test AI",
  description:
    "What building Mythos involves. There are no open roles right now; when one opens it will be listed here with its team, location, eligibility and how to apply.",
  alternates: { canonical: "/careers/" },
  ...socialImage("careers", "Build the Systems That Test AI — Mythos AI Security"),
};

const c = CAREERS;

/** Careers — Launch Guide §12 /careers. No roles are open, so none are shown. */
export default function CareersPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={c.hero.lede}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
        ]}
        current="Careers"
        primaryCta={{ label: "See Open Roles", href: "#roles-title" }}
        secondaryCta={{ label: "About Mythos", href: "/company" }}
        planes={[{ src: SCENES.careers.src, mobileSrc: SCENES.careers.phone, className: "-inset-[3%]", position: "60% 50%", depth: 6, priority: true }]}
        compact
        into="ivory"
      />

      {/* Open roles */}
      <section data-surface="ivory" aria-labelledby="roles-title" className="scroll-mt-24 pb-24 pt-10">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro id="roles-title" eyebrow={c.roles.eyebrow} title={<Accent text={c.roles.title} />} caps />
          <div className="border border-rule bg-panel p-8 lg:mt-10">
            <p className="text-lg leading-relaxed text-fg">{c.roles.body}</p>
          </div>
        </Container>
      </section>

      {/* The work */}
      <section data-surface="parchment" aria-labelledby="work-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="work-title" eyebrow={c.work.eyebrow} title={<Accent text={c.work.title} />} caps />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {c.work.items.map((w) => (
              <li key={w.name} className="border border-rule bg-panel p-6">
                <p className="font-display text-2xl text-fg">{w.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{w.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Interest */}
      <section data-surface="ivory" aria-labelledby="interest-title" className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro id="interest-title" eyebrow={c.interest.eyebrow} title={<Accent text={c.interest.title} />} caps />
          <div className="lg:mt-10">
            <p className="text-[17px] leading-relaxed text-fg">{c.interest.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact?intent=careers" variant="primary" size="lg" arrow>
                Send a Note
              </Button>
              <Button href="/company" variant="secondary" size="lg">
                Our Principles
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </PageMotion>
  );
}
