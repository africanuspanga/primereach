import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { AdminSection, TableConfig } from "../_components/admin-section";
import { updateBlock } from "../_actions";
import { FieldDef } from "../_components/field-input";

export const dynamic = "force-dynamic";

const programmeFields: FieldDef[] = [
  { name: "slug", label: "Slug", type: "text" },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "status", label: "Status", type: "select", options: [{ value: "live", label: "Live" }, { value: "pilot", label: "Pilot" }, { value: "dev", label: "Development" }], required: true },
  { name: "status_label", label: "Status label", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "stats", label: "Stats (JSON)", type: "jsonb" },
  { name: "cta", label: "CTA (JSON)", type: "jsonb" },
  { name: "is_future", label: "Future programme", type: "boolean" },
  { name: "image", label: "Image", type: "image" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

export default async function ProgrammesAdminPage() {
  const [{ data: programmes }, { data: tcmaBlock }] = await Promise.all([
    getSupabaseAdmin().from("programmes").select("*").order("position"),
    getSupabaseAdmin().from("content_blocks").select("*").eq("key", "tcma").maybeSingle(),
  ]);

  const tables: TableConfig[] = [
    {
      table: "programmes",
      label: "Programmes",
      fields: programmeFields,
      columns: [
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
        { key: "is_future", label: "Future" },
        { key: "is_published", label: "Published" },
      ],
      rows: programmes ?? [],
    },
  ];

  return (
    <div className="space-y-10">
      <AdminSection title="Programmes" tables={tables} />

      <form
        action={async (formData: FormData) => {
          "use server";
          const raw = formData.get("data") as string;
          await updateBlock("tcma", JSON.parse(raw));
        }}
        className="rounded-xl border border-ink/10 bg-white p-5"
      >
        <h3 className="mb-4 text-lg font-medium text-ink">TCMA page content</h3>
        <textarea
          name="data"
          defaultValue={JSON.stringify((tcmaBlock?.data as Record<string, unknown>) ?? {}, null, 2)}
          rows={16}
          className="w-full rounded-lg border border-ink/15 bg-paper p-3 font-mono text-xs outline-none focus:border-bronze"
        />
        <button
          type="submit"
          className="mt-4 rounded-lg bg-bronze px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-600"
        >
          Save TCMA content
        </button>
      </form>
    </div>
  );
}
