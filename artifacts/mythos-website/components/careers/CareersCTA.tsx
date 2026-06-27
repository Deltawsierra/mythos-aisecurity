import { CTASection } from "@/components/sections/CTASection";

export function CareersCTA() {
  return (
    <CTASection
      badge="Join Mythos"
      headline="Don't see your role? Introduce yourself."
      subline="Mythos hires for judgment, rigor, and integrity. If you want to help hold AI accountable before it ships, apply through Open Talent or start a conversation."
      primaryCta={{ label: "Apply to Open Talent", href: "#open-talent" }}
      secondaryCta={{ label: "Contact Mythos", href: "/contact" }}
      variant="bordered"
      backgroundImage="/images/heroes/Company-Hero-Background.png"
    />
  );
}
