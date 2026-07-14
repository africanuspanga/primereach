import { revalidateTag } from "next/cache";

const TABLE_TAGS: Record<string, string[]> = {
  solutions: ["solutions"],
  cross_cutting_offerings: ["solutions"],
  service_wings: ["solutions"],
  capabilities: ["capabilities"],
  standing_capabilities: ["capabilities"],
  network_regions: ["capabilities"],
  deploy_steps: ["capabilities"],
  case_studies: ["impact"],
  featured_projects: ["impact"],
  impact_sectors: ["impact"],
  clients: ["impact"],
  testimonials: ["impact"],
  programmes: ["programmes"],
  insights: ["insights"],
  core_values: ["about"],
  why_choose_reasons: ["about"],
  timeline_entries: ["about"],
  sector_groups: ["about"],
  stats: ["home", "about"],
  nav_items: ["nav"],
  content_blocks: ["blocks"],
  media_assets: ["media"],
};

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false }, { status: 401 });
  }

  try {
    const body = await req.json();
    const tags = TABLE_TAGS[body.table] ?? [];
    tags.forEach((t) => revalidateTag(t, "max"));

    if (body.record?.slug) {
      if (body.table === "solutions") revalidateTag(`solution:${body.record.slug}`, "max");
      if (body.table === "capabilities") revalidateTag(`capability:${body.record.slug}`, "max");
    }

    return Response.json({ ok: true, revalidated: tags });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
