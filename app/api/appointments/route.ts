import { NextRequest, NextResponse } from 'next/server';
import { AppointmentService } from '@/lib/services/appointments';
import { appointmentSchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    const appointments = date
      ? await AppointmentService.getAppointmentsByDate(date)
      : await AppointmentService.getAppointments();

    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = appointmentSchema.parse(body);
    const appointment = await AppointmentService.createAppointment(validatedData);

    return NextResponse.json({
      message: 'Appointment booked successfully',
      appointment: {
        id: appointment.id,
        status: appointment.status,
        createdAt: appointment.createdAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to submit appointment' }, { status: 500 });
  }
}
