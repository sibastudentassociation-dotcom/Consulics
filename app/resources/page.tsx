'use client';

import { FiClock, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Complete Guide to Tax Deductions for Self-Employed',
    excerpt: 'Learn about the most important tax deductions available to freelancers and self-employed individuals',
    category: 'Tax Tips',
    date: '2024-04-01',
    readTime: 8,
    author: 'Sarah Johnson',
  },
  {
    id: 2,
    title: 'IFTA Filing Deadlines and Requirements 2024',
    excerpt: 'Everything you need to know about IFTA registration, quarterly filings, and compliance',
    category: 'Trucking',
    date: '2024-03-28',
    readTime: 6,
    author: 'Michael Chen',
  },
  {
    id: 3,
    title: 'IRP vs IFTA: Understanding the Difference',
    excerpt: 'A comprehensive guide to understanding IRP registration and how it differs from IFTA',
    category: 'Trucking',
    date: '2024-03-25',
    readTime: 7,
    author: 'David Thompson',
  },
  {
    id: 4,
    title: 'Estimated Tax Payments: What You Need to Know',
    excerpt: 'Guide to calculating and making estimated quarterly tax payments',
    category: 'Tax Tips',
    date: '2024-03-20',
    readTime: 5,
    author: 'Amanda Rodriguez',
  },
  {
    id: 5,
    title: 'Setting Up an LLC: Tax Implications and Benefits',
    excerpt: 'Understanding the tax benefits of forming an LLC for your business',
    category: 'Business',
    date: '2024-03-15',
    readTime: 9,
    author: 'Sarah Johnson',
  },
  {
    id: 6,
    title: 'Uber/Rideshare Driver Taxes Explained',
    excerpt: 'A complete breakdown of what Uber and Lyft drivers need to know about taxes',
    category: 'Tax Tips',
    date: '2024-03-10',
    readTime: 6,
    author: 'Michael Chen',
  },
];

const guides = [
  {
    title: 'Tax Filing Guide',
    description: 'Everything you need to know about filing your taxes',
    link: '#',
  },
  {
    title: 'IFTA Filing Deadlines',
    description: 'Key dates and deadlines for IFTA quarterly filings',
    link: '#',
  },
  {
    title: 'Trucking Compliance Guide',
    description: 'Complete compliance checklist for trucking companies',
    link: '#',
  },
  {
    title: 'Deductions Checklist',
    description: 'Download our comprehensive tax deductions checklist',
    link: '#',
  },
];

export default function ResourcesPage() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.section
        className="bg-primary-700 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Resources & Blog</h1>
          <p className="text-xl text-gray-100">Expert guides, tips, and insights for your tax and business needs</p>
        </div>
      </motion.section>

      {/* Guides Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Download Our Guides</h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {guides.map((guide, index) => (
              <motion.a
                key={index}
                href={guide.link}
                variants={itemVariants}
                className="bg-gray-50 hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-500 rounded-lg p-6 transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-sm text-gray-600">{guide.description}</p>
                </div>
                <div className="mt-4 flex items-center text-primary-700 font-semibold">
                  Download <FiArrowRight className="ml-2" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Posts */}
      <motion.section
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Latest Articles</h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="bg-gradient-to-br from-primary-700 to-primary-900 h-40"></div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-accent-500 bg-accent-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <FiClock size={14} /> {post.readTime} min read
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 hover:text-primary-700 transition cursor-pointer">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>

                  <div className="flex justify-between items-center">
                    <small className="text-gray-500">
                      By {post.author} on {new Date(post.date).toLocaleDateString()}
                    </small>
                    <Link href="#" className="text-primary-700 font-semibold hover:text-primary-900 flex items-center gap-1">
                      Read <FiArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <button className="bg-primary-700 text-white px-8 py-3 rounded font-semibold hover:bg-primary-800 transition">
              View All Articles
            </button>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="border border-gray-300 rounded-lg p-6 hover:bg-gray-50 cursor-pointer">
                <summary className="font-semibold text-lg text-gray-900">{faq.question}</summary>
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
          <h2 className="text-4xl font-bold mb-6">Still have questions?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Our expert team is ready to help you
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded font-semibold transition"
          >
            Get in Touch
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

const faqs = [
  {
    question: 'How do I file my taxes if I\'m self-employed?',
    answer:
      'Self-employed individuals need to file Schedule C and pay self-employment taxes. We can help you with the entire process, including estimated quarterly payments.',
  },
  {
    question: 'What documents do I need for tax filing?',
    answer:
      'Generally, you\'ll need income documents (W-2s, 1099s), deduction records, and identification. We can provide a comprehensive checklist based on your situation.',
  },
  {
    question: 'What is IFTA and do I need it?',
    answer:
      'IFTA is the International Fuel Tax Agreement used to report fuel tax credits and payments. You need it if you operate trucks in multiple jurisdictions.',
  },
  {
    question: 'How much can I save with tax deductions?',
    answer:
      'Tax savings depend on your situation, but many small business owners save $5,000-$15,000+ annually through proper deduction tracking.',
  },
];
