"use client";

import { useState } from "react";
import { NEWSLETTER } from "@/data/insights";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Newsletter sign-up. Frontend-only: on submit it shows an inline confirmation
 * (no backend is wired yet). Swap the handler for a real endpoint later.
 */
export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mt-16 rounded-[1.75rem] border border-ink/10 border-t-[3px] border-t-bronze bg-white p-10 text-center lg:p-14">
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <Eyebrow>{NEWSLETTER.eyebrow}</Eyebrow>
        <h3 className="mt-5 font-display text-2xl font-normal text-ink lg:text-3xl">
          {NEWSLETTER.title}
        </h3>
        <p className="mt-3 text-muted">{NEWSLETTER.copy}</p>

        {submitted ? (
          <p className="mt-7 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink">
            Thank you. Please check your inbox to confirm.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="your@work-email.com"
              aria-label="Work email"
              className="w-full flex-1 rounded-full border border-ink/15 bg-white px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-bronze focus:ring-2 focus:ring-bronze/20"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
