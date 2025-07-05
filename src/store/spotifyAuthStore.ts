import { create } from 'zustand';
import { SpotifyUser } from '@/types/spotify';
import { FetchError, createFetchError } from '@/types/error';

interface SpotifyAuthState {
    user: SpotifyUser | null;
    token: string | null;
    isLoading: boolean;
    error: FetchError | null;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
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
      const res = await fetch('/api/spotify/me');
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw createFetchError(text || `Error ${res.status}`, res.status);
      }
      const user: SpotifyUser = await res.json();
      set({ user, isLoading: false });
    } catch (err) {
      set({ user: null, error: err as FetchError, isLoading: false });
    }
  },

  logout: async () => {
    try {
      const res = await fetch('/api/spotify/logout');
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw createFetchError(text || 'Logout failed', res.status);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      set({ user: null, token: null });
    }
  },
}));
