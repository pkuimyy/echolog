import { NextResponse } from 'next/server';
import { SpotifyCookie } from '@/lib/shared/constants/spotify';

export async function GET() {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
  };

  const res = NextResponse.json({ success: true });

  res.cookies.set(SpotifyCookie.AccessToken, '', cookieOptions);
  res.cookies.set(SpotifyCookie.RefreshToken, '', cookieOptions);

  return res;
}
