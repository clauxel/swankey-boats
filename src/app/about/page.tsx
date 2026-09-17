import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, PageHero, Section } from "@/components/ui/Section";
import { aboutCopy } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata("about", "/about");

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About / Contact"
        title={aboutCopy.title}
        lead={aboutCopy.lead}
        actions={
          <>
            <ButtonLink href="#contact">Contact HUANQI</ButtonLink>
            <ButtonLink href="/dealers" variant="secondary">
              Become a Dealer
            </ButtonLink>
          </>
        }
      />

      <Section className="pt-0">
        <div className="grid gap-4">
          {aboutCopy.story.map((paragraph) => (
            <p key={paragraph} className="max-w-3xl text-lg text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {aboutCopy.credibility.map((item) => (
            <article key={item.title} className="surface rounded-3xl p-6">
              <h2 className="text-lg font-semibold text-ice">{item.title}</h2>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0" id="contact">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="font-display text-3xl font-semibold text-ice">
              Contact HUANQI
            </h2>
            <ul className="mt-6 grid gap-3 text-sm text-muted">
              <li>
                Email{" "}
                <a className="text-cyan-bright" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>Address · {site.address}</li>
              <li>Website · {site.domain}</li>
              <li>Working model · {site.productModel}</li>
            </ul>
            <p className="mt-6 text-sm text-muted">{site.brandSlogan}</p>
          </div>
          <ContactForm defaultTopic="other" />
        </div>
      </Section>
    </main>
  );
}
