"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs,
  SiTailwindcss, SiPython, SiMongodb, SiRedux, SiGithub,
  SiHtml5, SiCss3, SiPostgresql, SiGraphql, SiDocker, SiFirebase,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

interface TechLogoProps {
  icon: React.ReactNode;
  color: string;
  name: string;
}

// Custom Tech Stack Marquee optimized for About page
export default function AboutTechStackMarquee() {
  // Tech stack icons with their brand colors and names - first row
  const techLogosRow1 = [
    { icon: <SiReact />, color: '#61DAFB', name: 'React' },
    { icon: <SiNextdotjs />, color: '#ffffff', name: 'Next.js' },
    { icon: <SiTypescript />, color: '#3178C6', name: 'TypeScript' },
    { icon: <SiJavascript />, color: '#F7DF1E', name: 'JavaScript' },
    { icon: <SiNodedotjs />, color: '#339933', name: 'Node.js' },
    { icon: <SiTailwindcss />, color: '#06B6D4', name: 'Tailwind' },
    { icon: <SiPython />, color: '#3776AB', name: 'Python' },
    { icon: <SiMongodb />, color: '#47A248', name: 'MongoDB' },
    { icon: <SiRedux />, color: '#764ABC', name: 'Redux' }
  ];

  // Tech stack icons - second row
  const techLogosRow2 = [
    { icon: <SiGithub />, color: '#ffffff', name: 'GitHub' },
    { icon: <FaJava />, color: '#007396', name: 'Java' },
    { icon: <SiHtml5 />, color: '#E34F26', name: 'HTML5' },
    { icon: <SiCss3 />, color: '#1572B6', name: 'CSS3' },
    { icon: <SiPostgresql />, color: '#4169E1', name: 'PostgreSQL' },
    { icon: <SiGraphql />, color: '#E10098', name: 'GraphQL' },
    { icon: <SiDocker />, color: '#2496ED', name: 'Docker' },
    { icon: <SiFirebase />, color: '#FFCA28', name: 'Firebase' }
  ];

  const TechLogo = ({ icon, color, name }: TechLogoProps) => {
    return (
      <motion.div
        className="flex flex-col items-center justify-center mx-6 opacity-70 hover:opacity-100 transition-opacity"
        whileHover={{
          scale: 1.3,
          y: -5,
          transition: { duration: 0.2 },
          textShadow: "0 0 8px rgb(255,255,255)"
        }}
      >
        <div
          className="text-2xl sm:text-3xl"
          style={{ color }}
        >
          {icon}
        </div>
        <span className="text-xs mt-1 font-medium" style={{ color }}>
          {name}
        </span>
      </motion.div>
    );
  };

  return (
    <div className="w-full relative overflow-hidden p-1 sm:p-2" style={{ maxWidth: "100%" }}>
      {/* Categories legend */}
      <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-4 mb-3 sm:mb-4 md:mb-6 flex-wrap">
        <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 text-xs sm:text-sm">Frontend</Badge>
        <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 text-xs sm:text-sm">Backend</Badge>
        <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 text-xs sm:text-sm">Database</Badge>
        <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 text-xs sm:text-sm">Tools</Badge>
      </div>

      {/* First row - left to right */}
      <div className="marquee-row mb-4 sm:mb-6 py-5 md:mb-8" style={{ maxWidth: "100%", overflowX: "hidden" }}>
        <div className="marquee-container" style={{ maxWidth: "100%" }}>
          <div className="flex animate-marquee-left" style={{ maxWidth: "100%" }}>
            {techLogosRow1.map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center mx-2 sm:mx-3 md:mx-5 opacity-80 hover:opacity-100 transition-all group relative"
                whileHover={{
                  scale: 1.15,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <motion.span
                  className="text-xs mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute top-full pt-2 whitespace-nowrap"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            ))}
            {techLogosRow1.map((tech, index) => (
              <motion.div
                key={`repeat1-${index}`}
                className="flex flex-col items-center justify-center mx-2 sm:mx-3 md:mx-5 opacity-80 p-1 sm:p-2 hover:opacity-100 transition-all group relative"
                whileHover={{
                  scale: 1.15,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <motion.span
                  className="text-xs mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute top-full pt-2 whitespace-nowrap"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Second row - right to left */}
      <div className="marquee-row" style={{ maxWidth: "100%", overflowX: "hidden" }}>
        <div className="marquee-container" style={{ maxWidth: "100%" }}>
          <div className="flex animate-marquee-right" style={{ maxWidth: "100%" }}>
            {techLogosRow2.map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center mx-2 sm:mx-3 md:mx-5 opacity-80 py-1 sm:py-2 hover:opacity-100 transition-all group relative"
                whileHover={{
                  scale: 1.15,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <motion.span
                  className="text-xs mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute top-full pt-2 whitespace-nowrap"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            ))}
            {techLogosRow2.map((tech, index) => (
              <motion.div
                key={`repeat2-${index}`}
                className="flex flex-col items-center justify-center mx-2 sm:mx-3 md:mx-5 opacity-80 hover:opacity-100 transition-all group relative"
                whileHover={{
                  scale: 1.15,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <motion.span
                  className="text-xs mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute top-full pt-2 whitespace-nowrap"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}