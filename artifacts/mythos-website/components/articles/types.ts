/** Long-form guides (Resources). Inline links in any text field use [label](href). */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "figure"; src: string; width: number; height: number; alt: string; caption: string }
  /** "Where Mythos fits" aside. */
  | { type: "fits"; text: string }
  | { type: "download"; label: string; href: string }
  | { type: "cta"; label: string; href: string };

export interface ArticleSection {
  id: string;
  heading: string;
  blocks: ArticleBlock[];
}

export interface Article {
  slug: string;
  href: string;
  title: string;
  /** Search title, without the site suffix. */
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** ISO dates. */
  published: string;
  researchChecked: string;
  readingMinutes: number;
  author: { name: string; role: string; bio: string };
  checklist?: { href: string; label: string };
  /** The first paragraph is the direct answer quoted by search and AI assistants. */
  intro: string[];
  sections: ArticleSection[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  sources: { title: string; href: string; note: string }[];
}
