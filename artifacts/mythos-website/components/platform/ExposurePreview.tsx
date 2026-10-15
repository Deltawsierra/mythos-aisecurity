import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Illustrative figures only — never a customer result.
const P = { p10: 0.6, p50: 2.1, p90: 7.4 }; // $M
const CURRENT = 3.2; // expected annual exposure, $M
const RESIDUAL = 0.9; // after the proposed fix, $M
const FIX = 0.4; // cost of the fix, $M

const W = 560;
const H = 200;
const MAX = 10; // $M shown on the axis

/** Right-skewed loss curve (log-normal) sampled at build time. */
function curve() {
  const mu = Math.log(P.p50);
  const sigma = (Math.log(P.p90) - mu) / 1.2816;
  const pdf = (x: number) =>
    Math.exp(-((Math.log(x) - mu) ** 2) / (2 * sigma * sigma)) / (x * sigma * Math.sqrt(2 * Math.PI));
  const xs = Array.from({ length: 120 }, (_, i) => 0.05 + (i / 119) * (MAX - 0.05));
  const peak = Math.max(...xs.map(pdf));
  const pts = xs.map((x) => [(x / MAX) * W, H - (pdf(x) / peak) * (H - 24)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${W} ${H} L0 ${H} Z` };
}

const X = (v: number) => (v / MAX) * W;
const money = (v: number) => `$${v.toFixed(1)}M`;

/**
 * Economic Exposure, previewed with clearly illustrative numbers: a range, not
 * a prediction, and the exposure a proposed fix could remove.
 */
export function ExposurePreview({ compact = false }: { compact?: boolean }) {
  const { line, area } = curve();
  return (
    <div className="grid gap-8 border border-rule bg-panel p-6 shadow-[0_24px_50px_-36px_rgba(11,31,51,0.5)] lg:grid-cols-[1.25fr_1fr] lg:p-9">
      <figure>
        <figcaption className="mb-4 flex items-baseline justify-between gap-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Modeled loss range · one validated scenario</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-fg-muted">Illustrative</span>
        </figcaption>
        <svg viewBox={`0 0 ${W} ${H + 28}`} className="w-full" role="img" aria-label={`Illustrative loss distribution: P10 ${money(P.p10)}, P50 ${money(P.p50)}, P90 ${money(P.p90)}`}>
          <defs>
            <linearGradient id="exp-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#b8823f" stopOpacity="0.4" />
              <stop offset="1" stopColor="#b8823f" stopOpacity="0.04" />
            </linearGradient>
            <clipPath id="exp-band">
              <rect x={X(P.p10)} y={0} width={X(P.p90) - X(P.p10)} height={H} />
            </clipPath>
          </defs>
          <path d={area} fill="url(#exp-fill)" opacity={0.35} />
          <path d={area} fill="url(#exp-fill)" clipPath="url(#exp-band)" />
          <path d={line} fill="none" stroke="#7a3f1d" strokeWidth={2} />
          {(
            [
              ["P10", P.p10],
              ["P50", P.p50],
              ["P90", P.p90],
            ] as const
          ).map(([label, v]) => (
            <g key={label}>
              <line x1={X(v)} x2={X(v)} y1={18} y2={H} stroke="#0b1f33" strokeWidth={label === "P50" ? 1.5 : 1} strokeDasharray={label === "P50" ? undefined : "3 4"} />
              <text x={X(v)} y={12} textAnchor="middle" className="hidden font-sans text-[11px] font-semibold sm:inline" fill="#0b1f33">
                {label} {money(v)}
              </text>
            </g>
          ))}
          <line x1={0} x2={W} y1={H} y2={H} stroke="#5d6872" strokeWidth={1} />
          {[0, 2.5, 5, 7.5, 10].map((v) => (
            <text key={v} x={X(v)} y={H + 18} textAnchor={v === 0 ? "start" : v === MAX ? "end" : "middle"} className="hidden font-sans text-[10px] sm:inline" fill="#5d6872">
              ${v}M
            </text>
          ))}
        </svg>
        {/* On phones the chart labels would be too small to read. */}
        <dl className="mt-3 grid grid-cols-3 gap-2 text-center sm:hidden">
          {(
            [
              ["P10", P.p10],
              ["P50", P.p50],
              ["P90", P.p90],
            ] as const
          ).map(([label, v]) => (
            <div key={label} className="border border-rule px-2 py-1.5">
              <dt className="text-[10px] font-semibold tracking-[0.18em] text-accent">{label}</dt>
              <dd className="text-sm font-semibold text-fg">{money(v)}</dd>
            </div>
          ))}
        </dl>
      </figure>

      <div className="flex flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Expected annual exposure</p>
        <dl className="mt-4 space-y-4">
          {(
            [
              ["Today", CURRENT, "bg-deep-copper"],
              ["After the proposed fix", RESIDUAL, "bg-state-verified"],
            ] as const
          ).map(([label, v, tone]) => (
            <div key={label}>
              <dt className="flex justify-between text-sm text-fg-muted">
                <span>{label}</span>
                <span className="font-semibold text-fg">{money(v)}</span>
              </dt>
              <dd className="mt-1.5 h-2.5 bg-marble">
                <span className={`block h-full ${tone}`} style={{ width: `${(v / CURRENT) * 100}%` }} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm leading-relaxed text-fg-muted">
          A {money(FIX)} fix that removes about {money(CURRENT - RESIDUAL)} of modeled annual exposure — with the
          assumptions, sources and confidence shown beside every figure.
        </p>
        {!compact && (
          <Link
            href="/platform/economic-exposure"
            className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
          >
            Explore Economic Exposure
            <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
