import { createFetchError, ErrorResponse } from '@/lib/shared/types/error';

export async function fetchWithError<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (res.status === 401) {
    const json = await res.json().catch(() => ({})) as ErrorResponse;
    const message = typeof json.message === 'string' ? json.message : 'Unauthorized';
    throw createFetchError(message, 401);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw createFetchError(text || `API error (${res.status})`, res.status);
  }

  return await res.json();
}
