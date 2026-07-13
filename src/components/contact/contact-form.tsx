"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { CONTACT_SECTORS, SOLUTION_INTERESTS } from "@/data/site-content";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

/*
 * FRONTEND-ONLY CONTACT FORM
 * --------------------------------------------------------------------------
 * There is no backend yet. On submit we compose a `mailto:` link so the
 * visitor's email client opens with the enquiry pre-filled.
 *
 * TO CONNECT A REAL ENDPOINT LATER (Formspree / Resend / route handler):
 * replace `handleSubmit` with a `fetch()` to your endpoint and show real
 * success / error states.
 */

const initialState = {
  name: "",
  organisation: "",
  role: "",
  email: "",
  phone: "",
  sector: "",
  interests: [] as string[],
  message: "",
};

const fieldClasses =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-bronze focus:ring-2 focus:ring-bronze/20";

export function ContactForm() {
  const [form, setForm] = useState(initialState);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleInterest(interest: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Organisation: ${form.organisation}`,
      `Role: ${form.role}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Sector: ${form.sector || "Not specified"}`,
      `Interest: ${form.interests.length ? form.interests.join(", ") : "Not specified"}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    const subject = form.organisation
      ? `Enquiry — ${form.organisation}`
      : "Enquiry — PrimeReach";

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required>
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
        <Field label="Organisation" required>
          <input
            type="text"
            required
            autoComplete="organization"
            value={form.organisation}
            onChange={(e) => update("organisation", e.target.value)}
            className={fieldClasses}
            placeholder="Institution or company"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Role">
          <input
            type="text"
            autoComplete="organization-title"
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
            className={fieldClasses}
            placeholder="Your role"
          />
        </Field>
        <Field label="Email" required>
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
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone">
          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={fieldClasses}
            placeholder="+255 …"
          />
        </Field>
        <Field label="Sector">
          <select
            value={form.sector}
            onChange={(e) => update("sector", e.target.value)}
            className={cn(fieldClasses, "appearance-none bg-white pr-10")}
          >
            <option value="">Select your sector…</option>
            {CONTACT_SECTORS.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">
          Interest <span className="text-muted">(select all that apply)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SOLUTION_INTERESTS.map((interest) => {
            const checked = form.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleInterest(interest)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  checked
                    ? "border-bronze bg-bronze text-white"
                    : "border-ink/15 bg-white text-ink hover:border-ink/30",
                )}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field label="Message" required>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(fieldClasses, "resize-y")}
          placeholder="Tell us about the outcome, the audience, the timing, and the constraint we should know about."
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="group/btn inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bronze px-7 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(213,132,52,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-bronze-600"
        >
          <Send className="size-4" />
          Send message
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
