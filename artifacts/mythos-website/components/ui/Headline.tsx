import { Fragment } from "react";

/**
 * Render a headline whose *starred* words take the surface accent: gold on
 * dark fields, bronze deep on ivory (gold text on ivory fails contrast).
 */
export function Accent({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="accent-word">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain text for aria-labels and metadata. */
export const plain = (text: string) => text.replace(/\*/g, "");
