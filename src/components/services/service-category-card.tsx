"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { ServiceCategory } from "@/types/content";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

/**
 * Service category card. On mobile it behaves as an accordion (tap the header
 * to expand); on large screens the body is always expanded.
 */
export function ServiceCategoryCard({
  category,
  icon = "layers",
  index,
}: {
  category: ServiceCategory;
  icon?: string;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="group overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white transition-colors duration-300 hover:border-bronze/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-7 text-left lg:cursor-default"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-bronze-300 transition-colors duration-300 group-hover:bg-bronze group-hover:text-white">
          <Icon name={icon} className="size-6" />
        </span>
        <div className="flex-1">
          <span className="eyebrow block text-bronze-600">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-1 font-display text-xl font-normal text-ink">
            {category.title}
          </h3>
        </div>
        <ChevronDown
          className={cn(
            "size-5 text-muted transition-transform duration-300 lg:hidden",
            open && "rotate-180",
          )}
        />
      </button>

      <div className={cn("px-7 pb-7 lg:block", open ? "block" : "hidden")}>
        <ul className="grid gap-2.5 border-t border-ink/10 pt-5">
          {category.services.map((service) => (
            <li key={service} className="flex items-start gap-3 text-sm text-ink/80">
              <Check className="mt-0.5 size-4 shrink-0 text-bronze" />
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
