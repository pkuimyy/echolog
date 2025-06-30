import { useApi } from "@/hooks/useApi";
import { SpotifySavedAlbumsResponse } from "@/types/spotify";

export function useSpotifyAlbums(offset = 0, limit = 10) {
  const url = `/api/spotify/albums?offset=${offset}&limit=${limit}`;
  return useApi<SpotifySavedAlbumsResponse>(url);
}