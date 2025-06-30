'use client';

import { Tab } from '@headlessui/react';
import { ReactNode, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import clsx from 'clsx';

export interface TabItem {
    label: string
    content: ReactNode
}

interface TabsProps {
    items: TabItem[]
    paramKey?: string // 默认为 "tabs"
}

export default function Tabs({ items, paramKey = 'tabs' }: TabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 从 URL 参数获取初始索引，确保有效范围内
  const initialIndex = parseInt(searchParams.get(paramKey) || '0', 10);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    isNaN(initialIndex) || initialIndex < 0 || initialIndex >= items.length
      ? 0
      : initialIndex
  );

  // 监听 URL 参数变化，同步状态
  useEffect(() => {
    const paramValue = searchParams.get(paramKey);
    const index = parseInt(paramValue || '0', 10);
    if (!isNaN(index) && index !== selectedIndex) {
      setSelectedIndex(index);
    }
  }, [searchParams, paramKey, selectedIndex]);

  // Tab 切换更新 URL 参数，但不滚动页面
  const handleTabChange = (index: number) => {
    setSelectedIndex(index);

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set(paramKey, index.toString());

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={handleTabChange}>
      {/* Tab 标签列表 */}
      <Tab.List className="flex flex-wrap justify-center space-x-2 sm:space-x-4 border-b">
        {items.map((item, idx) => (
          <Tab
            key={idx}
            className={({ selected }) =>
              clsx(
                'px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-md focus:outline-none',
                selected
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-black'
              )
            }
          >
            {item.label}
          </Tab>
        ))}
      </Tab.List>

      {/* Tab 内容面板 */}
      <Tab.Panels className="mt-4 w-full max-w-full sm:max-w-full md:max-w-[60vw] mx-auto min-h-[200px]">
        {items.map((item, idx) => (
          <Tab.Panel key={idx} className="focus:outline-none w-full">
            <div className="p-4 bg-gray-50 rounded flex justify-center">
              <div className="w-full max-w-md">{item.content}</div>
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
