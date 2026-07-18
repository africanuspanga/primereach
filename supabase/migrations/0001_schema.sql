-- PrimeReach Global Solutions — Supabase database schema
-- Mirrors src/types/content.ts, src/data/*.ts and src/lib/constants.ts
-- Apply AFTER creating the Supabase project and BEFORE 0002_rls.sql

-- ---------------------------------------------------------------------------
-- 0. Extensions, enums, helpers
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

create type programme_status as enum ('live', 'pilot', 'dev');
create type insight_type as enum ('Article', 'Report', 'News', 'Event');
create type capability_variant as enum ('list', 'network', 'deployment');

-- Auto-update updated_at on every table

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- 1. Global settings & navigation
-- ---------------------------------------------------------------------------

create table content_blocks (
  key         text primary key,
  label       text not null,
  description text,
  data        jsonb not null default '{}',
  is_published boolean not null default true,
  updated_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

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

-- ---------------------------------------------------------------------------
-- 2. Solutions
-- ---------------------------------------------------------------------------

create table solutions (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  number       text not null,
  title        text not null,
  href         text not null,
  icon         text not null,
  card_description text not null,
  hero_tagline text not null,
  seo_description text not null,
  deliver_intro   text,
  sub_services jsonb not null default '[]',
  approach     jsonb not null default '[]',
  closing      jsonb not null default '{}',
  image        text,
  position     int  not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

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
  seo_title    text,
  seo_description text,
  hero_title   text,
  intro        text,
  positioning_line text,
  categories   jsonb not null default '[]',
  image        text,
  position     int  not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. Capabilities
-- ---------------------------------------------------------------------------

create table capabilities (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  number       text not null,
  title        text not null,
  href         text not null,
  icon         text not null,
  summary      text not null,
  summary_home text not null,
  hero_tagline text not null,
  hero_title   text not null,
  body_heading text not null,
  body_copy    text not null,
  bullets      text[] not null default '{}',
  visual_label text not null,
  variant      capability_variant,
  image        text,
  position     int  not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table standing_capabilities (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  position    int  not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table network_regions (
  id        uuid primary key default gen_random_uuid(),
  region    text not null,
  crew      text,
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

-- ---------------------------------------------------------------------------
-- 4. About / company
-- ---------------------------------------------------------------------------

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

create table stats (
  id        uuid primary key default gen_random_uuid(),
  group_key text not null,
  value     text not null,
  label     text not null,
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on stats (group_key, position);

-- ---------------------------------------------------------------------------
-- 5. Impact
-- ---------------------------------------------------------------------------

create table case_studies (
  id          uuid primary key default gen_random_uuid(),
  sector      text not null,
  client      text not null,
  title       text not null,
  summary     text,
  image       text,
  is_featured boolean not null default false,
  position    int not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

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

create table clients (
  id        uuid primary key default gen_random_uuid(),
  name      text not null,
  logo      text,
  kind      text not null default 'logo',
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table testimonials (
  id        uuid primary key default gen_random_uuid(),
  quote     text not null,
  initials  text not null,
  role      text not null,
  org       text not null,
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 6. Programmes
-- ---------------------------------------------------------------------------

create table programmes (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique,
  title        text not null,
  status       programme_status not null,
  status_label text not null,
  description  text not null,
  stats        jsonb not null default '[]',
  cta          jsonb,
  is_future    boolean not null default false,
  image        text,
  position     int not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 7. Insights
-- ---------------------------------------------------------------------------

create table insights (
  id         uuid primary key default gen_random_uuid(),
  type       insight_type not null,
  title      text not null,
  meta       text not null,
  body       text,
  image      text,
  is_featured boolean not null default false,
  is_teaser  boolean not null default false,
  position   int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 8. Form option lists
-- ---------------------------------------------------------------------------

create table form_options (
  id        uuid primary key default gen_random_uuid(),
  group_key text not null,
  value     text not null,
  label     text not null,
  email     text,
  position  int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on form_options (group_key, position);

-- ---------------------------------------------------------------------------
-- 9. Inbound data
-- ---------------------------------------------------------------------------

create table contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  method     text,
  sector     text,
  service    text,
  message    text not null,
  handled    boolean not null default false,
  created_at timestamptz not null default now()
);

create table newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  source     text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 10. Media registry
-- ---------------------------------------------------------------------------

create table media_assets (
  id         uuid primary key default gen_random_uuid(),
  bucket     text not null default 'media',
  path       text not null,
  alt        text,
  category   text,
  width      int,
  height     int,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);

-- ---------------------------------------------------------------------------
-- 11. Admin allowlist
-- ---------------------------------------------------------------------------

create table admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  role       text not null default 'admin',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 12. updated_at triggers
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  for t in
    select unnest(array[
      'content_blocks','nav_items','solutions','cross_cutting_offerings',
      'service_wings','capabilities','standing_capabilities','network_regions',
      'deploy_steps','core_values','why_choose_reasons','timeline_entries',
      'sector_groups','stats','case_studies','featured_projects','impact_sectors',
      'clients','testimonials','programmes','insights','form_options'
      -- media_assets intentionally excluded: it has no updated_at column.
    ])
  loop
    execute format(
      'create trigger %I_touch before update on %I
         for each row execute function set_updated_at();', t, t);
  end loop;
end $$;
