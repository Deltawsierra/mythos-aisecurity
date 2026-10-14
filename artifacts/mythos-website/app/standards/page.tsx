import { ScaffoldPage, scaffoldMetadata } from "@/components/scaffold/ScaffoldPage";
import { RESOURCE_PAGES } from "@/content/resources";

const page = RESOURCE_PAGES.standards;

export const metadata = scaffoldMetadata(page);

export default function StandardsPage() {
  return (
    <ScaffoldPage
      page={page}
      breadcrumbs={[{ label: "Home", href: "/" }]}
      art={{ kind: "emblem", src: "/assets/ornaments/mythos-seal.svg" }}
      secondaryCta={{ label: "See Trust & Security", href: "/trust" }}
    />
  );
}
