import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "HUANQI",
    description: site.companyLine,
    start_url: "/",
    display: "standalone",
    background_color: "#070d12",
    theme_color: "#070d12",
    lang: "en-GB",
  };
}
