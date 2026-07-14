import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { withFallback } from "./utils";

export const getBlock = <T = Record<string, unknown>>(key: string) =>
  unstable_cache(
    async (): Promise<T | null> =>
      withFallback(async () => {
        const { data } = await getSupabaseAdmin()
          .from("content_blocks")
          .select("data")
          .eq("key", key)
          .eq("is_published", true)
          .maybeSingle();
        return (data?.data as T) ?? null;
      }, null),
    ["block", key],
    { tags: ["blocks", `block:${key}`] }
  )();
