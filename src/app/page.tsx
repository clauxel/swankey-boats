import { HomeHero } from "@/components/home/Hero";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Photo } from "@/components/ui/Photo";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { differentiators, specs } from "@/lib/content";
import { galleryPhotos, photos } from "@/lib/media";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata("home", "/");

const snapshot = specs.filter((item) =>
  ["Length", "Beam", "Propulsion", "Station keeping", "Order status", "Lead time"].includes(
    item.label,
  ),
);

export default function HomePage() {
  return (
    <main id="main">
      <HomeHero />

      <Section>
        <Eyebrow>Positioning</Eyebrow>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h2 className="font-display max-w-3xl text-3xl leading-tight font-semibold text-ice sm:text-5xl">
            {site.positioning}
          </h2>
          <p className="text-muted">{site.differentiation}</p>
        </div>
        <p className="mt-6 text-sm text-ice/80">
          For lakes, reservoirs, inland waterways and protected near-shore areas — France, Germany
          and other European inland markets first.
        </p>
      </Section>

      <Section className="pt-0">
        <Eyebrow>Why HQ E498</Eyebrow>
        <h2 className="font-display max-w-3xl text-3xl font-semibold text-ice sm:text-4xl">
          Built as one system for the cast
        </h2>
        <div className="mt-10 grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-3">
          {differentiators.map((item) => (
            <article key={item.title} className="bg-bg-elevated p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-ice">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Craftsmanship />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Product snapshot</Eyebrow>
            <h2 className="font-display text-3xl font-semibold text-ice sm:text-4xl">
              {site.productModel} · {site.productType}
            </h2>
            <p className="mt-4 text-lg text-ice">{site.productSlogan}</p>
            <p className="mt-3 text-muted">
              Aluminum monohull with a shallow-water fishing layout. Integrated electric jet with
              protected intake. Configurable battery system by market package.
            </p>
            <dl className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2">
              {snapshot.map((item) => (
                <div key={item.label} className="bg-bg p-4">
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm text-ice">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/product">Explore HQ E498</ButtonLink>
              <ButtonLink href="/contact?topic=product" variant="secondary">
                Request Product Information
              </ButtonLink>
            </div>
          </div>
          <Photo
            photo={photos.heroLake}
            className="aspect-[4/3] w-full lg:aspect-[5/6]"
            imgClassName="object-cover object-[62%_70%]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </Section>

      <section className="border-y border-white/10 bg-ice">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Engineering</Eyebrow>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-graphite sm:text-4xl">
                Deck. Battery. Jet. One system.
              </h2>
              <p className="mt-4 text-graphite/70">
                Hull, jet propulsion, battery, BMS, control, station keeping, deck and fishing
                functions are delivered together — so dealers are not assembling a propulsion stack
                on the water.
              </p>
              <div className="mt-8">
                <ButtonLink href="/technology">See the technology</ButtonLink>
              </div>
            </div>
            <Photo
              photo={photos.cutaway}
              className="aspect-[16/10] w-full bg-white"
              imgClassName="object-contain object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Sample boats and small pilot orders are available"
        body="Initial cooperation is non-exclusive. We are building a European dealer network starting with France, Germany and other active lake and reservoir markets."
        secondaryHref="/dealers#apply"
        secondaryLabel="Apply to Become a Dealer"
      />

      <Section>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="font-display text-3xl font-semibold text-ice">On the water, on the deck</h2>
          </div>
          <ButtonLink href="/gallery" variant="secondary">
            View gallery
          </ButtonLink>
        </div>
        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {galleryPhotos.slice(0, 3).map((item) => (
            <figure key={item.id} className="relative">
              <Photo
                photo={item.photo}
                className={item.id === "hero-dawn" ? "aspect-[16/10] md:aspect-[4/5]" : "aspect-[4/5]"}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-sm text-ice">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
      <Container className="pb-16">
        <p className="text-center text-sm tracking-[0.18em] text-muted uppercase">{site.brandSlogan}</p>
      </Container>
    </main>
  );
}
