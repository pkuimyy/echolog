'use client';

import { SpotifySavedAlbum } from '@/lib/shared/types/spotify';
import { PaginatedList } from "@/components/pagination/PaginatedList";
import { usePaginatedApi } from "@/lib/client/hooks/usePaginatedApi";
import AlbumListItem from "@/components/spotify/AlbumListItem";
import { Button } from "@/components/button/Button";

export default function AlbumsPage() {
  const {
    items,
    isLoading,
    error,
    hasNextPage,
    hasPrevPage,
    goNext,
    goPrev,
    currentPage,
    totalPages,
  } = usePaginatedApi<SpotifySavedAlbum>('/api/spotify/albums', 20);

  if (error) {
    return (
      <main className="max-w-screen-lg mx-auto px-4 py-8 text-center text-red-600">
                请求专辑失败：{error.message || '未知错误'}
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="max-w-screen-lg mx-auto px-4 py-8 text-center">
                Loading...
      </main>
    );
  }

  return (
    <main className="w-full min-w-full max-w-screen-lg mx-auto px-4 py-8">
      <div className="w-full flex items-center space-x-4 mb-6">
        <h1 className="text-xl font-semibold">我收藏的专辑</h1>
        <Button>下载为 csv</Button>
        <Button>下载为拼图</Button>
      </div>

      <PaginatedList
        items={items}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onNextPage={goNext}
        onPrevPage={goPrev}
        currentPage={currentPage}
        totalPages={totalPages}
        renderHeader={() => (
          <div
            className="grid grid-cols-[64px_3fr_3fr_1fr_0.5fr] items-center py-2 border-b last:border-none border-gray-200">
            <div>封面</div>
            <div>专辑名称</div>
            <div>艺术家</div>
            <div>发行日期</div>
            <div>曲数</div>
          </div>
        )}
        renderItem={(item, index) => (
          <AlbumListItem album={item.album} key={index}/>
        )}
      />
    </main>
  );
}
