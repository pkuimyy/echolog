export const SpotifyCookie = {
  AccessToken: 'spotify_access_token',
  RefreshToken: 'spotify_refresh_token',
  AuthState: 'spotify_auth_state',
} as const;

export type SpotifyCookieKey = typeof SpotifyCookie[keyof typeof SpotifyCookie];