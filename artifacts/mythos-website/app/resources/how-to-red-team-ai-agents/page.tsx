import type { Metadata } from "next";
import Link from "next/link";
import { socialImage } from "@/lib/social";
import { Container } from "@/components/ui/Container";
import { PageMotion } from "@/components/motion/PageMotion";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { Inline, plainText } from "@/components/articles/Inline";
import { Faq } from "@/components/platform/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { RED_TEAM_AI_AGENTS as A } from "@/content/articles/redTeamAiAgents";
import { SCENES, scenePlanes } from "@/content/media";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

const SOCIAL_KEY = "resources-how-to-red-team-ai-agents";

export const metadata: Metadata = {
  title: A.seoTitle,
  description: A.metaDescription,
  alternates: { canonical: `${A.href}/` },
  authors: [{ name: A.author.name }],
  ...socialImage(SOCIAL_KEY, `${A.title} — Mythos AI Security`),
};

const DATE = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
const fmt = (iso: string) => DATE.format(new Date(`${iso}T00:00:00Z`));

/** Article structured data: only what the page states (author, dates, sources). */
const ARTICLE_LD = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${absoluteUrl(A.href)}#article`,
  headline: A.title,
  description: A.metaDescription,
  image: `${SITE_URL}/assets/social/pages/${SOCIAL_KEY}.jpg`,
  datePublished: A.published,
  dateModified: A.researchChecked,
  inLanguage: "en",
  mainEntityOfPage: absoluteUrl(A.href),
  author: { "@type": "Person", name: A.author.name, jobTitle: A.author.role.split(",")[0], worksFor: { "@id": `${SITE_URL}/#organization` } },
  publisher: { "@id": `${SITE_URL}/#organization` },
  about: ["AI red teaming", "AI agent security testing", "Prompt injection", "OWASP Top 10 for LLM Applications"],
  citation: A.sources.map((s) => s.href),
};

/** First Mythos guide — Resources. */
export default function RedTeamAiAgentsPage() {
  return (
    <PageMotion>
      <JsonLd data={ARTICLE_LD} />
      <ScenicHero
        eyebrow={A.eyebrow}
        headline="How to Red-Team an AI Agent: *What to Test Before It Touches Real Systems.*"
        longHeadline
        lede={plainText(A.intro[0])}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
        current="How to Red-Team an AI Agent"
        primaryCta={{ label: "Request an Agent Assessment", href: "/contact" }}
        secondaryCta={{ label: "Get the Checklist", href: "#how-do-you-start-with-one-consequential-workflow" }}
        planes={scenePlanes(SCENES.achilles, "62% 50%")}
        into="ivory"
      />

      <article data-surface="ivory" aria-label={A.title} className="pb-24 pt-8">
        <Container>
          <div className="lg:pl-[calc(15rem+4rem)]">
            <p className="flex flex-col gap-y-1 text-[13px] text-fg-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
              <span>
                By <span className="font-semibold text-fg">{A.author.name}</span>, {A.author.role}
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>
                Published <time dateTime={A.published}>{fmt(A.published)}</time>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>
                Research checked <time dateTime={A.researchChecked}>{fmt(A.researchChecked)}</time>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>{A.readingMinutes} min read</span>
            </p>
            <div className="mt-8 max-w-[44rem]">
              {A.intro.slice(1).map((p) => (
                <p key={p} className="mt-5 text-[19px] leading-[1.7] text-fg first:mt-0">
                  <Inline text={p} />
                </p>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <ArticleBody sections={A.sections} />
          </div>

          <div className="mt-20 lg:pl-[calc(15rem+4rem)]">
            <section aria-labelledby="faq-title" className="max-w-[44rem]">
              <h2 id="faq-title" className="mb-8 font-display text-[2rem] leading-[1.15] text-fg sm:text-[2.35rem]">
                {A.faqHeading}
              </h2>
              <Faq items={A.faq} />
            </section>

            <section aria-labelledby="author-title" className="mt-16 max-w-[44rem] border border-rule bg-panel p-6">
              <h2 id="author-title" className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                About the author
              </h2>
              <p className="mt-3 font-display text-2xl text-fg">{A.author.name}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{A.author.bio}</p>
              <Link href="/company" className="mt-3 inline-block text-[13px] font-semibold text-accent hover:underline">
                About Mythos
              </Link>
            </section>

            <section aria-labelledby="sources-title" className="mt-16 max-w-[44rem]">
              <h2 id="sources-title" className="font-display text-2xl text-fg">
                Sources and further reading
              </h2>
              <ol className="mt-5 grid gap-3 text-[15px] leading-relaxed text-fg-muted">
                {A.sources.map((s) => (
                  <li key={s.href + s.title}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-rule underline-offset-[3px] hover:decoration-accent">
                      {s.title}
                    </a>
                    . {s.note}.
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-[14px] text-fg-muted">
                For the terms used here, see the <Link href="/glossary" className="font-medium text-accent hover:underline">AI Assurance Glossary</Link>.
              </p>
            </section>
          </div>
        </Container>
      </article>

      <ClosingVista
        from="ivory"
        vista="b"
        title="Start with *one consequential workflow.*"
        primary={{ label: "Request an Agent Assessment", href: "/contact" }}
        secondary={{ label: "See the Example Report", href: "/example-report" }}
      />
    </PageMotion>
  );
}
