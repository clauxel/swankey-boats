import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { PageHero, Section } from "@/components/ui/Section";
import { photos } from "@/lib/media";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata("contact", "/contact");

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        photo={photos.stern}
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
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <Photo
              photo={photos.cutaway}
              className="aspect-[16/10] w-full bg-white"
              imgClassName="object-contain bg-white"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <p className="mt-4 text-sm text-muted">
              Working model {site.productModel}. Sample boats and small pilot orders are available.
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
