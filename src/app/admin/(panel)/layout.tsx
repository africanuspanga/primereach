import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { AdminSidebar } from "./_components/sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");

  const { data: admin } = await getSupabaseAdmin()
    .from("admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (!admin) redirect("/admin/login?denied=1");

  return (
    <div className="min-h-screen bg-paper text-ink">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen p-6 lg:p-10">{children}</main>
    </div>
  );
}
