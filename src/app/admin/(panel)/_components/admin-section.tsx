"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldDef } from "./field-input";
import { ResourceForm } from "./resource-form";
import { ResourceTable } from "./resource-table";
import { upsertRow } from "../_actions";

export interface TableConfig {
  table: string;
  label: string;
  fields: FieldDef[];
  columns: { key: string; label: string }[];
  rows: Record<string, unknown>[];
}

export function AdminSection({ title, tables }: { title: string; tables: TableConfig[] }) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const current = tables[active];

  function refresh() {
    // Re-fetch the server component's rows so the table reflects the change,
    // reset the form, and keep the active tab.
    setEditing(null);
    setRefreshKey((k) => k + 1);
    router.refresh();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-normal text-ink">{title}</h1>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-ink/10 pb-4">
        {tables.map((t, i) => (
          <button
            key={t.table}
            onClick={() => {
              setActive(i);
              setEditing(null);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === i
                ? "bg-bronze text-white"
                : "bg-white text-ink hover:bg-ink/5"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr,22rem]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-medium text-ink">{current.label}</h2>
            <button
              onClick={() => setEditing({})}
              className="rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white hover:bg-bronze"
            >
              Add new
            </button>
          </div>
          <ResourceTable
            table={current.table}
            rows={current.rows}
            columns={current.columns}
            onEdit={setEditing}
            onRefresh={refresh}
          />
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-5">
          <h3 className="mb-4 text-lg font-medium text-ink">
            {editing?.id ? "Edit" : "Create"} {current.label.slice(0, -1)}
          </h3>
          <ResourceForm
            key={`${current.table}-${(editing?.id as string) ?? "new"}-${refreshKey}`}
            table={current.table}
            fields={current.fields}
            initial={editing ?? undefined}
            onSave={async (row) => {
              await upsertRow(current.table, row);
              refresh();
            }}
          />
        </div>
      </div>
    </div>
  );
}
