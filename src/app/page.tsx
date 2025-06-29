'use client';

import Image from 'next/image';
import { useSpotifyUser } from '@/hooks/useSpotifyUser';

export default function HomePage() {
  const { user, isLoading, error } = useSpotifyUser();

  const handleLogin = () => {
    window.location.href = '/api/spotify/authorize';
  };

  const handleLogout = () => {
    window.location.href = '/api/spotify/logout';
  };

  return (
    <main className="min-h-screen p-8 bg-white font-sans text-gray-900 flex flex-col items-center space-y-6">
      <Image src="/echolog.svg" alt="echolog" width={80} height={80} />
      <h1 className="text-xl font-semibold">Spotify OAuth Demo</h1>

      {error && <p className="text-sm text-red-500">{error.message}</p>}

      {isLoading ? (
        <p className="text-gray-500 text-sm">加载中...</p>
      ) : (
        <>
          {/* 登录状态 */}
          {user && (
            <p className="text-sm text-gray-700">
                            登录为 <strong>{user.display_name}</strong>（{user.email}）
            </p>
          )}

          {/* 登录/登出按钮 */}
          <div className="flex space-x-4">
            {!user && (
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded shadow"
              >
                                登录 Spotify
              </button>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded shadow"
              >
                                登出
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
