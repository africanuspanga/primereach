/**
 * Shared prose wrapper for legal / static pages. Styles headings, paragraphs
 * and links without relying on the typography plugin.
 */
export function LegalBody({
  children,
  lastUpdated,
}: {
  children: React.ReactNode;
  lastUpdated?: string;
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-x">
        <div
          className="mx-auto max-w-3xl text-muted [&_a]:font-medium [&_a]:text-bronze-600 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_p]:mt-3 [&_p]:leading-relaxed"
        >
          {lastUpdated && (
            <p className="!mt-0 text-sm font-medium uppercase tracking-[0.14em] text-bronze-600">
              Last updated: {lastUpdated}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
