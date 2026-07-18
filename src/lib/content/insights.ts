import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resolveImage } from "@/lib/media";
import { withFallback } from "./utils";
import { INSIGHTS, FEATURED_INSIGHT, NEWSLETTER } from "@/data/insights";
import type { Insight } from "@/types/content";

function rowToInsight(r: any): Insight {
  return {
    type: r.type,
    title: r.title,
    meta: r.meta,
    image: resolveImage(r.image) ?? undefined,
    is_teaser: r.is_teaser ?? undefined,
    is_featured: r.is_featured ?? undefined,
  };
}

export const getInsights = unstable_cache(
  async (): Promise<Insight[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("insights")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map(rowToInsight);
    }, INSIGHTS),
  ["insights:list"],
  { tags: ["insights"] }
);

export const getFeaturedInsight = unstable_cache(
  async (): Promise<Record<string, unknown> | null> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("content_blocks")
        .select("data")
        .eq("key", "featured_insight")
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as Record<string, unknown>) ?? null;
    }, FEATURED_INSIGHT as Record<string, unknown>),
  ["blocks:featured_insight"],
  { tags: ["blocks", "block:featured_insight", "insights"] }
);

export const getNewsletter = unstable_cache(
  async (): Promise<Record<string, unknown> | null> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("content_blocks")
        .select("data")
        .eq("key", "newsletter")
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as Record<string, unknown>) ?? null;
    }, NEWSLETTER as Record<string, unknown>),
  ["blocks:newsletter"],
  { tags: ["blocks", "block:newsletter", "insights"] }
);
