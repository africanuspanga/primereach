# 06 · Frontend Integration

This wires the Next.js app to Supabase without changing how components look. The
strategy: build a **content-access layer** that returns the same shapes the
components already import, then swap the imports.

Applies to **Model B** (dynamic/ISR). Model A differences are noted at the end.

---

## 1. Supabase clients

### Server read client (`src/lib/supabase/server.ts`)

Used in `async` server components and route handlers. Next 16's `cookies()` is
async.

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options));
          } catch {
            // called from a Server Component — safe to ignore; middleware refreshes
          }
        },
      },
    },
  );
}
```

### Browser client (`src/lib/supabase/client.ts`)

Used by the admin UI (`"use client"`).

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

### Service-role client (`src/lib/supabase/admin.ts`) — SERVER ONLY

Bypasses RLS. Used only in Server Actions / route handlers for writes and for
cached public reads. **Never import this into a client component.**

```ts
import "server-only";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);
```

### Auth-refresh middleware (`src/middleware.ts`)

Keeps admin sessions fresh. Only needs to run on `/admin`.

```ts
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          list.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options));
        },
      },
    },
  );
  await supabase.auth.getUser();   // refreshes the session cookie
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
```

---

## 2. The content-access layer

One module per content area under `src/lib/content/`. Each getter is wrapped in
`unstable_cache` with a **tag** so it can be revalidated on demand (doc 09).
Reads use the service-role client (bypasses RLS, still filters `is_published`).

```ts
// src/lib/content/solutions.ts
import { unstable_cache } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Solution } from "@/types/content";

export const getSolutions = unstable_cache(
  async (): Promise<Solution[]> => {
    const { data, error } = await supabaseAdmin
      .from("solutions")
      .select("*")
      .eq("is_published", true)
      .order("position");
    if (error) throw error;
    return (data ?? []).map(rowToSolution);
  },
  ["solutions:list"],
  { tags: ["solutions"] },
);

export const getSolution = (slug: string) =>
  unstable_cache(
    async (): Promise<Solution | null> => {
      const { data } = await supabaseAdmin
        .from("solutions").select("*")
        .eq("slug", slug).eq("is_published", true).maybeSingle();
      return data ? rowToSolution(data) : null;
    },
    ["solutions:one", slug],
    { tags: ["solutions", `solution:${slug}`] },
  )();

// maps snake_case DB row → the camelCase shape components expect
function rowToSolution(r: any): Solution {
  return {
    slug: r.slug, number: r.number, title: r.title, href: r.href, icon: r.icon,
    cardDescription: r.card_description, heroTagline: r.hero_tagline,
    seoDescription: r.seo_description, deliverIntro: r.deliver_intro ?? undefined,
    subServices: r.sub_services ?? [], approach: r.approach ?? [],
    closing: r.closing,
  };
}
```

### Singleton blocks helper

```ts
// src/lib/content/blocks.ts
import { unstable_cache } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const getBlock = <T = any>(key: string) =>
  unstable_cache(
    async (): Promise<T | null> => {
      const { data } = await supabaseAdmin
        .from("content_blocks").select("data")
        .eq("key", key).eq("is_published", true).maybeSingle();
      return (data?.data as T) ?? null;
    },
    ["block", key],
    { tags: ["blocks", `block:${key}`] },
  )();

// e.g. const hero = await getBlock<HeroContent>("hero");
```

Build equivalent getters for each area (`home.ts`, `capabilities.ts`,
`impact.ts`, `programmes.ts`, `insights.ts`, `settings.ts`). Re-export from
`src/lib/content/index.ts`.

---

## 3. Swap the imports in pages/components

Pages become `async`. Example — the Solutions index:

```ts
// BEFORE
import { SOLUTIONS } from "@/data/solutions";
export default function SolutionsPage() {
  return <SolutionsGrid solutions={SOLUTIONS} />;
}

// AFTER
import { getSolutions } from "@/lib/content";
export default async function SolutionsPage() {
  const solutions = await getSolutions();
  return <SolutionsGrid solutions={solutions} />;
}
```

`generateStaticParams` for detail routes reads from Supabase too:

```ts
// src/app/solutions/[slug]/page.tsx
import { getSolutions, getSolution } from "@/lib/content";

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;             // Next 16: params is a Promise
  const solution = await getSolution(slug);
  if (!solution) notFound();
  return <SolutionDetail solution={solution} />;
}
```

> The presentational components (`SolutionsGrid`, `SolutionDetail`, cards, etc.)
> keep their existing props — only the **data source** changes. Because the
> content-access layer returns the same `@/types/content` shapes, most components
> need zero edits.

### Global constants (nav, site, contact)

`src/lib/constants.ts` values (`SITE`, `CONTACT`, `MAIN_NAV`, `CTA`) are used in
the header, footer, and layout. Replace with getters:

```ts
// header/footer become async server components (or receive props from layout)
const site    = await getSite();     // content_blocks 'site'
const contact = await getContact();  // content_blocks 'contact'
const nav     = await getNav();      // nav_items (nested)
```

Keep `absoluteUrl()` and other pure helpers in `constants.ts`.

---

## 4. Forms → real endpoints

The contact and newsletter forms currently do nothing server-side. Point them at
route handlers that insert into Supabase (service-role):

```ts
// src/app/api/contact/route.ts
import { supabaseAdmin } from "@/lib/supabase/admin";
export async function POST(req: Request) {
  const body = await req.json();
  const { error } = await supabaseAdmin.from("contact_submissions").insert({
    name: body.name, email: body.email, phone: body.phone,
    method: body.method, sector: body.sector, service: body.service,
    message: body.message,
  });
  if (error) return Response.json({ ok: false }, { status: 500 });
  // optional: send an email notification here
  return Response.json({ ok: true });
}
```

Wire `src/components/contact/contact-form.tsx` and the newsletter signup to POST
to these. Admins read submissions in the admin panel (doc 07).

---

## 5. Model A (static export) differences

If you keep `output: "export"`:

- The getters above still work — they run at **build time**. `unstable_cache`
  tags are irrelevant (there is no runtime server), so you can drop them and just
  fetch.
- Do **not** add middleware, `/api/*` route handlers, or Server Actions (they
  need a server). The contact/newsletter forms and the admin write directly from
  the browser with the anon client + RLS.
- Publishing requires a rebuild (doc 09, Model A section).

Next: the admin panel → [`07-admin-panel.md`](./07-admin-panel.md).
