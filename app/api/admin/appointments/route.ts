import { NextRequest, NextResponse } from 'next/server';
import { AppointmentService } from '@/lib/services/appointments';

export async function GET() {
  try {
    const appointments = await AppointmentService.getAppointments();
    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
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
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}
