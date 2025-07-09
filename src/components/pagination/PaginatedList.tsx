'use client';

import { ReactNode } from 'react';
import { Button } from "@/components/button/Button";

interface PaginatedListProps<T> {
    items: T[];
    renderItem: (item: T, key: number) => ReactNode;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    onNextPage: () => void;
    onPrevPage: () => void;
    currentPage: number;   // 当前页码，从1开始
    totalPages: number;    // 总页数
    renderHeader?: ReactNode | (() => ReactNode);  // 可选表头，ReactNode 或函数
    isLoading?: boolean;
    className?: string;
}

export function PaginatedList<T>(x: PaginatedListProps<T>) {
  const className = x.className === undefined ? '' : x.className;
  // 渲染表头，支持函数或 ReactNode
  const headerContent =
        typeof x.renderHeader === 'function' ? x.renderHeader() : x.renderHeader;

  return (
    <div className={`w-full ${className}`}>
      {headerContent && headerContent}

      <ul className="w-full min-w-full">
        {x.items.map(x.renderItem)}
      </ul>

      <div className="flex justify-between items-center mt-4 space-x-4 text-gray-600">
        <Button
          onClick={x.onPrevPage}
          disabled={!x.hasPrevPage}
          className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
                  上一页
        </Button>

        <span>
    第 {x.currentPage} 页 / 共 {x.totalPages} 页
        </span>

        <Button
          onClick={x.onNextPage}
          disabled={!x.hasNextPage}
          className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
                  下一页
        </Button>
      </div>

    </div>
  );
}
