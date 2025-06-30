'use client';

import { useEffect, useState } from 'react';
import { FetchError, createFetchError, ErrorResponse } from '@/types/error';

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<FetchError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isUnauthorized = error?.code === 401;

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
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

      const json: T = await res.json();
      setData(json);
    } catch (err) {
      setError(err as FetchError);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    fetchData().then(() => ({}));
  }, [url]);

  return {
    data,
    error,
    isLoading,
    isUnauthorized,
    refetch: fetchData, // 提供主动刷新能力
  };
}
