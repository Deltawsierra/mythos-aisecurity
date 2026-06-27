import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/PricingHero";
import { ScopedAssessment } from "@/components/pricing/ScopedAssessment";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { AddOns } from "@/components/pricing/AddOns";
import { ScopeFactors } from "@/components/pricing/ScopeFactors";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PricingCTA } from "@/components/pricing/PricingCTA";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Review Mythos AI Security's assessment-led pricing for AI deployment assurance, including scoped assessments, recurring packages, add-ons, and custom mission support.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <ScopedAssessment />
      <PricingTiers />
      <AddOns />
      <ScopeFactors />
      <PricingFAQ />
      <PricingCTA />
    </>
  );
}
