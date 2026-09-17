import { HomeHero } from "@/components/home/Hero";
import { ButtonLink } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { BassBoat } from "@/components/visual/LakeScene";
import { differentiators, gallerySlots, specs } from "@/lib/content";
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
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {differentiators.map((item) => (
            <article key={item.title} className="surface rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-ice">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
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
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {snapshot.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 p-4">
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-cyan-bright uppercase">
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
          <MediaSlot
            label="HQ E498 product snapshot"
            caption="Replace with white-background 45° render or sample-boat photograph."
            ratio="hero"
          >
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <BassBoat className="max-h-full w-full" />
            </div>
          </MediaSlot>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="surface overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10">
          <Eyebrow>Dealer path</Eyebrow>
          <h2 className="font-display max-w-3xl text-3xl font-semibold text-ice sm:text-4xl">
            Sample boats and small pilot orders are available
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Initial cooperation is non-exclusive. We are building a European dealer network starting
            with France, Germany and other active lake and reservoir markets.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/dealers">Become a Dealer</ButtonLink>
            <ButtonLink href="/dealers#apply" variant="secondary">
              Apply to Become a Dealer
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="font-display text-3xl font-semibold text-ice">Renders and footage slots</h2>
          </div>
          <ButtonLink href="/gallery" variant="secondary">
            View gallery
          </ButtonLink>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {gallerySlots.slice(0, 3).map((slot) => (
            <MediaSlot key={slot.id} label={slot.title} caption={slot.prompt} />
          ))}
        </div>
      </Section>
      <Container className="pb-20">
        <p className="text-center text-sm text-muted">{site.brandSlogan}</p>
      </Container>
    </main>
  );
}
