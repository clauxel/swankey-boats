import { ButtonLink } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Eyebrow, PageHero, Section } from "@/components/ui/Section";
import { JetCutaway, ServicePath, StationKeepingDiagram } from "@/components/visual/Diagrams";
import { technologyBlocks } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("technology", "/technology");

export default function TechnologyPage() {
  return (
    <main id="main">
      <PageHero
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

      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {technologyBlocks.map((item) => (
            <article key={item.id} className="surface rounded-3xl p-6">
              <h2 className="text-lg font-semibold text-ice">{item.title}</h2>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>No exposed propeller</Eyebrow>
        <div className="grid gap-8 lg:grid-cols-2">
          <MediaSlot
            label="Jet system cutaway"
            caption="Simple section: protected intake, electric pump, steering nozzle. Replace with engineering drawing."
          >
            <div className="absolute inset-0 flex items-center p-4">
              <JetCutaway className="w-full" />
            </div>
          </MediaSlot>
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
          <MediaSlot
            label="Station-keeping diagram"
            caption="Replace with a control schematic or on-water hold sequence."
          >
            <div className="absolute inset-0 flex items-center p-4">
              <StationKeepingDiagram className="w-full" />
            </div>
          </MediaSlot>
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
        <div className="mt-8">
          <MediaSlot label="Service sequence" caption="Replace with labelled access photos from the sample boat.">
            <div className="absolute inset-0 flex items-center p-4">
              <ServicePath className="w-full" />
            </div>
          </MediaSlot>
        </div>
        <div className="mt-8">
          <ButtonLink href="/contact?topic=engineering">Talk to Engineering</ButtonLink>
        </div>
      </Section>
    </main>
  );
}
