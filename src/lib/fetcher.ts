import { createFetchError } from "@/types/error";

export async function apiFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (res.status === 401) {
    const fallback = await res.json<{ message?: string }>().catch(() => ({} as { message?: string }));
    const message = typeof fallback.message === "string" ? fallback.message : undefined;
    throw createFetchError(message || 'Unauthorized', 401);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw createFetchError(text || 'Unknown API error', res.status);
  }

  return res.json();
}
