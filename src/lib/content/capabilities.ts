import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { mediaUrl } from "@/lib/media";
import { withFallback } from "./utils";
import {
  CAPABILITIES,
  STANDING_CAPABILITIES,
  NETWORK_REGIONS,
  DEPLOY_STEPS,
} from "@/data/capabilities";
import type { Capability, DeployStep, RegionCoverage, SubService } from "@/types/content";

function rowToCapability(r: any): Capability {
  return {
    slug: r.slug,
    number: r.number,
    title: r.title,
    href: r.href,
    icon: r.icon,
    summary: r.summary,
    summaryHome: r.summary_home,
    heroTagline: r.hero_tagline,
    heroTitle: r.hero_title,
    bodyHeading: r.body_heading,
    bodyCopy: r.body_copy,
    bullets: r.bullets ?? [],
    visualLabel: r.visual_label,
    variant: r.variant ?? undefined,
    image: mediaUrl(r.image) ?? undefined,
  };
}

export const getCapabilities = unstable_cache(
  async (): Promise<Capability[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("capabilities")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map(rowToCapability);
    }, CAPABILITIES),
  ["capabilities:list"],
  { tags: ["capabilities"] }
);

export const getCapability = (slug: string) =>
  unstable_cache(
    async (): Promise<Capability | null> =>
      withFallback(async () => {
        const { data } = await getSupabaseAdmin()
          .from("capabilities")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .maybeSingle();
        return data ? rowToCapability(data) : null;
      }, CAPABILITIES.find((c) => c.slug === slug) ?? null),
    ["capabilities:one", slug],
    { tags: ["capabilities", `capability:${slug}`] }
  )();

export const getStandingCapabilities = unstable_cache(
  async (): Promise<SubService[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("standing_capabilities")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({ title: r.title, description: r.description }));
    }, STANDING_CAPABILITIES),
  ["standing-capabilities:list"],
  { tags: ["capabilities"] }
);

export const getNetworkRegions = unstable_cache(
  async (): Promise<RegionCoverage[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("network_regions")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r): RegionCoverage => ({ region: r.region, crew: r.crew ?? undefined }));
    }, NETWORK_REGIONS),
  ["network-regions:list"],
  { tags: ["capabilities"] }
);

export const getDeploySteps = unstable_cache(
  async (): Promise<DeployStep[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("deploy_steps")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({ time: r.time, title: r.title, description: r.description }));
    }, DEPLOY_STEPS),
  ["deploy-steps:list"],
  { tags: ["capabilities"] }
);
