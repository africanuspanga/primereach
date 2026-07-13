# PrimeReach — Backend & Admin CMS Build Docs

This folder is a **complete, step-by-step specification** for adding a Supabase
backend to the PrimeReach website so that a non-technical **admin can log in and
edit every piece of content on the site** — headlines, solutions, capabilities,
case studies, testimonials, clients, insights, programmes, contact details,
navigation, images, and more — without touching code.

It is written to be handed to a developer (or an AI coding agent) and executed
top to bottom. Every table, policy, and code snippet is grounded in the site's
**existing content model** (`src/data/*.ts` and `src/lib/constants.ts`), so the
backend mirrors what is already on the site 1:1.

---

## The one big decision (read this first)

Today the site is a **fully static export**:

```ts
// next.config.ts
output: "export"   // → ./out, hosted on Render as a Static Site
```

All copy lives in TypeScript files (`src/data/`) and is compiled into HTML at
build time. There is **no server and no database**. To let an admin edit content
we must change that. There are two viable models — pick one in
[`01-architecture.md`](./backend/01-architecture.md):

| | **Model A — Static + rebuild** | **Model B — Dynamic + ISR (recommended)** |
|---|---|---|
| Public pages | Static HTML, content read from Supabase **at build time** | Server-rendered/ISR, content read from Supabase **per request (cached)** |
| Content goes live | After a rebuild (~2–4 min), triggered by a deploy hook | **Seconds**, via on-demand revalidation webhook |
| Hosting | Stays on Render Static | Node host — **Vercel** (native ISR) or Render Web Service |
| `output: "export"` | Kept | **Removed** |
| Admin panel | Client-side SPA (Supabase Auth works in-browser) | Server-protected `/admin` route |
| Best when | Minimal hosting change, edits are infrequent | Admin wants instant updates + a proper dashboard |

**Recommendation: Model B** — it gives the admin near-instant publishing and a
first-class protected admin panel. Model A is documented as a fallback if you
want to keep the current static Render setup.

---

## Reading order

| # | Doc | What it covers |
|---|-----|----------------|
| 01 | [Architecture & rendering strategy](./backend/01-architecture.md) | The two models in depth; the recommended stack; data-flow diagrams |
| 02 | [Supabase project setup](./backend/02-supabase-setup.md) | Create the project, keys, env vars, CLI, local dev |
| 03 | [Database schema](./backend/03-database-schema.md) | Full SQL — every table mapped to the current content model |
| 04 | [Auth & Row Level Security](./backend/04-auth-and-rls.md) | Admin login, `admins` allowlist, public-read / admin-write policies |
| 05 | [Storage & media](./backend/05-storage-and-media.md) | Buckets, migrating `/public` images, upload flow, image handling |
| 06 | [Frontend integration](./backend/06-frontend-integration.md) | Supabase clients, the content-access layer that replaces `src/data/*` |
| 07 | [Admin panel](./backend/07-admin-panel.md) | Building `/admin` — auth gate, dashboard, CRUD forms for every content type |
| 08 | [Migration & seeding](./backend/08-migration-and-seed.md) | Script to load existing `src/data/*` content into Supabase |
| 09 | [Deployment & revalidation](./backend/09-deployment-and-revalidation.md) | Hosting change, env, Supabase webhook → instant publish |
| 10 | [Implementation checklist](./backend/10-implementation-checklist.md) | Phased, tickable plan from zero to done |

---

## What "edit everything" means here

The admin will be able to create, edit, reorder, publish/unpublish, and delete:

- **Global** — site name, slogan, positioning, contact details, phone/WhatsApp,
  address, social/SEO defaults, navigation menu (`src/lib/constants.ts`).
- **Home page** — hero, position band, about preview, stats reels, all section
  copy (`HERO`, `HOME`, `REEL_STATS`, `FINAL_CTA`, …).
- **Solutions** — the six solutions with sub-services, approach steps and closing
  CTAs, plus the cross-cutting offerings (`src/data/solutions.ts`).
- **Capabilities** — the five capabilities, standing capabilities, network
  regions, rapid-deployment steps (`src/data/capabilities.ts`).
- **Impact** — case studies (featured + full), featured projects, impact sectors,
  client roster, testimonials (`src/data/impact.ts`).
- **Flagship programmes** — TCMA + future programmes with status and stats
  (`src/data/programmes.ts`).
- **Insights** — articles/reports/news/events, featured insight, newsletter copy
  (`src/data/insights.ts`).
- **About** — mission, vision, core values, timeline/journey, sector groups
  (`src/data/site-content.ts`).
- **Media** — upload/replace every image and the hero video (Supabase Storage).
- **Inbound** — contact-form submissions and newsletter signups are captured to
  the database (a real backend, not just a mailto).

---

## Prerequisites

- A [Supabase](https://supabase.com) account (free tier is enough to start).
- Node 22 (already the project's `NODE_VERSION`).
- The Supabase CLI: `npm i -g supabase` (or `npx supabase`).
- Decide the hosting model (see doc 01) before doing doc 09.

> These docs describe the build. Nothing here has been implemented in the code
> yet — the site still ships its content from `src/data/*`. Follow the checklist
> in doc 10 to execute the migration safely behind the existing site.
