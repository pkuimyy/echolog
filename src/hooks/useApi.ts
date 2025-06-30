'use client';

import useSWR from 'swr';
import type { FetchError } from '@/types/error';
import { apiFetcher } from '@/lib/fetcher';

export function useApi<T>(url: string) {
  const { data, error, isLoading, mutate } = useSWR<T, FetchError>(url, apiFetcher,{
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  const isUnauthorized = error?.code === 401;

  return {
    data,
    error,
    isLoading,
    isUnauthorized,
    mutate,
  };
}
