import Image from "next/image";
import { CONTACT } from "@/lib/constants";
import { BRAND } from "@/lib/images";

/** Floating WhatsApp action → wa.me/255740223545 (+255 740 223 545). */
export function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with PrimeReach on WhatsApp — +255 740 223 545"
      className="group fixed bottom-6 right-6 z-50 block"
    >
      <span className="relative block size-14 sm:size-16">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.4s]" />
        <Image
          src={BRAND.whatsapp}
          alt="WhatsApp"
          width={64}
          height={64}
          className="relative size-14 rounded-full shadow-[0_14px_30px_rgba(18,31,45,0.4)] transition-transform duration-300 group-hover:scale-105 sm:size-16"
        />
      </span>
    </a>
  );
}
