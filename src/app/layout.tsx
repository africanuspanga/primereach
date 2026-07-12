import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTopButton } from "@/components/ui/back-to-top-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SITE, absoluteUrl } from "@/lib/constants";
import { organizationJsonLd } from "@/lib/structured-data";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const OG_IMAGE = absoluteUrl("/images/backgrounds/backgrounds-03.jpg");

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "PrimeReach Global Solutions | Communication, Media & Technology Infrastructure",
    template: "%s | PrimeReach Global Solutions",
  },
  description:
    "PrimeReach Global Solutions is a Tanzania-headquartered strategic communication, media, research and technology group serving governments, corporates, NGOs, development partners and creators across Africa.",
  applicationName: SITE.name,
  keywords: [
    "Strategic communications Tanzania",
    "PR agency Tanzania",
    "Media production Tanzania",
    "Livestreaming services Tanzania",
    "Drone services Tanzania",
    "CCTV installation Tanzania",
    "Technology supply Tanzania",
    "Research consultancy Tanzania",
    "Executive branding Africa",
    "Creator marketing Tanzania",
    "Institutional communication Africa",
    "Event coverage Tanzania",
    "Communications consultancy Africa",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title:
      "PrimeReach Global Solutions | Communication, Media & Technology Infrastructure",
    description:
      "Building communication, media, and visibility infrastructure that powers institutions and communities across Africa.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PrimeReach Global Solutions — Innovate. Create. Reach.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "PrimeReach Global Solutions | Communication, Media & Technology Infrastructure",
    description:
      "Building communication, media, and visibility infrastructure that powers institutions and communities across Africa.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <BackToTopButton />
        <WhatsAppButton />
      </body>
    </html>
  );
}
