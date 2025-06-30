import { SpotifyUser } from "@/types/spotify";

export async function getUserProfile(accessToken: string): Promise<SpotifyUser> {
  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Spotify user');
  }

  return res.json();
}