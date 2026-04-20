import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const snapshot = await adminDb
      .collection('invoices')
      .orderBy('createdAt', 'desc')
      .get();

    const invoices = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({ invoices });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    const { clientEmail, description, amount, dueDate } = await request.json();

    const invoice = {
      clientEmail,
      description,
      amount: Number(amount),
      dueDate,
      status: 'pending',
      createdAt: new Date(),
    };

    const ref = await adminDb.collection('invoices').add(invoice);

    return NextResponse.json({ id: ref.id, ...invoice });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}