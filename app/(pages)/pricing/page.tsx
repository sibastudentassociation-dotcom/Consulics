'use client';

import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface PricingTier {
  name: string;
  description: string;
  price: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Individual Tax',
    description: 'For individuals and freelancers',
    price: 149,
    features: [
      'W-2 Tax Filing',
      '1099 Contractor Taxes',
      'Personal Deductions',
      'IRS Audit Support',
      'Email Support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Self-Employed Pro',
    description: 'For small business owners',
    price: 299,
    features: [
      'All Individual features',
      'Business Tax Returns',
      'Estimated Payments',
      'Tax Planning',
      'Priority Support',
      'Quarterly Reviews',
    ],
    highlighted: true,
    cta: 'Get Started',
  },
  {
    name: 'Business Plus',
    description: 'For growing businesses',
    price: 499,
    features: [
      'All Pro features',
      'LLC/Partnership Filing',
      'Bookkeeping Services',
      'Payroll Setup',
      'Phone Support',
      'Monthly Consultation',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    description: 'For trucking companies',
    price: 999,
    features: [
      'All Business features',
      'IFTA Registration',
      'IRP Services',
      'DOT Compliance',
      'Custom Solutions',
      'Dedicated Account Manager',
    ],
    cta: 'Contact Sales',
  },
];

export default function PricingPage() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-100">Choose the plan that's right for you</p>
        </div>
      </motion.section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`rounded-lg shadow-lg p-8 transition hover:shadow-xl ${
                  tier.highlighted
                    ? 'bg-primary-700 text-white scale-105 md:scale-110'
                    : 'bg-white text-gray-900'
                }`}
              >
                {tier.highlighted && (
                  <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className={`text-sm mb-6 ${tier.highlighted ? 'text-gray-100' : 'text-gray-600'}`}>
                  {tier.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className={tier.highlighted ? 'text-gray-100' : 'text-gray-600'}>/month</span>
                </div>

                <button
                  className={`w-full py-3 rounded font-semibold mb-8 transition ${
                    tier.highlighted
                      ? 'bg-white text-primary-700 hover:bg-gray-100'
                      : 'bg-primary-700 text-white hover:bg-primary-800'
                  }`}
                >
                  {tier.cta}
                </button>

                <div className="space-y-4">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FiCheck
                        className={`flex-shrink-0 ${
                          tier.highlighted ? 'text-white' : 'text-accent-500'
                        }`}
                      />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="border border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                <summary className="font-semibold text-lg flex justify-between items-center">
                  {faq.question}
                </summary>
                <p className="text-gray-600 mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
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
          <h2 className="text-4xl font-bold mb-6">Not sure which plan is right for you?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Schedule a free consultation with our team to find the perfect solution
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded font-semibold transition"
          >
            Schedule Consultation
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

const faqs = [
  {
    question: 'Can I change my plan anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee if you\'re not satisfied with our services.',
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No, we believe in transparent pricing. The price you see is the price you pay. No hidden fees or surprises.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and bank transfers.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes, we offer 15% discount when you pay annually instead of monthly.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'We offer consultations at no cost. Get in touch to discuss your needs before committing.',
  },
];
