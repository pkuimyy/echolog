'use client';

import { useState } from 'react';
import { exportToCSV } from '@/lib/export-to-csv';

interface CsvExportOptions<T> {
    /**
     * 分页获取数据的方法。返回 { items, total }。
     */
    fetchPage: (offset: number, limit: number) => Promise<{ items: T[]; total: number }>

    /**
     * 导出的文件名
     */
    filename: string

    /**
     * 将每项数据转换为扁平对象（可导出为 CSV）
     */
    transformItem: (item: T) => Record<string, string | number>
}

export function useCsvExport<T>(options: CsvExportOptions<T>) {
  const [isExporting, setIsExporting] = useState(false);

  const exportCSV = async () => {
    setIsExporting(true);

    try {
      const pageSize = 50;
      let offset = 0;
      const allItems: T[] = [];

      while (true) {
        const { items, total } = await options.fetchPage(offset, pageSize);
        allItems.push(...items);
        offset += pageSize;
        if (offset >= total) break;
      }

      const flatData = allItems.map(options.transformItem);
      exportToCSV(flatData, options.filename);
    } catch (e) {
      alert(`导出失败：${(e as Error).message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportCSV,
    isExporting,
  };
}
