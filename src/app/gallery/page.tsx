import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { PageHero, Section, Eyebrow } from "@/components/ui/Section";
import { DeckPlan, JetCutaway, StationKeepingDiagram } from "@/components/visual/Diagrams";
import { gallerySlots } from "@/lib/content";
import { galleryPhotos } from "@/lib/media";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("gallery", "/gallery");

const diagramSlots = gallerySlots.filter((slot) =>
  ["plan", "hold", "service", "video-run"].includes(slot.id),
);

export default function GalleryPage() {
  return (
    <main id="main">
      <PageHero
        photo={galleryPhotos[0].photo}
        eyebrow="Gallery"
        title="HQ E498 on the water, on the deck, in the hull"
        lead="Lifestyle, craftsmanship and engineering photography of the working model — plus diagrams for deck layout, station keeping and service."
        actions={
          <>
            <ButtonLink href="/contact?topic=media">Download Media Kit</ButtonLink>
            <ButtonLink href="/dealers" variant="secondary">
              Become a Dealer
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Eyebrow>Photography</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ice">Product and detail</h2>
        <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-3">
          {galleryPhotos.map((item) => (
            <figure key={item.id} className={item.id === "hero-dawn" || item.id === "cutaway" ? "sm:col-span-2 xl:col-span-3" : ""}>
              <Photo
                photo={item.photo}
                className={
                  item.id === "cutaway"
                    ? "aspect-[16/9] bg-white"
                    : item.id === "hero-dawn"
                      ? "aspect-[16/9]"
                      : "aspect-[4/3]"
                }
                imgClassName={item.id === "cutaway" ? "object-contain bg-white" : "object-cover"}
                sizes={
                  item.id === "hero-dawn" || item.id === "cutaway"
                    ? "100vw"
                    : "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                }
              />
              <figcaption className="bg-bg-elevated px-5 py-4">
                <p className="font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">{item.kind}</p>
                <p className="mt-1 text-sm font-semibold text-ice">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <Eyebrow>Diagrams</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ice">Layout, hold and service</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <figure className="border border-white/10 bg-[#0b1620] p-4">
            <DeckPlan className="w-full" />
            <figcaption className="mt-3 px-1">
              <p className="text-sm font-semibold text-ice">Plan / overhead</p>
              <p className="mt-1 text-sm text-muted">
                Forward and aft casting decks, console placement, livewell and storage hatches.
              </p>
            </figcaption>
          </figure>
          <figure className="border border-white/10 bg-[#0b1620] p-4">
            <JetCutaway className="w-full" />
            <figcaption className="mt-3 px-1">
              <p className="text-sm font-semibold text-ice">Jet system section</p>
              <p className="mt-1 text-sm text-muted">
                Protected intake, electric pump and steering nozzle. No exposed propeller.
              </p>
            </figcaption>
          </figure>
          <figure className="border border-white/10 bg-[#0b1620] p-4 sm:col-span-2">
            <StationKeepingDiagram className="w-full" />
            <figcaption className="mt-3 px-1">
              <p className="text-sm font-semibold text-ice">Station-keeping diagram</p>
              <p className="mt-1 text-sm text-muted">
                GNSS hold, heading hold and low-speed current-hold around a grass edge or piling.
              </p>
            </figcaption>
          </figure>
        </div>
        <ul className="mt-8 grid gap-3 text-sm text-muted">
          {diagramSlots.map((slot) => (
            <li key={slot.id} className="border border-white/10 px-4 py-3">
              <span className="font-medium text-ice">{slot.title}.</span> {slot.prompt}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-sm text-muted">
          Media kit CTA currently opens a request to HUANQI. When a packaged ZIP or PDF is ready,
          replace the button with a direct download from <code className="text-ice">/public/media</code>.
        </p>
      </Section>
    </main>
  );
}
