import { Check, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type ListTone = "positive" | "risk";

interface UseCaseDeliverableListProps {
  items: string[];
  tone?: ListTone;
  /** Single-column on small screens; two columns from sm upward when true. */
  columns?: 1 | 2;
  className?: string;
}

/**
 * Shared bullet list for the deep-dive pages. `positive` renders bronze check
 * marks (deliverables, what the customer receives); `risk` renders ember
 * warning glyphs (what can go wrong). Items wrap and never overflow.
 */
export function UseCaseDeliverableList({
  items,
  tone = "positive",
  columns = 2,
  className,
}: UseCaseDeliverableListProps) {
  return (
    <ul
      role="list"
      className={cn(
        "grid gap-x-8 gap-y-2.5",
        columns === 2 && "sm:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex min-w-0 items-start gap-2.5 text-sm leading-relaxed text-muted-stone"
        >
          {tone === "risk" ? (
            <TriangleAlert
              size={15}
              strokeWidth={1.7}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-ember/80"
            />
          ) : (
            <Check
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-bronze"
            />
          )}
          <span className="break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}
