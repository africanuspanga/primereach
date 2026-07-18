import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getSolutions, getCapabilities } from "@/lib/content";

// Regenerate periodically so solutions/capabilities added via the CMS appear.
export const revalidate = 3600;

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [solutions, capabilities] = await Promise.all([
    getSolutions(),
    getCapabilities(),
  ]);

  const solutionRoutes: Entry[] = solutions.map((solution) => ({
    path: solution.href,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const capabilityRoutes: Entry[] = capabilities.map((capability) => ({
    path: capability.href,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...solutionRoutes, ...capabilityRoutes].map(
    ({ path, priority, changeFrequency }) => ({
      url: `${SITE.url}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency,
      priority,
    }),
  );
}
