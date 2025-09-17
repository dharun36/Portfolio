"use client";

import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="w-full relative overflow-hidden rounded-lg bg-gray-950/50 p-4">


      {/* First row - left to right */}
      <div className="marquee-row mb-6 p-2 rounded-lg bg-gray-950/70">
        <div className="marquee-container">
          <div className="flex animate-marquee-left">
            {techLogosRow1.map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center mx-6 opacity-70 hover:opacity-100 transition-opacity"
                whileHover={{
                  scale: 1.3,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-3xl sm:text-4xl" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <span className="text-xs mt-1 font-medium" style={{ color: tech.color }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
            {techLogosRow1.map((tech, index) => (
              <motion.div
                key={`repeat1-${index}`}
                className="flex flex-col items-center justify-center mx-6 opacity-70 hover:opacity-100 transition-opacity"
                whileHover={{
                  scale: 1.3,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-3xl sm:text-4xl" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <span className="text-xs mt-1 font-medium" style={{ color: tech.color }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Second row - right to left */}
      <div className="marquee-row p-2 rounded-lg bg-gray-950/70">
        <div className="marquee-container">
          <div className="flex animate-marquee-right">
            {techLogosRow2.map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center mx-6 opacity-70 hover:opacity-100 transition-opacity"
                whileHover={{
                  scale: 1.3,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-3xl sm:text-4xl" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <span className="text-xs mt-1 font-medium" style={{ color: tech.color }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
            {techLogosRow2.map((tech, index) => (
              <motion.div
                key={`repeat2-${index}`}
                className="flex flex-col items-center justify-center mx-6 opacity-70 hover:opacity-100 transition-opacity"
                whileHover={{
                  scale: 1.3,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-3xl sm:text-4xl" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <span className="text-xs mt-1 font-medium" style={{ color: tech.color }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}