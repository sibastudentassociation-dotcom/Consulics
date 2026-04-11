import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const snapshot = await adminDb.collection('users').orderBy('createdAt', 'desc').get();
    const users = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: data.uid,
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt?.toDate?.() ?? null,
        lastLogin: data.lastLogin?.toDate?.() ?? null,
      };
    });
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unauthorized' }, { status: error.status || 403 });
  }
}
