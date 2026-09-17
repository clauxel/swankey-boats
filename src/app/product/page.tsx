import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Eyebrow, PageHero, Section } from "@/components/ui/Section";
import { DeckPlan } from "@/components/visual/Diagrams";
import Image from "next/image";
import {
  deckStory,
  faqs,
  options,
  scenarios,
  specs,
  standardConfig,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata("product", "/product");

export default function ProductPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={`${site.productModel} · ${site.productType}`}
        title={site.productSlogan}
        lead="Aluminum monohull with a shallow-water fishing layout for lakes, reservoirs, inland waterways and protected near-shore areas."
        actions={
          <>
            <ButtonLink href="/contact?topic=product">Request Product Information</ButtonLink>
            <ButtonLink href="/dealers" variant="secondary">
              Become a Dealer
            </ButtonLink>
          </>
        }
      />

      <Section className="pt-0">
        <figure><div className="product-render"><Image src="/media/e498-design.png" width={1536} height={1024} alt="Swankey E498 design rendering" priority /></div><figcaption className="media-caption">E498 design — configuration and details are confirmed in your build sheet.</figcaption></figure>
      </Section>

      <Section className="pt-0" id="specifications">
        <Eyebrow>Specifications</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ice">E498 product parameters</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Explore the E498 configuration. Your quotation and build sheet include the detailed specification for your market.
        </p>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10">
          <table className="min-w-[640px] w-full text-left text-sm">
            <thead className="bg-white/4 font-mono text-[11px] tracking-[0.14em] text-cyan-bright uppercase">
              <tr>
                <th className="px-5 py-4">Parameter</th>
                <th className="px-5 py-4">Specification</th>
              </tr>
            </thead>
            <tbody>
              {specs.map((row) => (
                <tr key={row.label} className="border-t border-white/8">
                  <th className="px-5 py-4 align-top font-medium text-ice">{row.label}</th>
                  <td className="px-5 py-4 text-muted">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface rounded-3xl p-6 sm:p-8">
            <Eyebrow>Standard configuration</Eyebrow>
            <h2 className="font-display text-2xl font-semibold text-ice">
              A complete fishing boat, not a kit
            </h2>
            <ul className="mt-6 grid gap-4">
              {standardConfig.map((item) => (
                <li key={item.item} className="border-b border-white/8 pb-4">
                  <p className="text-sm font-semibold text-ice">{item.item}</p>
                  <p className="mt-1 text-sm text-muted">{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface rounded-3xl p-6 sm:p-8">
            <Eyebrow>Options</Eyebrow>
            <h2 className="font-display text-2xl font-semibold text-ice">
              Market packages, not from-scratch customs
            </h2>
            <ul className="mt-6 grid gap-4">
              {options.map((item) => (
                <li key={item.item} className="border-b border-white/8 pb-4">
                  <p className="text-sm font-semibold text-ice">{item.item}</p>
                  <p className="mt-1 text-sm text-muted">{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>Deck layout</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ice">Purpose-built for the cast</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <MediaSlot label="Deck plan" caption="Open casting decks, practical storage and integrated controls.">
            <div className="absolute inset-0 flex items-center p-6">
              <DeckPlan className="w-full" />
            </div>
          </MediaSlot>
          <div className="grid gap-4">
            {deckStory.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 p-5">
                <h3 className="font-semibold text-ice">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>Shallow and weed-rich waters</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ice">Where the boat is meant to work</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {scenarios.map((item) => (
            <article key={item.title} className="surface rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-ice">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>FAQ</Eyebrow>
        <div className="grid gap-4">
          {faqs.map((item) => (
            <details key={item.q} className="surface rounded-2xl px-5 py-4">
              <summary className="cursor-pointer font-medium text-ice">{item.q}</summary>
              <p className="mt-3 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="pt-0" id="inquiry">
        <Eyebrow>Request Product Information</Eyebrow>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ice">
              Ask for a configuration discussion
            </h2>
            <p className="mt-4 text-muted">
              Battery packages are configurable by market. Quote-level figures stay in the build
              sheet. Sample boats and small pilot orders are available.
            </p>
          </div>
          <ContactForm defaultTopic="product" />
        </div>
      </Section>
    </main>
  );
}
