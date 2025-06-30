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
      className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded shadow"
    >登出 Spotify</button>
  );
}
