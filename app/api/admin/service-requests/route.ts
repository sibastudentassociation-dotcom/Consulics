import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const snapshot = await adminDb
      .collection('service-requests')
      .orderBy('createdAt', 'desc')
      .get();

    const serviceRequests = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({ serviceRequests });
  } catch (error: any) {
    console.error('Service requests error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: error.status || 500 });
  }
}