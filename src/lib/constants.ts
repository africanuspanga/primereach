import type { NavItem } from "@/types/content";

/**
 * Core site + organisation constants.
 * Frontend-only build — no backend endpoints are wired yet.
 */

export const SITE = {
  name: "PrimeReach Global Solutions",
  shortName: "PrimeReach",
  slogan: "Innovate. Create. Reach.",
  positioning:
    "Building Communication, Media, and Visibility Infrastructure that Powers Institutions and Communities.",
  url: "https://www.primereachglobal.co.tz",
  domain: "www.primereachglobal.co.tz",
  foundedYear: "2019",
} as const;

export const CONTACT = {
  email: "info@primereachglobal.co.tz",
  phonePrimary: {
    display: "+255 740 223 545",
    href: "tel:+255740223545",
  },
  phoneSecondary: {
    display: "+255 752 213 012",
    href: "tel:+255752213012",
  },
  // WhatsApp uses the primary line until PrimeReach confirms a dedicated number.
  whatsapp: {
    display: "+255 740 223 545",
    href: "https://wa.me/255740223545",
  },
  address: {
    lines: [
      "Plot 451, Prince Street",
      "Mwai Kibaki Road",
      "Mikocheni",
      "Dar es Salaam, Tanzania",
    ],
    city: "Dar es Salaam",
    country: "Tanzania",
  },
  website: {
    display: "www.primereachglobal.co.tz",
    href: "https://www.primereachglobal.co.tz",
  },
} as const;

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "PR, Media & Strategic Communication",
        href: "/services/pr-media-communications",
      },
      {
        label: "Research, Training & Consultancy",
        href: "/services/research-training-consultancy",
      },
      {
        label: "Technology, Solutions & Emerging Tech",
        href: "/services/technology-solutions",
      },
    ],
  },
  { label: "Network & Reach", href: "/network" },
  { label: "Clients & Sectors", href: "/clients-sectors" },
  { label: "Contact", href: "/contact" },
];

export const CTA = {
  primary: { label: "Start a Conversation", href: "/contact" },
  explore: { label: "Explore Our Capabilities", href: "/services" },
  conversation: { label: "Start a Strategic Conversation", href: "/contact" },
} as const;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}
