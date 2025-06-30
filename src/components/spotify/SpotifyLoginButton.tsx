'use client';

import { SpotifyLoginResponse } from "@/types/spotify";

export function SpotifyLoginButton() {
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/spotify/login');
      const data: SpotifyLoginResponse = await res.json();

      if (data.authorizeUrl) {
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
    >登录 Spotify</button>
  );
}