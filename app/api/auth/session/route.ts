import { NextRequest, NextResponse } from 'next/server';
import { verifyUser, sessionCookieName } from '@/lib/verify-token';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set({
    name: sessionCookieName,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}
