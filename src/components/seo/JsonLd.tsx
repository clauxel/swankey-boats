import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        alternateName: site.chineseName,
        url: site.url,
        email: site.email,
        foundingDate: site.founded,
        slogan: site.brandSlogan,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Shenzhen",
          addressRegion: "Guangdong",
          addressCountry: "CN",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.domain,
        publisher: { "@id": `${site.url}/#org` },
        inLanguage: "en-GB",
      },
      {
        "@type": "Product",
        "@id": `${site.url}/product#hq-e498`,
        name: "HQ E498",
        description: site.productType,
        brand: { "@id": `${site.url}/#org` },
        category: "Electric Jet Bass Boat",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
