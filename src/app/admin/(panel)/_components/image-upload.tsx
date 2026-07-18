"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ImageUpload({
  value,
  onChange,
  bucket = "media",
  folder = "",
}: {
  value?: string | null;
  onChange: (path: string) => void;
  bucket?: string;
  folder?: string;
}) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop() ?? "";
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
    const path = folder ? `${folder}/${name}` : name;

    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      upsert: true,
      contentType: file.type,
    });

    setUploading(false);
    if (error) {
      alert(`Upload failed: ${error.message}`);
      return;
    }
    onChange(path);
  }

  const publicUrl = value
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${value}`
    : null;

  return (
    <div className="space-y-2">
      {publicUrl && (
        <div className="relative inline-block overflow-hidden rounded-lg border border-ink/10">
          <img
            src={publicUrl}
            alt="Preview"
            className="h-32 w-auto object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-bronze file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-bronze-600"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-600 hover:underline"
          >
            Remove
          </button>
        )}
      </div>
      {value && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-xs text-ink outline-none"
        />
      )}
      {uploading && <p className="text-xs text-muted">Uploading…</p>}
    </div>
  );
}
