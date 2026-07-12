# Public Assets — PrimeReach Website

All image and video containers on the site are intentionally **empty** and ready
for real assets. Drop files into the folders below and swap the placeholder
components for real media where noted.

## Folders

| Folder      | What goes here                                                        |
| ----------- | --------------------------------------------------------------------- |
| `brand/`    | Logo SVGs (primary, white, navy, icon-only), `favicon.ico`, `og-image.jpg` |
| `videos/`   | Hero background: `hero.webm`, `hero.mp4`, `hero-poster.jpg`            |
| `images/`   | Section photography (institutional, media, crews, training, tech, etc.) |
| `clients/`  | Client / partner logos (SVG preferred) — see filenames in `src/data/site-content.ts` |
| `icons/`    | Any custom icon assets (UI icons already use lucide-react)            |

## Where placeholders live in the code

- **Hero video** — `src/components/sections/hero-section.tsx` (`<video>` sources
  already point to `/videos/hero.webm` + `/videos/hero.mp4`).
- **Image containers** — `src/components/ui/media-placeholder.tsx`. Replace the
  inner content with a `next/image` `<Image>` where each `<MediaPlaceholder />`
  is used.
- **Client logos** — `src/components/sections/client-logo-grid.tsx`. Replace the
  name `<span>` with `<Image src={client.logo} … />`. Logo paths are defined in
  `CLIENTS` inside `src/data/site-content.ts`.
- **Brand logo** — `src/components/layout/logo.tsx` currently renders a text
  lockup. Swap it for the official SVG (light/dark variants) when supplied.
- **OG image** — referenced in `src/app/layout.tsx` as `/brand/og-image.jpg`.
- **Favicon** — `src/app/favicon.ico` (replace with the official icon).
