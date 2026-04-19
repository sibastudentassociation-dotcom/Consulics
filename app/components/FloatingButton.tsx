'use client';

import Link from 'next/link';
import { FiExternalLink, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function FloatingButton() {
  return (
    <>
      {/* HVUT 2290 Button - Top Left */}
      <motion.div
        className="fixed top-24 left-8 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/hvut-2290"
          className="flex items-center justify-center gap-2 bg-[#123B77] hover:bg-[#0d2a57] text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold group"
        >
          <span>File HVUT 2290</span>
          <FiExternalLink className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Appointment Button - Bottom Right */}
      <motion.div
        className="fixed bottom-6 left-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/appointment"
          className="flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-5 py-4 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
        >
          <FiCalendar size={18} />
          Book Appointment
        </Link>
      </motion.div>
    </>
  );
}
