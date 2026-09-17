import { DealerForm } from "@/components/forms/DealerForm";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, PageHero, Section } from "@/components/ui/Section";
import { dealerCopy, faqs } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("dealers", "/dealers");

export default function DealersPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="European dealer network"
        title={dealerCopy.title}
        lead={dealerCopy.lead}
        actions={
          <>
            <ButtonLink href="#apply">Apply to Become a Dealer</ButtonLink>
            <ButtonLink href="/product" variant="secondary">
              Review HQ E498
            </ButtonLink>
          </>
        }
      />

      <Section className="pt-0">
        <div className="surface rounded-3xl p-6 sm:p-8">
          <Eyebrow>Cooperation</Eyebrow>
          <p className="max-w-3xl text-lg text-ice">{dealerCopy.cooperation}</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {dealerCopy.markets.map((market) => (
            <article key={market.title} className="rounded-3xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-ice">{market.title}</h2>
              <p className="mt-3 text-sm text-muted">{market.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>How it works</Eyebrow>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dealerCopy.process.map((item) => (
            <article key={item.step} className="surface rounded-3xl p-6">
              <p className="font-mono text-cyan-bright">{item.step}</p>
              <h2 className="mt-2 text-lg font-semibold text-ice">{item.title}</h2>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>Dealer-ready service</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ice">
          After-sales is part of the programme
        </h2>
        <ul className="mt-6 grid gap-3">
          {dealerCopy.support.map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 px-5 py-4 text-sm text-muted">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-2xl border border-amber-200/20 bg-amber-200/5 px-5 py-4 text-sm text-ice">
          {dealerCopy.terms}
        </p>
      </Section>

      <Section className="pt-0" id="apply">
        <Eyebrow>Application</Eyebrow>
        <div className="mb-8 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ice">
            Apply to Become a Dealer
          </h2>
          <p className="mt-3 text-muted">
            Required fields match the brief: company and contact, country, email and phone, sales
            channels, target market, HQ E498 by default, and an expected quantity range.
          </p>
        </div>
        <DealerForm />
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
    </main>
  );
}
