import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { AdminSection, TableConfig } from "../_components/admin-section";
import { FieldDef } from "../_components/field-input";

export const dynamic = "force-dynamic";

const capabilityFields: FieldDef[] = [
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "number", label: "Number", type: "text", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "href", label: "Href", type: "text", required: true },
  { name: "icon", label: "Icon", type: "text", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "summary_home", label: "Summary home", type: "textarea" },
  { name: "hero_tagline", label: "Hero tagline", type: "textarea" },
  { name: "hero_title", label: "Hero title", type: "text" },
  { name: "body_heading", label: "Body heading", type: "text" },
  { name: "body_copy", label: "Body copy", type: "textarea" },
  { name: "bullets", label: "Bullets", type: "string-array" },
  { name: "visual_label", label: "Visual label", type: "text" },
  { name: "variant", label: "Variant", type: "select", options: [{ value: "list", label: "List" }, { value: "network", label: "Network" }, { value: "deployment", label: "Deployment" }] },
  { name: "image", label: "Image", type: "image" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const standingFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const regionFields: FieldDef[] = [
  { name: "region", label: "Region", type: "text", required: true },
  { name: "crew", label: "Crew", type: "text" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const deployFields: FieldDef[] = [
  { name: "time", label: "Time", type: "text", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

export default async function CapabilitiesAdminPage() {
  const [{ data: capabilities }, { data: standing }, { data: regions }, { data: deploys }] = await Promise.all([
    getSupabaseAdmin().from("capabilities").select("*").order("position"),
    getSupabaseAdmin().from("standing_capabilities").select("*").order("position"),
    getSupabaseAdmin().from("network_regions").select("*").order("position"),
    getSupabaseAdmin().from("deploy_steps").select("*").order("position"),
  ]);

  const tables: TableConfig[] = [
    {
      table: "capabilities",
      label: "Capabilities",
      fields: capabilityFields,
      columns: [
        { key: "number", label: "#" },
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "is_published", label: "Published" },
      ],
      rows: capabilities ?? [],
    },
    {
      table: "standing_capabilities",
      label: "Standing capabilities",
      fields: standingFields,
      columns: [{ key: "title", label: "Title" }, { key: "is_published", label: "Published" }],
      rows: standing ?? [],
    },
    {
      table: "network_regions",
      label: "Network regions",
      fields: regionFields,
      columns: [{ key: "region", label: "Region" }, { key: "crew", label: "Crew" }],
      rows: regions ?? [],
    },
    {
      table: "deploy_steps",
      label: "Deploy steps",
      fields: deployFields,
      columns: [{ key: "time", label: "Time" }, { key: "title", label: "Title" }],
      rows: deploys ?? [],
    },
  ];

  return <AdminSection title="Capabilities" tables={tables} />;
}
