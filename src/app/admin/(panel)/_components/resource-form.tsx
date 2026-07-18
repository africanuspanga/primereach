"use client";

import { useState, useTransition } from "react";
import { FieldDef, FieldInput } from "./field-input";
import { ImageUpload } from "./image-upload";

export function ResourceForm({
  table,
  fields,
  initial,
  onSave,
}: {
  table: string;
  fields: FieldDef[];
  initial?: Record<string, unknown>;
  onSave: (row: Record<string, unknown>) => Promise<void>;
}) {
  const [row, setRow] = useState<Record<string, unknown>>(initial ?? {});
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function update(name: string, value: unknown) {
    setRow((prev) => ({ ...prev, [name]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    startTransition(async () => {
      try {
        // Clean jsonb fields
        const cleaned: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(row)) {
          const field = fields.find((f) => f.name === k);
          if (field?.type === "jsonb" && typeof v === "string") {
            cleaned[k] = JSON.parse(v);
          } else {
            cleaned[k] = v;
          }
        }
        await onSave(cleaned);
        setSuccess(true);
        if (!initial?.id) setRow({});
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="text-sm font-medium text-ink">
            {field.label}
            {field.required && <span className="ml-0.5 text-bronze">*</span>}
          </span>
          <div className="mt-1">
            {field.type === "image" ? (
              <ImageUpload
                value={(row[field.name] as string) ?? ""}
                onChange={(v) => update(field.name, v)}
              />
            ) : (
              <FieldInput
                field={field}
                value={row[field.name]}
                onChange={(v) => update(field.name, v)}
              />
            )}
          </div>
        </label>
      ))}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">Saved successfully.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-bronze px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-600 disabled:opacity-60"
      >
        {pending ? "Saving…" : initial?.id ? "Update" : "Create"}
      </button>
    </form>
  );
}
