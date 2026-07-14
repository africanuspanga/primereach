import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { AdminSection, TableConfig } from "../_components/admin-section";
import { FieldDef } from "../_components/field-input";

export const dynamic = "force-dynamic";

const caseFields: FieldDef[] = [
  { name: "sector", label: "Sector", type: "text", required: true },
  { name: "client", label: "Client", type: "text", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "image", label: "Image", type: "image" },
  { name: "is_featured", label: "Featured", type: "boolean" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const projectFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "caption", label: "Caption", type: "text", required: true },
  { name: "image", label: "Image", type: "image" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const sectorFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "count", label: "Count", type: "text" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const clientFields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "logo", label: "Logo", type: "image" },
  { name: "kind", label: "Kind", type: "select", options: [{ value: "logo", label: "Logo" }, { value: "roster", label: "Roster" }] },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const testimonialFields: FieldDef[] = [
  { name: "quote", label: "Quote", type: "textarea", required: true },
  { name: "initials", label: "Initials", type: "text", required: true },
  { name: "role", label: "Role", type: "text" },
  { name: "org", label: "Organisation", type: "text" },
  { name: "position", label: "Position", type: "number" },
  { name: "is_published", label: "Published", type: "boolean" },
];

export default async function ImpactAdminPage() {
  const [cases, projects, sectors, clients, testimonials] = await Promise.all([
    getSupabaseAdmin().from("case_studies").select("*").order("position"),
    getSupabaseAdmin().from("featured_projects").select("*").order("position"),
    getSupabaseAdmin().from("impact_sectors").select("*").order("position"),
    getSupabaseAdmin().from("clients").select("*").order("position"),
    getSupabaseAdmin().from("testimonials").select("*").order("position"),
  ]);

  const tables: TableConfig[] = [
    { table: "case_studies", label: "Case studies", fields: caseFields, columns: [{ key: "client", label: "Client" }, { key: "title", label: "Title" }, { key: "is_published", label: "Published" }], rows: cases.data ?? [] },
    { table: "featured_projects", label: "Featured projects", fields: projectFields, columns: [{ key: "title", label: "Title" }, { key: "caption", label: "Caption" }], rows: projects.data ?? [] },
    { table: "impact_sectors", label: "Impact sectors", fields: sectorFields, columns: [{ key: "title", label: "Title" }, { key: "count", label: "Count" }], rows: sectors.data ?? [] },
    { table: "clients", label: "Clients", fields: clientFields, columns: [{ key: "name", label: "Name" }, { key: "kind", label: "Kind" }], rows: clients.data ?? [] },
    { table: "testimonials", label: "Testimonials", fields: testimonialFields, columns: [{ key: "initials", label: "Initials" }, { key: "org", label: "Organisation" }, { key: "is_published", label: "Published" }], rows: testimonials.data ?? [] },
  ];

  return <AdminSection title="Impact" tables={tables} />;
}
