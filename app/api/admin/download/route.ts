import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    const { url } = await request.json();

    // Seedha URL return karo — browser khud download karega
    return NextResponse.json({ downloadUrl: url });

  } catch (error: any) {
    console.error('Download error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}