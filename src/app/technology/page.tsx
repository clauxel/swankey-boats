import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow, PageHero, Section } from "@/components/ui/Section";
import { JetCutaway, ServicePath, StationKeepingDiagram } from "@/components/visual/Diagrams";
import { technologyBlocks } from "@/lib/content";
import { photos } from "@/lib/media";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("technology", "/technology");

export default function TechnologyPage() {
  return (
    <main id="main">
      <PageHero
        photo={photos.stern}
        eyebrow="Technology"
        title="Integrated electric jet. Protected intake. Station keeping for fishing."
        lead="Hull, pump, battery, BMS, control and fishing layout are specified together so dealers are not assembling a propulsion stack on the water."
        actions={
          <>
            <ButtonLink href="/contact?topic=engineering">Talk to Engineering</ButtonLink>
            <ButtonLink href="/product" variant="secondary">
              HQ E498 specifications
            </ButtonLink>
          </>
        }
      />

      <section className="bg-ice">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Eyebrow>Cutaway</Eyebrow>
          <h2 className="font-display max-w-3xl text-3xl font-semibold text-graphite sm:text-4xl">
            Graphite hull, cyan line, battery and jet as one assembly
          </h2>
          <p className="mt-4 max-w-2xl text-graphite/70">
            Casting deck above. Lithium packs and high-voltage cables in the hull. Electric jet
            beneath — protected intake, pump and steering nozzle, with no exposed propeller.
          </p>
          <div className="mt-10 bg-white p-4 sm:p-8">
            <Photo
              photo={photos.cutaway}
              className="aspect-[16/9] w-full bg-white"
              imgClassName="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">Deck</dt>
              <dd className="mt-2 text-sm text-graphite/75">
                Forward and aft casting decks, low console, fold-down seats and fishing hardware.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">Energy</dt>
              <dd className="mt-2 text-sm text-graphite/75">
                Configurable electric battery system with a dedicated service compartment.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">Jet</dt>
              <dd className="mt-2 text-sm text-graphite/75">
                Integrated electric jet with protected intake, intended for shallow and weed-rich water.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Section>
        <div className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-3">
          {technologyBlocks.map((item, index) => (
            <article key={item.id} className="bg-bg-elevated p-6">
              <p className="font-mono text-cyan">0{index + 1}</p>
              <h2 className="mt-2 text-lg font-semibold text-ice">{item.title}</h2>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>No exposed propeller</Eyebrow>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="border border-white/10 bg-[#0b1620] p-4">
            <JetCutaway className="w-full" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold text-ice">
              Designed for grass, flats and inland water
            </h2>
            <p className="mt-4 text-muted">
              The intake sits in a protected path under the hull. The service strategy is intended
              for shallow water, vegetation and inland lakes rather than open-coast outboard use.
            </p>
            <p className="mt-4 text-muted">
              An optional bow trolling motor remains available for fine maneuvering redundancy. It
              is not required for the standard clean-bow layout.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>GNSS station keeping</Eyebrow>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ice">
              Hold the boat where the fish are
            </h2>
            <p className="mt-4 text-muted">
              GNSS station keeping, heading hold and current-hold mode help keep position in wind
              and flow near grass edges, flats, pilings and structure.
            </p>
          </div>
          <div className="border border-white/10 bg-[#0b1620] p-4">
            <StationKeepingDiagram className="w-full" />
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>Maintenance path</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ice">
          Service access dealers can plan around
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Battery service compartment, intake inspection, spare-parts lists, remote diagnostics and
          training materials are part of the dealer conversation — not extras to invent after a
          pilot order.
        </p>
        <div className="mt-8 border border-white/10 bg-[#0b1620] p-4">
          <ServicePath className="w-full" />
        </div>
        <div className="mt-8">
          <ButtonLink href="/contact?topic=engineering">Talk to Engineering</ButtonLink>
        </div>
      </Section>
    </main>
  );
}
