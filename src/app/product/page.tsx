import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow, PageHero, Section } from "@/components/ui/Section";
import { DeckPlan } from "@/components/visual/Diagrams";
import {
  deckStory,
  faqs,
  options,
  scenarios,
  specs,
  standardConfig,
} from "@/lib/content";
import { photos } from "@/lib/media";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata("product", "/product");

export default function ProductPage() {
  return (
    <main id="main">
      <PageHero
        photo={photos.heroLake}
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

      <Section>
        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          <Photo
            photo={photos.console}
            className="aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <Photo
            photo={photos.bow}
            className="aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>Specifications</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ice">HQ E498 product parameters</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Base information for the website. Formal quotation, configuration sheet and delivery files
          carry the detailed technical specification.
        </p>
        <div className="mt-8 overflow-x-auto border border-white/10">
          <table className="min-w-[640px] w-full text-left text-sm">
            <thead className="bg-white/4 font-mono text-[11px] tracking-[0.14em] text-cyan uppercase">
              <tr>
                <th className="px-5 py-4">Parameter</th>
                <th className="px-5 py-4">Website wording</th>
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
        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          <div className="bg-bg-elevated p-6 sm:p-8">
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
          <div className="bg-bg-elevated p-6 sm:p-8">
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
          <div className="border border-white/10 bg-[#0b1620] p-4 sm:p-6">
            <DeckPlan className="w-full" />
          </div>
          <div className="grid gap-px bg-white/10">
            {deckStory.map((item) => (
              <article key={item.title} className="bg-bg p-5">
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
        <div className="mt-8 grid gap-px bg-white/10 md:grid-cols-2">
          {scenarios.map((item) => (
            <article key={item.title} className="bg-bg-elevated p-6">
              <h3 className="text-lg font-semibold text-ice">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>FAQ</Eyebrow>
        <div className="grid gap-px bg-white/10">
          {faqs.map((item) => (
            <details key={item.q} className="bg-bg-elevated px-5 py-4">
              <summary className="cursor-pointer font-medium text-ice">{item.q}</summary>
              <p className="mt-3 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="scroll-mt-24 pt-0" id="inquiry">
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
