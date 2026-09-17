import type { Metadata, Viewport } from "next";
import { Outfit, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Electric Jet Bass Boat for Shallow Water`,
    template: `%s | ${site.name}`,
  },
  description:
    "HUANQI INNOVATION HQ E498 — integrated electric jet bass boat with GNSS station keeping and a purpose-built casting deck for European lakes, reservoirs and shallow waterways.",
  applicationName: site.name,
  keywords: [
    "HUANQI INNOVATION",
    "浣启创新",
    "HQ E498",
    "electric jet bass boat",
    "shallow water fishing boat",
    "GNSS station keeping",
    "swankey.boats",
    "France",
    "Germany",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "boating",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Electric Jet Bass Boat for Shallow Water`,
    description:
      "Integrated jet propulsion, GNSS station keeping and a purpose-built casting deck for lakes, reservoirs and shallow waterways.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | HQ E498`,
    description: site.brandSlogan,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#05080c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg font-sans text-ink">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <JsonLd />
        <Header />
        <div className="flex min-h-full flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
