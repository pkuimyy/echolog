import { NextRequest, NextResponse } from 'next/server';
import { SpotifyCookie } from '@/lib/constants/spotify';

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin; // <-- 获取站点根 URL，如 https://example.com
  const response = NextResponse.redirect(`${origin}/`);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
  };

  response.cookies.set(SpotifyCookie.AccessToken, '', cookieOptions);
  response.cookies.set(SpotifyCookie.RefreshToken, '', cookieOptions);

  return response;
}
