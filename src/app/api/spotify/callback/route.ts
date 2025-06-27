import { NextRequest, NextResponse } from 'next/server';

interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope?: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');
  const savedState = req.cookies.get('spotify_auth_state')?.value;

  // 校验 code 和 state（防止 CSRF 攻击）
  if (!code || !returnedState) {
    return NextResponse.json({ error: 'Missing code or state' }, { status: 400 });
  }

  if (returnedState !== savedState) {
    return NextResponse.json({ error: 'Invalid state (possible CSRF)' }, { status: 403 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/callback`;

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basic}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }).toString(),
  });

  if (!tokenRes.ok) {
    const error = await tokenRes.text();
    return NextResponse.json({ error: `Token exchange failed: ${error}` }, { status: 500 });
  }

  const tokenData: SpotifyTokenResponse = await tokenRes.json();

  // 构造重定向响应
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);

  const maxAge = tokenData.expires_in || 3600;

  // 设置 access_token（仅服务端可读）
  response.cookies.set('spotify_access_token', tokenData.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
    sameSite: 'lax',
  });

  // 可选：设置 refresh_token（用于将来刷新 token）
  if (tokenData.refresh_token) {
    response.cookies.set('spotify_refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 30 * 24 * 3600, // 通常 refresh_token 长期有效
      sameSite: 'lax',
    });
  }

  // 清除 state（避免重用）
  response.cookies.set('spotify_auth_state', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}
