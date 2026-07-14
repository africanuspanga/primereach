// PrimeReach — one-time seed from src/data/* into Supabase.
// Run: npx tsx scripts/seed-supabase.ts
// Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

import { SOLUTIONS, CROSS_CUTTING, SOLUTIONS_INDEX } from "../src/data/solutions";
import {
  CAPABILITIES,
  STANDING_CAPABILITIES,
  NETWORK_REGIONS,
  DEPLOY_STEPS,
  CAPABILITIES_INDEX,
} from "../src/data/capabilities";
import {
  CASE_STUDIES,
  CASE_STUDIES_FEATURED,
  FEATURED_PROJECTS,
  IMPACT_SECTORS,
  CLIENT_ROSTER,
  TESTIMONIALS,
  IMPACT_INDEX,
} from "../src/data/impact";
import { PROGRAMMES, FUTURE_PROGRAMMES, PROGRAMMES_INDEX, FUTURE_INDEX, TCMA } from "../src/data/programmes";
import { INSIGHTS, INSIGHTS_TEASER, FEATURED_INSIGHT, INSIGHTS_INDEX, NEWSLETTER } from "../src/data/insights";
import {
  HERO,
  ABOUT,
  HOME,
  FINAL_CTA,
  CORE_VALUES,
  WHY_CHOOSE,
  TIMELINE,
  SECTOR_GROUPS,
  CLIENTS,
  REEL_STATS,
  CAPABILITY_STATS,
  NETWORK_STATS,
  SERVICE_WINGS,
  SERVICE_WING_DETAILS,
  SERVICE_OPTIONS,
  CONTACT_SECTORS,
  SOLUTION_INTERESTS,
  DEPARTMENTS,
  PRESENCE,
  NETWORK,
  RAPID_DEPLOYMENT,
  CREATOR_NETWORK,
  CONTACT_PAGE,
  CONTACT_METHODS,
} from "../src/data/site-content";
import { NEWSLETTER as NEWSLETTER_BLOCK } from "../src/data/insights";
import { SITE, CONTACT, MAIN_NAV } from "../src/lib/constants";
import { MEDIA, BRAND } from "../src/lib/images";

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

/** Convert /public paths to storage object paths. */
function toStoragePath(path?: string | null): string | null {
  if (!path) return null;
  return path.replace(/^\//, "");
}

const withPos = <T,>(arr: readonly T[]) => arr.map((x, i) => ({ ...x, position: i }));

async function main() {
  // ---- singletons → content_blocks ----
  const blocks = [
    { key: "site", label: "Site settings", data: SITE },
    { key: "contact", label: "Contact details", data: CONTACT },
    { key: "hero", label: "Homepage hero", data: HERO },
    { key: "about", label: "About page", data: ABOUT },
    { key: "home", label: "Homepage sections", data: HOME },
    { key: "final_cta", label: "Final call-to-action", data: FINAL_CTA },
    { key: "presence", label: "Presence band", data: PRESENCE },
    { key: "network", label: "Network band", data: NETWORK },
    { key: "rapid_deployment", label: "Rapid deployment", data: RAPID_DEPLOYMENT },
    { key: "creator_network", label: "Creator network", data: CREATOR_NETWORK },
    { key: "newsletter", label: "Newsletter", data: NEWSLETTER_BLOCK },
    { key: "tcma", label: "TCMA programme", data: TCMA },
    { key: "featured_insight", label: "Featured insight", data: FEATURED_INSIGHT },
    { key: "solutions_index", label: "Solutions index intro", data: SOLUTIONS_INDEX },
    { key: "capabilities_index", label: "Capabilities index intro", data: CAPABILITIES_INDEX },
    { key: "impact_index", label: "Impact index intro", data: IMPACT_INDEX },
    { key: "programmes_index", label: "Programmes index intro", data: PROGRAMMES_INDEX },
    { key: "future_index", label: "Future programmes intro", data: FUTURE_INDEX },
    { key: "insights_index", label: "Insights index intro", data: INSIGHTS_INDEX },
    { key: "contact_page", label: "Contact page", data: CONTACT_PAGE },
  ];
  await db.from("content_blocks").upsert(blocks, { onConflict: "key" });

  // ---- nav (two passes: parents, then children) ----
  await db.from("nav_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  for (const [i, item] of MAIN_NAV.entries()) {
    const { data: parent } = await db
      .from("nav_items")
      .insert({ label: item.label, href: item.href, position: i })
      .select()
      .single();
    if (item.children?.length && parent) {
      await db.from("nav_items").insert(
        item.children.map((c, j) => ({
          parent_id: parent.id,
          label: c.label,
          href: c.href,
          position: j,
        }))
      );
    }
  }

  // ---- solutions ----
  await db.from("solutions").upsert(
    SOLUTIONS.map((s, i) => ({
      slug: s.slug,
      number: s.number,
      title: s.title,
      href: s.href,
      icon: s.icon,
      card_description: s.cardDescription,
      hero_tagline: s.heroTagline,
      seo_description: s.seoDescription,
      deliver_intro: s.deliverIntro ?? null,
      sub_services: s.subServices,
      approach: s.approach ?? [],
      closing: s.closing,
      image: toStoragePath(MEDIA.solutions[s.slug as keyof typeof MEDIA.solutions]),
      position: i,
    })),
    { onConflict: "slug" }
  );
  await db.from("cross_cutting_offerings").upsert(withPos(CROSS_CUTTING));

  // ---- service wings ----
  await db.from("service_wings").upsert(
    SERVICE_WINGS.map((w, i) => {
      const detail = SERVICE_WING_DETAILS[w.slug];
      return {
        slug: w.slug,
        href: w.href,
        eyebrow: w.eyebrow,
        title: w.title,
        short_description: w.shortDescription,
        icon: w.icon,
        areas: w.areas,
        cta: w.cta,
        seo_title: detail?.seoTitle ?? null,
        seo_description: detail?.seoDescription ?? null,
        hero_title: detail?.heroTitle ?? null,
        intro: detail?.intro ?? null,
        positioning_line: detail?.positioningLine ?? null,
        categories: detail?.categories ?? [],
        image: toStoragePath(MEDIA.wings[w.slug as keyof typeof MEDIA.wings]),
        position: i,
      };
    }),
    { onConflict: "slug" }
  );

  // ---- capabilities ----
  await db.from("capabilities").upsert(
    CAPABILITIES.map((c, i) => ({
      slug: c.slug,
      number: c.number,
      title: c.title,
      href: c.href,
      icon: c.icon,
      summary: c.summary,
      summary_home: c.summaryHome,
      hero_tagline: c.heroTagline,
      hero_title: c.heroTitle,
      body_heading: c.bodyHeading,
      body_copy: c.bodyCopy,
      bullets: c.bullets,
      visual_label: c.visualLabel,
      variant: c.variant ?? null,
      image: toStoragePath(MEDIA.capabilities[c.slug as keyof typeof MEDIA.capabilities]),
      position: i,
    })),
    { onConflict: "slug" }
  );
  await db.from("standing_capabilities").upsert(withPos(STANDING_CAPABILITIES));
  await db.from("network_regions").upsert(withPos(NETWORK_REGIONS));
  await db.from("deploy_steps").upsert(withPos(DEPLOY_STEPS));

  // ---- about ----
  await db.from("core_values").upsert(withPos(CORE_VALUES));
  await db.from("why_choose_reasons").upsert(withPos(WHY_CHOOSE));
  await db.from("timeline_entries").upsert(withPos(TIMELINE));
  await db.from("sector_groups").upsert(withPos(SECTOR_GROUPS));

  // ---- stats ----
  await db.from("stats").upsert([
    ...REEL_STATS.map((s, i) => ({ group_key: "reel", value: s.value, label: s.label, position: i })),
    ...CAPABILITY_STATS.map((s, i) => ({ group_key: "capability", value: s.value, label: s.label, position: i })),
    ...NETWORK_STATS.map((s, i) => ({ group_key: "network", value: s.value, label: s.label, position: i })),
  ]);

  // ---- impact ----
  const featuredTitles = new Set(CASE_STUDIES_FEATURED.map((c) => c.title));
  const allCases = [...CASE_STUDIES_FEATURED, ...CASE_STUDIES];
  await db.from("case_studies").upsert(
    allCases.map((c, i) => ({
      sector: c.sector,
      client: c.client,
      title: c.title,
      summary: c.summary ?? null,
      image: toStoragePath(c.image),
      is_featured: featuredTitles.has(c.title),
      position: i,
    }))
  );
  await db.from("featured_projects").upsert(
    withPos(FEATURED_PROJECTS).map((p) => ({ ...p, image: toStoragePath(p.image) }))
  );
  await db.from("impact_sectors").upsert(withPos(IMPACT_SECTORS));
  await db.from("clients").upsert([
    ...CLIENTS.map((c, i) => ({ name: c.name, logo: toStoragePath(c.logo), kind: "logo", position: i })),
    ...CLIENT_ROSTER.map((c, i) => ({ name: c.name, logo: toStoragePath(c.logo), kind: "roster", position: i })),
  ]);
  // Testimonials seeded UNPUBLISHED pending client sign-off
  await db.from("testimonials").upsert(
    TESTIMONIALS.map((t, i) => ({ ...t, position: i, is_published: false }))
  );

  // ---- programmes ----
  await db.from("programmes").upsert([
    ...PROGRAMMES.map((p, i) => ({
      slug: p.slug ?? null,
      title: p.title,
      status: p.status,
      status_label: p.statusLabel,
      description: p.description,
      stats: p.stats ?? [],
      cta: p.cta ?? null,
      is_future: false,
      image: toStoragePath(MEDIA.programmes[p.slug as keyof typeof MEDIA.programmes]),
      position: i,
    })),
    ...FUTURE_PROGRAMMES.map((p, i) => ({
      slug: p.slug ?? null,
      title: p.title,
      status: p.status,
      status_label: p.statusLabel,
      description: p.description,
      stats: p.stats ?? [],
      cta: p.cta ?? null,
      is_future: true,
      position: i,
    })),
  ]);

  // ---- insights ----
  const teaserTitles = new Set(INSIGHTS_TEASER.map((i) => i.title));
  const featuredInsightTitle = FEATURED_INSIGHT.title;
  await db.from("insights").upsert(
    INSIGHTS.map((n, i) => ({
      type: n.type,
      title: n.title,
      meta: n.meta,
      image: toStoragePath(n.image),
      is_featured: n.title === featuredInsightTitle,
      is_teaser: teaserTitles.has(n.title),
      position: i,
    }))
  );

  // ---- form options ----
  await db.from("form_options").upsert([
    ...SERVICE_OPTIONS.map((o, i) => ({ group_key: "service", value: o.value, label: o.label, position: i })),
    ...CONTACT_SECTORS.map((s, i) => ({ group_key: "sector", value: s, label: s, position: i })),
    ...SOLUTION_INTERESTS.map((s, i) => ({ group_key: "solution_interest", value: s, label: s, position: i })),
    ...CONTACT_METHODS.map((s, i) => ({ group_key: "contact_method", value: s, label: s, position: i })),
    ...DEPARTMENTS.map((d, i) => ({ group_key: "department", value: d.title, label: d.title, email: d.email, position: i })),
  ]);

  console.log("Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
