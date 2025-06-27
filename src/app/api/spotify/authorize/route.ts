import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/callback`;
  const scope = encodeURIComponent('user-library-read user-read-email');
  const state = Math.random().toString(36).substring(2);

  // 设置 HttpOnly Cookie 存储 state
  (await cookies()).set('spotify_auth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 300,
    path: '/',
  });

  const authorizeUrl =
        `https://accounts.spotify.com/authorize` +
        `?response_type=code&client_id=${clientId}` +
        `&scope=${scope}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${state}`;

  return NextResponse.redirect(authorizeUrl);
}
