'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success('Message sent! We\'ll contact you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

      {/* Header */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Contact Us</h1>
          <p className="text-xl text-gray-100 animate-slide-up">Get in touch with our team</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardContent className="text-center p-8">
                <div className="text-4xl text-primary-500 mb-4 flex justify-center">
                  <FiPhone />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-600 mb-4">(555) 123-4567</p>
                <p className="text-sm text-gray-500">Available Mon-Fri 9am-6pm EST</p>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardContent className="text-center p-8">
                <div className="text-4xl text-primary-500 mb-4 flex justify-center">
                  <FiMail />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600 mb-4">info@consulics.com</p>
                <p className="text-sm text-gray-500">We respond within 24 hours</p>
              </CardContent>
            </Card>

            {/* Address */}
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardContent className="text-center p-8">
                <div className="text-4xl text-primary-500 mb-4 flex justify-center">
                  <FiMapPin />
                </div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-gray-600 mb-4">123 Business St, Suite 100<br />New York, NY 10001</p>
                <p className="text-sm text-gray-500">Visit us by appointment</p>
              </CardContent>
            </Card>
          </div>

          {/* Form and Schedule Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
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

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Email</label>
                    <Input
                      type="email"
                      autoComplete="email"
                      {...register('email', { required: 'Email is required' })}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Phone</label>
                    <Input
                      type="tel"
                      autoComplete="tel"
                      {...register('phone', { required: 'Phone is required' })}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Service</label>
                    <select
                      autoComplete="off"
                      {...register('service', { required: 'Please select a service' })}
                      className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      <option value="">Select a service</option>
                      <option value="tax">Tax Services</option>
                      <option value="trucking">Trucking Services</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                    {errors.service && <p className="text-red-600 text-sm mt-1">{errors.service.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Message</label>
                    <Textarea
                      autoComplete="off"
                      {...register('message', { required: 'Message is required' })}
                      placeholder="Tell us about your needs..."
                      rows={4}
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Schedule Section */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Book a free 30-minute consultation to discuss your tax or trucking needs.
                </p>
                <Link href="/appointment" className="block">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
