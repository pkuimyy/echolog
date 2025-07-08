import { withAuthHandler } from "@/lib/server/withAuthHandler";
import { SpotifyCommonResponse, SpotifySavedAlbumsResponse } from "@/lib/shared/types/spotify";

async function getSpotifyAlbums(
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

export const GET = withAuthHandler(async (token, req) => {
  const limit = Number(req.nextUrl.searchParams.get('limit') || 20);
  const offset = Number(req.nextUrl.searchParams.get('offset') || 0);

  return getSpotifyAlbums(token, limit, offset);
});
