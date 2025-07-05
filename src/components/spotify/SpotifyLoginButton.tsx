'use client';

import { SpotifyLoginResponse } from "@/types/spotify";
import { useSpotifyAuthStore } from "@/store/spotifyAuthStore";

export function SpotifyLoginButton() {
  const setToken = useSpotifyAuthStore((state) => state.setToken);

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/spotify/login');
      const data: SpotifyLoginResponse = await res.json();

      if (data.authorizeUrl) {
        setToken('pending'); // 标记登录中
        window.location.href = data.authorizeUrl;
      } else {
        console.error('Authorization URL not found');
        alert('Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed due to network error');
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700 transition"
    >
        登录 Spotify
    </button>
  );
}
