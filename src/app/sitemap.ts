import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// Required for `output: export` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

// Static export-friendly timestamp; bump when content materially changes.
const LAST_MODIFIED = new Date("2026-07-12");

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/pr-media-communications", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/research-training-consultancy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/technology-solutions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/network", priority: 0.8, changeFrequency: "monthly" },
  { path: "/clients-sectors", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}
