import { NextResponse } from 'next/server';
import { SpotifyCookie } from "@/lib/shared/constants/spotify";

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
        `&state=${state}` +
        `&show_dialog=true`;

  // 构造响应，返回 authorizeUrl，供前端跳转用
  const res = NextResponse.json({ authorizeUrl });

  // 设置 cookie：AuthState，用于防止 CSRF
  res.cookies.set(SpotifyCookie.AuthState, state, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 300, // 5分钟有效
  });

  return res;
}
