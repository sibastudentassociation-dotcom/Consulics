'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  showContactButton?: boolean;
  contactButtonText?: string;
  contactButtonHref?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  showContactButton = true,
  contactButtonText = "Questions?",
  contactButtonHref = "/contact",
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full p-6 flex flex-col">
        {/* Icon */}
        <div className="text-5xl mb-4 flex-shrink-0">{icon}</div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#040C33] mb-3">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 flex-grow">{description}</p>

        {/* Button */}
        {showContactButton && (
          <Link
            href={contactButtonHref}
            className="inline-block w-full text-center bg-[#123B77] hover:bg-[#0A2551] text-white py-2.5 px-4 rounded-lg font-semibold transition duration-300"
          >
            {contactButtonText}
          </Link>
        )}
      </div>
    </motion.div>
  );
}