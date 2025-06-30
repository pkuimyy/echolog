'use client';

import { SpotifyLogoutResponse } from "@/types/spotify";

export function SpotifyLogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/spotify/logout');
      if (res.ok) {
        window.location.href = '/';
      } else {
        const data: SpotifyLogoutResponse = await res.json();
        alert(data.error || 'Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Logout failed due to network error');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
    >登出 Spotify</button>
  );
}
