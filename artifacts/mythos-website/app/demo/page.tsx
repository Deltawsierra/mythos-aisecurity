import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

// Demo requests moved into the contact form. The site is a static export, so
// this route forwards with a meta refresh (React hoists it into <head>) and
// keeps a visible link for anyone it doesn't reach.
const DEMO_FORM = "/contact/?intent=demo";

export const metadata: Metadata = {
  title: "Request a Demo",
  robots: { index: false, follow: true },
};

export default function DemoRedirectPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${DEMO_FORM}`} />
      <section data-surface="parchment" className="py-40">
        <Container className="max-w-xl text-center">
          <p className="text-base leading-relaxed text-fg-muted">
            Demo requests now go through our contact form.
          </p>
          <Link
            href={DEMO_FORM}
            className="mt-6 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent hover:underline"
          >
            Continue to Request a Demo
          </Link>
        </Container>
      </section>
    </>
  );
}
