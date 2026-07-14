import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error } = await getSupabaseAdmin().from("contact_submissions").insert({
      name: body.name,
      email: body.email,
      phone: body.phone,
      method: body.method,
      sector: body.sector,
      service: body.service,
      message: body.message,
    });
    if (error) throw error;
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
