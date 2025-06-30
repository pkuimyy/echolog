'use client';

import useSWR from 'swr';
import { SpotifyUser } from "@/types/spotify";

const fetcher = (url: string): Promise<SpotifyUser> =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  });

export function useSpotifyUser() {
  const { data, error, isLoading } = useSWR('/api/spotify/me', fetcher);
  return { user: data, isLoading, error };
}