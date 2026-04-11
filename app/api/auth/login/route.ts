import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation/schemas';
import { adminAuth } from '@/lib/firebase-admin';
import { verifyUserToken, sessionCookieName } from '@/lib/verify-token';

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const SESSION_EXPIRES_IN = 60 * 60 * 24 * 5 * 1000; // 5 days

export async function POST(request: NextRequest) {
  if (!FIREBASE_API_KEY) {
    return NextResponse.json({ error: 'Firebase API key is not configured.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const signInResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: validatedData.email,
          password: validatedData.password,
          returnSecureToken: true,
        }),
      }
    );

    const signInData = await signInResponse.json();
    if (!signInResponse.ok || !signInData.idToken) {
      return NextResponse.json({ error: signInData.error?.message || 'Invalid credentials' }, { status: 401 });
    }

    const user = await verifyUserToken(signInData.idToken);
    if (!user) {
      return NextResponse.json({ error: 'Unable to verify user after sign-in' }, { status: 401 });
    }

    const sessionCookie = await adminAuth.createSessionCookie(signInData.idToken, {
      expiresIn: SESSION_EXPIRES_IN,
    });

    const response = NextResponse.json({ message: 'Login successful', user });
    response.cookies.set({
      name: sessionCookieName,
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_EXPIRES_IN / 1000,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Login failed' }, { status: 500 });
  }
}
