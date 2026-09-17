export type PhotoAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const photos = {
  heroLake: {
    src: "/media/hero-lake.jpg",
    width: 1280,
    height: 720,
    alt: "HQ E498 graphite aluminum bass boat on a calm inland lake at golden hour, with two anglers on the casting decks.",
  },
  cutaway: {
    src: "/media/cutaway-exploded.jpg",
    width: 1280,
    height: 720,
    alt: "Exploded engineering view of HQ E498: casting deck, graphite hull with battery packs and orange high-voltage cables, and the electric jet drivetrain.",
  },
  bow: {
    src: "/media/feature-bow.jpg",
    width: 1152,
    height: 864,
    alt: "Forward bow and trolling area of HQ E498, with a standing angler on the casting deck and a thin cyan hull pinstripe.",
  },
  console: {
    src: "/media/feature-console.jpg",
    width: 1152,
    height: 864,
    alt: "Low HQ E498 console with smoked windshield, steering wheel, display and switch panel.",
  },
  storage: {
    src: "/media/feature-storage.jpg",
    width: 1152,
    height: 864,
    alt: "Open in-deck storage hatch on the HQ E498 non-slip casting deck.",
  },
  stern: {
    src: "/media/feature-stern.jpg",
    width: 1152,
    height: 864,
    alt: "HQ E498 stern with a hidden jet intake under the hull and a cyan pinstripe — no exposed propeller.",
  },
  stripe: {
    src: "/media/feature-stripe.jpg",
    width: 1152,
    height: 864,
    alt: "Close-up of the HQ E498 graphite hull with a thin cyan brand pinstripe.",
  },
} as const satisfies Record<string, PhotoAsset>;

export const craftsmanship = [
  {
    photo: photos.bow,
    title: "Bow and trolling area",
    body: "A wide, uncluttered bow for standing casts. The standard layout keeps the forward deck clean; an external bow motor remains optional redundancy.",
  },
  {
    photo: photos.storage,
    title: "Storage and service hatches",
    body: "Front storage, aft storage and a dedicated battery service compartment sit in the deck — dry, gasketed and planned for dealer access.",
  },
  {
    photo: photos.stripe,
    title: "Graphite hull, cyan line",
    body: "Aluminum monohull in deep graphite with a thin cyan brand stripe. Built for lakes, reservoirs and shallow inland waterways.",
  },
  {
    photo: photos.stern,
    title: "Stern and hidden jet",
    body: "No exposed propeller at the transom. A protected intake sits under the hull for grass edges, flats and skinny water.",
  },
] as const;

export const galleryPhotos = [
  {
    id: "hero-dawn",
    kind: "Lifestyle",
    title: "Inland lake at golden hour",
    photo: photos.heroLake,
    caption:
      "HQ E498 on European-style inland water. Graphite hull, cyan brand line, wide casting decks and a low console.",
  },
  {
    id: "bow",
    kind: "Detail",
    title: "Bow and trolling area",
    photo: photos.bow,
    caption: "Clean bow deck for standing casts. Optional bow motor remains redundancy, not the standard layout.",
  },
  {
    id: "console",
    kind: "Detail",
    title: "Console",
    photo: photos.console,
    caption: "Steering, display area, switch panel and emergency stop in a low console.",
  },
  {
    id: "storage",
    kind: "Detail",
    title: "Storage hatches",
    photo: photos.storage,
    caption: "In-deck storage with a gasketed hatch. Livewell, battery bay and service covers follow the same language.",
  },
  {
    id: "stripe",
    kind: "Detail",
    title: "Hull brand stripe",
    photo: photos.stripe,
    caption: "Deep graphite aluminum with a thin cyan pinstripe along the sheer.",
  },
  {
    id: "jet",
    kind: "Detail",
    title: "Protected jet intake",
    photo: photos.stern,
    caption: "Hidden intake and transom treatment. No exposed propeller at the stern.",
  },
  {
    id: "cutaway",
    kind: "Technical",
    title: "Electric system cutaway",
    photo: photos.cutaway,
    caption:
      "Deck, battery packs with high-voltage cables, and the integrated electric jet — specified as one system.",
  },
] as const;
