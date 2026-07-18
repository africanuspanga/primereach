"use client";

import { useState, useTransition } from "react";
import { deleteRow, reorder } from "../_actions";

export function ResourceTable({
  table,
  rows,
  columns,
  onEdit,
  onRefresh,
}: {
  table: string;
  rows: Record<string, unknown>[];
  columns: { key: string; label: string }[];
  onEdit: (row: Record<string, unknown>) => void;
  onRefresh: () => void;
}) {
  const [pending, startTransition] = useTransition();

  async function remove(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteRow(table, id);
      onRefresh();
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-paper text-left text-xs font-semibold uppercase text-muted">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3">
                {c.label}
              </th>
            ))}
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10">
          {rows.map((row) => (
            <tr key={row.id as string} className="hover:bg-paper/50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-ink">
                  {String(row[c.key] ?? "")}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onEdit(row)}
                  className="mr-3 text-bronze-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(row.id as string)}
                  disabled={pending}
                  className="text-red-600 hover:underline disabled:opacity-60"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
