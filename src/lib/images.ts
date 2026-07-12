/**
 * Curated image manifest. All paths point to real files in /public.
 * Assignments were chosen from the supplied photography — warm African city
 * shots for feature/CTA bands, authentic field/crew shots for people moments.
 */

const bg = (n: number) => `/images/backgrounds/backgrounds-${String(n).padStart(2, "0")}.jpg`;
const pr = (n: number) => `/images/pr-media/pr-media-${String(n).padStart(2, "0")}.jpg`;
const tech = (n: number) => `/images/technology/technology-${String(n).padStart(2, "0")}.jpg`;

export const MEDIA = {
  hero: {
    video: "/videos/hero-background.mp4",
    poster: bg(2), // cinematic night skyline
  },

  // Feature / editorial bands
  aboutPortrait: pr(6), // branded "PrimeReach Studios" cameraman (portrait)
  aboutWide: bg(3), // Dar es Salaam waterfront
  visionMission: "/images/vision-mission/vision-mission-01.jpg",
  presence: bg(4), // Dar es Salaam aerial (harbour + city)
  ctaBand: bg(7), // golden-hour cityscape — pairs with bronze

  // Rapid deployment / field
  deployment: [pr(3), pr(2), pr(4)],

  // Creator network / impact
  creators: [pr(1), pr(8), pr(9)],

  // Page hero backgrounds (heavy ink overlay applied in component)
  pageHero: {
    about: bg(3),
    services: pr(6),
    network: bg(4),
    clients: bg(5),
    contact: bg(6),
  },

  // Service-wing card / detail imagery
  wings: {
    "pr-media-communications": pr(3),
    "research-training-consultancy": tech(8),
    "technology-solutions": tech(6),
  } as Record<string, string>,

  // Assorted portfolio / gallery pool
  gallery: [pr(1), pr(2), pr(3), pr(4), pr(5), pr(6), pr(7), pr(8), pr(9), pr(10)],
  techGallery: [tech(1), tech(2), tech(3), tech(4), tech(5), tech(6), tech(9), tech(10)],
} as const;

export const BRAND = {
  logo: "/brand/primereach-logo.png",
  favicon: "/brand/primereach-favicon.png",
  whatsapp: "/whatsapp.png",
} as const;
