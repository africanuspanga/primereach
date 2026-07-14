import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { mediaUrl } from "@/lib/media";
import { withFallback } from "./utils";
import { PROGRAMMES, FUTURE_PROGRAMMES, TCMA } from "@/data/programmes";
import type { Programme } from "@/types/content";

function rowToProgramme(r: any): Programme {
  return {
    slug: r.slug ?? undefined,
    title: r.title,
    status: r.status,
    statusLabel: r.status_label,
    description: r.description,
    stats: r.stats ?? [],
    cta: r.cta ?? undefined,
    image: mediaUrl(r.image) ?? undefined,
  };
}

export const getProgrammes = unstable_cache(
  async (): Promise<Programme[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("programmes")
        .select("*")
        .eq("is_published", true)
        .eq("is_future", false)
        .order("position");
      if (error) throw error;
      return (data ?? []).map(rowToProgramme);
    }, PROGRAMMES),
  ["programmes:list"],
  { tags: ["programmes"] }
);

export const getFutureProgrammes = unstable_cache(
  async (): Promise<Programme[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("programmes")
        .select("*")
        .eq("is_published", true)
        .eq("is_future", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map(rowToProgramme);
    }, FUTURE_PROGRAMMES),
  ["programmes:future"],
  { tags: ["programmes"] }
);

export const getTcma = unstable_cache(
  async (): Promise<Record<string, unknown> | null> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("content_blocks")
        .select("data")
        .eq("key", "tcma")
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as Record<string, unknown>) ?? null;
    }, TCMA as Record<string, unknown>),
  ["blocks:tcma"],
  { tags: ["blocks", "block:tcma", "programmes"] }
);
