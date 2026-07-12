# PrimeReach Global Solutions — Website

**Innovate. Create. Reach.**

A premium, institutional-grade corporate website for PrimeReach Global Solutions —
a Tanzania-headquartered strategic communication, media, research and technology group.

This is a **frontend-only** build: no database, auth, CMS or backend. All copy lives
in reusable TypeScript data files. Image and video containers are intentionally
**empty**, ready for real assets (see [`public/README.md`](./public/README.md)).

## Stack

- **Next.js 16.2** (App Router, Turbopack) + **TypeScript** + **React 19**
- **Tailwind CSS v4** (tokens in `src/app/globals.css`)
- **Framer Motion** — restrained, reduced-motion-aware animations
- **lucide-react** — icons
- **next/font** — Outfit (headings) + Manrope (body)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes are static)
npm run lint
```

## Project structure

```
src/
├── app/                 # routes (home, about, services + 3 wings, network,
│   │                    #   clients-sectors, contact, privacy, terms)
│   ├── sitemap.ts       # generated /sitemap.xml
│   └── robots.ts        # generated /robots.txt
├── components/
│   ├── layout/          # header, mobile nav, footer, logo, back-to-top
│   ├── sections/        # hero, about, stats, wings, why-choose, CTA, timeline…
│   ├── services/        # wing cards, category accordion, wing-page template
│   ├── contact/         # contact form (mailto) + details
│   └── ui/              # button, reveal, section-heading, stat-counter,
│                        #   media-placeholder, icon, eyebrow
├── data/site-content.ts # ← single source of truth for ALL copy
├── lib/                 # constants (contact/nav), icon map, structured data, utils
└── types/content.ts     # shared content types
```

## Editing content

Almost everything is driven from **`src/data/site-content.ts`** and
**`src/lib/constants.ts`** (contact details, navigation). Update copy there rather
than in components.

## Adding media later

Every image is a `<MediaPlaceholder />` and the hero uses a `<video>` element with
pre-wired source paths. See [`public/README.md`](./public/README.md) for exactly
where each asset goes and which component to swap.

## Wiring the contact form

The form (`src/components/contact/contact-form.tsx`) currently composes a `mailto:`
link — no fake success state. To connect a real endpoint (Formspree / Resend /
Supabase / a route handler), replace `handleSubmit` with a `fetch()` and add real
success/error UI. The intended endpoint constant is marked in the file.

## Content decisions applied

The supplied company profile contained inconsistencies (section 24 of the brief).
These were resolved in the copy:

- "Building the Continent's Visibility Infrastructure **Since 2019**" (not "a decade")
- Rapid deployment "**typically within 4–24 hours**"
- "**200+** creative professionals, including **100+** vetted creators"
- "**more than 26** Tanzanian regions"
- "**Three** integrated wings covering **thirteen** capability areas"
- Corrected spellings: Strategic Intelligence, Visibility, Discretion, Strategic Clients…
- **Advanced & Emerging Tech** is marked _"pending confirmation"_ in the data file —
  the profile duplicated the Computer & Computing list. Confirm the real services
  before publishing.
