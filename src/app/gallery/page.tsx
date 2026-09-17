import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { PageHero, Section } from "@/components/ui/Section";
import { DeckPlan, JetCutaway, StationKeepingDiagram } from "@/components/visual/Diagrams";
import { BassBoat } from "@/components/visual/LakeScene";
import { gallerySlots } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("gallery", "/gallery");

const extras: Record<string, ReactNode> = {
  "hero-dawn": <BassBoat className="absolute inset-x-6 bottom-4 w-[calc(100%-3rem)]" />,
  "three-quarter": <BassBoat className="absolute inset-x-6 bottom-4 w-[calc(100%-3rem)]" />,
  side: <BassBoat className="absolute inset-x-6 bottom-6 w-[calc(100%-3rem)]" />,
  plan: <DeckPlan className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]" />,
  jet: <JetCutaway className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]" />,
  hold: (
    <StationKeepingDiagram className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]" />
  ),
};

export default function GalleryPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Gallery"
        title="Renders, details and film — ready for the real files"
        lead="This grid is labelled for product-model renders, sample-boat photography and short video. Drop files into the matching media slots; do not use generic stock."
        actions={
          <>
            <ButtonLink href="/contact?topic=media">Download Media Kit</ButtonLink>
            <ButtonLink href="/dealers" variant="secondary">
              Become a Dealer
            </ButtonLink>
          </>
        }
      />

      <Section className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {gallerySlots.map((slot) => (
            <MediaSlot
              key={slot.id}
              label={`${slot.kind} · ${slot.title}`}
              caption={slot.prompt}
              ratio={slot.kind === "Video" ? "video" : slot.kind === "Detail" ? "square" : "hero"}
            >
              {extras[slot.id]}
            </MediaSlot>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm text-muted">
          Media kit CTA currently opens a request to HUANQI. When a packaged ZIP or PDF is ready,
          replace the button with a direct download from <code className="text-ice">/public/media</code>.
        </p>
      </Section>
    </main>
  );
}
