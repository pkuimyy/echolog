'use client';

import { ReactNode } from 'react';

interface PaginatedListProps<T> {
    items: T[]
    renderItem: (item: T, index: number) => ReactNode
    offset: number
    limit: number
    total: number
    onPageChange: (newOffset: number) => void
}

export function PaginatedList<T>({
  items,
  renderItem,
  offset,
  limit,
  total,
  onPageChange,
}: PaginatedListProps<T>) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <li key={index} className="py-2">
            {renderItem(item, index)}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center text-sm text-gray-600 pt-2">
        <button
          onClick={() => onPageChange(offset - limit)}
          disabled={offset === 0}
          className="hover:text-black disabled:opacity-30"
        >
                    上一页
        </button>

        <span className="text-xs text-gray-500">
          第 {currentPage} 页 / 共 {totalPages} 页
        </span>

        <button
          onClick={() => onPageChange(offset + limit)}
          disabled={offset + limit >= total}
          className="hover:text-black disabled:opacity-30"
        >
                    下一页
        </button>
      </div>
    </div>
  );
}
