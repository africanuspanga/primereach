import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { mediaUrl } from "@/lib/media";
import { withFallback } from "./utils";
import {
  CASE_STUDIES,
  CASE_STUDIES_FEATURED,
  CLIENT_ROSTER,
  FEATURED_PROJECTS,
  IMPACT_SECTORS,
  TESTIMONIALS,
} from "@/data/impact";
import { CLIENTS } from "@/data/site-content";
import type {
  CaseStudy,
  ClientLogo,
  FeaturedProject,
  ImpactSector,
  RosterClient,
  Testimonial,
} from "@/types/content";

function rowToCaseStudy(r: any): CaseStudy {
  return {
    sector: r.sector,
    client: r.client,
    title: r.title,
    summary: r.summary ?? undefined,
    image: mediaUrl(r.image) ?? "",
  };
}

const allCases = [...CASE_STUDIES_FEATURED, ...CASE_STUDIES];

export const getCaseStudies = unstable_cache(
  async (): Promise<CaseStudy[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map(rowToCaseStudy);
    }, allCases),
  ["case-studies:list"],
  { tags: ["impact"] }
);

export const getFeaturedCaseStudies = unstable_cache(
  async (): Promise<CaseStudy[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .eq("is_featured", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map(rowToCaseStudy);
    }, CASE_STUDIES_FEATURED),
  ["case-studies:featured"],
  { tags: ["impact"] }
);

export const getFeaturedProjects = unstable_cache(
  async (): Promise<FeaturedProject[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("featured_projects")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({
        title: r.title,
        caption: r.caption,
        image: mediaUrl(r.image) ?? "",
      }));
    }, FEATURED_PROJECTS),
  ["featured-projects:list"],
  { tags: ["impact"] }
);

export const getImpactSectors = unstable_cache(
  async (): Promise<ImpactSector[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("impact_sectors")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({
        title: r.title,
        description: r.description,
        count: r.count,
      }));
    }, IMPACT_SECTORS),
  ["impact-sectors:list"],
  { tags: ["impact"] }
);

export const getClients = unstable_cache(
  async (): Promise<ClientLogo[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("clients")
        .select("*")
        .eq("is_published", true)
        .eq("kind", "logo")
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({
        name: r.name,
        logo: mediaUrl(r.logo) ?? r.logo ?? "",
      }));
    }, CLIENTS),
  ["clients:list"],
  { tags: ["impact"] }
);

export const getClientRoster = unstable_cache(
  async (): Promise<RosterClient[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("clients")
        .select("*")
        .eq("is_published", true)
        .eq("kind", "roster")
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r): RosterClient => ({
        name: r.name,
        logo: mediaUrl(r.logo) ?? r.logo ?? undefined,
      }));
    }, CLIENT_ROSTER),
  ["clients:roster"],
  { tags: ["impact"] }
);

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> =>
    withFallback(async () => {
      const { data, error } = await getSupabaseAdmin()
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("position");
      if (error) throw error;
      return (data ?? []).map((r) => ({
        quote: r.quote,
        initials: r.initials,
        role: r.role,
        org: r.org,
      }));
    }, TESTIMONIALS),
  ["testimonials:list"],
  { tags: ["impact"] }
);
