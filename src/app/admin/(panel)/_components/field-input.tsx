"use client";

import { cn } from "@/lib/utils";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "string-array"
  | "jsonb"
  | "image";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
}

const base =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-bronze focus:ring-2 focus:ring-bronze/20";

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const { name, label, type, required, options, rows } = field;

  switch (type) {
    case "boolean":
      return (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="size-4 rounded border-ink/30 text-bronze focus:ring-bronze"
          />
          <span className="text-sm text-ink">{label}</span>
        </label>
      );

    case "textarea":
      return (
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={rows ?? 3}
          required={required}
          className={cn(base, "resize-y")}
        />
      );

    case "number":
      return (
        <input
          type="number"
          value={(value as number) ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
          required={required}
          className={base}
        />
      );

    case "select":
      return (
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={cn(base, "appearance-none bg-white pr-8")}
        >
          <option value="">Select…</option>
          {options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );

    case "string-array":
      return (
        <textarea
          value={Array.isArray(value) ? value.join("\n") : ""}
          onChange={(e) => onChange(e.target.value.split("\n").filter(Boolean))}
          rows={rows ?? 4}
          placeholder="One item per line"
          className={cn(base, "resize-y")}
        />
      );

    case "jsonb":
      return (
        <textarea
          value={value ? JSON.stringify(value, null, 2) : "[]"}
          onChange={(e) => {
            try {
              onChange(JSON.parse(e.target.value));
            } catch {
              onChange(e.target.value);
            }
          }}
          rows={rows ?? 8}
          required={required}
          className={cn(base, "resize-y font-mono text-xs")}
        />
      );

    case "image":
    case "text":
    default:
      return (
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={base}
        />
      );
  }
}
