import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Swankey",
    description: site.companyLine,
    start_url: "/",
    display: "standalone",
    background_color: "#07111c",
    theme_color: "#07111c",
    lang: "en-GB",
    icons: [{ src: "/brand/swankey-icon.png", sizes: "1254x1254", type: "image/png" }],
  };
}
