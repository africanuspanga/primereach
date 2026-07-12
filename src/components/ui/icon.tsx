import { createElement } from "react";
import { getIcon } from "@/lib/icon-map";

/**
 * Renders a lucide icon referenced by its string key from the content data.
 * Uses createElement because the icon component is looked up (stable identity
 * from the registry) rather than defined during render.
 */
export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  return createElement(getIcon(name), {
    className,
    strokeWidth,
    "aria-hidden": "true",
  });
}
