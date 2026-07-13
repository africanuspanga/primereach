# 10 · Implementation Checklist

A phased, tickable plan. Each phase is shippable and low-risk — the public site
keeps running on `src/data/*` until Phase 4 flips the data source.

---

## Phase 0 — Decide & prepare
- [ ] Choose **Model A** (static + rebuild) or **Model B** (dynamic + ISR). See doc 01. *(Recommended: B.)*
- [ ] Confirm the hosting target (Vercel / Render Web Service / stay on Render Static).
- [ ] Create the Supabase project; save keys in a password manager (doc 02).

## Phase 1 — Backend foundation (no frontend change yet)
- [ ] Add env vars to `.env.local`; confirm `.env*` is git-ignored (doc 02).
- [ ] `npm install @supabase/supabase-js @supabase/ssr` (+ `-D supabase tsx dotenv`).
- [ ] Apply `0001_schema.sql` — all tables (doc 03).
- [ ] Apply `0002_rls.sql` — RLS + policies + `is_admin()` (doc 04).
- [ ] Create the first admin user + `admins` row; disable public sign-ups (doc 04).
- [ ] Create Storage buckets `media` + `brand`; add storage write policies (doc 05).
- [ ] `npx supabase gen types typescript --linked > src/lib/supabase/types.ts`.

## Phase 2 — Seed content
- [ ] Write `scripts/seed-supabase.ts` mapping `src/data/*` → tables (doc 08).
- [ ] Upload `/public` media to Storage (script pass or dashboard) (doc 05/08).
- [ ] Run the seed; verify row counts and spot-check jsonb blocks (doc 08).
- [ ] Confirm testimonials (and any sign-off-pending items) seeded `is_published = false`.

## Phase 3 — Content-access layer (still not wired to pages)
- [ ] Add `src/lib/supabase/{server,client,admin}.ts` (doc 06).
- [ ] Add `src/lib/media.ts` URL helpers (doc 05).
- [ ] Build `src/lib/content/*` getters with cache tags; re-export from `index.ts` (doc 06).
- [ ] Unit-check a couple of getters return the expected shapes.

## Phase 4 — Flip the frontend to Supabase
- [ ] Convert pages to `async`; swap `@/data/*` imports for `@/lib/content` getters (doc 06).
- [ ] Update `generateStaticParams` on `[slug]` routes to read from Supabase.
- [ ] Swap `SITE`/`CONTACT`/`MAIN_NAV` usage in header/footer/layout for getters.
- [ ] Point image references at Storage via `mediaUrl()`.
- [ ] **Model B:** remove `output: "export"`, add `images.remotePatterns`, add `src/middleware.ts` (docs 06/09).
- [ ] Diff every rendered page against the current live site until identical.
- [ ] Delete `src/data/*.ts` and remove dead imports (keep in git history).

## Phase 5 — Forms become real
- [ ] Add `/api/contact` + `/api/newsletter` route handlers (doc 06).
- [ ] Wire `contact-form.tsx` and the newsletter signup to POST to them.
- [ ] Confirm submissions land in `contact_submissions` / `newsletter_subscribers`.
- [ ] (Optional) send an email notification on new contact submissions.

## Phase 6 — Admin panel
- [ ] `/admin/layout.tsx` auth gate + `/admin/login` (doc 07).
- [ ] `_actions.ts` Server Actions: `upsertRow`, `deleteRow`, `reorder` + `assertAdmin` (doc 07).
- [ ] Reusable `<ResourceTable>`, `<ResourceForm>`, `<ImageField>`, `<RepeaterField>`, `<BlockForm>`.
- [ ] Screens in priority order:
  - [ ] Settings (site, contact, nav)
  - [ ] Home (hero, home blocks, reel stats)
  - [ ] Solutions + cross-cutting
  - [ ] Capabilities (+ standing, regions, deploy steps)
  - [ ] Impact (case studies, projects, sectors, clients, testimonials)
  - [ ] Programmes (+ TCMA block)
  - [ ] Insights (+ newsletter)
  - [ ] About (values, why-choose, timeline, sector groups, stats)
  - [ ] Media library (upload/replace/delete + alt text)
  - [ ] Submissions + Subscribers (read, export CSV)
- [ ] Icon picker driven by `src/lib/icon-map.ts` (doc 07).

## Phase 7 — Publishing pipeline
- [ ] **Model B:** `/api/revalidate` + Supabase Database Webhook with secret (doc 09).
- [ ] **Model A:** Render Deploy Hook + optional "Publish" button (doc 09).
- [ ] Verify: edit in admin → live site updates (seconds for B, after rebuild for A).

## Phase 8 — Deploy & harden
- [ ] Set all env vars on the host (server-only for the service role key) (doc 09).
- [ ] Run the post-deploy checklist (doc 09).
- [ ] Confirm the service role key never reaches the browser bundle
      (`grep -r SERVICE_ROLE src/` should only hit `lib/supabase/admin.ts` and server files).
- [ ] Add rate-limiting / basic spam protection on the public form endpoints.
- [ ] Document the admin login + "how to edit X" for the PrimeReach team.

---

## Effort estimate (rough)

| Phase | Scope | Est. |
|---|---|---|
| 0–1 | Project + schema + RLS + storage | 0.5–1 day |
| 2–3 | Seed + content layer | 1 day |
| 4 | Flip frontend + host change | 1–1.5 days |
| 5 | Forms | 0.5 day |
| 6 | Admin panel (the bulk) | 3–5 days |
| 7–8 | Publish pipeline + deploy + hardening | 1 day |

**Total: ~1.5–2 weeks** for a polished, non-technical-friendly CMS. The site is
editable via the **Supabase dashboard from the end of Phase 2** — the admin panel
(Phase 6) is the UX layer on top of an already-working backend.

---

## Guardrails

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client. Reads/writes that use it
  stay in server components, route handlers, and Server Actions.
- Keep `is_published = false` as the default for anything awaiting sign-off
  (testimonials, unannounced programmes) — see the memory note on pending assets.
- Do the whole migration on a **branch**; keep `src/data/*` until Phase 4 proves
  parity, so you can always fall back to the current static build.
- Re-run `supabase gen types` after any schema change and commit the result.
