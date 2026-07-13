# 02 · Supabase Project Setup

## 1. Create the project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
2. Name: `primereach`. Region: pick the closest to your audience (e.g.
   `eu-west` / `af` if available — Tanzania traffic is served well from Europe).
3. Set a strong database password and save it in your password manager.
4. Wait for provisioning (~2 min).

## 2. Get your keys

Project → **Settings → API**. You need three values:

| Value | Env var | Exposed to browser? |
|---|---|---|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` | yes |
| `anon` / **publishable** key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes (safe — RLS protects data) |
| `service_role` / **secret** key | `SUPABASE_SERVICE_ROLE_KEY` | **NO — server only, never ship to client** |

> Newer Supabase projects show these as **Publishable** (`sb_publishable_…`) and
> **Secret** (`sb_secret_…`) keys. They map to the same two roles (anon /
> service_role). Use whichever your project shows; the env-var names above stay
> the same.

## 3. Local env files

Create `.env.local` (already git-ignored via `.env*` — verify in `.gitignore`):

```bash
# .env.local  — DO NOT COMMIT
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...            # or sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=eyJ...                # or sb_secret_...  (server only)

# Shared secret used by the Supabase webhook → /api/revalidate (doc 09)
REVALIDATE_SECRET=generate-a-long-random-string
```

Confirm `.gitignore` ignores env files:

```bash
grep -nE "^\.env" .gitignore   # should list .env* or .env.local
```

If it does not, add `.env*` to `.gitignore` **before** creating `.env.local`.

## 4. Install dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install -D supabase        # CLI (or use `npx supabase`)
```

## 5. Link the CLI (for migrations & type generation)

```bash
npx supabase login
npx supabase init                 # creates ./supabase (safe if already present)
npx supabase link --project-ref YOUR-PROJECT-REF   # ref is in the dashboard URL
```

You now have a `supabase/` folder. SQL migrations from docs 03 and 04 go in
`supabase/migrations/` and are applied with:

```bash
npx supabase db push              # apply local migrations to the linked project
```

> Prefer clicking? You can paste the SQL from docs 03/04 straight into the
> dashboard **SQL Editor** instead of using the CLI. The CLI is recommended so the
> schema is version-controlled in the repo.

## 6. Generate TypeScript types (after the schema exists)

Once doc 03's tables are created, generate types so the frontend and admin are
fully typed:

```bash
npx supabase gen types typescript --linked > src/lib/supabase/types.ts
```

Re-run this whenever the schema changes. Commit `types.ts`.

## 7. Optional: local Supabase for development

To develop against a local Postgres instead of the cloud project:

```bash
npx supabase start        # spins up local Postgres + Studio in Docker
npx supabase db reset     # applies all migrations + seed to the local db
```

Point `.env.local` at the local URL/keys that `supabase start` prints. Switch
back to the cloud keys for deploys.

---

**Checkpoint:** you have a Supabase project, three keys in `.env.local`, the CLI
linked, and the Supabase client libs installed. Next, build the schema →
[`03-database-schema.md`](./03-database-schema.md).
