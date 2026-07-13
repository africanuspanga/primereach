"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Overview", href: "/impact" },
  { label: "Case Studies", href: "/impact/case-studies" },
  { label: "Featured Projects", href: "/impact/featured-projects" },
  { label: "Clients & Sectors", href: "/impact/clients-sectors" },
  { label: "Testimonials", href: "/impact/testimonials" },
];

/** Segmented navigation across the Impact sub-pages. */
export function ImpactTabs() {
  const pathname = usePathname();
  return (
    <div className="flex gap-1 overflow-x-auto rounded-full border border-ink/10 bg-white p-1.5">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active ? "bg-ink text-white" : "text-muted hover:text-ink",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
