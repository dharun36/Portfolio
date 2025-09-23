"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs,
  SiTailwindcss, SiPython, SiMongodb, SiRedux, SiGithub,
  SiHtml5, SiCss3, SiDocker, SiFirebase, SiAmazon,
  SiVercel, SiVite, SiNetlify, SiFigma, SiStrapi
} from 'react-icons/si';
import { FaJava, FaGitAlt, FaAws } from 'react-icons/fa';
import GitHubCalendar from 'react-github-calendar';

import styles from './TechIcon.module.css';

interface TechLogoProps {
  icon: React.ReactNode;
  color: string;
  name: string;
}

// Component for rendering a single tech icon with hover effects
const TechIcon = ({ icon, color, name, keyPrefix = '' }: TechLogoProps & { keyPrefix?: string }) => {
  return (
    <motion.div
      key={`${keyPrefix}${name}`}
      className={`flex flex-col items-center justify-center mx-2 sm:mx-3 md:mx-5 opacity-90 hover:opacity-100 transition-all group relative ${styles.techIconWrapper}`}
      whileHover={{
        scale: 1.15,
        y: -2,
        transition: { duration: 0.2 }
      }}
    >
      <div className={`text-2xl sm:text-3xl md:text-4xl ${styles.techIcon}`} style={{ color }}>
        {icon}
      </div>
      <span
        className="text-xs sm:text-sm mt-2 font-medium whitespace-nowrap px-1 py-0.5"
        style={{ color }}
      >
        {name}
      </span>
    </motion.div>
  );
};


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
    { icon: <FaGitAlt />, color: '#F05032', name: 'Git' },
    { icon: <SiVercel />, color: '#ffffff', name: 'Vercel' },
    { icon: <SiVite />, color: '#646CFF', name: 'Vite' },
    { icon: <FaAws />, color: '#FF9900', name: 'AWS' },
    { icon: <SiDocker />, color: '#2496ED', name: 'Docker' },
    { icon: <SiFigma />, color: '#F24E1E', name: 'Figma' },
    { icon: <SiFirebase />, color: '#FFCA28', name: 'Firebase' }
  ];



  return (
    <>
      <div className="w-full relative overflow-hidden p-2 sm:p-3 md:p-4 rounded-lg">
        {/* Categories legend */}
        {/* <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-4 mb-3 sm:mb-4 md:mb-6 flex-wrap">
          <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 text-xs sm:text-sm">Frontend</Badge>
          <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 text-xs sm:text-sm">Backend</Badge>
          <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 text-xs sm:text-sm">Database</Badge>
          <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 text-xs sm:text-sm">Tools</Badge>
        </div> */}

        {/* First row - left to right */}
        <div className="marquee-row mb-4 sm:mb-6 hover:bg-transparent hover:border-none md:mb-8 rounded-xl bg-transparent">
          <div className="marquee-container" style={{ maxWidth: "100%" }}>
            <div className="flex animate-marquee-left pt-2" style={{ maxWidth: "100%" }}>
              {techLogosRow1.map((tech, index) => (
                <TechIcon key={index} icon={tech.icon} color={tech.color} name={tech.name} />
              ))}
              {techLogosRow1.map((tech, index) => (
                <TechIcon key={`repeat1-${index}`} icon={tech.icon} color={tech.color} name={tech.name} keyPrefix="repeat1-" />
              ))}
            </div>
          </div>
        </div>

        {/* Second row - right to left */}
        <div className="marquee-row mb-4 sm:mb-6 hover:bg-transparent hover:border-none md:mb-8 rounded-xl bg-transparent" style={{ maxWidth: "100%", overflowX: "hidden" }}>
          <div className="marquee-container" style={{ maxWidth: "100%" }}>
            <div className="flex animate-marquee-right pt-2" style={{ maxWidth: "100%" }}>
              {techLogosRow2.map((tech, index) => (
                <TechIcon key={index} icon={tech.icon} color={tech.color} name={tech.name} />
              ))}
              {techLogosRow2.map((tech, index) => (
                <TechIcon key={`repeat2-${index}`} icon={tech.icon} color={tech.color} name={tech.name} keyPrefix="repeat2-" />
              ))}
            </div>
          </div>
        </div>

      </div >
    </>
  );
}