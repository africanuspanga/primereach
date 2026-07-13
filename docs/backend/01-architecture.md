# 01 · Architecture & Rendering Strategy

## Current state

```
Browser ──▶ Render Static Site (./out) ──▶ static HTML
                                            content compiled from src/data/*.ts
```

- Next.js 16 App Router, React 19.
- `next.config.ts` → `output: "export"`, `images.unoptimized: true`, `trailingSlash: true`.
- No server, no database. Content is TypeScript constants imported by pages/components (38 import sites across `src/app` and `src/components`).

## Target state (Model B — recommended)

```
                      ┌──────────────── Supabase ────────────────┐
                      │  Postgres (content)   Auth (admin)        │
                      │  Storage (images/video)  Webhooks         │
                      └───────┬───────────────────────┬──────────┘
              read (cached)   │                        │  on write
                              ▼                        ▼
Visitor ─▶ Next.js (ISR) ─▶ content-access layer   POST /api/revalidate ─▶ revalidateTag()
Admin   ─▶ /admin (Auth-gated) ─▶ server actions ─▶ Postgres (write)      (page updates in seconds)
```

The frontend reads content through a small **content-access layer**
(`src/lib/content/*`) that returns the exact same shapes the components already
consume. Pages become `async` server components. Each query is wrapped in a
cache with a **tag** (e.g. `solutions`, `home`, `impact`). When the admin saves a
change, a Supabase **Database Webhook** calls `/api/revalidate`, which calls
`revalidateTag(...)`, and the affected pages re-render on the next request.

### Why this model

- **Instant publishing.** No full rebuild; a tag revalidation is sub-second.
- **SEO preserved.** Pages are still server-rendered HTML, fully cached at the
  edge between changes (ISR), so crawlers and Core Web Vitals are unaffected.
- **Real admin.** `/admin` is a server-protected route; auth cookies are handled
  server-side via `@supabase/ssr`.
- **Image optimization returns.** Dropping `output: export` re-enables
  `next/image` optimization (currently disabled), which matters — the source
  photos are 15–20 MB each (see `next.config.ts` note).

### Cost of this model

- Requires a **Node host**. Recommended: **Vercel** (native ISR + `revalidateTag`
  + zero-config Next 16). Alternative: **Render Web Service** (change
  `render.yaml` from `runtime: static` to a Node web service). Either works.
- `output: "export"` is removed from `next.config.ts`.

---

## Alternative (Model A — keep it static)

If you want to keep the Render Static Site exactly as-is:

```
Admin ─▶ /admin SPA ─▶ Supabase (write) ─▶ Render Deploy Hook ─▶ rebuild ─▶ new ./out
Visitor ─▶ Render Static Site (content baked at build time from Supabase)
```

- Public pages fetch from Supabase **at build time** inside server components
  (this runs during `next build` and bakes the result into static HTML). Because
  `generateStaticParams` + server component fetches execute at build, no runtime
  server is needed.
- To publish, the admin (or a Supabase webhook) hits a **Render Deploy Hook URL**
  which triggers a rebuild. Content is live after the build (~2–4 min).
- The admin panel runs as a **client-side** app (Supabase Auth + queries work
  entirely in the browser with the anon key + RLS). It can live at `/admin` as a
  `"use client"` route, or be a separate small app.
- `output: "export"` stays. `images.unoptimized` stays.

**Trade-off:** simplest hosting, but content is not instant and you burn a build
per publish. Fine for a site whose content changes weekly, not hourly.

---

## Recommended stack (Model B)

| Concern | Choice |
|---|---|
| Database | Supabase Postgres |
| Auth | Supabase Auth (email + password), gated by an `admins` allowlist table |
| File storage | Supabase Storage (public `media` bucket + private `admin` bucket) |
| Server client | `@supabase/ssr` (`createServerClient`) — cookie-based sessions |
| Browser client | `@supabase/ssr` (`createBrowserClient`) — for the admin UI |
| Admin-write client | `@supabase/supabase-js` with the **service role key** (server only) |
| Rendering | ISR — `async` server components + `unstable_cache`/`fetch` tags |
| Publishing | Supabase Database Webhook → `POST /api/revalidate` → `revalidateTag` |
| Hosting | Vercel (recommended) or Render Web Service |

### Rendering rules of thumb

- **Read content** in `async` **server** components via the content-access layer.
  Never expose the service role key to the client.
- Wrap each content query with `unstable_cache(fn, keyParts, { tags: [...] })`
  so it is cached and tag-revalidatable. See doc 06 for the exact pattern.
- The **admin panel** uses per-request data (`export const dynamic = "force-dynamic"`
  on `/admin/*`) so editors always see the latest, uncached rows.
- Content mutations happen in **Server Actions** using the service role client
  after verifying the caller is an admin (see doc 04 & 07).

---

## File/module plan (what gets added)

```
src/
  lib/
    supabase/
      server.ts        # createServerClient (cookies) — reads in server components
      client.ts        # createBrowserClient — admin UI
      admin.ts         # service-role client — server-only writes
      types.ts         # generated DB types (supabase gen types)
    content/
      index.ts         # re-exports every getter
      home.ts          # getHome(), getHeroStats()…  (replaces site-content.ts reads)
      solutions.ts     # getSolutions(), getSolution(slug), getCrossCutting()
      capabilities.ts  # getCapabilities(), getCapability(slug), …
      impact.ts        # getCaseStudies(), getTestimonials(), getClients()…
      programmes.ts    # getProgrammes(), getFutureProgrammes(), getTcma()
      insights.ts      # getInsights(), getFeaturedInsight()…
      settings.ts      # getSite(), getContact(), getNav()
      blocks.ts        # getBlock(key) helper for jsonb singletons
  app/
    admin/             # the CMS (doc 07)
    api/
      revalidate/route.ts   # webhook target (doc 09)
      contact/route.ts      # contact form → contact_submissions (doc 03/07)
      newsletter/route.ts   # newsletter → newsletter_subscribers
scripts/
  seed-supabase.ts     # one-time migration from src/data/* (doc 08)
supabase/
  migrations/          # SQL from docs 03 & 04
```

The existing `src/data/*.ts` files are **kept as the seed source** (doc 08) and
then become dormant — the content-access layer reads from Postgres instead. You
can delete them once the migration is verified.

Proceed to [`02-supabase-setup.md`](./02-supabase-setup.md).
