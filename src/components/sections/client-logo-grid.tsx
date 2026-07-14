import Image from "next/image";
import { getClients } from "@/lib/content";
import { CLIENTS } from "@/data/site-content";
import type { ClientLogo } from "@/types/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export async function ClientLogoGrid({
  variant = "grid",
  heading = "Strategic Clients and Partners",
  eyebrow = "Trusted By",
  description,
}: {
  variant?: "marquee" | "grid";
  heading?: string;
  eyebrow?: string;
  description?: string;
}) {
  const clients = await getClients();
  const data: ClientLogo[] = clients.length > 0 ? clients : CLIENTS;

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow={eyebrow}
          title={heading}
          description={description}
        />
      </div>

      {variant === "marquee" ? (
        <div className="marquee-mask relative mt-14 flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4 hover:[animation-play-state:paused]">
            {[...data, ...data].map((client, i) => (
              <LogoTile key={`${client.name}-${i}`} client={client} />
            ))}
          </div>
        </div>
      ) : (
        <div className="container-x mt-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {data.map((client) => (
              <LogoTile key={client.name} client={client} full />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function LogoTile({ client, full = false }: { client: ClientLogo; full?: boolean }) {
  return (
    <div
      title={client.name}
      className={cn(
        "flex items-center justify-center rounded-2xl border border-ink/8 bg-paper px-6 transition-colors duration-300 hover:border-bronze/30 hover:bg-white",
        full ? "h-28 w-full" : "h-28 w-52 shrink-0",
      )}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={160}
        height={64}
        className="max-h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
