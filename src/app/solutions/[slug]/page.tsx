import type { Metadata } from "next";
import { getSolution, getSolutions } from "@/lib/content";
import { SolutionDetail } from "@/components/solutions/solution-detail";

// Allow solutions added later via the CMS to render on-demand (ISR).
// (The static-export build flips this to `false` — see scripts/build-static.mjs.)
export const dynamicParams = true;

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolution(slug);
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.seoDescription,
    alternates: { canonical: solution.href },
    openGraph: { title: solution.title, description: solution.seoDescription },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SolutionDetail slug={slug} />;
}
