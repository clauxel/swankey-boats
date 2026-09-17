const productionUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://swankey-boats.yangdengkui01.workers.dev";

export const site = {
  name: "Swankey",
  chineseName: "Swankey",
  domain: new URL(productionUrl).hostname,
  url: productionUrl.replace(/\/$/, ""),
  email: "zhongya789@gmail.com",
  address: "Shenzhen, Guangdong, China",
  founded: "2025",
  foundedLine: "Founded in 2025 in Shenzhen, China.",
  brandSlogan: "Engineered for Shallow Water. Built for the Cast.",
  productSlogan: "Go Shallow. Hold Steady. Fish Further.",
  productModel: "E498",
  productType: "Electric Jet Bass Boat",
  companyLine:
    "Swankey develops electric fishing boats and integrated shallow-water boat systems.",
  positioning:
    "Swankey builds integrated electric jet bass boats for shallow-water fishing, dealer-ready pilot orders and OEM/ODM cooperation.",
  differentiation:
    "One integrated system reduces equipment selection, installation, commissioning and after-sales coordination.",
} as const;

export const nav = [
  { href: "/product", label: "E498" },
  { href: "/technology", label: "Technology" },
  { href: "/gallery", label: "Gallery" },
  { href: "/dealers", label: "Dealers" },
  { href: "/about", label: "About" },
] as const;

export const routes = {
  home: "/",
  product: "/product",
  technology: "/technology",
  gallery: "/gallery",
  dealers: "/dealers",
  about: "/about",
  contact: "/contact",
} as const;
