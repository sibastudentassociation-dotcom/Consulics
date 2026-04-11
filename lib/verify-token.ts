import { NextRequest } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export interface VerifiedUser {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin: Date;
}

const SESSION_COOKIE_NAME = 'session';

function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return cookie || null;
}

async function verifyJwt(token: string) {
  try {
    return await adminAuth.verifyIdToken(token);
  } catch (error) {
    return await adminAuth.verifySessionCookie(token, true);
  }
}

async function createUserDocument(uid: string, email: string, name: string, phone?: string) {
  const now = new Date();
  const userRef = adminDb.collection('users').doc(uid);
  await userRef.set({
    uid,
    name,
    email,
    role: 'user',
    createdAt: now,
    lastLogin: now,
    phone: phone || null,
  }, { merge: true });
}

async function fetchUserDocument(uid: string): Promise<VerifiedUser | null> {
  const userDoc = await adminDb.collection('users').doc(uid).get();
  if (!userDoc.exists) return null;
  const data = userDoc.data();
  return {
    uid: data!.uid,
    email: data!.email,
    name: data!.name,
    role: data!.role,
    createdAt: data!.createdAt.toDate(),
    lastLogin: data!.lastLogin.toDate(),
  };
}

export async function verifyUser(request: NextRequest): Promise<VerifiedUser | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  const decoded = await verifyJwt(token);
  if (!decoded?.uid || !decoded?.email) return null;

  const uid = decoded.uid;
  const email = decoded.email;
  const name = decoded.name || decoded.email;

  const existingUser = await fetchUserDocument(uid);
  if (!existingUser) {
    await createUserDocument(uid, email, name, decoded.phone_number || undefined);
    return {
      uid,
      email,
      name,
      role: 'user',
      createdAt: new Date(),
      lastLogin: new Date(),
    };
  }

  await adminDb.collection('users').doc(uid).update({
    lastLogin: new Date(),
  });

  return existingUser;
}

export async function verifyUserToken(token: string): Promise<VerifiedUser | null> {
  if (!token) return null;

  try {
    const decoded = await verifyJwt(token);
    if (!decoded?.uid || !decoded?.email) return null;

    const existingUser = await fetchUserDocument(decoded.uid);
    if (!existingUser) {
      await createUserDocument(decoded.uid, decoded.email, decoded.name || decoded.email, decoded.phone_number || undefined);
      return {
        uid: decoded.uid,
        email: decoded.email,
        name: decoded.name || decoded.email,
        role: 'user',
        createdAt: new Date(),
        lastLogin: new Date(),
      };
    }

    await adminDb.collection('users').doc(decoded.uid).update({
      lastLogin: new Date(),
    });

    return existingUser;
  } catch (error) {
    return null;
  }
}

export const sessionCookieName = SESSION_COOKIE_NAME;
