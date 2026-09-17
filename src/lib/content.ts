import { site } from "./site";

export const heroCopy = {
  headline: "A New Electric Jet Bass Boat for Shallow Water",
  sub: "Integrated jet propulsion, GNSS station keeping and a purpose-built casting deck for lakes, reservoirs and shallow waterways.",
  primaryCta: "Become a Dealer",
  secondaryCta: "Request Product Information",
  params: [
    "4.98 m class",
    "Open casting deck",
    "Electric jet propulsion",
    "Sample and pilot orders",
  ] as const,
  sceneNote:
    "Media slot — Hero render: European inland lake at dawn. HQ E498 moving slowly along a grass edge, then holding station. Deep graphite hull, teal brand line, wide casting decks, low console, hidden jet intake.",
};

export const specs = [
  { label: "Working model", value: "HQ E498" },
  { label: "Product type", value: "Electric Jet Bass Boat" },
  {
    label: "Use waters",
    value: "Lakes, reservoirs, inland waterways and protected near-shore areas",
  },
  {
    label: "Hull form",
    value: "Aluminum monohull with shallow-water fishing layout",
  },
  { label: "Length", value: "4.98 m class" },
  { label: "Beam", value: "2.15 m class" },
  {
    label: "Recommended use",
    value: "Shallow-water lure fishing, guiding, clubs and rental operations",
  },
  {
    label: "Propulsion",
    value: "Integrated electric jet propulsion with protected intake",
  },
  {
    label: "Station keeping",
    value: "GNSS station keeping, heading hold and current-hold mode",
  },
  {
    label: "Battery system",
    value: "Configurable electric battery system by market package",
  },
  {
    label: "Livewell",
    value: "Integrated livewell with circulation and pump",
  },
  {
    label: "Order status",
    value: "Sample boats and small pilot orders available",
  },
  {
    label: "Lead time",
    value: "Standard order 4 months; custom order 6 months",
  },
  { label: "Warranty", value: "1 year standard warranty" },
] as const;

export const standardConfig = [
  { item: "Seats", value: "Fold-down fishing seats" },
  {
    item: "Console",
    value: "Console with steering, display area, switch panel and emergency stop",
  },
  {
    item: "Storage",
    value: "Front storage, aft storage and battery service compartment",
  },
  {
    item: "Livewell",
    value: "Integrated livewell with circulation, inlet and drain functions",
  },
  { item: "Bilge pump", value: "Automatic/manual bilge pump" },
  {
    item: "Navigation lights",
    value: "Navigation light and all-round white light",
  },
  {
    item: "Electrical system",
    value: "Auxiliary electrical system with main switch, breakers and USB/Type-C outlets",
  },
  { item: "Fendering", value: "Marine-grade UV-resistant fender protection" },
  {
    item: "Casting deck",
    value: "Non-slip casting deck with easy-clean surface",
  },
  {
    item: "Tow points",
    value: "Bow towing point and aft connection points",
  },
  {
    item: "Fishing hardware",
    value: "Cup holders, rod holders and rod storage",
  },
  {
    item: "Propulsion and hold",
    value: "Integrated jet propulsion with station keeping and current-hold control",
  },
] as const;

export const options = [
  {
    item: "Fishfinder / chartplotter",
    value:
      "Garmin, Lowrance, Humminbird and similar units, specified by sales market",
  },
  {
    item: "Live imaging sonar",
    value: "LiveScope, ActiveTarget, MEGA Live and compatible directions",
  },
  {
    item: "Bow trolling motor",
    value: "Optional bow trolling motor for fine maneuvering redundancy",
  },
  {
    item: "Extended battery packages",
    value: "Extended battery packages for longer fishing days",
  },
  {
    item: "Fast charging",
    value: "Fast-charging package configured by sales market",
  },
  {
    item: "Boat trailer",
    value:
      "Single or tandem axle according to all-up weight and European road regulations",
  },
  {
    item: "Comfort and service accessories",
    value: "Boat cover, boarding ladder and storage-compartment LED lighting",
  },
  {
    item: "OEM / ODM colour and graphics",
    value: "Dealer or brand-partner visual customisation",
  },
  {
    item: "Cold-weather package",
    value:
      "Battery thermal management and control strategy for Germany, Northern Europe and similar markets",
  },
] as const;

export const differentiators = [
  {
    title: "Integrated by default",
    body: "Hull, jet propulsion, battery, BMS, control, station keeping, deck and fishing functions are delivered as one system. That reduces multi-brand selection, installation, commissioning and after-sales coordination.",
  },
  {
    title: "Clean bow deck",
    body: "The standard layout reduces reliance on an external bow trolling motor. The forward deck stays clean, the casting area stays complete, and an external bow motor remains optional redundancy.",
  },
  {
    title: "Shallow and weed-rich waters",
    body: "No exposed propeller. A protected intake and a defined service path are designed for shallow water, vegetation and inland lakes — grass edges, flats and structure.",
  },
  {
    title: "Station keeping for fishing",
    body: "GNSS station keeping, heading hold and low-speed current-hold help hold position in wind and current near the cast — bridge pilings, grass edges, flats and structure.",
  },
  {
    title: "Dealer-ready service",
    body: "Service access, spare-parts lists, remote diagnostics and training materials are built into the dealer programme, reducing after-sales risk for channel partners.",
  },
  {
    title: "OEM/ODM flexibility",
    body: "Colour, graphics, electronics, battery capacity, market packages and brand partnerships can be quoted as modules rather than a from-scratch custom project.",
  },
] as const;

export const deckStory = [
  {
    title: "Forward casting deck",
    body: "A wide, uncluttered bow for standing casts. The standard package keeps the forward deck clean by reducing dependence on an external trolling motor.",
  },
  {
    title: "Low console",
    body: "Steering, display area, switch panel and emergency stop sit in a low console so sightlines and casting arcs stay open.",
  },
  {
    title: "Livewell and storage",
    body: "Integrated livewell with circulation, inlet and drain, plus front storage, aft storage and a dedicated battery service compartment.",
  },
  {
    title: "Aft deck and hidden jet",
    body: "Rear casting space with a protected jet intake under the hull. No exposed propeller at the transom.",
  },
] as const;

export const scenarios = [
  {
    title: "Grass edges",
    body: "Move slowly along vegetation without an exposed propeller. Hold station when a cast needs to stay on the edge.",
  },
  {
    title: "Flats and skinny water",
    body: "Aluminum monohull with a shallow-water fishing layout for lakes, reservoirs and protected near-shore waterways.",
  },
  {
    title: "Structure and pilings",
    body: "Heading hold and current-hold keep the boat presented to the feature while the angler works the water.",
  },
  {
    title: "Clubs, guides and rental",
    body: "Recommended for shallow-water lure fishing, guiding, clubs and rental operations — with sample boats and small pilot orders available.",
  },
] as const;

export const technologyBlocks = [
  {
    id: "jet",
    title: "Integrated electric jet",
    body: "Propulsion is an integrated electric jet, not a bolt-on outboard with an exposed propeller. Hull, pump, battery, BMS and control are specified as one system.",
  },
  {
    id: "intake",
    title: "Protected intake",
    body: "The intake sits in a protected path under the hull, intended for shallow water, vegetation and inland lakes. Service access is part of the layout, not an afterthought.",
  },
  {
    id: "gnss",
    title: "GNSS station keeping",
    body: "GNSS station keeping holds position on a grass edge, flat or structure so the boat works with the cast instead of drifting off the spot.",
  },
  {
    id: "heading",
    title: "Heading hold",
    body: "Heading hold keeps the boat presented to wind, current or a target line while the angler stays on the deck.",
  },
  {
    id: "current",
    title: "Current-hold / low-speed hold",
    body: "Low-speed current-hold is intended for wind, flow and the need to stay on a casting point without constant throttle work.",
  },
  {
    id: "service",
    title: "Maintenance path",
    body: "Battery service compartment, defined access to the jet path, spare-parts lists, remote diagnostics and training materials support dealers after delivery.",
  },
] as const;

export const gallerySlots = [
  {
    id: "hero-dawn",
    kind: "Render",
    title: "Hero — inland lake at dawn",
    prompt:
      "European inland lake at dawn. Slow pass along a grass edge, clean water, clear HQ E498 silhouette. Deep graphite hull, teal brand line.",
  },
  {
    id: "three-quarter",
    kind: "Product still",
    title: "45° product view",
    prompt: "Consistent 45° studio or waterside view. Proportions and structure locked to the working model.",
  },
  {
    id: "side",
    kind: "Product still",
    title: "Side profile",
    prompt: "Low freeboard, wide decks, low console, no exposed outboard. Graphite hull with teal accent.",
  },
  {
    id: "plan",
    kind: "Product still",
    title: "Plan / overhead",
    prompt: "Forward and aft casting decks, console placement, livewell and storage hatches.",
  },
  {
    id: "bow",
    kind: "Detail",
    title: "Bow and forward deck",
    prompt: "Clean bow deck for standing casts. Optional bow motor shown only as a labelled option.",
  },
  {
    id: "console",
    kind: "Detail",
    title: "Console",
    prompt: "Steering, display area, switch panel and emergency stop.",
  },
  {
    id: "jet",
    kind: "Detail",
    title: "Protected jet intake",
    prompt: "Hidden intake and transom treatment. No exposed propeller.",
  },
  {
    id: "livewell",
    kind: "Detail",
    title: "Livewell and hatches",
    prompt: "Circulation, inlet and drain; storage and battery service covers open.",
  },
  {
    id: "cutaway",
    kind: "Technical",
    title: "Jet system cutaway",
    prompt: "Simple section: protected intake, pump, steering nozzle, battery and control path.",
  },
  {
    id: "hold",
    kind: "Technical",
    title: "Station-keeping diagram",
    prompt: "GNSS hold, heading hold and low-speed current-hold around a grass edge or piling.",
  },
  {
    id: "service",
    kind: "Technical",
    title: "Service path",
    prompt: "Access sequence for intake inspection, battery bay and routine checks.",
  },
  {
    id: "video-run",
    kind: "Video",
    title: "Underway and shallow pass",
    prompt: "Short clip: running, skinny-water pass, then station keeping. Sample-boat footage or credible 3D animation.",
  },
] as const;

export const dealerCopy = {
  title: "Become a HUANQI Dealer",
  lead: "We are building a European dealer network for integrated electric jet bass boats, starting with France, Germany and other active lake and reservoir markets.",
  cooperation:
    "Initial cooperation is non-exclusive. Sample boats and small pilot orders are available. OEM/ODM inquiries are welcome for dealers, clubs, rental operators and tournament partners.",
  terms:
    "Sample pricing, minimum order quantity, shipping terms, spare parts, service response, regional cooperation and OEM/ODM project fees can be discussed during the application review.",
  markets: [
    {
      title: "France",
      body: "Inland lakes, reservoirs and active lure-fishing waters — first-wave priority.",
    },
    {
      title: "Germany",
      body: "Lakes, reservoirs and clubs, including cold-weather package discussions for seasonal use.",
    },
    {
      title: "Wider Europe",
      body: "Other active lake and reservoir markets are welcome under the same non-exclusive pilot model.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Apply",
      body: "Submit company, market and volume details. HQ E498 is the default working model.",
    },
    {
      step: "02",
      title: "Review",
      body: "HUANQI reviews market fit, channel type and service capacity. France and Germany are first.",
    },
    {
      step: "03",
      title: "Sample or pilot",
      body: "Sample boats and small pilot orders are available. Lead time: 4 months standard, 6 months custom.",
    },
    {
      step: "04",
      title: "Service setup",
      body: "Spare parts, service access, remote diagnostics and training materials are agreed in review.",
    },
  ],
  support: [
    "Defined maintenance access and battery service compartment",
    "Spare-parts lists for the jet system, electrical gear and fishing hardware",
    "Remote diagnostics path for control and battery packages",
    "Training materials for dealers, clubs and rental operators",
    "Modular OEM/ODM quoting for colour, graphics, electronics and battery capacity",
  ],
};

export const aboutCopy = {
  title: "About HUANQI INNOVATION",
  lead: site.companyLine,
  story: [
    `${site.name} (${site.chineseName}) was founded in 2025 in Shenzhen, China.`,
    "The company develops electric fishing boats and integrated shallow-water boat systems for overseas customers and channel partners.",
    "The working model is HQ E498, an electric jet bass boat for lakes, reservoirs, inland waterways and protected near-shore areas.",
    site.brandSlogan,
  ],
  credibility: [
    {
      title: "Shenzhen research and build",
      body: "Design, integration and manufacturing resources sit in Shenzhen, Guangdong, China — with an English-first overseas site at swankey.boats.",
    },
    {
      title: "Engineering tone",
      body: "Public copy stays specific: shallow water, inland lakes, integrated propulsion, station keeping, service access and channel support. Detailed figures belong in the quotation and build sheet.",
    },
    {
      title: "Pilot-ready, not vapour",
      body: "Sample boats and small pilot orders are available. Standard orders 4 months; custom orders 6 months; 1 year standard warranty.",
    },
  ],
};

export const faqs = [
  {
    q: "What waters is HQ E498 intended for?",
    a: "Lakes, reservoirs, inland waterways and protected near-shore areas. Recommended use is shallow-water lure fishing, guiding, clubs and rental operations.",
  },
  {
    q: "Is there an exposed propeller?",
    a: "No. Propulsion is an integrated electric jet with a protected intake. An external bow trolling motor is optional redundancy, not the standard layout.",
  },
  {
    q: "What does station keeping include?",
    a: "GNSS station keeping, heading hold and current-hold mode — intended to hold the boat near grass edges, flats, pilings and structure.",
  },
  {
    q: "How is the battery specified?",
    a: "The electric battery system is configurable by market package. Extended packs, fast charging and a cold-weather package are options.",
  },
  {
    q: "What is the order path?",
    a: "Sample boats and small pilot orders are available. Standard order lead time is 4 months; custom order 6 months. Warranty is 1 year standard.",
  },
  {
    q: "Are dealerships exclusive?",
    a: "Initial cooperation is non-exclusive. France, Germany and other active lake and reservoir markets are the first focus.",
  },
] as const;

export const pageMeta = {
  home: {
    title: "Electric Jet Bass Boat for Shallow Water",
    description:
      "HUANQI INNOVATION HQ E498 — integrated electric jet bass boat with GNSS station keeping and a purpose-built casting deck for European lakes, reservoirs and shallow waterways.",
  },
  product: {
    title: "HQ E498 Electric Jet Bass Boat",
    description:
      "HQ E498 specifications, standard configuration, options, deck layout and shallow-water fishing scenarios. 4.98 m class aluminum monohull.",
  },
  technology: {
    title: "Integrated Electric Jet and Station Keeping",
    description:
      "How HQ E498 combines an integrated electric jet, protected intake, GNSS station keeping, heading hold, current-hold and a dealer-ready maintenance path.",
  },
  gallery: {
    title: "Gallery and Media Kit",
    description:
      "Placeholder media grid for HQ E498 renders, details, technical drawings and video. Request the HUANQI media kit.",
  },
  dealers: {
    title: "Become a HUANQI Dealer",
    description:
      "Non-exclusive European dealer programme for HQ E498, starting with France and Germany. Sample boats, pilot orders and OEM/ODM inquiries.",
  },
  about: {
    title: "About and Contact",
    description:
      "HUANQI INNOVATION (浣启创新), founded 2025 in Shenzhen. Contact zhongya789@gmail.com — swankey.boats.",
  },
  contact: {
    title: "Contact HUANQI INNOVATION",
    description:
      "Request product information, talk to engineering or start a dealer conversation. Shenzhen, Guangdong, China.",
  },
} as const;
