import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow, PageHero, Section } from "@/components/ui/Section";
import { aboutCopy } from "@/lib/content";
import { photos } from "@/lib/media";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata("about", "/about");

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        photo={photos.heroLake}
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

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="grid gap-4">
            {aboutCopy.story.map((paragraph) => (
              <p key={paragraph} className="max-w-3xl text-lg text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <Photo
            photo={photos.console}
            className="aspect-[4/3] w-full"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
        <div className="mt-10 grid gap-px bg-white/10 md:grid-cols-3">
          {aboutCopy.credibility.map((item) => (
            <article key={item.title} className="bg-bg-elevated p-6">
              <h2 className="text-lg font-semibold text-ice">{item.title}</h2>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="scroll-mt-24 pt-0" id="contact">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="font-display text-3xl font-semibold text-ice">
              Contact HUANQI
            </h2>
            <ul className="mt-6 grid gap-3 text-sm text-muted">
              <li>
                Email{" "}
                <a className="text-cyan" href={`mailto:${site.email}`}>
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
