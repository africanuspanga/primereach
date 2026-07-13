import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { SOLUTIONS } from "@/data/solutions";
import { CAPABILITIES } from "@/data/capabilities";

// Required for `output: export` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

// Static export-friendly timestamp; bump when content materially changes.
const LAST_MODIFIED = new Date("2026-07-13");

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];
type Entry = { path: string; priority: number; changeFrequency: ChangeFrequency };

const staticRoutes: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
  { path: "/impact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/impact/case-studies", priority: 0.7, changeFrequency: "monthly" },
  { path: "/impact/featured-projects", priority: 0.7, changeFrequency: "monthly" },
  { path: "/impact/clients-sectors", priority: 0.7, changeFrequency: "monthly" },
  { path: "/impact/testimonials", priority: 0.6, changeFrequency: "monthly" },
  { path: "/capabilities", priority: 0.8, changeFrequency: "monthly" },
  { path: "/programmes", priority: 0.8, changeFrequency: "monthly" },
  { path: "/programmes/tcma", priority: 0.7, changeFrequency: "monthly" },
  { path: "/programmes/future", priority: 0.6, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

const solutionRoutes: Entry[] = SOLUTIONS.map((solution) => ({
  path: solution.href,
  priority: 0.8,
  changeFrequency: "monthly",
}));

const capabilityRoutes: Entry[] = CAPABILITIES.map((capability) => ({
  path: capability.href,
  priority: 0.7,
  changeFrequency: "monthly",
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...solutionRoutes, ...capabilityRoutes].map(
    ({ path, priority, changeFrequency }) => ({
      url: `${SITE.url}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency,
      priority,
    }),
  );
}
