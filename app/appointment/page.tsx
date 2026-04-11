'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiCalendar, FiClock, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AppointmentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  notes?: string;
}

interface AppointmentAvailability {
  appointmentTime: string;
}

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

const serviceOptions = [
  { value: 'tax', label: 'Tax Services' },
  { value: 'trucking', label: 'Trucking Services' },
  { value: 'consultation', label: 'Consultation' },
];

export default function AppointmentPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AppointmentFormData>({
    defaultValues: {
      appointmentDate: selectedDate,
      appointmentTime: timeSlots[0],
      serviceType: 'tax',
    },
  });

  useEffect(() => {
    fetch(`/api/appointments?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        const booked = (data.appointments || []).map((appointment: AppointmentAvailability) => appointment.appointmentTime);
        setBookedSlots(booked);
      })
      .catch(() => {
        setBookedSlots([]);
      });
  }, [selectedDate]);

  const availableSlots = useMemo(
    () => timeSlots.filter((slot) => !bookedSlots.includes(slot)),
    [bookedSlots]
  );

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Unable to book appointment');
      }

      toast.success('Appointment request submitted. You will receive confirmation soon.');
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        appointmentDate: selectedDate,
        appointmentTime: availableSlots[0] ?? '',
        serviceType: 'tax',
        notes: '',
      });
      router.push('/appointment/success');
    } catch (error) {
      toast.error('Unable to submit appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral">
      <Toaster position="top-right" />

      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto">
            Schedule a focused consultation with our tax and trucking specialists. Choose your date, time, and service type.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">First Name</label>
                    <Input
                      autoComplete="given-name"
                      {...register('firstName', { required: 'First name is required' })}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Last Name</label>
                    <Input
                      autoComplete="family-name"
                      {...register('lastName', { required: 'Last name is required' })}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Email Address</label>
                    <Input
                      type="email"
                      autoComplete="email"
                      {...register('email', { required: 'Email is required' })}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      autoComplete="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
                  <div className="relative z-10">
                    <label className="block text-sm font-semibold text-dark mb-3">Appointment Date</label>
                    <Input
                      type="date"
                      autoComplete="off"
                      min={new Date().toISOString().split('T')[0]}
                      {...register('appointmentDate', { required: 'Appointment date is required' })}
                      value={selectedDate}
                      onChange={(event) => {
                        setSelectedDate(event.target.value);
                      }}
                      className="w-full bg-white text-dark font-medium"
                    />
                    {errors.appointmentDate && <p className="text-red-600 text-sm mt-2">{errors.appointmentDate.message}</p>}
                  </div>

                  <div className="relative z-30">
                    <label className="block text-sm font-semibold text-dark mb-3">Time Slot</label>
                    <select
                      autoComplete="off"
                      {...register('appointmentTime', { required: 'Appointment time is required' })}
                      className="w-full h-10 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-dark font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select a time slot</option>
                      {availableSlots.length ? (
                        availableSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No slots available for this date
                        </option>
                      )}
                    </select>
                    {errors.appointmentTime && <p className="text-red-600 text-sm mt-2">{errors.appointmentTime.message}</p>}
                  </div>

                  <div className="relative z-20">
                    <label className="block text-sm font-semibold text-dark mb-3">Service Type</label>
                    <select
                      autoComplete="off"
                      {...register('serviceType', { required: 'Service type is required' })}
                      className="w-full h-10 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-dark font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && <p className="text-red-600 text-sm mt-2">{errors.serviceType.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Notes / Additional Information</label>
                  <Textarea
                    autoComplete="off"
                    {...register('notes')}
                    placeholder="Share any special instructions or questions."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Booking...' : 'Book Appointment'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Book With Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-center gap-2"><FiCheckCircle className="text-primary-500" />Fast scheduling and clear timelines</p>
                  <p className="flex items-center gap-2"><FiCheckCircle className="text-primary-500" />Dedicated support for tax and trucking compliance</p>
                  <p className="flex items-center gap-2"><FiCheckCircle className="text-primary-500" />Automated confirmation and admin alerts</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Slots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableSlots.length ? (
                    availableSlots.map((slot) => (
                      <div key={slot} className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-dark">
                        <div className="flex items-center justify-between">
                          <span>{slot}</span>
                          <span className="text-sm text-primary-600">Available</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                      No open slots are available for the selected date. Please choose another day.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Step</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">After you submit your appointment request, our team will confirm the booking by email and notify you of any follow-up details.</p>
                <p className="mt-4 text-sm text-gray-500">Want a faster answer? Use our chat widget or contact us directly at info@consulics.com.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
