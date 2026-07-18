import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { AdminSection, TableConfig } from "../_components/admin-section";
import { updateBlock } from "../_actions";
import { FieldDef } from "../_components/field-input";

export const dynamic = "force-dynamic";

const statFields: FieldDef[] = [
  { name: "group_key", label: "Group", type: "select", options: [{ value: "reel", label: "Reel" }, { value: "capability", label: "Capability" }, { value: "network", label: "Network" }], required: true },
  { name: "value", label: "Value", type: "text", required: true },
  { name: "label", label: "Label", type: "text", required: true },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

export default async function HomeAdminPage() {
  const [{ data: stats }, { data: heroBlock }, { data: homeBlock }, { data: finalCtaBlock }] = await Promise.all([
    getSupabaseAdmin().from("stats").select("*").order("position"),
    getSupabaseAdmin().from("content_blocks").select("*").eq("key", "hero").maybeSingle(),
    getSupabaseAdmin().from("content_blocks").select("*").eq("key", "home").maybeSingle(),
    getSupabaseAdmin().from("content_blocks").select("*").eq("key", "final_cta").maybeSingle(),
  ]);

  const tables: TableConfig[] = [
    {
      table: "stats",
      label: "Stats",
      fields: statFields,
      columns: [
        { key: "group_key", label: "Group" },
        { key: "value", label: "Value" },
        { key: "label", label: "Label" },
      ],
      rows: stats ?? [],
    },
  ];

  return (
    <div className="space-y-10">
      <AdminSection title="Home" tables={tables} />

      <div className="grid gap-8 lg:grid-cols-3">
        <BlockEditor title="Hero" blockKey="hero" initial={heroBlock?.data as Record<string, unknown>} />
        <BlockEditor title="Home sections" blockKey="home" initial={homeBlock?.data as Record<string, unknown>} />
        <BlockEditor title="Final CTA" blockKey="final_cta" initial={finalCtaBlock?.data as Record<string, unknown>} />
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
        rows={14}
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
