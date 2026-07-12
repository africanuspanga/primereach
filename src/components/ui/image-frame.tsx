import Image from "next/image";
import { cn } from "@/lib/utils";

type Overlay = "none" | "ink" | "soft" | "side";

/**
 * Real photography in a rounded, cropped frame with an optional cinematic
 * navy overlay. Children render above the image (captions, labels, content).
 */
export function ImageFrame({
  src,
  alt,
  aspect = "aspect-[4/3]",
  rounded = "rounded-[1.75rem]",
  overlay = "none",
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  zoom = true,
  children,
}: {
  src: string;
  alt: string;
  aspect?: string;
  rounded?: string;
  overlay?: Overlay;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group/frame relative overflow-hidden bg-ink-800",
        aspect,
        rounded,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]",
          zoom && "group-hover/frame:scale-105",
          imageClassName,
        )}
      />
      {overlay === "ink" && <div className="overlay-ink absolute inset-0" />}
      {overlay === "soft" && <div className="overlay-ink-soft absolute inset-0" />}
      {overlay === "side" && <div className="overlay-side absolute inset-0" />}
      {children && <div className="absolute inset-0">{children}</div>}
    </div>
  );
}
