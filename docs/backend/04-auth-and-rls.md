# 04 · Auth & Row Level Security

Goal: **anyone can read published content; only admins can write anything.**
Public forms (contact, newsletter) can **insert** but not read.

Put this in `supabase/migrations/0002_rls.sql` and apply after doc 03.

---

## 1. Admin identity

Admins are Supabase Auth users whose `user_id` appears in the `admins` table
(created in doc 03). This is a deliberate allowlist — signing up for an account
does **not** grant admin access; a row must be added to `admins`.

### Create the first admin

1. Supabase dashboard → **Authentication → Users → Add user** → enter the
   admin's email + a temporary password (or invite by email).
2. Copy that user's UUID.
3. Run in the SQL Editor:

```sql
insert into admins (user_id, email, role)
values ('PASTE-AUTH-USER-UUID', 'admin@primereachglobal.co.tz', 'admin');
```

> **Turn off public sign-ups** (Authentication → Providers → Email → disable
> "Enable sign ups") so no one can self-register. Admins are added by an existing
> admin or in the dashboard.

### Helper function

```sql
create or replace function is_admin()
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;
```

---

## 2. Enable RLS on every table

```sql
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
```

> With RLS enabled and **no policy**, a table denies all access to the `anon` and
> `authenticated` roles. The **service_role key bypasses RLS entirely** — that is
> why all admin writes go through the server-side service-role client (doc 06/07).

---

## 3. Public read policies (published content)

Two families:

**A. Content tables with `is_published`** — anon reads only published rows.
Apply this to every content table (`solutions`, `capabilities`, `case_studies`,
`testimonials`, `clients`, `insights`, `programmes`, `core_values`,
`why_choose_reasons`, `timeline_entries`, `sector_groups`, `stats`,
`impact_sectors`, `featured_projects`, `standing_capabilities`,
`network_regions`, `deploy_steps`, `cross_cutting_offerings`, `service_wings`,
`nav_items`, `form_options`, `content_blocks`, `media_assets`):

```sql
-- Repeat per table; example for `solutions`
create policy "public reads published solutions"
  on solutions for select
  to anon, authenticated
  using (is_published = true);
```

Do it in a loop to avoid 20+ copies:

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
      'create policy "public read published" on %I for select
         to anon, authenticated using (is_published = true);', t);
  end loop;
end $$;
```

> If you use **Model A (build-time fetch)**, the build reads with the anon key, so
> these public-read policies are what the build relies on. If you use **Model B**
> and read server-side with the service role, RLS is bypassed for reads too — but
> keep these policies anyway so the anon key is safe to expose and the admin
> browser client can preview.

---

## 4. Admin write policies (all tables)

Admins (via a normal authenticated session) get full write on content tables.
Note: the service-role client already bypasses RLS, so these matter when the
**admin browser client** writes directly (Model A, or optimistic UI in Model B).

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
      'create policy "admin all" on %I for all
         to authenticated using (is_admin()) with check (is_admin());', t);
  end loop;
end $$;
```

`for all` covers `insert`, `update`, `delete`, and `select` of **unpublished**
rows (so admins can see drafts). The public read policy above still allows anon
to read published rows.

---

## 5. Inbound forms — anon insert, admin read

```sql
-- Contact form: anyone may submit, only admins may read/manage
create policy "anyone can submit contact"
  on contact_submissions for insert to anon, authenticated with check (true);
create policy "admin reads contact"
  on contact_submissions for select to authenticated using (is_admin());
create policy "admin updates contact"
  on contact_submissions for update to authenticated using (is_admin());

-- Newsletter: anyone may subscribe, only admins may read
create policy "anyone can subscribe"
  on newsletter_subscribers for insert to anon, authenticated with check (true);
create policy "admin reads subscribers"
  on newsletter_subscribers for select to authenticated using (is_admin());
```

> In **Model B** the forms POST to server routes (`/api/contact`,
> `/api/newsletter`) that insert with the service-role client, so the anon-insert
> policy is a belt-and-suspenders fallback. In **Model A** the browser inserts
> directly with the anon key and relies on these policies.

---

## 6. `admins` table policy

Only admins can see the admin list; nobody edits it from the client (manage it
in the dashboard or via service role):

```sql
create policy "admin reads admins"
  on admins for select to authenticated using (is_admin());
```

---

## 7. Verify

In the SQL Editor, impersonate anon and confirm:

```sql
-- Should return only published rows, and error/deny on inserts:
set role anon;
select count(*) from solutions;                 -- published only
insert into solutions (slug, number, title, href, icon, card_description,
  hero_tagline, seo_description) values ('x','99','x','/x','Box','x','x','x');  -- should FAIL
reset role;
```

Also test in the app: an un-logged-in visitor sees content; the `/admin` route
(doc 07) requires login and an `admins` row.

Next: media & storage → [`05-storage-and-media.md`](./05-storage-and-media.md).
