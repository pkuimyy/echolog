import { SpotifyCommonResponse, SpotifySavedAlbumsResponse } from "@/types/spotify";

export async function getSpotifyAlbums(
  accessToken: string,
  limit = 20,
  offset = 0
): Promise<SpotifySavedAlbumsResponse> {
  const res = await fetch(
    `https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({})) as SpotifyCommonResponse;
    throw new Error(error?.message || 'Failed to fetch saved albums');
  }

  return res.json();
}