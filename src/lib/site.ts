export const site = {
  name: "HUANQI INNOVATION",
  chineseName: "浣启创新",
  domain: "swankey.boats",
  url: "https://swankey.boats",
  email: "zhongya789@gmail.com",
  address: "Shenzhen, Guangdong, China",
  founded: "2025",
  foundedLine: "Founded in 2025 in Shenzhen, China.",
  brandSlogan: "Engineered for Shallow Water. Built for the Cast.",
  productSlogan: "Go Shallow. Hold Steady. Fish Further.",
  productModel: "HQ E498",
  productType: "Electric Jet Bass Boat",
  companyLine:
    "HUANQI INNOVATION develops electric fishing boats and integrated shallow-water boat systems.",
  positioning:
    "HUANQI builds integrated electric jet bass boats for shallow-water fishing, dealer-ready pilot orders and OEM/ODM cooperation.",
  differentiation:
    "One integrated system reduces equipment selection, installation, commissioning and after-sales coordination.",
} as const;

export const nav = [
  { href: "/product", label: "HQ E498" },
  { href: "/technology", label: "Technology" },
  { href: "/gallery", label: "Gallery" },
  { href: "/dealers", label: "Dealers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
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
