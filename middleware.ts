import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect the admin UI with a session cookie checkpoint.
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // API routes that require authentication should validate tokens in the route handlers.
  if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/services') || pathname.startsWith('/api/projects')) {
    const authHeader = request.headers.get('authorization');
    const session = request.cookies.get('session')?.value;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};