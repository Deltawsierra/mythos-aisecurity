import Link from "next/link";
import { Fragment } from "react";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Plain text with [label](href) links: site paths use Next links, everything else opens in a new tab. */
export function Inline({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, label, href] = m;
    if (m.index! > last) parts.push(text.slice(last, m.index));
    const cls = "font-medium text-accent underline decoration-accent/40 underline-offset-[3px] transition-colors hover:decoration-accent";
    parts.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={href} className={cls}>
          {label}
        </Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {label}
        </a>
      ),
    );
    last = m.index! + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}

/** The label text only, for places that can't hold links (metadata, structured data). */
export function plainText(text: string): string {
  return text.replace(LINK, "$1");
}
