# 08 · Migration & Seeding

The existing `src/data/*.ts` files are the source of truth for the current site.
This step **loads them into Supabase once** so the database starts as an exact
copy of what is live. After this, the content-access layer (doc 06) reads from
Supabase and the TS files can be retired.

## Approach

Write a one-off Node/TS script, `scripts/seed-supabase.ts`, that:

1. Imports the current data modules (they are plain TS constants).
2. Maps each to its table's rows (camelCase → snake_case; nested arrays → jsonb).
3. Upserts them with the **service-role** client (bypasses RLS).
4. Optionally uploads `/public` media to Storage (or do that separately, doc 05).

Run it with the service role key from `.env.local`.

## Script skeleton

```ts
// scripts/seed-supabase.ts
// Run: npx tsx scripts/seed-supabase.ts   (add: npm i -D tsx dotenv)
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

import { SOLUTIONS, CROSS_CUTTING } from "../src/data/solutions";
import { CAPABILITIES, STANDING_CAPABILITIES, NETWORK_REGIONS, DEPLOY_STEPS } from "../src/data/capabilities";
import {
  CASE_STUDIES, CASE_STUDIES_FEATURED, FEATURED_PROJECTS, IMPACT_SECTORS,
  CLIENT_ROSTER, TESTIMONIALS,
} from "../src/data/impact";
import { PROGRAMMES, FUTURE_PROGRAMMES } from "../src/data/programmes";
import { INSIGHTS, INSIGHTS_TEASER, FEATURED_INSIGHT } from "../src/data/insights";
import {
  HERO, ABOUT, HOME, FINAL_CTA, CORE_VALUES, WHY_CHOOSE, TIMELINE, SECTOR_GROUPS,
  CLIENTS, REEL_STATS, CAPABILITY_STATS, NETWORK_STATS, SERVICE_WINGS,
  SERVICE_WING_DETAILS, SERVICE_OPTIONS, CONTACT_SECTORS, SOLUTION_INTERESTS,
  DEPARTMENTS, NEWSLETTER, PRESENCE, NETWORK, RAPID_DEPLOYMENT, CREATOR_NETWORK,
} from "../src/data/site-content";
import { SOLUTIONS_INDEX } from "../src/data/solutions";
import { CAPABILITIES_INDEX } from "../src/data/capabilities";
import { IMPACT_INDEX } from "../src/data/impact";
import { PROGRAMMES_INDEX, FUTURE_INDEX, TCMA } from "../src/data/programmes";
import { INSIGHTS_INDEX } from "../src/data/insights";
import { SITE, CONTACT, MAIN_NAV } from "../src/lib/constants";
import { MEDIA } from "../src/lib/images";

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

const withPos = <T>(arr: readonly T[]) => arr.map((x, i) => ({ ...x, position: i }));

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
    { key: "newsletter", label: "Newsletter", data: NEWSLETTER },
    { key: "tcma", label: "TCMA programme", data: TCMA },
    { key: "featured_insight", label: "Featured insight", data: FEATURED_INSIGHT },
    { key: "solutions_index", label: "Solutions index intro", data: SOLUTIONS_INDEX },
    { key: "capabilities_index", label: "Capabilities index intro", data: CAPABILITIES_INDEX },
    { key: "impact_index", label: "Impact index intro", data: IMPACT_INDEX },
    { key: "programmes_index", label: "Programmes index intro", data: PROGRAMMES_INDEX },
    { key: "future_index", label: "Future programmes intro", data: FUTURE_INDEX },
    { key: "insights_index", label: "Insights index intro", data: INSIGHTS_INDEX },
  ];
  await db.from("content_blocks").upsert(blocks, { onConflict: "key" });

  // ---- nav (two passes: parents, then children) ----
  for (const [i, item] of MAIN_NAV.entries()) {
    const { data: parent } = await db.from("nav_items")
      .insert({ label: item.label, href: item.href, position: i }).select().single();
    if (item.children?.length && parent) {
      await db.from("nav_items").insert(
        item.children.map((c, j) => ({
          parent_id: parent.id, label: c.label, href: c.href, position: j,
        })));
    }
  }

  // ---- solutions ----
  await db.from("solutions").upsert(
    SOLUTIONS.map((s, i) => ({
      slug: s.slug, number: s.number, title: s.title, href: s.href, icon: s.icon,
      card_description: s.cardDescription, hero_tagline: s.heroTagline,
      seo_description: s.seoDescription, deliver_intro: s.deliverIntro ?? null,
      sub_services: s.subServices, approach: s.approach ?? [], closing: s.closing,
      image: MEDIA.solutions[s.slug] ?? null, position: i,
    })), { onConflict: "slug" });
  await db.from("cross_cutting_offerings").upsert(withPos(CROSS_CUTTING));

  // ---- capabilities ----
  await db.from("capabilities").upsert(
    CAPABILITIES.map((c, i) => ({
      slug: c.slug, number: c.number, title: c.title, href: c.href, icon: c.icon,
      summary: c.summary, summary_home: c.summaryHome, hero_tagline: c.heroTagline,
      hero_title: c.heroTitle, body_heading: c.bodyHeading, body_copy: c.bodyCopy,
      bullets: c.bullets, visual_label: c.visualLabel, variant: c.variant ?? null,
      image: MEDIA.capabilities[c.slug] ?? null, position: i,
    })), { onConflict: "slug" });
  await db.from("standing_capabilities").upsert(withPos(STANDING_CAPABILITIES));
  await db.from("network_regions").upsert(withPos(NETWORK_REGIONS));
  await db.from("deploy_steps").upsert(withPos(DEPLOY_STEPS));

  // ---- about ----
  await db.from("core_values").upsert(withPos(CORE_VALUES));
  await db.from("why_choose_reasons").upsert(withPos(WHY_CHOOSE));
  await db.from("timeline_entries").upsert(withPos(TIMELINE));
  await db.from("sector_groups").upsert(withPos(SECTOR_GROUPS));

  // ---- stats (grouped) ----
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
      sector: c.sector, client: c.client, title: c.title, summary: c.summary ?? null,
      image: c.image ?? null, is_featured: featuredTitles.has(c.title), position: i,
    })));
  await db.from("featured_projects").upsert(withPos(FEATURED_PROJECTS));
  await db.from("impact_sectors").upsert(withPos(IMPACT_SECTORS));
  await db.from("clients").upsert([
    ...CLIENTS.map((c, i) => ({ name: c.name, logo: c.logo, kind: "logo", position: i })),
    ...CLIENT_ROSTER.map((c, i) => ({ name: c.name, logo: c.logo ?? null, kind: "roster", position: i })),
  ]);
  // Testimonials seeded UNPUBLISHED pending client sign-off
  await db.from("testimonials").upsert(
    TESTIMONIALS.map((t, i) => ({ ...t, position: i, is_published: false })));

  // ---- programmes ----
  await db.from("programmes").upsert([
    ...PROGRAMMES.map((p, i) => ({
      slug: p.slug ?? null, title: p.title, status: p.status, status_label: p.statusLabel,
      description: p.description, stats: p.stats ?? [], cta: p.cta ?? null,
      is_future: false, position: i,
    })),
    ...FUTURE_PROGRAMMES.map((p, i) => ({
      slug: p.slug ?? null, title: p.title, status: p.status, status_label: p.statusLabel,
      description: p.description, stats: p.stats ?? [], cta: p.cta ?? null,
      is_future: true, position: i,
    })),
  ]);

  // ---- insights ----
  const teaserTitles = new Set(INSIGHTS_TEASER.map((i) => i.title));
  await db.from("insights").upsert(
    INSIGHTS.map((n, i) => ({
      type: n.type, title: n.title, meta: n.meta, image: n.image ?? null,
      is_teaser: teaserTitles.has(n.title), position: i,
    })));

  // ---- form options ----
  await db.from("form_options").upsert([
    ...SERVICE_OPTIONS.map((o, i) => ({ group_key: "service", value: o.value, label: o.label, position: i })),
    ...CONTACT_SECTORS.map((s, i) => ({ group_key: "sector", value: s, label: s, position: i })),
    ...SOLUTION_INTERESTS.map((s, i) => ({ group_key: "solution_interest", value: s, label: s, position: i })),
    ...DEPARTMENTS.map((d, i) => ({ group_key: "department", value: d.title, label: d.title, email: d.email, position: i })),
  ]);

  console.log("Seed complete.");
}

main().catch((e) => { console.error(e); process.exit(1); });
```

> The exact field names above follow `src/types/content.ts`. Adjust any that
> differ once you open the real data files. Run against a **fresh** project (or
> `supabase db reset` locally) so `upsert` starts clean.

## Media upload in the same script (optional)

Add a pass that walks `public/` and uploads to Storage:

```ts
import { readFile } from "node:fs/promises";
import { glob } from "node:fs/promises"; // or fast-glob
// for each file under public/images, public/clients, public/videos, public/brand:
//   const bytes = await readFile(fullPath);
//   await db.storage.from(bucket).upload(objectPath, bytes, { upsert: true, contentType });
//   await db.from("media_assets").upsert({ bucket, path: objectPath, category });
```

## Verify the seed

```sql
select
  (select count(*) from solutions)      as solutions,      -- expect 6
  (select count(*) from capabilities)   as capabilities,   -- expect 5
  (select count(*) from case_studies)   as case_studies,
  (select count(*) from testimonials)   as testimonials,   -- is_published=false
  (select count(*) from content_blocks) as blocks;
```

Then point the app at Supabase (doc 06) and diff the rendered pages against the
current site. Once they match, delete `src/data/*.ts` (keep them in git history)
and remove the now-unused imports.

Next: ship it → [`09-deployment-and-revalidation.md`](./09-deployment-and-revalidation.md).
