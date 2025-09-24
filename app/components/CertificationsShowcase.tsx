"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import certificationsData from '../data/certifications.json';
import { FiExternalLink, FiAward, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Tilt from 'react-parallax-tilt';
import './CertificationsShowcase.css';

// Ensure GSAP plugins are registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define the certification interface
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

// Shimmer effect component
const Shimmer: React.FC = () => (
  <div className="absolute inset-0 w-full h-full">
    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shimmer" />
  </div>
);

// Certificate card with brief content
const CertificateCard: React.FC<{ certification: Certification; isActive: boolean }> = ({
  certification,
  isActive
}) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-lg shadow-md 
        ${isActive
          ? 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-l-4 border-transparent bg-white dark:bg-gray-800'}
        h-full flex flex-col p-3 ${!isActive ? 'animate-float' : ''}
        hover:bg-gray-100 dark:hover:bg-gray-700/60
      `}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }
      }}
      transition={{
        duration: 0.4,
        backgroundColor: { duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}
    >
      {isActive && <Shimmer />}

      {/* Title and issuer */}
      <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate mb-1">{certification.title}</h3>
      <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">{certification.issuer}</p>

      {/* Issue date */}
      <div className="flex items-center mt-auto text-xs text-gray-500 dark:text-gray-400">
        <FiCalendar size={10} className="mr-1" />
        <span>{formatDate(certification.issueDate)}</span>
      </div>
    </motion.div>
  );
};

// Certificate details component
const CertificateDetails: React.FC<{ certification: Certification }> = ({ certification }) => {
  // Format dates to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{
        duration: 0.5,
        ease: [0.19, 1.0, 0.22, 1.0], // Smooth ease-out cubic bezier
        opacity: { duration: 0.25 }  // Fade out faster than other properties
      }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl h-full border border-gray-200 dark:border-gray-700"
    >
      {/* Background gradient with animation */}
      <motion.div
        className="h-12 sm:h-16"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(to right, rgb(37, 99, 235), rgb(79, 70, 229))"
        }}
      ></motion.div>

      <div className="p-3 sm:p-5 relative">
        {/* Badge image overlapping the gradient with smooth animation */}
        <motion.div
          className="absolute -top-8 sm:-top-10 left-3 sm:left-5 bg-white dark:bg-gray-800 p-1.5 sm:p-2 rounded-lg shadow-lg badge-shine"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.4,
            ease: [0.19, 1.0, 0.22, 1.0]
          }}
        >
          <motion.img
            src={certification.badgeUrl}
            alt={certification.title}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            initial={{ scale: 0.9, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Title and details with proper spacing for the badge */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2">{certification.title}</h2>
          <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mb-2 sm:mb-3">{certification.issuer}</p>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                <FiCalendar className="text-blue-600 dark:text-blue-400" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Issued</p>
                <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {formatDate(certification.issueDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                <FiAward className="text-purple-600 dark:text-purple-400" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Credential ID</p>
                <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {certification.id}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {certification.skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: idx * 0.05,
                    duration: 0.3,
                    ease: [0.19, 1.0, 0.22, 1.0]
                  }}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-xs font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main CertificationsShowcase component
const CertificationsShowcase: React.FC = () => {
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // No theme detection needed as we're using Tailwind dark mode classes

  // Previous and next controls
  const handlePrevious = () => {
    setSelectedCertIndex((prev) =>
      prev === 0 ? certificationsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedCertIndex((prev) =>
      prev === certificationsData.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // GSAP animation setup
  useEffect(() => {
    if (!showcaseRef.current || typeof window === 'undefined') return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: showcaseRef.current,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none none"
      }
    });

    // Animate the heading with a split text effect if headingRef exists
    if (headingRef.current) {
      const text = headingRef.current;

      gsap.from(text, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={showcaseRef}
      className="w-full py-12 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 lg:max-w-5xl">
        {/* Heading with animated underline */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              ref={headingRef}
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
            >
              Professional Certifications
            </h2>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Industry recognized certifications validating my expertise
            </p>
          </motion.div>
        </div>

        {/* Mobile selector - Horizontal scrollable thumbnails */}
        <div className="lg:hidden mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Select certificate:</h3>
            <div className="flex space-x-2">
              <motion.button
                onClick={handlePrevious}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 flex items-center"
                aria-label="Previous certificate"
              >
                <FiChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 flex items-center"
                aria-label="Next certificate"
              >
                <FiChevronRight size={16} />
              </motion.button>
            </div>
          </div>

          {/* Thumbnail indicators */}
          <div className="flex justify-center space-x-1 mb-4">
            {certificationsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedCertIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedCertIndex
                  ? 'bg-blue-500 w-4'
                  : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                aria-label={`Select certificate ${index + 1}`}
              />
            ))}
          </div>

          {/* Current certification display */}
          <div className="px-2">
            <AnimatePresence mode="wait" initial={false}>
              <CertificateDetails
                key={certificationsData[selectedCertIndex].id}
                certification={certificationsData[selectedCertIndex]}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop layout - Grid with list and details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:grid lg:grid-cols-4 lg:gap-6"
        >
          {/* Certificate list - Desktop only */}
          <div className="col-span-1">
            <div className="relative">
              <div className="flex flex-col gap-2 mb-2 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
                {certificationsData.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedCertIndex(index)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CertificateCard
                      certification={cert}
                      isActive={index === selectedCertIndex}
                    />
                  </motion.div>
                ))}
              </div>
              {/* Navigation controls */}
              <div className="flex justify-between mt-3">
                <motion.button
                  onClick={handlePrevious}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors flex items-center text-xs"
                  aria-label="Previous certificate"
                >
                  <FiChevronLeft size={14} className="mr-1" /> Previous
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors flex items-center text-xs"
                  aria-label="Next certificate"
                >
                  Next <FiChevronRight size={14} className="ml-1" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Certificate details - Desktop */}
          <div className="col-span-3 h-full relative">
            <AnimatePresence mode="wait" initial={false}>
              <Tilt
                key={certificationsData[selectedCertIndex].id}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={300}
                tiltEnable={true}
                glareEnable={false}
                transitionEasing="cubic-bezier(.03,.98,.52,.99)"
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full"
              >
                <CertificateDetails
                  key={certificationsData[selectedCertIndex].id}
                  certification={certificationsData[selectedCertIndex]}
                />
              </Tilt>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CertificationsShowcase;