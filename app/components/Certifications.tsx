"use client";

import React from 'react';
import certificationsData from '../data/certifications.json';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  badgeUrl: string;
  credentialUrl: string;
  skills: string[];
}

const CertificationCard: React.FC<{ certification: Certification; index: number }> = ({ certification, index }) => {
  // Format dates to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-[#111827] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row border border-gray-200 dark:border-gray-800"
    >
      {/* Badge section */}
      <div className="w-full sm:w-1/4 flex items-center justify-center p-6 bg-gray-50 dark:bg-[#030712]">
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <img
            src={certification.badgeUrl}
            alt={`${certification.title} badge`}
            className="w-32 h-32 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/50 rounded-full p-2">
              <FiExternalLink className="text-white text-xl" />
            </div>
          </div>
        </a>
      </div>

      {/* Details section */}
      <div className="p-6 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {certification.title}
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
          {certification.issuer}
        </p>

        <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          {formatDate(certification.issueDate)} - {certification.expiryDate ? formatDate(certification.expiryDate) : 'No Expiration'}
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {certification.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>

        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          Verify Credential <FiExternalLink className="ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

const Certifications: React.FC = () => {
  return (
    <div className="w-full my-20 py-16">
      <h2 className="text-3xl md:text-4xl mt-20 font-bold mb-8 text-center text-gray-900 dark:text-white">
        Professional Certifications
      </h2>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
        Industry recognized certifications that validate my expertise and technical knowledge
      </p>

      <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto px-4">
        {certificationsData.map((certification, index) => (
          <CertificationCard
            key={certification.id}
            certification={certification as Certification}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Certifications;