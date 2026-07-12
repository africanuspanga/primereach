import { cn } from "@/lib/utils";

/** Editorial eyebrow: bronze index rule + uppercase tracked label. */
export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-3",
        onDark ? "text-bronze-300" : "text-bronze-600",
        className,
      )}
    >
      <span
        className={cn("h-px w-8", onDark ? "bg-bronze-300/70" : "bg-bronze/60")}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
