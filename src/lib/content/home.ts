import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { withFallback } from "./utils";
import { HERO, HOME, FINAL_CTA, REEL_STATS } from "@/data/site-content";
import type { Stat } from "@/types/content";

export const getHero = unstable_cache(
  async (): Promise<Record<string, unknown> | null> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("content_blocks")
        .select("data")
        .eq("key", "hero")
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as Record<string, unknown>) ?? null;
    }, HERO as Record<string, unknown>),
  ["blocks:hero"],
  { tags: ["blocks", "block:hero", "home"] }
);

export const getHome = unstable_cache(
  async (): Promise<Record<string, unknown> | null> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("content_blocks")
        .select("data")
        .eq("key", "home")
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as Record<string, unknown>) ?? null;
    }, HOME as Record<string, unknown>),
  ["blocks:home"],
  { tags: ["blocks", "block:home", "home"] }
);

export const getFinalCta = unstable_cache(
  async (): Promise<Record<string, unknown> | null> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("content_blocks")
        .select("data")
        .eq("key", "final_cta")
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as Record<string, unknown>) ?? null;
    }, FINAL_CTA as Record<string, unknown>),
  ["blocks:final_cta"],
  { tags: ["blocks", "block:final_cta", "home"] }
);

export const getReelStats = unstable_cache(
  async (): Promise<Stat[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("stats")
        .select("*")
        .eq("is_published", true)
        .eq("group_key", "reel")
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({ value: r.value, label: r.label }));
    }, REEL_STATS),
  ["stats:reel"],
  { tags: ["stats", "home"] }
);
