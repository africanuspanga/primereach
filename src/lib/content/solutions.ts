import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resolveImage } from "@/lib/media";
import { withFallback } from "./utils";
import { SOLUTIONS, CROSS_CUTTING } from "@/data/solutions";
import { SERVICE_WINGS, SERVICE_WING_DETAILS } from "@/data/site-content";
import type { CrossCuttingOffering, ServiceWing, ServiceWingDetail, Solution } from "@/types/content";

function rowToSolution(r: any): Solution {
  return {
    slug: r.slug,
    number: r.number,
    title: r.title,
    href: r.href,
    icon: r.icon,
    cardDescription: r.card_description,
    heroTagline: r.hero_tagline,
    seoDescription: r.seo_description,
    deliverIntro: r.deliver_intro ?? undefined,
    subServices: r.sub_services ?? [],
    approach: r.approach ?? [],
    closing: r.closing,
    image: resolveImage(r.image) ?? undefined,
  };
}

export const getSolutions = unstable_cache(
  async (): Promise<Solution[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("solutions")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map(rowToSolution);
    }, SOLUTIONS),
  ["solutions:list"],
  { tags: ["solutions"] }
);

export const getSolution = (slug: string) =>
  unstable_cache(
    async (): Promise<Solution | null> =>
      withFallback(async () => {
        const { data } = await getSupabaseAdmin()
          .from("solutions")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .maybeSingle();
        return data ? rowToSolution(data) : null;
      }, SOLUTIONS.find((s) => s.slug === slug) ?? null),
    ["solutions:one", slug],
    { tags: ["solutions", `solution:${slug}`] }
  )();

export const getCrossCuttingOfferings = unstable_cache(
  async (): Promise<CrossCuttingOffering[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("cross_cutting_offerings")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({
        number: r.number,
        title: r.title,
        description: r.description,
        cta: r.cta,
      }));
    }, CROSS_CUTTING),
  ["cross-cutting:list"],
  { tags: ["solutions"] }
);

function rowToServiceWing(r: any): ServiceWingDetail {
  return {
    slug: r.slug,
    href: r.href,
    eyebrow: r.eyebrow,
    title: r.title,
    shortDescription: r.short_description,
    icon: r.icon,
    areas: r.areas ?? [],
    cta: r.cta,
    seoTitle: r.seo_title ?? r.title,
    seoDescription: r.seo_description ?? "",
    heroTitle: r.hero_title ?? r.title,
    intro: r.intro ?? "",
    positioningLine: r.positioning_line ?? undefined,
    categories: r.categories ?? [],
    image: resolveImage(r.image) ?? undefined,
  };
}

export const getServiceWings = unstable_cache(
  async (): Promise<ServiceWing[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("service_wings")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map(rowToServiceWing);
    }, SERVICE_WINGS as ServiceWing[]),
  ["service-wings:list"],
  { tags: ["solutions"] }
);

export const getServiceWing = (slug: string) =>
  unstable_cache(
    async (): Promise<ServiceWingDetail | null> =>
      withFallback(async () => {
        const { data } = await getSupabaseAdmin()
          .from("service_wings")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .maybeSingle();
        return data ? rowToServiceWing(data) : null;
      }, SERVICE_WING_DETAILS[slug] ?? null),
    ["service-wings:one", slug],
    { tags: ["solutions", `service-wing:${slug}`] }
  )();
