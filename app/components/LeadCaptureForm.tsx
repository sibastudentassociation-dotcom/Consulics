'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const serviceOptions = [
  'Individual Tax Filing',
  'Small Business Tax Services',
  'Self-Employed Tax Services',
  'IFTA / IRP Services',
  'Trucking Compliance',
  'Consultation',
];

export default function LeadCaptureForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: serviceOptions[0],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      toast.error('Please complete all required fields.');
      return;
    }

    setSubmitted(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Thanks! Your request is submitted. We will reach out shortly.');
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: serviceOptions[0],
    });
    setSubmitted(false);
  };

  return (
    <section className="bg-[#123B77] py-20 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-white/70">Lead Capture</p>
            <h2 className="mt-3 text-4xl font-bold">Start your request in seconds</h2>
            <p className="mt-4 text-white/80 max-w-2xl">
              Capture high-intent visitors with a focused form built for conversion. Collect the data needed to follow up quickly and start client onboarding.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-2xl shadow-black/20 text-[#123B77]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">First Name</span>
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#123B77] focus:ring-[#123B77]/40"
                    placeholder="First name"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Last Name</span>
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#123B77] focus:ring-[#123B77]/40"
                    placeholder="Last name"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#123B77] focus:ring-[#123B77]/40"
                    placeholder="Email address"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Phone</span>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#123B77] focus:ring-[#123B77]/40"
                    placeholder="Phone number"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Service Interest</span>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#123B77] focus:ring-[#123B77]/40"
                >
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                disabled={submitted}
                className="w-full rounded-full bg-[#123B77] px-6 py-3 text-white font-semibold shadow-lg shadow-[#123B77]/20 transition hover:bg-[#0f2f5f] disabled:opacity-60"
              >
                {submitted ? 'Sending…' : 'Get a Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
