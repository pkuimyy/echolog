import { NextRequest, NextResponse } from 'next/server';

type HandlerWithToken<T> = (token: string, req: NextRequest) => Promise<T>

export function withAuthHandler<T>(handler: HandlerWithToken<T>) {
  return async function (req: NextRequest) {
    const token = req.cookies.get('spotify_access_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const result = await handler(token, req);
      return NextResponse.json(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
}
