import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-ink">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="container-x relative py-24 text-center">
        <p className="font-display text-7xl font-bold text-bronze sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          The page you’re looking for doesn’t exist or may have moved. Let’s get you back
          on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" withArrow>
            Back to Home
          </Button>
          <Button href="/contact" variant="onDark">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
