'use client';

import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Industry {
  title: string;
  description: string;
  icon: string;
  services: string[];
  link: string;
}

const industries: Industry[] = [
  {
    title: 'Salaried Employees',
    description: 'Simple and straightforward tax filing for W-2 income earners',
    icon: '👔',
    services: ['W-2 Tax Filing', 'Tax Planning', 'Amended Returns'],
    link: '/services/tax/individual',
  },
  {
    title: 'Taxi & Cab Drivers',
    description: 'Specialized tax services for taxi drivers and fleet operators',
    icon: '🚕',
    services: ['Vehicle Expense Tracking', 'Self-Employment Taxes', 'Deductions Optimization'],
    link: '/services/tax/drivers',
  },
  {
    title: 'Ride-Share Drivers',
    description: 'Complete tax solutions for Uber, Lyft, and other ride-sharing drivers',
    icon: '🚗',
    services: ['1099 Tax Filing', 'Mileage Tracking', 'Expense Management'],
    link: '/services/tax/rideshare',
  },
  {
    title: 'Owner Operator Drivers',
    description: 'Comprehensive tax and compliance services for independent truckers',
    icon: '🚛',
    services: ['IFTA Filing', 'IRP Registration', 'Heavy Vehicle Tax (Form 2290)'],
    link: '/services/trucking/owner-operator',
  },
  {
    title: 'Trucking Companies',
    description: 'Full suite of compliance and tax services for trucking businesses',
    icon: '🏢',
    services: ['DOT Compliance', 'UCR Registration', 'IFTA Fleet Management'],
    link: '/services/trucking/company',
  },
  {
    title: 'Small Business Owners',
    description: 'All-in-one tax and business services for growing companies',
    icon: '💼',
    services: ['Business Tax Returns', 'Bookkeeping', 'Payroll Services'],
    link: '/services/tax/business',
  },
];

export default function IndustriesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-[#123B77] text-white">
      {/* Header */}
      <motion.section
        className="bg-primary-700 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Industries We Serve</h1>
          <p className="text-xl text-gray-100">Specialized solutions for your industry</p>
        </div>
      </motion.section>

      {/* Industries Grid */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
              >
                <div className="bg-gradient-to-br from-primary-700 to-primary-900 px-6 py-12 text-center">
                  <div className="text-6xl mb-4">{industry.icon}</div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{industry.title}</h3>
                  <p className="text-gray-600 mb-6">{industry.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Services:</h4>
                    <ul className="space-y-2">
                      {industry.services.map((service, i) => (
                        <li key={i} className="text-gray-600 text-sm flex items-start">
                          <span className="text-accent-500 mr-2">✓</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={industry.link}
                    className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-900 transition"
                  >
                    Learn More <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-black text-center mb-16">What Our Clients Say</h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants} className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-primary-700 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Find Your Solutions</h2>
          <p className="text-xl text-gray-100 mb-8">
            Whether you're an individual, small business owner, or trucking company, we have the right solution for you.
          </p>
          <Link
            href="/start-service"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded font-semibold transition"
          >
            Get Started Today
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

const testimonials = [
  {
    text: 'Consulics saved me hours on tax preparation. The process was seamless and the support team was incredibly helpful!',
    author: 'John Smith',
    role: 'Uber Driver',
  },
  {
    text: 'As a trucking company owner, I appreciate the comprehensive compliance support. They handle everything so I can focus on business.',
    author: 'Maria Garcia',
    role: 'Trucking Company Owner',
  },
  {
    text: 'The tax deductions and planning advice helped me save thousands. Highly recommended for any freelancer!',
    author: 'David Chen',
    role: 'Freelance Consultant',
  },
];
