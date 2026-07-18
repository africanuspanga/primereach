import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const { data: submissions, error } = await getSupabaseAdmin()
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    <div>
      <h1 className="font-display text-3xl font-normal text-ink">Contact submissions</h1>
      <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-paper text-left text-xs font-semibold uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {(submissions ?? []).map((s) => (
              <tr key={s.id} className="hover:bg-paper/50">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">{s.service}</td>
                <td className="max-w-xs truncate px-4 py-3 text-muted">{s.message}</td>
                <td className="px-4 py-3 text-muted">{new Date(s.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
