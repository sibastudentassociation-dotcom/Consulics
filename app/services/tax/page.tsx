'use client';

import { FiArrowRight, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TaxServicesPage() {
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
          <h1 className="text-5xl font-bold mb-4">Tax Services</h1>
          <p className="text-xl text-gray-100">
            Comprehensive tax solutions for individuals and businesses
          </p>
        </div>
      </motion.section>

      {/* Tax Service Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {taxServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-base hover:shadow-medium transition"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-heading">{service.title}</h3>
                <p className="text-body mb-6">{service.description}</p>

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
                    href="/start-service?type=tax"
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

      {/* Why Choose Our Tax Services */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our Tax Services?</h2>

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
                  <h3 className="text-lg font-bold mb-2 text-heading">{benefit.title}</h3>
                  <p className="text-body text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Process */}
      <motion.section
        className="py-20 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Process</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-heading mb-2">{step.title}</h3>
                  <p className="text-sm text-body">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-primary-200"></div>
                )}
              </div>
            ))}
          </div>
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
          <h2 className="text-4xl font-bold mb-6">Ready to File Your Taxes?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Get started in minutes with our simple online form
          </p>
          <Link
            href="/start-service?type=tax"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded font-semibold transition"
          >
            File Now
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

const taxServices = [
  {
    icon: '👤',
    title: 'Individual Tax Filing',
    description: 'Comprehensive tax filing for employees and individuals',
    items: [
      'W-2 Tax Filing',
      '1099 Contractor Taxes',
      'Small business owner/operator taxes',
      'Uber/Ride-Share Driver Taxes',
      'Amended Tax Returns',
    ],
  },
  {
    icon: '🏢',
    title: 'Business Tax Services',
    description: 'Tax solutions tailored for growing businesses',
    items: [
      'Sole Proprietor Taxes',
      'LLC Tax Filing',
      'Partnership Tax Returns',
      'Business Tax Planning',
      'Bookkeeping Services',
    ],
  },
  {
    icon: '💼',
    title: 'Self-Employed Tax Services',
    description: 'We understand the unique needs of freelancers',
    items: [
      'Freelancer Taxes',
      'Independent Contractor Taxes',
      'Estimated Quarterly Taxes',
      'Deduction Optimization',
      'Tax Planning',
    ],
  },
  {
    icon: '🔧',
    title: 'Additional Tax Services',
    description: 'Expert assistance for complex tax situations',
    items: [
      'IRS Audit Assistance',
      'Tax Planning & Strategy',
      'ITIN Application',
      'Tax Consultation',
      'Amended Returns',
    ],
  },
];

const benefits = [
  {
    icon: '✓',
    title: 'Expert CPAs',
    description: 'Certified public accountants with years of experience',
  },
  {
    icon: '✓',
    title: 'Maximum Deductions',
    description: 'We ensure you get every deduction you\'re entitled to',
  },
  {
    icon: '✓',
    title: 'IRS Compliant',
    description: 'All filings meet federal and state requirements',
  },
  {
    icon: '✓',
    title: 'Audit Support',
    description: 'We support you if the IRS has questions',
  },
  {
    icon: '✓',
    title: 'Confidential',
    description: 'Your information is secure and protected',
  },
  {
    icon: '✓',
    title: 'Fast Turnaround',
    description: 'Quick processing without compromising quality',
  },
];

const process = [
  {
    title: 'Submit Documents',
    description: 'Upload your tax documents securely',
  },
  {
    title: 'Review',
    description: 'We review everything in detail',
  },
  {
    title: 'Prepare',
    description: 'Our experts prepare your return',
  },
  {
    title: 'File',
    description: 'E-file with IRS and receive confirmation',
  },
];
