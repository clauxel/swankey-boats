import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/product", "/technology", "/gallery", "/dealers", "/about", "/contact"];
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "" || path === "/dealers" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/dealers" || path === "/product" ? 0.9 : 0.7,
  }));
}
