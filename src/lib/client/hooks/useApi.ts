'use client';

import { useEffect, useState } from 'react';
import { FetchError } from '@/lib/shared/types/error';
import { fetchWithError } from "@/lib/client/utils/fetchWithError";

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<FetchError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isUnauthorized = error?.code === 401;

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const json = await fetchWithError<T>(url);
      setData(json);
    } catch (err) {
      setError(err as FetchError);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    error,
    isLoading,
    isUnauthorized,
    refetch: fetchData,
  };
}
