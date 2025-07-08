'use client';

import { create } from 'zustand';
import { SpotifyUser } from '@/lib/shared/types/spotify';
import { FetchError } from '@/lib/shared/types/error';
import { fetchWithError } from '@/lib/client/utils/fetchWithError';

interface SpotifyAuthState {
    user: SpotifyUser | null;
    token: string | null;
    isLoading: boolean;
    error: FetchError | null;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
    login: () => Promise<void>;
    setToken: (token: string | null) => void;
}

export const useSpotifyAuthStore = create<SpotifyAuthState>()((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  setToken: (token) => set({ token }),

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await fetchWithError<SpotifyUser>('/api/spotify/user');
      set({ user, isLoading: false, error: null });
    } catch (err) {
      const fetchError = err as FetchError;
      if (fetchError.code === 401) {
        // 未授权，不当错误处理
        set({ user: null, error: null, isLoading: false });
      } else {
        set({ user: null, error: fetchError, isLoading: false });
      }
    }
  },

  logout: async () => {
    try {
      await fetchWithError<void>('/api/spotify/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      set({ user: null, token: null });
    }
  },

  login: async () => {
    try {
      const { authorizeUrl } = await fetchWithError<{ authorizeUrl: string }>('/api/spotify/login');
      window.location.href = authorizeUrl;
    } catch (err) {
      console.error('Login error:', err);
    }
  },
}));
