import { ScaffoldPage, scaffoldMetadata } from "@/components/scaffold/ScaffoldPage";
import { RESOURCE_PAGES } from "@/content/resources";

const page = RESOURCE_PAGES.glossary;

export const metadata = scaffoldMetadata(page);

export default function GlossaryPage() {
  return (
    <ScaffoldPage
      page={page}
      breadcrumbs={[{ label: "Home", href: "/" }]}
      art={{ kind: "emblem", src: "/assets/ornaments/laurel-wreath.svg" }}
      secondaryCta={{ label: "Explore Use Cases", href: "/use-cases" }}
    />
  );
}
