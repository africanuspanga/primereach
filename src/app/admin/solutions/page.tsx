import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { AdminSection, TableConfig } from "../_components/admin-section";
import { FieldDef } from "../_components/field-input";

export const dynamic = "force-dynamic";

const solutionFields: FieldDef[] = [
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "number", label: "Number", type: "text", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "href", label: "Href", type: "text", required: true },
  { name: "icon", label: "Icon", type: "text", required: true },
  { name: "card_description", label: "Card description", type: "textarea" },
  { name: "hero_tagline", label: "Hero tagline", type: "textarea" },
  { name: "seo_description", label: "SEO description", type: "textarea" },
  { name: "deliver_intro", label: "Deliver intro", type: "textarea" },
  { name: "sub_services", label: "Sub-services (JSON)", type: "jsonb" },
  { name: "approach", label: "Approach (JSON)", type: "jsonb" },
  { name: "closing", label: "Closing CTA (JSON)", type: "jsonb" },
  { name: "image", label: "Image", type: "image" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const crossFields: FieldDef[] = [
  { name: "number", label: "Number", type: "text", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "cta", label: "CTA", type: "text" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

export default async function SolutionsAdminPage() {
  const [{ data: solutions }, { data: cross }] = await Promise.all([
    getSupabaseAdmin().from("solutions").select("*").order("position"),
    getSupabaseAdmin().from("cross_cutting_offerings").select("*").order("position"),
  ]);

  const tables: TableConfig[] = [
    {
      table: "solutions",
      label: "Solutions",
      fields: solutionFields,
      columns: [
        { key: "number", label: "#" },
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "is_published", label: "Published" },
      ],
      rows: solutions ?? [],
    },
    {
      table: "cross_cutting_offerings",
      label: "Cross-cutting offerings",
      fields: crossFields,
      columns: [
        { key: "number", label: "#" },
        { key: "title", label: "Title" },
        { key: "is_published", label: "Published" },
      ],
      rows: cross ?? [],
    },
  ];

  return <AdminSection title="Solutions" tables={tables} />;
}
