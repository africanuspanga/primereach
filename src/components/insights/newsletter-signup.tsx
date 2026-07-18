"use client";

import { useState } from "react";
import { NEWSLETTER } from "@/data/insights";
import { Eyebrow } from "@/components/ui/eyebrow";

export function NewsletterSignup({
  content = NEWSLETTER,
}: {
  content?: typeof NEWSLETTER;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "insights-page" }),
      });
      if (!res.ok) throw new Error("Failed to subscribe");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-16 rounded-[1.75rem] border border-ink/10 border-t-[3px] border-t-bronze bg-white p-10 text-center lg:p-14">
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h3 className="mt-5 font-display text-2xl font-normal text-ink lg:text-3xl">
          {content.title}
        </h3>
        <p className="mt-3 text-muted">{content.copy}</p>

        {status === "success" ? (
          <p className="mt-7 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink">
            Thank you. You&apos;re subscribed.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@work-email.com"
              aria-label="Work email"
              className="w-full flex-1 rounded-full border border-ink/15 bg-white px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-bronze focus:ring-2 focus:ring-bronze/20"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze disabled:opacity-60"
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
