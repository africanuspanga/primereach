import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { AdminSection, TableConfig } from "../_components/admin-section";
import { updateBlock } from "../_actions";
import { FieldDef } from "../_components/field-input";

export const dynamic = "force-dynamic";

const valueFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "icon", label: "Icon", type: "text", required: true },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const timelineFields: FieldDef[] = [
  { name: "year", label: "Year", type: "text", required: true },
  { name: "tag", label: "Tag", type: "text" },
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const sectorGroupFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "icon", label: "Icon", type: "text", required: true },
  { name: "items", label: "Items", type: "string-array" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

export default async function AboutAdminPage() {
  const [values, why, timeline, sectors, aboutBlock] = await Promise.all([
    getSupabaseAdmin().from("core_values").select("*").order("position"),
    getSupabaseAdmin().from("why_choose_reasons").select("*").order("position"),
    getSupabaseAdmin().from("timeline_entries").select("*").order("position"),
    getSupabaseAdmin().from("sector_groups").select("*").order("position"),
    getSupabaseAdmin().from("content_blocks").select("*").eq("key", "about").maybeSingle(),
  ]);

  const tables: TableConfig[] = [
    { table: "core_values", label: "Core values", fields: valueFields, columns: [{ key: "title", label: "Title" }, { key: "icon", label: "Icon" }], rows: values.data ?? [] },
    { table: "why_choose_reasons", label: "Why choose reasons", fields: valueFields, columns: [{ key: "title", label: "Title" }, { key: "icon", label: "Icon" }], rows: why.data ?? [] },
    { table: "timeline_entries", label: "Timeline entries", fields: timelineFields, columns: [{ key: "year", label: "Year" }, { key: "tag", label: "Tag" }], rows: timeline.data ?? [] },
    { table: "sector_groups", label: "Sector groups", fields: sectorGroupFields, columns: [{ key: "title", label: "Title" }, { key: "items", label: "Items" }], rows: sectors.data ?? [] },
  ];

  return (
    <div className="space-y-10">
      <AdminSection title="About" tables={tables} />

      <form
        action={async (formData: FormData) => {
          "use server";
          const raw = formData.get("data") as string;
          await updateBlock("about", JSON.parse(raw));
        }}
        className="rounded-xl border border-ink/10 bg-white p-5"
      >
        <h3 className="mb-4 text-lg font-medium text-ink">About page content</h3>
        <textarea
          name="data"
          defaultValue={JSON.stringify((aboutBlock?.data as Record<string, unknown>) ?? {}, null, 2)}
          rows={16}
          className="w-full rounded-lg border border-ink/15 bg-paper p-3 font-mono text-xs outline-none focus:border-bronze"
        />
        <button
          type="submit"
          className="mt-4 rounded-lg bg-bronze px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-600"
        >
          Save about content
        </button>
      </form>
    </div>
  );
}
