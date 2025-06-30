'use client';

import { useSpotifyUser } from '@/hooks/useSpotifyUser';
import { SpotifyLoginButton } from './SpotifyLoginButton';
import { SpotifyLogoutButton } from './SpotifyLogoutButton';
import { Disclosure } from '@headlessui/react';
import { useState } from 'react';
import { useSpotifyAlbums } from '@/hooks/useSpotifyAlbums';
import { PaginatedList } from '@/components/pagination/PaginatedList';
import { useCsvExport } from "@/hooks/useCsvExport";
import { SpotifySavedAlbum, SpotifySavedAlbumsResponse } from "@/types/spotify";

export default function SpotifyPlatform() {
  const { user, error, isLoading, isUnauthorized } = useSpotifyUser();
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const {
    data,
    error: albumsError,
    isLoading: albumsLoading,
    refetch,
  } = useSpotifyAlbums(offset, limit);

  const { exportCSV, isExporting } = useCsvExport<SpotifySavedAlbum>({
    filename: 'spotify_albums.csv',
    fetchPage: async (offset, limit) => {
      const res = await fetch(`/api/spotify/albums?offset=${offset}&limit=${limit}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json() as SpotifySavedAlbumsResponse;
      return { items: data.items, total: data.total };
    },
    transformItem: (item) => ({
      id: item.album.id,
      name: item.album.name,
      artists: item.album.artists.map((a) => a.name).join(', '),
      release_date: item.album.release_date,
      url: item.album.external_urls?.spotify,
    }),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p className="text-gray-500 text-sm">加载中...</p>
      </div>
    );
  }

  if (error && !isUnauthorized) {
    return (
      <div className="flex justify-center">
        <p className="text-sm text-red-500">{error.message || '发生错误，请重试。'}</p>
      </div>
    );
  }

  if (isUnauthorized) {
    return (
      <div className="flex justify-center">
        <div className="flex items-center space-x-3">
          <p className="text-sm text-gray-700 whitespace-nowrap">您尚未登录，请先登录。</p>
          <SpotifyLoginButton/>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const items = data?.items || [];
  const total = data?.total || 0;

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {/* 用户信息 */}
      <div className="flex items-center space-x-3">
        <p className="text-sm text-gray-700 whitespace-nowrap">
                    登录为 <strong>{user.display_name}</strong>（{user.email}）
        </p>
        <SpotifyLogoutButton/>
      </div>

      {/* 专辑区域 */}
      <Disclosure>
        {({ open }) => (
          <div>
            <Disclosure.Button
              className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition"
              onClick={() => !open && refetch()}
            >
              {open ? '隐藏收藏专辑' : '查看收藏专辑'}
            </Disclosure.Button>

            <Disclosure.Panel className="w-full max-w-2xl mx-auto space-y-4">
              {albumsLoading ? (
                <p className="text-center text-gray-500">加载中...</p>
              ) : albumsError ? (
                <p className="text-center text-red-500">{albumsError.message}</p>
              ) : items.length === 0 ? (
                <p className="text-center text-gray-500">暂无收藏专辑</p>
              ) : (
                <div>
                  <button
                    onClick={exportCSV}
                    disabled={isExporting}
                    className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-800 transition disabled:opacity-50"
                  >
                    {isExporting ? '导出中...' : '导出全部专辑为 CSV'}
                  </button>
                  <PaginatedList
                    items={items}
                    offset={offset}
                    limit={limit}
                    total={total}
                    onPageChange={(newOffset) => setOffset(newOffset)}
                    renderItem={(item) => (
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.album.images?.[0]?.url}
                          alt={item.album.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.album.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.album.artists.map((a) => a.name).join(', ')} ・{' '}
                            {item.album.release_date}
                          </p>
                        </div>
                      </div>
                    )}
                  />
                </div>

              )}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
