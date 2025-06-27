'use client';
import Image from "next/image";
import { useSpotifyUser } from "@/hooks/useSpotifyUser";

export default function HomePage() {
  const { user, isLoading, error } = useSpotifyUser();

  const handleLogin = () => {
    window.location.href = '/api/spotify/authorize';
  };

  return (
    <main className="min-h-screen p-8 font-sans bg-white text-gray-900">
      <div className="flex flex-col items-center space-y-6">
        <Image src="/echolog.svg" alt="echolog" width={100} height={100}/>
        <h1 className="text-2xl font-bold">Spotify OAuth Demo</h1>

        {error && (
          <p className="text-red-600 text-sm">{error.message}</p>
        )}

        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : !user ? (
          <button
            onClick={handleLogin}
            className="px-6 py-3 text-white text-base font-medium bg-green-500 hover:bg-green-600 rounded-md shadow transition"
          >Login with Spotify</button>
        ) : (
          <div className="text-center space-y-4">
            <p>Logged in as <strong>{user.display_name}</strong> ({user.email})</p>
          </div>
        )}
      </div>
    </main>
  );
}
