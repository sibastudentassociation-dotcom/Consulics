'use client';

import { FiArrowRight, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ServiceCard from '@/app/components/ServiceCard';

export default function TaxServicesPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by checking localStorage token
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  const handleFileNow = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (loading) return;
    
    if (!isLoggedIn) {
      // Store the intended destination
      sessionStorage.setItem('redirectAfterLogin', '/start-service?type=tax');
      router.push('/login');
    } else {
      router.push('/start-service?type=tax');
    }
  };

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

      {/* Find the Right Tax Filing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#040C33] mb-4">
              Find the Right Tax Filing for You:
            </h2>
            <p className="text-xl text-gray-600">
              Simplify Your Tax Journey Today!
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {simpleTaxServices.map((service, index) => {
              let buttonText = 'Questions?';
              if (service.title === 'Individual Tax') buttonText = 'Start Filing Now';
              if (service.title === 'Small Business Tax Filing') buttonText = 'Consult our expert';
              if (service.title === 'Self Employed Tax Filing') buttonText = 'Get Help';

              return (
                <motion.div key={index} variants={itemVariants}>
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    showContactButton={true}
                    contactButtonText={buttonText}
                    contactButtonHref="/contact"
                  />
                </motion.div>
              );
            })}
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
          <h2 className="text-4xl font-bold text-gray-600 text-center mb-12">Why Choose Our Tax Services?</h2>

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
          <h2 className="text-4xl font-bold text-center text-gray-600 mb-12">Our Process</h2>

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
          {loading ? (
            <button className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded font-semibold transition opacity-75 cursor-wait">
              Loading...
            </button>
          ) : (
            <button
              onClick={handleFileNow}
              className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded font-semibold transition"
            >
              File Now
            </button>
          )}
        </div>
      </motion.section>
    </div>
  );
}

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

const simpleTaxServices = [
  {
    icon: '👤',
    title: 'Individual Tax',
    description: 'Simplify your individual tax filing by understanding deductions, credits, and exemptions. Maximize your refund and avoid mistakes.',
  },
  {
    icon: '🏢',
    title: 'Small Business Tax Filing',
    description: 'Manage your small business taxes with ease by handling deductions, employee taxes, and staying compliant with local and federal rules.',
  },
  {
    icon: '💼',
    title: 'Self Employed Tax Filing',
    description: 'Stay on top of self-employment taxes by tracking income, expenses, and claiming deductions to minimize tax liability.',
  },
];