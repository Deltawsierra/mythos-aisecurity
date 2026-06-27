import { Atom, Compass, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type HorizonVariant = "hermes" | "quantum";

interface StrategicHorizonNoticeProps {
  variant: HorizonVariant;
  className?: string;
}

/**
 * Reusable strategic-horizon / strategic-R&D disclaimer. Keeps Hermes and
 * quantum-adjacent scenarios clearly labeled as future-facing direction — never
 * a current public product, safety certification, or guarantee. Small, quiet,
 * dark-glass panel with a bronze/gold accent and a subtle lucide icon.
 */
const VARIANTS: Record<
  HorizonVariant,
  { label: string; body: string; Icon: LucideIcon }
> = {
  hermes: {
    label: "Strategic Horizon / Project Hermes",
    body: "This scenario describes the Project Hermes direction for AI-driven vehicle, fleet, autonomy, telematics, OTA/model update, and cyber-physical mobility assurance. It should not be read as a vehicle safety certification, crash-prevention guarantee, or replacement for OEM safety validation.",
    Icon: Compass,
  },
  quantum: {
    label: "Strategic R&D Scenario",
    body: "This scenario describes future-facing AI assurance considerations around post-quantum readiness, cryptographic inventory, vendor evidence, advanced simulation, and specialized compute workflows. It is not a claim of current quantum-safe certification, quantum hardware validation, or production quantum integration capability.",
    Icon: Atom,
  },
};

export function StrategicHorizonNotice({
  variant,
  className,
}: StrategicHorizonNoticeProps) {
  const { label, body, Icon } = VARIANTS[variant];
  return (
    <aside
      aria-label={label}
      className={cn(
        "flex gap-4 border border-bronze/30 border-l-2 border-l-bronze bg-obsidian/50 px-5 py-4 backdrop-blur-sm",
        className,
      )}
    >
      <Icon
        className="mt-0.5 h-5 w-5 shrink-0 text-antique-gold"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-antique-gold">
          {label}
        </p>
        <p className="text-sm leading-relaxed text-muted-stone">{body}</p>
      </div>
    </aside>
  );
}
