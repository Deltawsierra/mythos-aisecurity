import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Inline } from "@/components/articles/Inline";
import type { ArticleBlock, ArticleSection } from "@/components/articles/types";

const P = "mt-5 text-[17px] leading-[1.75] text-fg/90 first:mt-0";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className={P}>
          <Inline text={block.text} />
        </p>
      );
    case "h3":
      return <h3 className="mt-10 font-display text-[1.65rem] leading-snug text-fg">{block.text}</h3>;
    case "list":
      return (
        <ul className="mt-5 grid gap-3 pl-1">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[17px] leading-[1.7] text-fg/90">
              <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-antique-gold" />
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mt-7 overflow-x-auto border-y border-rule">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[15px]">
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="border-b border-rule py-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-b border-rule last:border-0">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="py-3 pr-4 align-top font-semibold text-fg">
                        <Inline text={cell} />
                      </th>
                    ) : (
                      <td key={i} className="py-3 pr-4 align-top leading-relaxed text-fg-muted">
                        <Inline text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "figure":
      return (
        <figure className="mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} width={block.width} height={block.height} loading="lazy" className="h-auto w-full border border-rule bg-white" />
          <figcaption className="mt-2 text-[13px] text-fg-muted">{block.caption}</figcaption>
        </figure>
      );
    case "fits":
      return (
        <aside className="mt-7 border-l-2 border-antique-gold bg-panel px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Where Mythos AI Security fits</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-fg">
            <Inline text={block.text} />
          </p>
        </aside>
      );
    case "download":
      return (
        <a
          href={block.href}
          download
          className="group mt-7 flex items-center gap-4 border border-antique-gold/50 bg-panel px-5 py-4 transition-colors hover:border-antique-gold"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bronze/40 text-bronze-deep">
            <Download size={18} aria-hidden="true" />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-xl leading-snug text-fg">{block.label}</span>
            <span className="text-[13px] text-fg-muted">One page · PDF · free, no form</span>
          </span>
          <ArrowRight size={16} aria-hidden="true" className="ml-auto shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
        </a>
      );
    case "cta":
      return (
        <div className="mt-8">
          <Button href={block.href} variant="primary" size="lg" arrow>
            {block.label}
          </Button>
        </div>
      );
  }
}

/** Table of contents (sticky beside the text on desktop) and the article sections. */
export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,44rem)] lg:gap-16">
      <nav aria-label="In this guide" className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">In this guide</p>
        <ol className="mt-4 grid gap-2.5 border-l border-rule pl-4 text-[14px] leading-snug">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-fg-muted transition-colors hover:text-fg">
                {s.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div>
        {sections.map((s) => (
          <section key={s.id} aria-labelledby={s.id} className="mt-16 scroll-mt-28 first:mt-0">
            <h2 id={s.id} className="mb-6 font-display text-[2rem] leading-[1.15] text-fg sm:text-[2.35rem]">
              {s.heading}
            </h2>
            {s.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
