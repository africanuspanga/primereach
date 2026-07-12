import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

/** Static contact information block with tappable email / tel / WhatsApp links. */
export function ContactDetails() {
  return (
    <div className="flex flex-col gap-4">
      <DetailCard icon={<MapPin className="size-5" />} title="Head Office">
        <address className="not-italic leading-relaxed text-muted">
          <span className="font-medium text-ink">PrimeReach Global Solutions</span>
          <br />
          {CONTACT.address.lines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </address>
      </DetailCard>

      <DetailCard icon={<Mail className="size-5" />} title="Email">
        <a
          href={`mailto:${CONTACT.email}`}
          className="break-all font-medium text-ink transition-colors hover:text-bronze-600"
        >
          {CONTACT.email}
        </a>
      </DetailCard>

      <DetailCard icon={<Phone className="size-5" />} title="Telephone">
        <div className="flex flex-col gap-1">
          <a
            href={CONTACT.phonePrimary.href}
            className="font-medium text-ink transition-colors hover:text-bronze-600"
          >
            {CONTACT.phonePrimary.display}
          </a>
          <a
            href={CONTACT.phoneSecondary.href}
            className="font-medium text-ink transition-colors hover:text-bronze-600"
          >
            {CONTACT.phoneSecondary.display}
          </a>
        </div>
      </DetailCard>

      <DetailCard icon={<MessageCircle className="size-5" />} title="WhatsApp">
        <a
          href={CONTACT.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink transition-colors hover:text-bronze-600"
        >
          {CONTACT.whatsapp.display}
        </a>
      </DetailCard>

      <DetailCard icon={<Globe className="size-5" />} title="Website">
        <a
          href={CONTACT.website.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink transition-colors hover:text-bronze-600"
        >
          {CONTACT.website.display}
        </a>
      </DetailCard>
    </div>
  );
}

function DetailCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-paper-dim text-ink">
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-600">
          {title}
        </h3>
        <div className="mt-1.5 text-sm">{children}</div>
      </div>
    </div>
  );
}
