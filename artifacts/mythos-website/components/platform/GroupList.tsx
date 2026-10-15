import { ChevronDown } from "lucide-react";

export interface Group {
  name: string;
  /** The plain-English question the group answers. */
  question: string;
  items: string[];
  /** Optional medallion shown in place of the number. */
  icon?: string;
}

/**
 * Expandable groups on native <details>: keyboard-accessible with no script,
 * and every item stays in the page for search and assistive technology.
 */
export function GroupList({ groups, columns = 2 }: { groups: Group[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul className={`grid items-start gap-3 ${cols}`} data-reveal-group>
      {groups.map((group, i) => (
        <li key={group.name}>
          <details className="group border border-rule bg-panel shadow-[0_18px_40px_-34px_rgba(11,31,51,0.45)] open:border-antique-gold/60">
            <summary className="flex cursor-pointer list-none items-start gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bronze/60 [&::-webkit-details-marker]:hidden">
              {group.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={group.icon} alt="" aria-hidden="true" loading="lazy" className="-my-1 h-16 w-16 shrink-0 drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)]" />
              ) : (
                <span className="font-display text-2xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
              )}
              <span className="flex-1">
                <span className="block font-display text-xl leading-tight text-fg">{group.name}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-fg-muted">{group.question}</span>
              </span>
              <ChevronDown size={18} aria-hidden="true" className="mt-1 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <ul className="grid gap-1.5 border-t border-rule px-5 pb-5 pt-4 text-sm text-fg">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </details>
        </li>
      ))}
    </ul>
  );
}
