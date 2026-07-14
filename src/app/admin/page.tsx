import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const counts = await Promise.all([
    getSupabaseAdmin().from("solutions").select("id", { count: "exact", head: true }),
    getSupabaseAdmin().from("capabilities").select("id", { count: "exact", head: true }),
    getSupabaseAdmin().from("case_studies").select("id", { count: "exact", head: true }),
    getSupabaseAdmin().from("insights").select("id", { count: "exact", head: true }),
    getSupabaseAdmin().from("programmes").select("id", { count: "exact", head: true }),
    getSupabaseAdmin().from("contact_submissions").select("id", { count: "exact", head: true }),
  ]);

  const [solutions, capabilities, cases, insights, programmes, submissions] = counts;

  const cards = [
    { label: "Solutions", value: solutions.count ?? 0, href: "/admin/solutions" },
    { label: "Capabilities", value: capabilities.count ?? 0, href: "/admin/capabilities" },
    { label: "Case studies", value: cases.count ?? 0, href: "/admin/impact" },
    { label: "Insights", value: insights.count ?? 0, href: "/admin/insights" },
    { label: "Programmes", value: programmes.count ?? 0, href: "/admin/programmes" },
    { label: "Unread submissions", value: submissions.count ?? 0, href: "/admin/submissions" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-normal text-ink">Dashboard</h1>
      <p className="mt-2 text-muted">Manage PrimeReach content from one place.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="rounded-xl border border-ink/10 bg-white p-5 transition-shadow hover:shadow-sm"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-light text-ink">{card.value}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
