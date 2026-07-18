-- PrimeReach Global Solutions — Row Level Security
-- Apply AFTER 0001_schema.sql

-- ---------------------------------------------------------------------------
-- 1. Admin identity helpers
-- ---------------------------------------------------------------------------
create or replace function is_admin()
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- 2. Enable RLS on every table
-- ---------------------------------------------------------------------------
alter table content_blocks           enable row level security;
alter table nav_items                enable row level security;
alter table solutions                enable row level security;
alter table cross_cutting_offerings  enable row level security;
alter table service_wings            enable row level security;
alter table capabilities             enable row level security;
alter table standing_capabilities    enable row level security;
alter table network_regions          enable row level security;
alter table deploy_steps             enable row level security;
alter table core_values              enable row level security;
alter table why_choose_reasons       enable row level security;
alter table timeline_entries         enable row level security;
alter table sector_groups            enable row level security;
alter table stats                    enable row level security;
alter table case_studies             enable row level security;
alter table featured_projects        enable row level security;
alter table impact_sectors           enable row level security;
alter table clients                  enable row level security;
alter table testimonials             enable row level security;
alter table programmes               enable row level security;
alter table insights                 enable row level security;
alter table form_options             enable row level security;
alter table media_assets             enable row level security;
alter table contact_submissions      enable row level security;
alter table newsletter_subscribers   enable row level security;
alter table admins                   enable row level security;

-- ---------------------------------------------------------------------------
-- 3. Public read policies (published content)
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
      -- media_assets has no is_published column; admin-only access below.
    ])
  loop
    execute format(
      'create policy "public read published" on %I for select
         to anon, authenticated using (is_published = true);', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- 4. Admin write policies (all content tables)
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
      'clients','testimonials','programmes','insights','form_options','media_assets'
    ])
  loop
    execute format(
      'create policy "admin all" on %I for all
         to authenticated using (is_admin()) with check (is_admin());', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- 5. Inbound forms — anon insert, admin read/manage
-- ---------------------------------------------------------------------------
create policy "anyone can submit contact"
  on contact_submissions for insert to anon, authenticated with check (true);
create policy "admin reads contact"
  on contact_submissions for select to authenticated using (is_admin());
create policy "admin updates contact"
  on contact_submissions for update to authenticated using (is_admin());

create policy "anyone can subscribe"
  on newsletter_subscribers for insert to anon, authenticated with check (true);
create policy "admin reads subscribers"
  on newsletter_subscribers for select to authenticated using (is_admin());

-- ---------------------------------------------------------------------------
-- 6. admins table policy
-- ---------------------------------------------------------------------------
create policy "admin reads admins"
  on admins for select to authenticated using (is_admin());

-- ---------------------------------------------------------------------------
-- 7. Storage policies (public buckets, admin writes)
-- ---------------------------------------------------------------------------
create policy "admin uploads to media"
  on storage.objects for insert to authenticated
  with check (bucket_id in ('media','brand') and is_admin());

create policy "admin updates media"
  on storage.objects for update to authenticated
  using (bucket_id in ('media','brand') and is_admin());

create policy "admin deletes media"
  on storage.objects for delete to authenticated
  using (bucket_id in ('media','brand') and is_admin());
