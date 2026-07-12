import type { Metadata } from "next";
import { SERVICE_WING_DETAILS } from "@/data/site-content";
import { ServiceWingPage } from "@/components/services/service-wing-page";

const slug = "pr-media-communications";
const wing = SERVICE_WING_DETAILS[slug];

export const metadata: Metadata = {
  title: wing.seoTitle,
  description: wing.seoDescription,
  alternates: { canonical: `/services/${slug}` },
  openGraph: { title: wing.seoTitle, description: wing.seoDescription },
};

export default function Page() {
  return <ServiceWingPage slug={slug} />;
}
