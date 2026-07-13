import type { Metadata } from "next";
import { CAPABILITIES, getCapability } from "@/data/capabilities";
import { CapabilityDetail } from "@/components/capabilities/capability-detail";

export const dynamicParams = false;

export function generateStaticParams() {
  return CAPABILITIES.map((capability) => ({ slug: capability.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return {};
  return {
    title: `${capability.title} | Capabilities`,
    description: capability.heroTagline,
    alternates: { canonical: capability.href },
    openGraph: { title: capability.title, description: capability.heroTagline },
  };
}

export default async function CapabilityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CapabilityDetail slug={slug} />;
}
