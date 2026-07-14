import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error } = await getSupabaseAdmin().from("newsletter_subscribers").insert({
      email: body.email,
      source: body.source,
    });
    if (error) {
      // Duplicate email is acceptable — treat as success.
      if (error.code === "23505") return Response.json({ ok: true });
      throw error;
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
