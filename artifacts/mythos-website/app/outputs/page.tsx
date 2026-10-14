import { ScaffoldPage, scaffoldMetadata } from "@/components/scaffold/ScaffoldPage";
import { RESOURCE_PAGES } from "@/content/resources";

const page = RESOURCE_PAGES.outputs;

export const metadata = scaffoldMetadata(page);

export default function OutputsPage() {
  return (
    <ScaffoldPage
      page={page}
      breadcrumbs={[{ label: "Home", href: "/" }]}
      art={{ kind: "emblem", src: "/assets/evidence/evidence-pack.svg" }}
      secondaryCta={{ label: "View Example Report", href: "/example-report" }}
    />
  );
}
