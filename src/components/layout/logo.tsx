import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/images";

/**
 * Brand logo lockup. Uses the supplied PrimeReach PNG. On dark backgrounds the
 * mark is shown as-is; a subtle brightness lift keeps it crisp over imagery.
 */
export function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="PrimeReach Global Solutions — home"
      className={cn("group inline-flex items-center", className)}
    >
      <Image
        src={BRAND.logo}
        alt="PrimeReach Global Solutions"
        width={340}
        height={122}
        priority
        className={cn(
          "h-12 w-auto transition-[filter,transform] duration-300 group-hover:scale-[1.02] sm:h-14 lg:h-16",
          onDark && "brightness-0 invert",
        )}
      />
    </Link>
  );
}
