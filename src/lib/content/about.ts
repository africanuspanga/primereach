import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { withFallback } from "./utils";
import {
  ABOUT,
  CORE_VALUES,
  WHY_CHOOSE,
  TIMELINE,
  SECTOR_GROUPS,
} from "@/data/site-content";
import type {
  CoreValue,
  SectorGroup,
  Stat,
  TimelineEntry,
  WhyChooseReason,
} from "@/types/content";

export const getAbout = unstable_cache(
  async (): Promise<Record<string, unknown> | null> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("content_blocks")
        .select("data")
        .eq("key", "about")
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as Record<string, unknown>) ?? null;
    }, ABOUT as Record<string, unknown>),
  ["blocks:about"],
  { tags: ["blocks", "block:about", "about"] }
);

export const getCoreValues = unstable_cache(
  async (): Promise<CoreValue[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("core_values")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({
        title: r.title,
        description: r.description,
        icon: r.icon,
      }));
    }, CORE_VALUES),
  ["core-values:list"],
  { tags: ["about"] }
);

export const getWhyChooseReasons = unstable_cache(
  async (): Promise<WhyChooseReason[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("why_choose_reasons")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({
        title: r.title,
        description: r.description,
        icon: r.icon,
      }));
    }, WHY_CHOOSE),
  ["why-choose:list"],
  { tags: ["about"] }
);

export const getTimeline = unstable_cache(
  async (): Promise<TimelineEntry[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("timeline_entries")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r): TimelineEntry => ({
        year: r.year,
        tag: r.tag ?? undefined,
        title: r.title ?? undefined,
        description: r.description,
      }));
    }, TIMELINE),
  ["timeline:list"],
  { tags: ["about"] }
);

export const getSectorGroups = unstable_cache(
  async (): Promise<SectorGroup[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("sector_groups")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({
        title: r.title,
        icon: r.icon,
        items: r.items ?? [],
      }));
    }, SECTOR_GROUPS),
  ["sector-groups:list"],
  { tags: ["about"] }
);

export const getStatsByGroup = (groupKey: string) =>
  unstable_cache(
    async (): Promise<Stat[]> =>
      withFallback(async () => {
        const { data, error } = await getSupabaseAdmin()
          .from("stats")
          .select("*")
          .eq("is_published", true)
          .eq("group_key", groupKey)
          .order("position");
        if (error) throw error;
        return (data ?? []).map((r) => ({ value: r.value, label: r.label }));
      }, []),
    ["stats:list", groupKey],
    { tags: ["stats", "home", "about"] }
  )();
