import { getSpotifyAlbums } from '@/lib/spotify-albums';
import { withAuthHandler } from "@/lib/with-auth-handler";

export const GET = withAuthHandler(async (token, req) => {
  const limit = Number(req.nextUrl.searchParams.get('limit') || 20);
  const offset = Number(req.nextUrl.searchParams.get('offset') || 0);

  return getSpotifyAlbums(token, limit, offset);
});
