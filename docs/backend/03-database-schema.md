# 03 · Database Schema

This schema mirrors the site's current content model exactly. Source of truth
for the shapes: `src/types/content.ts`, `src/data/*.ts`, `src/lib/constants.ts`.

**Design principles**

- **Relational tables** for anything the admin manages as a list (solutions,
  capabilities, case studies, testimonials, clients, insights, programmes, nav,
  values, timeline, stats, form options). Each has a `position` for ordering and
  `is_published` for draft/publish.
- **`content_blocks`** (a `key → jsonb` table) for one-off singleton sections
  (hero, about, home bands, index intros, final CTA, contact page, newsletter).
  This keeps the table count sane while still being fully editable.
- Nested, rarely-reordered sub-data (a solution's sub-services / approach steps /
  closing CTA; a wing's categories; a programme's stats) is stored as **`jsonb`**
  on the parent row. The admin edits these as repeatable field groups (doc 07).
  Where you prefer strict relational child tables, a note marks the alternative.
- Every table gets `id uuid`, `created_at`, `updated_at` (auto-touched by a
  trigger). Icon fields store a **lucide-react key** (string) resolved by
  `src/lib/icon-map.ts` — unchanged from today.

Put this in `supabase/migrations/0001_schema.sql` (RLS is added in doc 04).

---

## 0. Extensions, enums, helpers

```sql
create extension if not exists "pgcrypto";   -- gen_random_uuid()

-- Enums mirrored from src/types/content.ts
create type programme_status as enum ('live', 'pilot', 'dev');
create type insight_type    as enum ('Article', 'Report', 'News', 'Event');
create type capability_variant as enum ('list', 'network', 'deployment');

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;
```

A convenience macro used below (conceptually — write it out per table):

```sql
-- for every table `t`:
-- create trigger t_touch before update on t
--   for each row execute function set_updated_at();
```

---

## 1. Global settings & navigation

### `content_blocks` — singleton editable sections

Holds `SITE`, `CONTACT`, `HERO`, `ABOUT`, `HOME`, `FINAL_CTA`, `PRESENCE`,
`NETWORK`, `RAPID_DEPLOYMENT`, `CREATOR_NETWORK`, `CONTACT_PAGE`, `NEWSLETTER`,
`FEATURED_INSIGHT`, `TCMA`, and the `*_INDEX` intro blocks (`SOLUTIONS_INDEX`,
`CAPABILITIES_INDEX`, `IMPACT_INDEX`, `PROGRAMMES_INDEX`, `FUTURE_INDEX`,
`INSIGHTS_INDEX`).

```sql
create table content_blocks (
  key         text primary key,          -- e.g. 'site', 'contact', 'hero', 'home', 'solutions_index'
  label       text not null,             -- human label shown in the admin ('Homepage Hero')
  description text,                       -- editor help text
  data        jsonb not null default '{}',
  is_published boolean not null default true,
  updated_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);
```

Example rows (shapes match the current TS objects):

```jsonc
// key = 'site'
{ "name": "PrimeReach Global Solutions", "shortName": "PrimeReach",
  "slogan": "Innovate. Create. Reach.", "positioning": "Building Communication…",
  "url": "https://www.primereachglobal.co.tz", "domain": "www.primereachglobal.co.tz",
  "foundedYear": "2022" }

// key = 'contact'
{ "email": "info@primereachglobal.co.tz",
  "phonePrimary": { "display": "+255 740 223 545", "href": "tel:+255740223545" },
  "phoneSecondary": { "display": "+255 752 213 012", "href": "tel:+255752213012" },
  "whatsapp": { "display": "+255 740 223 545", "href": "https://wa.me/255740223545" },
  "address": { "lines": ["Plot 451, Prince Street", "…"], "city": "Dar es Salaam", "country": "Tanzania" },
  "website": { "display": "www.primereachglobal.co.tz", "href": "https://…" } }

// key = 'hero'         → HERO (eyebrow, headlineLead, headlineAccent, supporting, audiences, ctas)
// key = 'home'         → HOME (all homepage section copy)
// key = 'final_cta'    → FINAL_CTA (heading, copy)
// key = 'newsletter'   → NEWSLETTER, etc.
```

### `nav_items` — main navigation (self-referential for dropdowns)

Mirrors `MAIN_NAV` in `src/lib/constants.ts`.

```sql
create table nav_items (
  id         uuid primary key default gen_random_uuid(),
  parent_id  uuid references nav_items(id) on delete cascade,
  label      text not null,
  href       text not null,
  position   int  not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on nav_items (parent_id, position);
```

Top-level items have `parent_id = null`; dropdown children reference their parent.

---

## 2. Solutions  (`src/data/solutions.ts`)

```sql
create table solutions (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  number       text not null,            -- '01'…'06'
  title        text not null,
  href         text not null,
  icon         text not null,            -- lucide key
  card_description text not null,        -- home + index cards
  hero_tagline text not null,
  seo_description text not null,
  deliver_intro   text,
  sub_services jsonb not null default '[]',  -- [{ title, description }]
  approach     jsonb not null default '[]',  -- [{ number, title, description }]
  closing      jsonb not null default '{}',  -- { eyebrow, heading, copy, primary:{label,href}, secondary? }
  image        text,                         -- storage path (see MEDIA.solutions)
  position     int  not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Cross-cutting offerings 07–10 (Solutions index only)
create table cross_cutting_offerings (
  id          uuid primary key default gen_random_uuid(),
  number      text not null,
  title       text not null,
  description text not null,
  cta         text not null,
  position    int  not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
```

> **Alternative (strict relational):** replace `sub_services` / `approach` with
> `solution_sub_services` and `solution_approach_steps` child tables keyed by
> `solution_id` with their own `position`. The jsonb approach is simpler for the
> admin forms and is recommended unless you need to query sub-services directly.

### Service wings (`SERVICE_WINGS` / `SERVICE_WING_DETAILS`)

The v1 "three wings" grouping is still rendered in places. Keep it:

```sql
create table service_wings (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  href         text not null,
  eyebrow      text not null,
  title        text not null,
  short_description text not null,
  icon         text not null,
  areas        text[] not null default '{}',
  cta          text not null,
  -- detail (SERVICE_WING_DETAILS)
  seo_title    text,
  seo_description text,
  hero_title   text,
  intro        text,
  positioning_line text,
  categories   jsonb not null default '[]',   -- [{ title, services: text[] }]
  image        text,
  position     int  not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
```

---

## 3. Capabilities  (`src/data/capabilities.ts`)

```sql
create table capabilities (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  number       text not null,
  title        text not null,
  href         text not null,
  icon         text not null,
  summary      text not null,            -- Capabilities index tile
  summary_home text not null,            -- home "five capabilities" row
  hero_tagline text not null,
  hero_title   text not null,
  body_heading text not null,
  body_copy    text not null,
  bullets      text[] not null default '{}',
  visual_label text not null,
  variant      capability_variant,       -- 'list' | 'network' | 'deployment'
  image        text,
  position     int  not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- STANDING_CAPABILITIES (shared list of {title, description})
create table standing_capabilities (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  position    int  not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- NETWORK_REGIONS ({ region, crew? })
create table network_regions (
  id        uuid primary key default gen_random_uuid(),
  region    text not null,
  crew      text,
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- DEPLOY_STEPS ({ time, title, description })
create table deploy_steps (
  id          uuid primary key default gen_random_uuid(),
  time        text not null,
  title       text not null,
  description text not null,
  position    int not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
```

---

## 4. About / company  (`src/data/site-content.ts`)

```sql
-- CORE_VALUES ({ title, description, icon })
create table core_values (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  icon        text not null,
  position    int not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- WHY_CHOOSE ({ title, description, icon })
create table why_choose_reasons (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  icon        text not null,
  position    int not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- TIMELINE ({ year, tag?, title?, description })  — "Our Journey"
create table timeline_entries (
  id          uuid primary key default gen_random_uuid(),
  year        text not null,
  tag         text,
  title       text,
  description text not null,
  position    int not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- SECTOR_GROUPS ({ title, icon, items: text[] })
create table sector_groups (
  id        uuid primary key default gen_random_uuid(),
  title     text not null,
  icon      text not null,
  items     text[] not null default '{}',
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Stats (reusable groups)

`CAPABILITY_STATS`, `NETWORK_STATS`, `REEL_STATS` are all lists of
`{ value, label }`. One table, grouped by a key:

```sql
create table stats (
  id        uuid primary key default gen_random_uuid(),
  group_key text not null,               -- 'capability' | 'network' | 'reel'
  value     text not null,               -- e.g. '150+'
  label     text not null,               -- e.g. 'Projects delivered'
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on stats (group_key, position);
```

---

## 5. Impact  (`src/data/impact.ts`)

```sql
-- CASE_STUDIES + CASE_STUDIES_FEATURED (is_featured flag)
create table case_studies (
  id          uuid primary key default gen_random_uuid(),
  sector      text not null,
  client      text not null,
  title       text not null,
  summary     text,
  image       text,                       -- storage path
  is_featured boolean not null default false,
  position    int not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- FEATURED_PROJECTS ({ title, caption, image })
create table featured_projects (
  id        uuid primary key default gen_random_uuid(),
  title     text not null,
  caption   text not null,
  image     text,
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- IMPACT_SECTORS ({ title, description, count })
create table impact_sectors (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  count       text not null,
  position    int not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- CLIENTS (marquee logos) + CLIENT_ROSTER (names) — unified with a `kind`
create table clients (
  id        uuid primary key default gen_random_uuid(),
  name      text not null,
  logo      text,                          -- storage path; null = name-only roster entry
  kind      text not null default 'logo',  -- 'logo' (has image) | 'roster' (name list)
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- TESTIMONIALS ({ quote, initials, role, org })
create table testimonials (
  id        uuid primary key default gen_random_uuid(),
  quote     text not null,
  initials  text not null,
  role      text not null,
  org       text not null,
  position  int not null default 0,
  is_published boolean not null default true,   -- NOTE: keep unpublished until client sign-off
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

> Testimonials and some programmes need client publish sign-off — seed them with
> `is_published = false` so they never render until approved.

---

## 6. Flagship programmes  (`src/data/programmes.ts`)

```sql
create table programmes (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique,
  title        text not null,
  status       programme_status not null,   -- 'live' | 'pilot' | 'dev'
  status_label text not null,
  description  text not null,
  stats        jsonb not null default '[]',  -- [{ value, label }]
  cta          jsonb,                         -- { label, href, variant? }
  is_future    boolean not null default false, -- FUTURE_PROGRAMMES vs PROGRAMMES
  image        text,
  position     int not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
```

The rich **TCMA** page body lives as a `content_blocks` row (`key = 'tcma'`).

---

## 7. Insights  (`src/data/insights.ts`)

```sql
create table insights (
  id         uuid primary key default gen_random_uuid(),
  type       insight_type not null,        -- 'Article' | 'Report' | 'News' | 'Event'
  title      text not null,
  meta       text not null,                -- e.g. 'Report · 12 min · 2026'
  body       text,                          -- optional full article (future)
  image      text,
  is_featured boolean not null default false,  -- FEATURED_INSIGHT
  is_teaser  boolean not null default false,   -- INSIGHTS_TEASER (home)
  position   int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

---

## 8. Form option lists  (`src/data/site-content.ts`)

`SERVICE_OPTIONS`, `CONTACT_SECTORS`, `SOLUTION_INTERESTS`, `CONTACT_METHODS`,
`CASE_STUDY_FILTERS`, and `DEPARTMENTS` are small editable lists. One table:

```sql
create table form_options (
  id        uuid primary key default gen_random_uuid(),
  group_key text not null,   -- 'service' | 'sector' | 'solution_interest' | 'contact_method' | 'case_filter' | 'department'
  value     text not null,   -- machine value
  label     text not null,   -- display label
  email     text,            -- DEPARTMENTS have an email; others null
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on form_options (group_key, position);
```

---

## 9. Inbound data (real backend features)

```sql
-- Contact form submissions (replaces the current front-end-only form)
create table contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  method     text,           -- Email | Telephone | WhatsApp
  sector     text,
  service    text,           -- solution interest
  message    text not null,
  handled    boolean not null default false,
  created_at timestamptz not null default now()
);

-- Newsletter signups
create table newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  source     text,           -- which page/section
  created_at timestamptz not null default now()
);
```

---

## 10. Media registry (optional but recommended)

A row per uploaded asset so the admin has a browsable media library and the
frontend can resolve alt text. Files themselves live in Storage (doc 05).

```sql
create table media_assets (
  id         uuid primary key default gen_random_uuid(),
  bucket     text not null default 'media',
  path       text not null,                 -- object path within the bucket
  alt        text,
  category   text,                           -- 'background' | 'pr-media' | 'technology' | 'client' | 'brand' | 'video'
  width      int,
  height     int,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);
```

---

## 11. Admin allowlist (used by doc 04 RLS)

```sql
create table admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  role       text not null default 'admin',   -- 'admin' | 'editor' (future granularity)
  created_at timestamptz not null default now()
);
```

---

## 12. Attach the updated_at trigger to every table

```sql
do $$
declare t text;
begin
  for t in
    select unnest(array[
      'content_blocks','nav_items','solutions','cross_cutting_offerings',
      'service_wings','capabilities','standing_capabilities','network_regions',
      'deploy_steps','core_values','why_choose_reasons','timeline_entries',
      'sector_groups','stats','case_studies','featured_projects','impact_sectors',
      'clients','testimonials','programmes','insights','form_options','media_assets'
    ])
  loop
    execute format(
      'create trigger %I_touch before update on %I
         for each row execute function set_updated_at();', t, t);
  end loop;
end $$;
```

---

## Table → source map (quick reference)

| Table | Comes from |
|---|---|
| `content_blocks` | `SITE`, `CONTACT`, `HERO`, `ABOUT`, `HOME`, `FINAL_CTA`, `PRESENCE`, `NETWORK`, `RAPID_DEPLOYMENT`, `CREATOR_NETWORK`, `CONTACT_PAGE`, `NEWSLETTER`, `FEATURED_INSIGHT`, `TCMA`, all `*_INDEX` |
| `nav_items` | `MAIN_NAV` |
| `solutions`, `cross_cutting_offerings` | `SOLUTIONS`, `CROSS_CUTTING` |
| `service_wings` | `SERVICE_WINGS`, `SERVICE_WING_DETAILS` |
| `capabilities`, `standing_capabilities`, `network_regions`, `deploy_steps` | `CAPABILITIES`, `STANDING_CAPABILITIES`, `NETWORK_REGIONS`, `DEPLOY_STEPS` |
| `core_values`, `why_choose_reasons`, `timeline_entries`, `sector_groups`, `stats` | `CORE_VALUES`, `WHY_CHOOSE`, `TIMELINE`, `SECTOR_GROUPS`, `*_STATS` |
| `case_studies`, `featured_projects`, `impact_sectors`, `clients`, `testimonials` | `CASE_STUDIES*`, `FEATURED_PROJECTS`, `IMPACT_SECTORS`, `CLIENTS`+`CLIENT_ROSTER`, `TESTIMONIALS` |
| `programmes` | `PROGRAMMES`, `FUTURE_PROGRAMMES` |
| `insights` | `INSIGHTS`, `INSIGHTS_TEASER`, `FEATURED_INSIGHT` |
| `form_options` | `SERVICE_OPTIONS`, `CONTACT_SECTORS`, `SOLUTION_INTERESTS`, `CONTACT_METHODS`, `CASE_STUDY_FILTERS`, `DEPARTMENTS` |
| `contact_submissions`, `newsletter_subscribers` | new (form capture) |
| `media_assets` | `MEDIA`, `BRAND` manifests |
| `admins` | new (auth allowlist) |

Next: lock it down → [`04-auth-and-rls.md`](./04-auth-and-rls.md).
