import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { AdminSection, TableConfig } from "../_components/admin-section";
import { updateBlock } from "../_actions";
import { FieldDef } from "../_components/field-input";

export const dynamic = "force-dynamic";

const insightFields: FieldDef[] = [
  { name: "type", label: "Type", type: "select", options: [{ value: "Article", label: "Article" }, { value: "Report", label: "Report" }, { value: "News", label: "News" }, { value: "Event", label: "Event" }], required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "meta", label: "Meta", type: "text", required: true },
  { name: "body", label: "Body", type: "textarea" },
  { name: "image", label: "Image", type: "image" },
  { name: "is_featured", label: "Featured", type: "boolean" },
  { name: "is_teaser", label: "Teaser", type: "boolean" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

export default async function InsightsAdminPage() {
  const [{ data: insights }, { data: featuredBlock }, { data: newsletterBlock }] = await Promise.all([
    getSupabaseAdmin().from("insights").select("*").order("position"),
    getSupabaseAdmin().from("content_blocks").select("*").eq("key", "featured_insight").maybeSingle(),
    getSupabaseAdmin().from("content_blocks").select("*").eq("key", "newsletter").maybeSingle(),
  ]);

  const tables: TableConfig[] = [
    {
      table: "insights",
      label: "Insights",
      fields: insightFields,
      columns: [
        { key: "type", label: "Type" },
        { key: "title", label: "Title" },
        { key: "is_published", label: "Published" },
      ],
      rows: insights ?? [],
    },
  ];

  return (
    <div className="space-y-10">
      <AdminSection title="Insights" tables={tables} />

      <div className="grid gap-8 lg:grid-cols-2">
        <BlockEditor title="Featured insight" blockKey="featured_insight" initial={featuredBlock?.data as Record<string, unknown>} />
        <BlockEditor title="Newsletter" blockKey="newsletter" initial={newsletterBlock?.data as Record<string, unknown>} />
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
