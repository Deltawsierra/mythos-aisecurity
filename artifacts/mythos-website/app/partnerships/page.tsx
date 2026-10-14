import { ScaffoldPage, scaffoldMetadata } from "@/components/scaffold/ScaffoldPage";
import { RESOURCE_PAGES } from "@/content/resources";

const page = RESOURCE_PAGES.partnerships;

export const metadata = scaffoldMetadata(page);

export default function PartnershipsPage() {
  return (
    <ScaffoldPage
      page={page}
      breadcrumbs={[{ label: "Home", href: "/" }]}
      art={{ kind: "emblem", src: "/assets/ornaments/mythos-assurance-ring.svg" }}
      secondaryCta={{ label: "Start a Partnership Conversation", href: "/contact?intent=partnership" }}
    />
  );
}
