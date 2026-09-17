import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Electric Jet Bass Boat for Shallow Water`,
    template: `%s | ${site.name}`,
  },
  description:
    "Swankey E498 — integrated electric jet bass boat with GNSS station keeping and a purpose-built casting deck for European lakes, reservoirs and shallow waterways.",
  applicationName: site.name,
  keywords: [
    "Swankey",
    "E498",
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
    title: `${site.name} | E498`,
    description: site.brandSlogan,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/brand/swankey-icon.png", type: "image/png" }],
    apple: [{ url: "/brand/swankey-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#07111c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className="h-full antialiased"
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
