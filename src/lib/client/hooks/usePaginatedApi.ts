'use client';

import { useState, useEffect, useCallback } from 'react';
import { FetchError, createFetchError, ErrorResponse } from '@/lib/shared/types/error';

interface UsePaginatedApiResult<T> {
    items: T[];
    isLoading: boolean;
    error: FetchError | null;
    offset: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    goNext: () => void;
    goPrev: () => void;
    refetch: () => void;
}

export function usePaginatedApi<T>(
  baseUrl: string,
  pageSize = 20
): UsePaginatedApiResult<T> {
  const [items, setItems] = useState<T[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}?limit=${pageSize}&offset=${offset}`);

      if (res.status === 401) {
        const json = (await res.json().catch(() => ({}))) as ErrorResponse;
        throw createFetchError(json.message || 'Unauthorized', 401);
      }

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw createFetchError(text || `Error ${res.status}`, res.status);
      }

      // 假设接口返回 { items: T[], total: number }
      const json = await res.json() as { items: T[], total: number };

      setItems(json.items || []);
      setTotal(json.total ?? 0);
    } catch (err) {
      setError(err as FetchError);
      setItems([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, pageSize, offset]);

  useEffect(() => {
    fetchData().then(() => {});
  }, [fetchData]);

  const currentPage = Math.floor(offset / pageSize) + 1;
  const totalPages = Math.ceil(total / pageSize);

  return {
    items,
    isLoading,
    error,
    offset,
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: offset > 0,
    goNext: () => setOffset((o) => Math.min(o + pageSize, (totalPages - 1) * pageSize)),
    goPrev: () => setOffset((o) => Math.max(0, o - pageSize)),
    refetch: fetchData,
  };
}
