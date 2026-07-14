const BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

export function mediaUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  return `${BASE}/media/${path}`;
}

export function brandUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  return `${BASE}/brand/${path}`;
}

export function storageUrl(bucket: string, path?: string | null): string | undefined {
  if (!path) return undefined;
  return `${BASE}/${bucket}/${path}`;
}

/** Backwards-compatible helper that leaves absolute URLs and /public paths untouched. */
export function resolveImage(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return path;
  return mediaUrl(path);
}
