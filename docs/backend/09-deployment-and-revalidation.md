# 09 · Deployment & Revalidation

## Model B (recommended) — dynamic host + instant publish

### 1. Remove static export

```ts
// next.config.ts
const nextConfig: NextConfig = {
  // output: "export",           ← delete (server features now needed)
  // images.unoptimized: true,   ← delete; add remotePatterns instead (doc 05)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "YOUR-PROJECT.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  trailingSlash: true,
  devIndicators: false,
};
```

### 2. Choose a Node host

**Option A — Vercel (recommended).** Native ISR + `revalidateTag`, zero config
for Next 16.

```bash
# once
npx vercel link
# set env (repeat for preview + production, or use the dashboard)
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
npx vercel env add SUPABASE_SERVICE_ROLE_KEY
npx vercel env add REVALIDATE_SECRET
npx vercel --prod
```

**Option B — Render Web Service.** Change `render.yaml` from a static site to a
Node web service:

```yaml
services:
  - type: web
    name: primereach-website
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm run start        # next start
    envVars:
      - key: NODE_VERSION
        value: "22"
      - { key: NEXT_PUBLIC_SUPABASE_URL,      sync: false }
      - { key: NEXT_PUBLIC_SUPABASE_ANON_KEY, sync: false }
      - { key: SUPABASE_SERVICE_ROLE_KEY,     sync: false }
      - { key: REVALIDATE_SECRET,             sync: false }
```

Set the secret values in the Render dashboard (never commit them). Note: Render's
ISR support for `next start` is standard Next.js on-demand revalidation — it
works, but Vercel's edge ISR is smoother. Either is fine.

### 3. Revalidation endpoint

```ts
// src/app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";

// Supabase webhook payload → which tag(s) to bust
const TABLE_TAGS: Record<string, string[]> = {
  solutions: ["solutions"],
  cross_cutting_offerings: ["solutions"],
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
  service_wings: ["solutions"],
  form_options: ["forms"],
  media_assets: ["media"],
};

export async function POST(req: Request) {
  if (req.headers.get("x-revalidate-secret") !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const body = await req.json();                 // { table, record, ... }
  const tags = TABLE_TAGS[body.table] ?? [];
  tags.forEach((t) => revalidateTag(t));
  // also bust the specific slug page if present
  if (body.record?.slug && body.table === "solutions")
    revalidateTag(`solution:${body.record.slug}`);
  return Response.json({ ok: true, revalidated: tags });
}
```

> Server Actions in the admin already call `revalidateTag` directly (doc 07), so
> in-app edits publish instantly without the webhook. The webhook covers edits
> made **outside** the app (e.g. directly in the Supabase Table Editor).

### 4. Wire the Supabase Database Webhook

Dashboard → **Database → Webhooks → Create**:

- Events: `INSERT`, `UPDATE`, `DELETE`.
- Tables: every content table (or use the "all tables" convenience if offered).
- Type: HTTP Request → `POST https://YOUR-SITE/api/revalidate`.
- HTTP header: `x-revalidate-secret: <REVALIDATE_SECRET>`.

Now any change — from the admin panel *or* the Supabase Table Editor — publishes
to the live site within seconds.

---

## Model A (static) — keep Render Static, rebuild to publish

Nothing changes in `next.config.ts` (`output: "export"` stays). Content is baked
at build time from Supabase (doc 06, Model A notes).

To publish, trigger a rebuild:

1. Render dashboard → the static site → **Settings → Deploy Hook** → copy the URL.
2. Create a Supabase Database Webhook (as above) but point it at the **Render
   Deploy Hook URL** (a plain `POST` with no body needed).
3. Optionally add a "Publish site" button in the admin that `fetch()`es the
   deploy hook, so the admin controls when a batch of edits goes live.

Trade-off: content is live after the build finishes (~2–4 min), and each publish
consumes a build. Debounce rapid edits by using the manual "Publish" button
rather than a webhook on every row change.

---

## Post-deploy checklist

- [ ] Public site renders content from Supabase (not `src/data/*`).
- [ ] Unpublished rows (e.g. testimonials) do **not** appear publicly.
- [ ] `/admin` requires login; a non-admin user is redirected.
- [ ] Editing a row in the admin updates the live page within seconds (Model B).
- [ ] Contact form writes a `contact_submissions` row; newsletter writes a
      `newsletter_subscribers` row.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set as a server-only env var and is **not**
      referenced in any client component.
- [ ] Images load from the Supabase Storage domain (whitelisted in
      `next.config.ts` for Model B).

Next: the full plan → [`10-implementation-checklist.md`](./10-implementation-checklist.md).
