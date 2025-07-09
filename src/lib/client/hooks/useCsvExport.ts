'use client';

import { useState } from 'react';
import { fetchWithError } from '@/lib/client/utils/fetchWithError';

interface ExportCsvOptions<T> {
    url: string;
    transformer: (item: T) => Record<string, string | number | boolean | null | undefined>;
    pageSize?: number;
    filename?: string;
}

export function useCsvExport<T>(x: ExportCsvOptions<T>) {
  const pageSize = x.pageSize === undefined ? 50 : x.pageSize;
  const filename = x.filename === undefined ? 'export.csv' : x.filename;
  const [isExporting, setIsExporting] = useState(false);

  async function exportCsv() {
    setIsExporting(true);
    try {
      const allItems: T[] = [];
      for (let page = 1; ; page++) {
        const res = await fetchWithError<{
                    items: T[];
                    total: number;
                }>(`${(x.url)}?limit=${pageSize}&page=${page}`);

        allItems.push(...res.items);

        const totalPages = Math.ceil(res.total / pageSize);
        if (page >= totalPages) break;
      }

      const transformed = allItems.map(x.transformer);
      const csv = convertToCsv(transformed);
      triggerDownload(csv, filename);
    } catch (e) {
      console.error('导出失败', e);
      alert('导出失败，请稍后再试');
    } finally {
      setIsExporting(false);
    }
  }

  return {
    exportCsv,
    isExporting,
  };
}

// === 工具函数 ===
function convertToCsv(rows: Record<string, string | number | boolean | null | undefined>[]): string {
  if (rows.length === 0) return '';
  const header = Object.keys(rows[0]).join(',');
  const lines = rows.map(row =>
    Object.values(row)
      .map(v => `"${String(v).replace(/"/g, '""')}"`) // CSV 转义
      .join(',')
  );
  return [header, ...lines].join('\n');
}

function triggerDownload(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
