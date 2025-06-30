'use client';

import Image from 'next/image';
import { useSpotifyUser } from '@/hooks/useSpotifyUser';
import { SpotifyLoginButton } from '@/components/SpotifyLoginButton';
import { SpotifyLogoutButton } from '@/components/SpotifyLogoutButton';

export default function HomePage() {
  const { user, error, isLoading, isUnauthorized } = useSpotifyUser();

  return (
    <main className="min-h-screen p-8 bg-white font-sans text-gray-900 flex flex-col items-center space-y-6">
      <Image src="/echolog.svg" alt="echolog" width={80} height={80}/>
      <h1 className="text-xl font-semibold">Spotify OAuth Demo</h1>

      {isLoading && (
        <p className="text-gray-500 text-sm">加载中...</p>
      )}

      {!isLoading && error && !isUnauthorized && (
        <p className="text-sm text-red-500">{error.message || '发生错误，请重试。'}</p>
      )}

      {!isLoading && isUnauthorized && (
        <p className="text-sm text-yellow-600">您尚未登录，请先登录。</p>
      )}

      {!isLoading && !error && user && (
        <>
          <p className="text-sm text-gray-700">
                        登录为 <strong>{user.display_name}</strong>（{user.email}）
          </p>
          <SpotifyLogoutButton/>
        </>
      )}

      {!isLoading && (isUnauthorized || !user) && (
        <SpotifyLoginButton/>
      )}
    </main>
  );
}
