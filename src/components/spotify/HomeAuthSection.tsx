'use client';

import { useEffect } from 'react';
import { useSpotifyAuthStore } from '@/lib/client/store/spotifyAuthStore';
import { Button } from "@/components/button/Button";

export function HomeAuthSection() {
  const { user, isLoading, error, fetchUser, login, logout } = useSpotifyAuthStore();

  useEffect(() => {
    if (!user) {
      fetchUser().catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUser]);

  if (isLoading) {
    return <p className="text-center text-gray-500">加载中...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 space-y-2">
        <p>系统错误：{error.message || '请求失败'}</p>
        <Button
          onClick={login}
          className="bg-[#006633] text-white"
        >
                    重新登录
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center space-x-4">
        <p>您尚未登录，请先登录。</p>
        <Button
          onClick={login}
          className="bg-[#006633] text-white"
        >
                    登录 Spotify
        </Button>
      </div>
    );
  }

  return (
    <div className="flex sm:flex-row items-center justify-center space-x-4">
      <p>
                登录为 <strong>{user.display_name}</strong>（{user.email}）
      </p>
      <Button
        onClick={logout}
        className="bg-gray-300 text-gray-800 hover:bg-gray-400"
      >
                登出 Spotify
      </Button>
    </div>
  );

}
