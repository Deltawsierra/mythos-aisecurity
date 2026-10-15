import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OUTPUTS } from "@/content/platform";

/** What a customer receives, plain English first, with who uses it. */
export function OutputsGrid() {
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
        {OUTPUTS.map((output) => (
          <li
            key={output.id}
            className="group flex flex-col border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(11,31,51,0.45)] transition-[border-color,box-shadow] duration-500 hover:border-antique-gold/60 hover:shadow-[0_26px_50px_-30px_rgba(122,63,29,0.5)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={output.icon}
              alt=""
              aria-hidden="true"
              className="h-14 w-14 transition-transform duration-700 ease-out group-hover:-translate-y-0.5 group-hover:rotate-[4deg]"
            />
            <p className="mt-5 font-display text-2xl leading-none text-fg">{output.name}</p>
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-muted">{output.plain}</p>
            <p className="mt-4 border-t border-rule pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
              {output.audience}
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/outputs"
        className="group mt-8 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
      >
        Everything Mythos produces
        <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
