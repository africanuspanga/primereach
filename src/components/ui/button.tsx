import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ink" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-bronze text-white shadow-[0_14px_34px_-14px_rgba(184,124,66,0.75)] hover:bg-bronze-600 hover:-translate-y-0.5",
  ink: "bg-ink text-white hover:bg-ink-800 hover:-translate-y-0.5",
  outline:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:text-bronze-600",
  onDark:
    "border border-white/30 text-white backdrop-blur-sm hover:bg-white hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-[3.35rem] px-8 text-[1.02rem]",
};

type ButtonProps = {
  href?: string;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

function isExternal(href: string) {
  return (
    /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")
  );
}

/** Shared CTA control — renders a Next Link, an external anchor, or a button. */
export function Button({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  type = "button",
  target,
  rel,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      )}
    </>
  );

  if (href !== undefined) {
    if (isExternal(href)) {
      return (
        <a href={href} className={classes} target={target} rel={rel} aria-label={ariaLabel}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
