import Link from 'next/link';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function AppointmentSuccessPage() {
  return (
    <div className="min-h-screen bg-neutral">
      <section className="bg-primary-600 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-3 mb-6 text-sm uppercase tracking-[0.28em] text-white/80">
            Appointment Confirmed
          </div>
          <div className="rounded-[2rem] bg-white/10 border border-white/20 p-12">
            <FiCheckCircle className="mx-auto mb-6 h-14 w-14 text-emerald-400" />
            <h1 className="text-4xl font-bold mb-4">Thank you — your appointment request is on the way.</h1>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-8">
              We received your request and will confirm your appointment by email soon. If you need to change anything, please contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-primary-700 font-semibold transition hover:bg-gray-100"
              >
                Return Home <FiArrowRight />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-8 py-4 text-white font-semibold transition hover:bg-white/10"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
