import type { Metadata } from "next";
import { site } from "./site";
import { pageMeta } from "./content";

export function buildMetadata(
  key: keyof typeof pageMeta,
  path = "/",
): Metadata {
  const page = pageMeta[key];
  const url = new URL(path, site.url).toString();
  const title =
    key === "home"
      ? `${site.name} | ${page.title}`
      : `${page.title} | ${site.name}`;

  return {
    title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: page.description,
      url,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
    },
  };
}
