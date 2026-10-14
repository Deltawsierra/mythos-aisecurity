import { ScaffoldPage, scaffoldMetadata } from "@/components/scaffold/ScaffoldPage";
import { RESOURCE_PAGES } from "@/content/resources";

const page = RESOURCE_PAGES.engagement;

export const metadata = scaffoldMetadata(page);

export default function EngagementPage() {
  return (
    <ScaffoldPage
      page={page}
      breadcrumbs={[{ label: "Home", href: "/" }]}
      art={{ kind: "emblem", src: "/assets/lifecycle/lifecycle-medallion-discover.svg" }}
      secondaryCta={{ label: "Contact Mythos", href: "/contact" }}
    />
  );
}
