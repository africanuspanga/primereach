"use server";

import { revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { TABLE_TAGS } from "./_tags";

async function assertAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("unauthorized");
  const { data: admin } = await getSupabaseAdmin()
    .from("admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (!admin) throw new Error("forbidden");
}

function revalidateFor(table: string, slug?: string) {
  const tags = TABLE_TAGS[table] ?? [];
  tags.forEach((t) => revalidateTag(t, "max"));
  if (slug) {
    if (table === "solutions") revalidateTag(`solution:${slug}`, "max");
    if (table === "capabilities") revalidateTag(`capability:${slug}`, "max");
  }
}

export async function upsertRow(table: string, row: Record<string, unknown>) {
  await assertAdmin();
  const { error } = await getSupabaseAdmin().from(table).upsert(row);
  if (error) throw error;
  revalidateFor(table, (row.slug as string) ?? undefined);
}

export async function deleteRow(table: string, id: string) {
  await assertAdmin();
  const { error } = await getSupabaseAdmin().from(table).delete().eq("id", id);
  if (error) throw error;
  revalidateFor(table);
}

export async function reorder(table: string, ids: string[]) {
  await assertAdmin();
  await Promise.all(
    ids.map((id, i) =>
      getSupabaseAdmin().from(table).update({ position: i }).eq("id", id)
    )
  );
  revalidateFor(table);
}

export async function updateBlock(key: string, data: Record<string, unknown>) {
  await assertAdmin();
  const { error } = await getSupabaseAdmin()
    .from("content_blocks")
    .upsert({ key, data, label: key, is_published: true }, { onConflict: "key" });
  if (error) throw error;
  revalidateTag("blocks", "max");
  revalidateTag(`block:${key}`, "max");
}
