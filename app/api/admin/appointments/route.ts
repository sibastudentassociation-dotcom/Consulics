import { NextRequest, NextResponse } from 'next/server';
import { AppointmentService } from '@/lib/services/appointments';
import { requireAdmin } from '@/lib/require-admin';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const appointments = await AppointmentService.getAppointments();
    return NextResponse.json({ appointments });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch appointments' }, { status: error.status || 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin(request);
    const body = await request.json();
    const { id, status, appointmentDate, appointmentTime } = body;

    if (!id) {
      return NextResponse.json({ error: 'Appointment ID is required' }, { status: 400 });
    }

    const update: Record<string, string> = {};
    if (status) update.status = status;
    if (appointmentDate) update.appointmentDate = appointmentDate;
    if (appointmentTime) update.appointmentTime = appointmentTime;

    await AppointmentService.updateAppointment(id, update as any);
    return NextResponse.json({ message: 'Appointment updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to update appointment' }, { status: error.status || 500 });
  }
}
