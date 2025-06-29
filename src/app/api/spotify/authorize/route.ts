import { NextResponse } from 'next/server';
import { SpotifyCookie } from "@/lib/constants/spotify";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/callback`;
  const scope = encodeURIComponent('user-library-read user-read-email');
  const state = Math.random().toString(36).substring(2);

  const authorizeUrl =
        `https://accounts.spotify.com/authorize` +
        `?response_type=code&client_id=${clientId}` +
        `&scope=${scope}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${state}`;

  const response = NextResponse.redirect(authorizeUrl);

  // 通过 response 设置 Cookie（这个才会发到浏览器）
  response.cookies.set(SpotifyCookie.AuthState, state, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 300,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
