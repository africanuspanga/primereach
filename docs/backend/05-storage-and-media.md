# 05 · Storage & Media

Today all images/video live in `/public` and are referenced by the `MEDIA` and
`BRAND` manifests in `src/lib/images.ts`. To let the admin replace imagery, move
assets into **Supabase Storage** and reference them by URL.

## Current asset inventory (`/public`)

| Folder | Contents | Referenced by |
|---|---|---|
| `public/images/backgrounds/` | `backgrounds-01…07.jpg` | `MEDIA.pageHero.*`, hero poster, CTA band |
| `public/images/pr-media/` | `pr-media-01…10.jpg` | wings, solutions, creators, gallery |
| `public/images/technology/` | `technology-01…10.jpg` | tech gallery, solution/capability imagery |
| `public/images/vision-mission/` | `vision-mission-01.jpg` | About |
| `public/clients/` | 12 client logos (`.png`) | client marquee/roster |
| `public/brand/` | logo + favicon | header/footer/`BRAND` |
| `public/videos/` | `hero-background.mp4` | homepage hero |

## 1. Create buckets

Dashboard → **Storage → New bucket**:

| Bucket | Public? | Purpose |
|---|---|---|
| `media` | **Public** | All site imagery + hero video (served to visitors) |
| `brand` | **Public** | Logo, favicon |

Public buckets serve files at a stable CDN URL:
`https://YOUR-PROJECT.supabase.co/storage/v1/object/public/media/<path>`.

Suggested object paths mirror the current structure:

```
media/backgrounds/backgrounds-01.jpg
media/pr-media/pr-media-01.jpg
media/technology/technology-01.jpg
media/vision-mission/vision-mission-01.jpg
media/clients/dstv.png
media/videos/hero-background.mp4
brand/primereach-logo.png
brand/primereach-favicon.png
```

## 2. Storage RLS (write = admins only)

Public buckets are world-readable by default. Restrict **writes** to admins:

```sql
-- Storage objects live in storage.objects
create policy "admin uploads to media"
  on storage.objects for insert to authenticated
  with check (bucket_id in ('media','brand') and is_admin());

create policy "admin updates media"
  on storage.objects for update to authenticated
  using (bucket_id in ('media','brand') and is_admin());

create policy "admin deletes media"
  on storage.objects for delete to authenticated
  using (bucket_id in ('media','brand') and is_admin());
```

(Reads are already public because the buckets are public.)

## 3. Bulk-upload the existing assets

Use the CLI to push the current `/public` tree into the `media` bucket once:

```bash
# from repo root — one-off migration of existing imagery
npx supabase storage cp --recursive public/images    ss:///media       --experimental
npx supabase storage cp --recursive public/clients    ss:///media/clients --experimental
npx supabase storage cp public/videos/hero-background.mp4 ss:///media/videos/hero-background.mp4 --experimental
npx supabase storage cp --recursive public/brand      ss:///brand        --experimental
```

> CLI storage commands are evolving; if the flags differ in your CLI version, the
> dashboard **Storage → Upload** (drag-and-drop, supports folders) does the same
> job. Or script it with `@supabase/supabase-js` `.storage.from('media').upload()`
> inside `scripts/seed-supabase.ts` (doc 08).

## 4. How the frontend resolves media

Replace the hardcoded `/public` paths with Storage URLs. Two options:

**Option 1 — helper that builds the public URL** (simplest):

```ts
// src/lib/media.ts
const BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;
export const mediaUrl  = (path: string) => `${BASE}/media/${path}`;
export const brandUrl  = (path: string) => `${BASE}/brand/${path}`;
```

Then content rows store just the object path (e.g. `pr-media/pr-media-03.jpg`)
and components call `mediaUrl(row.image)`.

**Option 2 — store absolute URLs** in the `image` columns during seeding, and
render them directly. Either is fine; Option 1 keeps rows portable across
projects.

### `next/image` with Supabase

Once `output: "export"` is removed (Model B), re-enable optimization and
whitelist the Supabase domain:

```ts
// next.config.ts (Model B)
images: {
  remotePatterns: [
    { protocol: "https", hostname: "YOUR-PROJECT.supabase.co", pathname: "/storage/v1/object/public/**" },
  ],
},
```

This restores automatic resizing/AVIF — important given the source photos are
15–20 MB. Supabase Pro also offers on-the-fly image transforms
(`?width=1200&quality=70`) you can add in `mediaUrl` if desired.

## 5. Admin upload flow (doc 07 wires the UI)

In the admin, an image field is an upload widget that:

1. Uploads the file to `media/<category>/<filename>` via the browser client
   (`supabase.storage.from('media').upload(path, file, { upsert: true })`).
2. Optionally inserts/updates a `media_assets` row (path, alt, dimensions).
3. Stores the returned path in the content row's `image` column.

Because storage-write RLS requires `is_admin()`, only logged-in admins can upload.

Next: wire the frontend → [`06-frontend-integration.md`](./06-frontend-integration.md).
