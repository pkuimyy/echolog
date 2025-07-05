'use client';

import { useEffect } from 'react';
import { SpotifyLoginButton } from './SpotifyLoginButton';
import { useSpotifyAuthStore } from "@/store/spotifyAuthStore";

export function HomeAuthSection() {
  const { user, isLoading, error, fetchUser, logout } = useSpotifyAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return <p className="text-center text-gray-500">加载中...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">错误: {error.message || '请求失败'}</p>;
  }

  if (!user) {
    // 未登录，显示登录按钮
    return (
      <div className="flex justify-center space-x-4 items-center">
        <p>您尚未登录，请先登录。</p>
        <SpotifyLoginButton/>
      </div>
    );
  }

  // 已登录，显示用户信息和登出按钮
  return (
    <div className="flex items-center space-x-4">
      <p>
                登录为 <strong>{user.display_name}</strong>（{user.email}）
      </p>
      <button
        onClick={logout}
        className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
      >
                登出
      </button>
    </div>
  );
}
