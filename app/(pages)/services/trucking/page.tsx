'use client';

import { FiArrowRight, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TruckingServicesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Trucking Services</h1>
          <p className="text-xl text-gray-100">
            Complete compliance and tax solutions for the trucking industry
          </p>
        </div>
      </motion.section>

      {/* Trucking Service Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {truckingServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="space-y-3 mb-8">
                  {service.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <FiCheck className="text-accent-500 font-bold flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/start-service?type=trucking"
                    className="flex-1 text-center bg-primary-700 text-white py-2 rounded hover:bg-primary-800 transition font-semibold flex items-center justify-center gap-2"
                  >
                    Get Started <FiArrowRight />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 text-center border-2 border-primary-700 text-primary-700 py-2 rounded hover:bg-primary-50 transition font-semibold"
                  >
                    Consult
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Important Deadlines */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Important Deadlines</h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {deadlines.map((deadline, index) => (
              <motion.div key={index} variants={itemVariants} className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-900 mb-2">{deadline.name}</h3>
                <p className="text-2xl font-bold text-red-600 mb-2">{deadline.date}</p>
                <p className="text-gray-700 text-sm">{deadline.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="py-20 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our Trucking Services?</h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants} className="flex gap-4">
                <div className="text-3xl text-accent-500 flex-shrink-0">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-20 bg-primary-700 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Our experts can help with all your trucking compliance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/start-service?type=trucking"
              className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded font-semibold transition"
            >
              Start Service
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 rounded font-semibold transition"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

const truckingServices = [
  {
    icon: '🏢',
    title: 'New Trucking Company Setup',
    description: 'Complete support for starting your trucking business',
    items: [
      'LLC Registration',
      'EIN Registration',
      'DOT Number Registration',
      'MC Authority Registration',
      'BOC-3 Filing',
    ],
  },
  {
    icon: '🛣️',
    title: 'IFTA Services',
    description: 'International Fuel Tax Agreement compliance',
    items: [
      'IFTA License Registration',
      'Quarterly Tax Filing',
      'IFTA Renewal',
      'Audit Support',
      'Mileage Tracking',
    ],
  },
  {
    icon: '📋',
    title: 'IRP Services',
    description: 'International Registration Plan assistance',
    items: [
      'IRP Registration',
      'Apportioned Plates',
      'Mileage Reporting',
      'IRP Renewal',
      'Fleet Management',
    ],
  },
  {
    icon: '💰',
    title: 'Trucking Tax Services',
    description: 'Tax solutions for trucking businesses',
    items: [
      'Form 2290 Heavy Vehicle Tax',
      'Owner Operator Tax Filing',
      'Trucking Bookkeeping',
      'Deduction Optimization',
      'Tax Planning',
    ],
  },
  {
    icon: '✓',
    title: 'Compliance & Permits',
    description: 'Keep your company compliant with regulations',
    items: [
      'UCR Registration',
      'DOT Biennial Update',
      'State Trucking Permits',
      'Compliance Monitoring',
      'Audit Support',
    ],
  },
  {
    icon: '🚛',
    title: 'Ongoing Support',
    description: 'Continuous support for your trucking operations',
    items: [
      'Annual Renewals',
      'Compliance Updates',
      'Document Management',
      'Phone Support',
      'Email Support',
    ],
  },
];

const deadlines = [
  {
    name: 'IFTA Quarterly Filing',
    date: 'Jan 31, Apr 30, Jul 31, Oct 31',
    description: 'Submit quarterly IFTA reports and tax payments',
  },
  {
    name: 'Form 2290 (Heavy Vehicle Tax)',
    date: 'Due by Aug 31',
    description: 'Annual heavy vehicle use tax filing for trucks over 55,000 lbs',
  },
  {
    name: 'IRP Renewal',
    date: 'Varies by state',
    description: 'Annual registration renewal with updated mileage',
  },
  {
    name: 'DOT Biennial Update',
    date: 'Every 2 years',
    description: 'Update company information with FMCSA',
  },
];

const benefits = [
  {
    icon: '✓',
    title: 'Industry Experts',
    description: 'Specialized knowledge of trucking regulations and compliance',
  },
  {
    icon: '✓',
    title: 'Never Miss Deadlines',
    description: 'We track all important dates and remind you in advance',
  },
  {
    icon: '✓',
    title: 'Save Money',
    description: 'Optimize deductions and avoid costly penalties',
  },
  {
    icon: '✓',
    title: 'Peace of Mind',
    description: 'Rest assured your company is fully compliant',
  },
];
