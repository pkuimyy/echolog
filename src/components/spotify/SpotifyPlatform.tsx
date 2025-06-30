'use client';

import { useSpotifyUser } from '@/hooks/useSpotifyUser';
import { SpotifyLoginButton } from './SpotifyLoginButton';
import { SpotifyLogoutButton } from './SpotifyLogoutButton';

export default function SpotifyPlatform() {
  const { user, error, isLoading, isUnauthorized } = useSpotifyUser();

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

  if (user) {
    return (
      <div className="flex justify-center">
        <div className="flex items-center space-x-3">
          <p className="text-sm text-gray-700 whitespace-nowrap">
                        登录为 <strong>{user.display_name}</strong>（{user.email}）
          </p>
          <SpotifyLogoutButton/>
        </div>
      </div>
    );
  }

  return null;
}
