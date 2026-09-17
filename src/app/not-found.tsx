import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero, Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <main id="main">
      <PageHero
        eyebrow="404"
        title="This page is not on the chart"
        lead="The URL does not match a HUANQI page. Return home or open the dealer application."
        actions={
          <>
            <ButtonLink href="/">Home</ButtonLink>
            <ButtonLink href="/dealers" variant="secondary">
              Become a Dealer
            </ButtonLink>
          </>
        }
      />
      <Section className="pt-0">
        <p className="text-sm text-muted">
          Looking for the boat? Start at{" "}
          <Link className="text-cyan-bright" href="/product">
            HQ E498
          </Link>
          .
        </p>
      </Section>
    </main>
  );
}
