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
          ? 'border-l-4 border-gray-600 dark:border-gray-400 bg-gray-50 dark:bg-gray-700/40'
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
      <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">{certification.issuer}</p>

      {/* Issue date */}
      <div className="flex items-center mt-auto text-xs text-gray-500 dark:text-gray-400">
        <FiCalendar size={10} className="mr-1" />
        <span>{formatDate(certification.issueDate)}</span>
      </div>
    </motion.div>
  );
};

// Responsive Tilt wrapper component
const ResponsiveTilt: React.FC<{
  children: React.ReactNode;
  certificationId: number;
  isMobile?: boolean;
}> = ({ children, certificationId, isMobile = false }) => {
  const tiltSettings = isMobile
    ? {
      tiltMaxAngleX: 4,
      tiltMaxAngleY: 4,
      scale: 1.02,
      transitionSpeed: 250,
      glareMaxOpacity: 0.1,
    }
    : {
      tiltMaxAngleX: 8,
      tiltMaxAngleY: 8,
      scale: 1.05,
      transitionSpeed: 400,
      glareMaxOpacity: 0.2,
    };

  return (
    <Tilt
      key={certificationId}
      tiltMaxAngleX={tiltSettings.tiltMaxAngleX}
      tiltMaxAngleY={tiltSettings.tiltMaxAngleY}
      scale={tiltSettings.scale}
      transitionSpeed={tiltSettings.transitionSpeed}
      tiltEnable={true}
      glareEnable={true}
      glareMaxOpacity={tiltSettings.glareMaxOpacity}
      glareColor="#ffffff"
      glarePosition="bottom"
      glareBorderRadius="12px"
      transitionEasing="cubic-bezier(.03,.98,.52,.99)"
      style={{ transformStyle: "preserve-3d" }}
      className="w-full h-full"
    >
      {children}
    </Tilt>
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
      key={certification.id}
      initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -30, scale: 0.9, rotateX: -10 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // More fluid easing
        opacity: { duration: 0.4 },
        scale: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }, // Bouncy scale
        y: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl h-full border border-gray-200 dark:border-gray-700 cursor-pointer relative group p-6 flex flex-col items-center justify-center text-center"
    >        {/* Certificate Image */}
      <motion.div
        className="mb-6 flex items-center justify-center w-full"
        whileHover={{
          scale: 1.05,
          rotate: 0.5,
          transition: {
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1]
          }
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
          scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
        }}
      >
        <img
          src={certification.badgeUrl}
          alt={certification.title}
          className="w-full max-w-[500px] lg:max-w-[600px] h-auto max-h-[300px] lg:max-h-[350px] rounded-lg shadow-md object-contain transition-shadow duration-300 hover:shadow-xl"
          onError={(e) => {
            console.log('Image failed to load:', certification.badgeUrl);
            e.currentTarget.style.display = 'none';
          }}
        />
      </motion.div>

      {/* Certificate Info */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <motion.h3
          className="text-xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.23, 1, 0.32, 1]
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          {certification.title}
        </motion.h3>

        <motion.p
          className="text-gray-600 dark:text-gray-400 font-medium"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          {certification.issuer}
        </motion.p>

        <motion.div
          className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <FiCalendar className="mr-2" size={14} />
          <span>Issued: {formatDate(certification.issueDate)}</span>
        </motion.div>
      </motion.div>

      {/* External link indicator */}
      <motion.div
        className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{ opacity: 0.6, scale: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          ease: [0.34, 1.56, 0.64, 1]
        }}
        whileHover={{
          scale: 1.2,
          rotate: 12,
          opacity: 1,
          transition: {
            duration: 0.2,
            ease: [0.23, 1, 0.32, 1]
          }
        }}
      >
        <FiExternalLink className="text-gray-600 dark:text-gray-400" size={18} />
      </motion.div>

      {/* Click handler */}
      <div
        className="absolute inset-0 md:w-3xl cursor-pointer"
        onClick={() => window.open(certification.credentialUrl, '_blank')}
      />
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

        {/* Mobile selector - Enhanced organization */}
        <div className="lg:hidden mb-6">
          <div className="bg-white/5 dark:bg-black/20 rounded-xl p-4 border border-gray-200/20 dark:border-gray-700/30">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Certifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {selectedCertIndex + 1} of {certificationsData.length} selected
                </p>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  onClick={handlePrevious}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 transition-all duration-200"
                  aria-label="Previous certificate"
                >
                  <FiChevronLeft size={18} />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 transition-all duration-200"
                  aria-label="Next certificate"
                >
                  <FiChevronRight size={18} />
                </motion.button>
              </div>
            </div>

            {/* Enhanced Thumbnail indicators */}
            <div className="flex justify-center space-x-2 mb-4 p-2 bg-white/10 dark:bg-black/20 rounded-lg">
              {certificationsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCertIndex(index)}
                  className={`transition-all duration-300 rounded-full ${index === selectedCertIndex
                    ? 'w-8 h-3 bg-blue-500 shadow-lg'
                    : 'w-3 h-3 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
                    }`}
                  aria-label={`Select certificate ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Current certification display */}
          <div className="px-2 mt-4 h-[500px]">
            <AnimatePresence mode="wait">
              <ResponsiveTilt
                certificationId={certificationsData[selectedCertIndex].id}
                isMobile={true}
              >
                <CertificateDetails
                  key={certificationsData[selectedCertIndex].id}
                  certification={certificationsData[selectedCertIndex]}
                />
              </ResponsiveTilt>
            </AnimatePresence>
          </div>
        </div>              {/* Desktop layout - Grid with list and details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:grid lg:grid-cols-5 lg:gap-6"
        >
          {/* Certificate list - Desktop only */}
          <div className="col-span-2">
            <div className="bg-white/5 dark:bg-black/20 rounded-xl p-4 border border-gray-200/20 dark:border-gray-700/30">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Certifications ({certificationsData.length})
              </h3>

              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
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

              {/* Enhanced Navigation controls */}
              <div className="mt-4 pt-4 border-t border-gray-200/20 dark:border-gray-700/30">
                <div className="flex justify-between items-center">
                  <motion.button
                    onClick={handlePrevious}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-3 py-2 rounded-lg bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 transition-all duration-200 text-sm font-medium"
                    aria-label="Previous certificate"
                  >
                    <FiChevronLeft size={16} className="mr-1" />
                    Previous
                  </motion.button>

                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCertIndex + 1} of {certificationsData.length}
                    </span>
                  </div>

                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-3 py-2 rounded-lg bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 transition-all duration-200 text-sm font-medium"
                    aria-label="Next certificate"
                  >
                    Next
                    <FiChevronRight size={16} className="ml-1" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate details - Desktop with Responsive Tilt */}
          <div className="col-span-3 h-full relative">
            <AnimatePresence mode="wait">
              <ResponsiveTilt
                certificationId={certificationsData[selectedCertIndex].id}
                isMobile={false}
              >
                <CertificateDetails
                  key={certificationsData[selectedCertIndex].id}
                  certification={certificationsData[selectedCertIndex]}
                />
              </ResponsiveTilt>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CertificationsShowcase;