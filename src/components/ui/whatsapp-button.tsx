import Image from "next/image";
import { CONTACT } from "@/lib/constants";
import { BRAND } from "@/lib/images";

/** Floating WhatsApp action using the supplied brand image. */
export function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with PrimeReach on WhatsApp"
      className="group fixed bottom-6 left-6 z-40 flex items-center gap-3"
    >
      <span className="relative block size-14 transition-transform duration-300 group-hover:-translate-y-0.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/30 [animation-duration:2.6s]" />
        <Image
          src={BRAND.whatsapp}
          alt=""
          width={56}
          height={56}
          className="relative size-14 drop-shadow-[0_10px_24px_rgba(18,31,45,0.28)]"
        />
      </span>
      <span className="pointer-events-none hidden -translate-x-2 rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
