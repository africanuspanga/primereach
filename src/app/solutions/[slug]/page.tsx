import type { Metadata } from "next";
import { SOLUTIONS, getSolution } from "@/data/solutions";
import { SolutionDetail } from "@/components/solutions/solution-detail";

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
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
