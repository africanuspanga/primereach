"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { CONTACT_SECTORS, SOLUTION_INTERESTS } from "@/data/site-content";
import { cn } from "@/lib/utils";

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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          sector: form.sector,
          service: form.interests.join(", ") || undefined,
          message: [
            form.organisation && `Organisation: ${form.organisation}`,
            form.role && `Role: ${form.role}`,
            "",
            "Message:",
            form.message,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ink/10 bg-paper p-8 text-center">
        <h3 className="font-display text-xl font-normal text-ink">Message sent</h3>
        <p className="mt-2 text-sm text-muted">
          Thank you for reaching out. A member of our team will be back to you within one business day.
        </p>
      </div>
    );
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

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group/btn inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bronze px-7 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(213,132,52,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-bronze-600 disabled:opacity-60"
        >
          <Send className="size-4" />
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-muted">
          Your enquiry will be routed to the right desk.
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
