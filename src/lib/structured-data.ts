import { CONTACT, SITE } from "@/lib/constants";

/**
 * Organisation / ProfessionalService structured data (JSON-LD).
 * Rendered once in the root layout.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  alternateName: SITE.shortName,
  description:
    "Tanzania-headquartered strategic communication, media, research and technology group serving governments, corporates, NGOs, development partners and creators across Africa.",
  slogan: SITE.slogan,
  url: SITE.url,
  foundingDate: SITE.foundedYear,
  email: CONTACT.email,
  telephone: CONTACT.phonePrimary.display,
  areaServed: [
    "Tanzania",
    "Kenya",
    "Uganda",
    "Rwanda",
    "Southern Africa",
    "West Africa",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 451, Prince Street, Mwai Kibaki Road, Mikocheni",
    addressLocality: CONTACT.address.city,
    addressCountry: "TZ",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONTACT.phonePrimary.display,
      contactType: "sales",
      email: CONTACT.email,
      availableLanguage: ["English", "Swahili"],
    },
    {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneSecondary.display,
      contactType: "customer support",
      availableLanguage: ["English", "Swahili"],
    },
  ],
} as const;
