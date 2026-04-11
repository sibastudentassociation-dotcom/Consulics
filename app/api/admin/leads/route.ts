import { NextRequest, NextResponse } from 'next/server';
import { ContactService } from '@/lib/services/contact';
import { requireAdmin } from '@/lib/require-admin';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const inquiries = await ContactService.getInquiries();
    return NextResponse.json({ inquiries });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch inquiries' }, { status: error.status || 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin(request);
    const body = await request.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 });
    }

    await ContactService.updateInquiryStatus(id, status);
    return NextResponse.json({ message: 'Inquiry status updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to update inquiry status' }, { status: error.status || 500 });
  }
}
