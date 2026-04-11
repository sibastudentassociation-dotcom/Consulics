'use client';

import { FiAward, FiUsers, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AboutPage() {
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
          <h1 className="text-5xl font-bold mb-4">About Consulics</h1>
          <p className="text-xl text-gray-100">We help businesses and individuals with tax and compliance services</p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                We believe that tax and business compliance shouldn't be complicated or stressful. Our mission is to provide
                expert, affordable, and accessible tax and trucking services to individuals and businesses of all sizes.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and customer-friendly tax and compliance service provider, helping thousands of
                entrepreneurs and business owners achieve their financial goals with confidence and peace of mind.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        className="py-20 bg-primary-700 text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <p className="text-lg text-gray-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Consulics?</h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition"
              >
                <div className="text-4xl text-accent-500 mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Team */}
      <motion.section
        className="py-20 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Our Team</h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="bg-gradient-to-br from-primary-700 to-primary-900 h-48"></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-accent-500 font-semibold text-sm mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        className="py-20 bg-primary-700 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to work with us?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Get in touch with our team today to discuss your needs
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded font-semibold transition"
          >
            Contact Us
          </a>
        </div>
      </motion.section>
    </div>
  );
}

const stats = [
  { number: '5,000+', label: 'Happy Clients' },
  { number: '15+', label: 'Years of Experience' },
  { number: '$100M+', label: 'Tax Filed' },
  { number: '99%', label: 'Satisfaction Rate' },
];

const reasons = [
  {
    icon: <FiAward />,
    title: 'Expert Team',
    description: 'Experienced professionals with decades of combined experience in tax and trucking compliance',
  },
  {
    icon: <FiUsers />,
    title: 'Personalized Service',
    description: 'We take time to understand your unique needs and provide customized solutions',
  },
  {
    icon: <FiTarget />,
    title: 'Affordable Pricing',
    description: 'Transparent, no-hidden-fees pricing that works for businesses of all sizes',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Proven Results',
    description: 'Track record of helping clients save money and stay compliant',
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    title: 'Founder & CEO',
    bio: 'Tax expert with 15+ years of experience',
  },
  {
    name: 'Michael Chen',
    title: 'Director of Trucking Services',
    bio: 'Specialized in IFTA, IRP, and DOT compliance',
  },
  {
    name: 'Amanda Rodriguez',
    title: 'Lead Tax Specialist',
    bio: 'CPA with expertise in business taxation',
  },
  {
    name: 'David Thompson',
    title: 'Customer Success Manager',
    bio: 'Dedicated to ensuring client satisfaction',
  },
];
