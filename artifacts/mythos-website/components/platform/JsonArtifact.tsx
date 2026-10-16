"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * An inspectable synthetic artifact (Launch Guide fixture F07): the export
 * as readable JSON with a copy action that copies exactly what is shown.
 */
export function JsonArtifact({ title, data }: { title: string; data: unknown }) {
  const text = JSON.stringify(data, null, 2);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <figure className="overflow-hidden border border-rule bg-charcoal shadow-[0_30px_60px_-36px_rgba(0,0,0,0.8)]">
      <figcaption className="flex items-center justify-between gap-4 border-b border-ivory/10 px-5 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">{title}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-ivory/25 px-3 text-xs font-semibold text-ivory transition-colors hover:border-ivory/60"
        >
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          {copied ? "Copied" : "Copy JSON"}
        </button>
      </figcaption>
      <pre className="max-h-[28rem] overflow-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-ivory/90">
        <code>{text}</code>
      </pre>
      <p className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </p>
    </figure>
  );
}
