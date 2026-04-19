'use client';

import Link from 'next/link';
import Script from 'next/script';
import { FiArrowRight, FiTruck, FiFileText, FiFolder } from 'react-icons/fi';

const serviceCards = [
  {
    title: 'Tax Filing',
    description: 'Simple filing for W-2, 1099, and business taxes.',
    link: '/services/tax',
    icon: <FiFileText size={24} className="text-orange-500" />,
  },
  {
    title: 'Trucking Compliance',
    description: 'IFTA, IRP, Form 2290, permits and renewals.',
    link: '/services/trucking',
    icon: <FiTruck size={24} className="text-orange-500" />,
  },
  {
    title: 'Client Portal',
    description: 'Secure documents, payments and real-time status.',
    link: '/portal',
    icon: <FiFolder size={24} className="text-orange-500" />,
  },
];

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-[#123B77] text-white">
      <Script id="ld-json" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'CONSULICS',
          url: 'https://consulics.com',
          logo: 'https://consulics.com/logo/1.png',
          description: 'CONSULICS is a USA-based tax and trucking compliance platform offering tax filing, trucking registration, IFTA/IRP services, and secure client portals.',
          telephone: '(555) 123-4567',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Main Street',
            addressLocality: 'New York',
            addressRegion: 'NY',
            postalCode: '10001',
            addressCountry: 'US',
          },
          sameAs: ['https://www.facebook.com/consulics', 'https://www.linkedin.com/company/consulics'],
        })}
      </Script>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(248,113,20,0.24),_transparent_40%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,_rgba(18,59,119,0.96),_transparent_70%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            {/* <p className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-orange-300">
              U.S. tax + trucking support
            </p> */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                US Taxation and Motor Carrier Compliance services
              </h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Seamless, Trusted Compliance Solutions for Trucking and Taxation Nationwide.
              </p>
              <p className="max-w-2xl text-lg text-slate-300">
              Comprehensive Tax and Compliance Solutions Powered by Industry Leaders Ensuring Secure, Client Focused Service with Unparalleled Expertise and Precision              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
               <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-white font-semibold transition hover:bg-white/20"
              >
                Book Appointment
              </Link>
              
              <Link
                href="/start-service"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-white font-semibold shadow-lg shadow-orange-500/30 transition hover:bg-orange-600"
              >
                Start a Service <FiArrowRight />
              </Link>
              <Link
                href="/services/tax"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-400/50 bg-orange-500/10 px-8 py-4 text-orange-200 font-semibold transition hover:bg-orange-500/20"
              >
                View Tax Services
              </Link>
             
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200">
                <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Fast setup</p>
                <p className="mt-2 font-semibold">Service in 24-48 hours</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200">
                <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Transparent pricing</p>
                <p className="mt-2 font-semibold">No surprise fees</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200">
                <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Secure portal</p>
                <p className="mt-2 font-semibold">Upload docs safely</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-orange-400/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
            <div className="rounded-[1.75rem] bg-primary-800 p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-orange-300">Focused services</p>
              <h2 className="mt-4 text-3xl font-bold text-white">Use the pages below to find the right service.</h2>
              <p className="mt-4 text-slate-300">
                Dedicated pages keep the details organized so you can move quickly to the service you need.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {serviceCards.map((service) => (
                <Link
                  key={service.title}
                  href={service.link}
                  className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-orange-500/40 hover:bg-orange-500/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                    <p className="text-slate-300">{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950/80 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Why CONSULICS</p>
          <h2 className="mt-4 text-3xl font-bold text-white"> Efficient and Direct Service Access
</h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
Experience a streamlined entry with quick access to services. For detailed information, explore our dedicated pages through intuitive navigation.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.24em] text-orange-300">1</p>
              <h3 className="mt-3 text-xl font-semibold text-white">Efficient and Direct Service Access</h3>
              <p className="mt-2 text-slate-300">Experience a streamlined entry with quick access to services. For detailed information, explore our dedicated pages through intuitive navigation.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.24em] text-orange-300">2</p>
              <h3 className="mt-3 text-xl font-semibold text-white">Clear Service Pathways</h3>
              <p className="mt-2 text-slate-300">The homepage is now a quick start point with visual service access and minimal distraction.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.24em] text-orange-300">3</p>
              <h3 className="mt-3 text-xl font-semibold text-white">Secure Client Service</h3>
              <p className="mt-2 text-slate-300">Comprehensive tax and compliance solutions powered by industry leaders ensuring secure, client-focused service.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 rounded-[2rem] border border-orange-400/10 bg-orange-500/5 p-10 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Ready to start?</p>
          <h2 className="mt-4 text-3xl font-bold text-white">Initiate Your Journey with Confidence</h2>
          <p className="mt-4 text-slate-200 max-w-3xl mx-auto">
            Proceed to the relevant U.S. service page for expert tax and compliance solutions tailored to your needs.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
            <Link
              href="/services/tax"
              className="rounded-full bg-orange-500 px-8 py-4 text-white font-semibold transition hover:bg-orange-600"
            >
              Tax Services
            </Link>
            <Link
              href="/services/trucking"
              className="rounded-full border border-orange-400/70 bg-transparent px-8 py-4 text-orange-100 font-semibold transition hover:bg-orange-500/20"
            >
              Trucking Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
