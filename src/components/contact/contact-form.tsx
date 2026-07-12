"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { CONTACT_METHODS, SERVICE_OPTIONS } from "@/data/site-content";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

/*
 * FRONTEND-ONLY CONTACT FORM
 * --------------------------------------------------------------------------
 * There is no backend yet. On submit we compose a `mailto:` link so the
 * visitor's email client opens with the enquiry pre-filled — no fake success
 * message is shown.
 *
 * TO CONNECT A REAL ENDPOINT LATER (Formspree / Resend / Supabase / route
 * handler): replace `handleSubmit` with a `fetch()` to your endpoint and show
 * real success / error states. Suggested endpoint constant is marked below.
 */

// const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxx" or "/api/contact"

const initialState = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  country: "",
  service: "",
  message: "",
  method: CONTACT_METHODS[0] as string,
  consent: false,
};

const fieldClasses =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-bronze focus:ring-2 focus:ring-bronze/20";

export function ContactForm() {
  const [form, setForm] = useState(initialState);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const serviceLabel =
      SERVICE_OPTIONS.find((s) => s.value === form.service)?.label ?? "General Enquiry";

    const body = [
      `Name: ${form.name}`,
      `Organisation: ${form.organisation}`,
      `Email: ${form.email}`,
      `Telephone: ${form.phone}`,
      `Country: ${form.country}`,
      `Service of interest: ${serviceLabel}`,
      `Preferred contact method: ${form.method}`,
      "",
      "Enquiry details:",
      form.message,
    ].join("\n");

    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `Enquiry — ${serviceLabel}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={fieldClasses}
            placeholder="Your full name"
          />
        </Field>
        <Field label="Organisation">
          <input
            type="text"
            autoComplete="organization"
            value={form.organisation}
            onChange={(e) => update("organisation", e.target.value)}
            className={fieldClasses}
            placeholder="Institution or company"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email Address" required>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClasses}
            placeholder="you@organisation.com"
          />
        </Field>
        <Field label="Telephone Number">
          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={fieldClasses}
            placeholder="+255 …"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Country">
          <input
            type="text"
            autoComplete="country-name"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            className={fieldClasses}
            placeholder="Country"
          />
        </Field>
        <Field label="Service of Interest">
          <select
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={cn(fieldClasses, "appearance-none bg-white pr-10")}
          >
            <option value="">Select a service…</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Project or Enquiry Details" required>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(fieldClasses, "resize-y")}
          placeholder="Tell us about your objectives, timeline and scope."
        />
      </Field>

      <Field label="Preferred Contact Method">
        <div className="flex flex-wrap gap-2">
          {CONTACT_METHODS.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => update("method", method)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                form.method === method
                  ? "border-bronze bg-bronze text-white"
                  : "border-ink/15 bg-white text-ink hover:border-ink/30",
              )}
            >
              {method}
            </button>
          ))}
        </div>
      </Field>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-0.5 size-4 rounded border-ink/30 text-bronze focus:ring-bronze/30"
        />
        <span>
          I consent to PrimeReach Global Solutions contacting me about my enquiry and
          storing the details I have provided.
        </span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="group/btn inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bronze px-7 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(213,132,52,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-bronze-600"
        >
          <Send className="size-4" />
          Send Enquiry
        </button>
        <p className="text-xs text-muted">
          This opens your email app with the details pre-filled.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-bronze">*</span>}
      </span>
      {children}
    </label>
  );
}
