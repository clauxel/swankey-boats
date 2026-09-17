import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero, Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata("contact", "/contact");

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Contact"
        title="Request information, talk to engineering, or start a dealer conversation"
        lead={`${site.companyLine} ${site.address} ${site.email}`}
        actions={
          <>
            <ButtonLink href="/dealers">Become a Dealer</ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary">
              Email {site.email}
            </ButtonLink>
          </>
        }
      />
      <Section className="pt-0">
        <ContactForm />
      </Section>
    </main>
  );
}
