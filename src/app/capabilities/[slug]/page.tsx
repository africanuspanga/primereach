import type { Metadata } from "next";
import { getCapabilities, getCapability } from "@/lib/content";
import { CapabilityDetail } from "@/components/capabilities/capability-detail";

// Allow capabilities added later via the CMS to render on-demand (ISR).
// (The static-export build flips this to `false` — see scripts/build-static.mjs.)
export const dynamicParams = true;

export async function generateStaticParams() {
  const capabilities = await getCapabilities();
  return capabilities.map((capability) => ({ slug: capability.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const capability = await getCapability(slug);
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
