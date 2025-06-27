import { NextRequest, NextResponse } from 'next/server';
import { getUserProfile } from "@/lib/spotify-user";

export async function GET(req: NextRequest) {
  const token = req.cookies.get('spotify_access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await getUserProfile(token);
    return NextResponse.json(user);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}