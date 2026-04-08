'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    name: 'Maria Hernandez',
    title: 'Owner Operator Truck Driver',
    quote: 'CONSULICS helped me file Form 2290 and stay compliant with IFTA. Their team is fast, responsive, and professional.',
  },
  {
    name: 'Jason Lee',
    title: 'Small Business Owner',
    quote: 'The tax filing experience was simple, secure, and accurate. I got a strong refund and the support was excellent.',
  },
  {
    name: 'Alicia Brooks',
    title: 'Ride-Share Driver',
    quote: 'Great guidance for 1099 taxes and deductions. The AI chat assistant made it easy to get answers quickly.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#123B77]/80">Customer Success</p>
          <h2 className="mt-3 text-4xl font-bold text-[#0f2540]">Trusted by U.S. businesses and drivers</h2>
        </div>

        <motion.div
          className="grid gap-8 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/60"
            >
              <div className="flex items-center gap-2 mb-4 text-[#123B77]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 mb-6">“{testimonial.quote}”</p>
              <div>
                <p className="font-semibold text-[#0f2540]">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
