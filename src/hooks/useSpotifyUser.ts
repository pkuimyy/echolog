'use client';

import { useApi } from '@/hooks/useApi';
import type { SpotifyUser } from '@/types/spotify';

export function useSpotifyUser() {
  const { data: user, error, isLoading, isUnauthorized } = useApi<SpotifyUser>('/api/spotify/me');
  return { user, error, isLoading, isUnauthorized };
}
