import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CareersHero } from "@/components/careers/CareersHero";
import { WhyJoinMythos } from "@/components/careers/WhyJoinMythos";
import { CurrentOpenings } from "@/components/careers/CurrentOpenings";
import { WhatWeLookFor } from "@/components/careers/WhatWeLookFor";
import { HiringProcess } from "@/components/careers/HiringProcess";
import { CareersCTA } from "@/components/careers/CareersCTA";
import { OpenTalentForm } from "@/components/careers/OpenTalentForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore future career opportunities at Mythos AI Security and submit an Open Talent application for future roles across AI security, software engineering, cybersecurity, cloud, product, design, research, and go-to-market.",
};

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <WhyJoinMythos />
      <CurrentOpenings />
      <WhatWeLookFor />

      {/* Open Talent application ───────────────────────────── */}
      <section
        id="open-talent"
        className="scroll-mt-24 border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="open-talent-heading"
      >
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <ScrollReveal>
              <div>
                <p className={EYEBROW}>Open Talent</p>
                <h2 id="open-talent-heading" className={HEADING}>
                  Introduce yourself to Mythos.
                </h2>
                <p className={`${BODY} max-w-sm`}>
                  This application is always open. Tell us who you are, what you
                  are great at, and why AI security pulls at you. We review every
                  submission and reach out when there is a fit.
                </p>
                <ul className="mt-8 flex flex-col gap-5">
                  <li className="border-l-2 border-bronze/30 pl-5">
                    <p className="mb-1 text-sm font-semibold text-ivory">
                      Resume goes straight to our team
                    </p>
                    <p className="text-sm leading-relaxed text-muted-stone">
                      Your application is emailed directly to the Mythos hiring
                      team — not stored on this website.
                    </p>
                  </li>
                  <li className="border-l-2 border-ivory/15 pl-5">
                    <p className="mb-1 text-sm font-semibold text-ivory">
                      Open to all backgrounds
                    </p>
                    <p className="text-sm leading-relaxed text-muted-stone">
                      Research, engineering, security, product, operations, and
                      early-career — there is a path for strong people.
                    </p>
                  </li>
                  <li className="border-l-2 border-ivory/15 pl-5">
                    <p className="mb-1 text-sm font-semibold text-ivory">
                      Reviewed with care
                    </p>
                    <p className="text-sm leading-relaxed text-muted-stone">
                      A person reads every application. We keep what you share
                      confidential to the hiring process.
                    </p>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="border border-ivory/8 bg-charcoal/70 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
                <OpenTalentForm />
              </div>
            </ScrollReveal>
          </div>

          {/* Privacy & safety notes */}
          <ScrollReveal>
            <div className="mx-auto mt-12 max-w-3xl border border-bronze/25 bg-charcoal p-8 lg:p-10">
              <p className={EYEBROW}>How your application is handled</p>
              <h3 className="mb-4 text-2xl font-normal leading-tight text-ivory lg:text-3xl">
                Email-only, no storage.
              </h3>
              <p className={`${BODY} mb-4`}>
                Your application and resume are delivered directly to the Mythos
                hiring team by email. We do not save applications, resumes, or any
                applicant data on this website, in a database, or in your browser.
              </p>
              <p className="text-sm leading-relaxed text-muted-stone/70">
                Please keep passwords, credentials, government ID numbers,
                financial details, and other sensitive personal data out of your
                resume and message. Share only what is relevant to your
                candidacy.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <HiringProcess />
      <CareersCTA />
    </>
  );
}
