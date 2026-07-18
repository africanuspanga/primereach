import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { AdminSection, TableConfig } from "../_components/admin-section";
import { updateBlock } from "../_actions";
import { FieldDef } from "../_components/field-input";

export const dynamic = "force-dynamic";

const navFields: FieldDef[] = [
  { name: "label", label: "Label", type: "text", required: true },
  { name: "href", label: "Href", type: "text", required: true },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

async function SettingsPage() {
  const [{ data: navRows }, { data: siteBlock }, { data: contactBlock }] = await Promise.all([
    getSupabaseAdmin().from("nav_items").select("*").order("position"),
    getSupabaseAdmin().from("content_blocks").select("*").eq("key", "site").maybeSingle(),
    getSupabaseAdmin().from("content_blocks").select("*").eq("key", "contact").maybeSingle(),
  ]);

  const tables: TableConfig[] = [
    {
      table: "nav_items",
      label: "Navigation items",
      fields: navFields,
      columns: [
        { key: "label", label: "Label" },
        { key: "href", label: "Href" },
        { key: "position", label: "Position" },
      ],
      rows: navRows ?? [],
    },
  ];

  return (
    <div className="space-y-10">
      <AdminSection title="Settings" tables={tables} />

      <div className="grid gap-8 lg:grid-cols-2">
        <BlockEditor title="Site settings" blockKey="site" initial={siteBlock?.data as Record<string, unknown>} />
        <BlockEditor title="Contact details" blockKey="contact" initial={contactBlock?.data as Record<string, unknown>} />
      </div>
    </div>
  );
}

function BlockEditor({
  title,
  blockKey,
  initial,
}: {
  title: string;
  blockKey: string;
  initial?: Record<string, unknown>;
}) {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const raw = formData.get("data") as string;
        await updateBlock(blockKey, JSON.parse(raw));
      }}
      className="rounded-xl border border-ink/10 bg-white p-5"
    >
      <h3 className="mb-4 text-lg font-medium text-ink">{title}</h3>
      <textarea
        name="data"
        defaultValue={JSON.stringify(initial ?? {}, null, 2)}
        rows={16}
        className="w-full rounded-lg border border-ink/15 bg-paper p-3 font-mono text-xs outline-none focus:border-bronze"
      />
      <button
        type="submit"
        className="mt-4 rounded-lg bg-bronze px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-600"
      >
        Save {title}
      </button>
    </form>
  );
}

export default SettingsPage;
