import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { withFallback } from "./utils";
import { SITE, CONTACT, MAIN_NAV } from "@/lib/constants";
import type { NavItem } from "@/types/content";

export interface SiteSettings {
  name: string;
  shortName: string;
  slogan: string;
  positioning: string;
  url: string;
  domain: string;
  foundedYear: string;
}

export interface Phone {
  display: string;
  href: string;
}

export interface ContactSettings {
  email: string;
  phonePrimary: Phone;
  phoneSecondary: Phone;
  whatsapp: Phone;
  address: {
    lines: string[];
    city: string;
    country: string;
  };
  website: Phone;
}

export const getSite = unstable_cache(
  async (): Promise<SiteSettings> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("content_blocks")
        .select("data")
        .eq("key", "site")
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as SiteSettings) ?? SITE;
    }, SITE as unknown as SiteSettings),
  ["settings:site"],
  { tags: ["blocks", "block:site", "nav"] }
);

export const getContact = unstable_cache(
  async (): Promise<ContactSettings> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("content_blocks")
        .select("data")
        .eq("key", "contact")
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as ContactSettings) ?? CONTACT;
    }, CONTACT as unknown as ContactSettings),
  ["settings:contact"],
  { tags: ["blocks", "block:contact", "nav"] }
);

export const getNav = unstable_cache(
  async (): Promise<NavItem[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("nav_items")
        .select("id, parent_id, label, href, position")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;

      const rows = data ?? [];
      const byParent = new Map<string | null, typeof rows>();
      for (const row of rows) {
        const key = row.parent_id ?? null;
        if (!byParent.has(key)) byParent.set(key, []);
        byParent.get(key)!.push(row);
      }

      const build = (parentId: string | null): NavItem[] =>
        (byParent.get(parentId) ?? []).map((row) => ({
          label: row.label,
          href: row.href,
          children: build(row.id).length > 0 ? build(row.id) : undefined,
        }));

      return build(null);
    }, MAIN_NAV),
  ["settings:nav"],
  { tags: ["nav"] }
);
