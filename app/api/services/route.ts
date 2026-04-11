import { NextRequest, NextResponse } from 'next/server';
import { ServicesService } from '@/lib/services/services';
import { serviceSchema } from '@/lib/validation/schemas';
import { verifyUser } from '@/lib/verify-token';
import { requireAdmin } from '@/lib/require-admin';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const services = await ServicesService.getAllServices();
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    const body = await request.json();
    const validatedData = serviceSchema.parse(body);

    const service = await ServicesService.createService(validatedData);
    return NextResponse.json({ service });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create service' }, { status: error.status || 500 });
  }
}
