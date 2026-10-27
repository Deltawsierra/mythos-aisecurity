import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { SCENES } from "@/content/media";

/**
 * The shared frame for the 404 and error pages: the road that ends in cloud (F5), a shade pool behind the copy, and whatever recovery tools the
 * page passes in. All copy is DOM.
 */
export function LostPath({ code, title, body, children }: { code: string; title: string; body: string; children: ReactNode }) {
  return (
    <section data-surface="charcoal" aria-labelledby="lost-title" className="relative isolate -mt-16 min-h-[100svh] overflow-hidden lg:-mt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <picture>
          <source media="(max-width: 767px)" srcSet={SCENES.notFound.phone} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SCENES.notFound.src} alt="" className="absolute inset-0 h-full w-full object-cover object-[60%_50%]" />
        </picture>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,21,23,0.9) 0%, rgba(18,21,23,0.62) 40%, rgba(18,21,23,0.7) 100%)" }} />
        <div className="absolute inset-0 hidden lg:block" style={{ background: "radial-gradient(ellipse 44% 60% at 30% 50%, rgba(18,21,23,0.82) 0%, rgba(18,21,23,0.5) 60%, rgba(18,21,23,0) 90%)" }} />
      </div>
      <Container className="relative flex min-h-[100svh] flex-col justify-center pb-20 pt-32">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne">
            <span aria-hidden="true" className="h-px w-10 bg-champagne/70" />
            {code}
          </p>
          <h1 id="lost-title" aria-label={title.replaceAll("*", "")} className="display-caps mt-5 font-display text-[2.4rem] text-ivory sm:text-[3.2rem]">
            <Accent text={title} />
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ivory/85">{body}</p>
          <div className="mt-10">{children}</div>
        </div>
      </Container>
    </section>
  );
}
