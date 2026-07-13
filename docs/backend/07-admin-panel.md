# 07 · Admin Panel

The admin panel lets a non-technical editor manage everything from doc 03. This
doc gives the structure, the auth gate, and reusable CRUD patterns — build it
incrementally (see the phased order at the end).

> **Fastest path to "editable today":** before the custom panel exists, an admin
> can already edit every table and upload media from the **Supabase dashboard →
> Table Editor / Storage**. That is a valid interim CMS. The custom panel below
> makes it friendly (proper forms, ordering, image pickers, previews) for a
> non-technical user.

---

## Routes

```
src/app/admin/
  layout.tsx            # auth gate + sidebar shell; export const dynamic = "force-dynamic"
  login/page.tsx        # email + password sign-in
  page.tsx              # dashboard (counts, quick links, recent submissions)
  settings/page.tsx     # site + contact (content_blocks) + nav_items
  home/page.tsx         # hero + home blocks + reel stats
  solutions/…           # list + create/edit
  capabilities/…
  impact/…              # case studies, projects, sectors, clients, testimonials
  programmes/…
  insights/…
  about/…               # values, why-choose, timeline, sector groups, stats
  media/page.tsx        # storage browser + uploader
  submissions/page.tsx  # contact_submissions (read/mark handled)
  subscribers/page.tsx  # newsletter_subscribers
```

Every `/admin/*` route is uncached (`export const dynamic = "force-dynamic"`) so
editors always see live rows including unpublished drafts.

---

## 1. Auth gate (`src/app/admin/layout.tsx`)

```tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // allowlist check
  const { data: admin } = await supabaseAdmin
    .from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) redirect("/admin/login?denied=1");

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main>{children}</main>
    </div>
  );
}
```

## 2. Login (`src/app/admin/login/page.tsx`)

```tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    if (error) return setErr(error.message);
    router.push("/admin");
    router.refresh();
  }
  return (/* email + password form; show `err` */);
}
```

Sign-out is `await supabase.auth.signOut()` then `router.push("/admin/login")`.

---

## 3. Writes via Server Actions

All mutations go through Server Actions that (a) re-verify the caller is an
admin, (b) write with the service-role client, (c) revalidate the affected tag.

```ts
// src/app/admin/_actions.ts
"use server";
import { revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

async function assertAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("unauthorized");
  const { data } = await supabaseAdmin.from("admins")
    .select("user_id").eq("user_id", user.id).maybeSingle();
  if (!data) throw new Error("forbidden");
}

export async function upsertRow(table: string, row: any, tag: string) {
  await assertAdmin();
  const { error } = await supabaseAdmin.from(table).upsert(row);
  if (error) throw error;
  revalidateTag(tag);            // public site updates within seconds
}

export async function deleteRow(table: string, id: string, tag: string) {
  await assertAdmin();
  const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
  if (error) throw error;
  revalidateTag(tag);
}

export async function reorder(table: string, ids: string[], tag: string) {
  await assertAdmin();
  await Promise.all(ids.map((id, i) =>
    supabaseAdmin.from(table).update({ position: i }).eq("id", id)));
  revalidateTag(tag);
}
```

> Map each table to its revalidation tag (same tags as the content-access layer):
> `solutions → "solutions"`, `capabilities → "capabilities"`, `case_studies →
> "impact"`, `content_blocks → "blocks"`, etc. A small `TABLE_TAGS` lookup keeps
> this consistent.

---

## 4. Reusable CRUD patterns

Because most tables share a shape (title/description/icon/position/is_published),
build a few generic building blocks instead of 25 bespoke screens:

- **`<ResourceTable>`** — lists rows for a table with drag-to-reorder,
  publish toggle, edit and delete. Props: `table`, `columns`, `tag`.
- **`<ResourceForm>`** — renders fields from a small **field schema** you define
  per table (text, textarea, richtext, number, select/enum, string-array,
  jsonb-repeater, image). On submit calls `upsertRow`.
- **`<ImageField>`** — upload widget (doc 05): uploads to `media/…`, stores the
  path, shows a preview.
- **`<RepeaterField>`** — edits a `jsonb` array of objects (used for a solution's
  `sub_services` / `approach`, a wing's `categories`, a programme's `stats`).
- **`<BlockForm>`** — edits a `content_blocks` row: renders a form from a
  per-key field schema (hero fields, home fields, etc.) and saves the assembled
  object to `data`.

Example field schema (drives `<ResourceForm>` for `testimonials`):

```ts
export const testimonialFields = [
  { name: "quote",    label: "Quote",    type: "textarea", required: true },
  { name: "initials", label: "Initials", type: "text",     required: true },
  { name: "role",     label: "Role",     type: "text" },
  { name: "org",      label: "Organisation", type: "text" },
  { name: "is_published", label: "Published", type: "boolean" },
] as const;
```

Adding a new content type later = define its field schema + drop in
`<ResourceTable>` / `<ResourceForm>`. No new plumbing.

---

## 5. Per-area screens (what the editor sees)

| Screen | Table(s) | Notable fields |
|---|---|---|
| **Settings** | `content_blocks` (`site`,`contact`), `nav_items` | name/slogan/positioning, phones, WhatsApp, address; nav tree editor |
| **Home** | `content_blocks` (`hero`,`home`,`final_cta`), `stats` (`reel`) | hero headline/accent/supporting, section copy, reel stats |
| **Solutions** | `solutions`, `cross_cutting_offerings` | sub-services + approach repeaters, closing CTA, image, order |
| **Capabilities** | `capabilities`, `standing_capabilities`, `network_regions`, `deploy_steps` | bullets (string-array), variant, images |
| **About** | `core_values`, `why_choose_reasons`, `timeline_entries`, `sector_groups`, `content_blocks`(`about`), `stats` | icon pickers, journey timeline |
| **Impact** | `case_studies`, `featured_projects`, `impact_sectors`, `clients`, `testimonials` | featured toggle, images, **testimonials default unpublished** |
| **Programmes** | `programmes` (+ `content_blocks` `tcma`), | status enum, stats repeater, future toggle |
| **Insights** | `insights`, `content_blocks`(`newsletter`) | type enum, featured/teaser toggles |
| **Media** | Storage `media`/`brand`, `media_assets` | upload/replace/delete, alt text |
| **Submissions** | `contact_submissions` | read, mark handled, export CSV |
| **Subscribers** | `newsletter_subscribers` | read, export CSV |

### Icon picker

`icon` fields store a lucide-react key resolved by `src/lib/icon-map.ts`. The
picker should list the keys already registered there (extend the map when the
admin needs a new icon). Show a live preview of the selected icon.

---

## 6. UX niceties (recommended, not required)

- **Draft vs publish**: the `is_published` toggle is the publish control. Drafts
  are visible in admin, hidden on the site.
- **Preview**: a "View live" link per item using its `href`/`slug`.
- **Optimistic + revalidate**: after save, the Server Action's `revalidateTag`
  makes the change appear on the public site within seconds (Model B).
- **Reordering**: drag handles write `position` via the `reorder` action.
- **Validation**: enforce required fields client-side and with `zod` in the
  Server Action before writing.

---

## 7. Styling

Reuse the existing design tokens (`src/app/globals.css`) and UI primitives
(`src/components/ui/*`) so the admin feels on-brand. The admin can be visually
plain — it is internal — but sharing `Button`, form inputs, and the ink/bronze
palette keeps it cohesive and fast to build.

Next: get the current content into the database → [`08-migration-and-seed.md`](./08-migration-and-seed.md).
