import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface NextLink {
  eyebrow: string;
  title: string;
  href: string;
}

/** "Keep going" cards that close an inner page before its CTA. */
export function NextLinks({ items }: { items: NextLink[] }) {
  return (
    <ul className="mt-10 grid gap-3 md:grid-cols-3" data-reveal-group>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex h-full flex-col justify-between border border-rule bg-panel p-6 transition-[border-color,box-shadow] duration-500 hover:border-antique-gold/60 hover:shadow-[0_26px_50px_-30px_rgba(122,63,29,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
          >
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{item.eyebrow}</span>
              <span className="mt-2 block font-display text-2xl leading-tight text-fg">{item.title}</span>
            </span>
            <ArrowRight size={16} aria-hidden="true" className="mt-6 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
