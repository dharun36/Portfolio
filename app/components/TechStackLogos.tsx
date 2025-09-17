"use client";

import React from 'react';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { motion } from 'motion/react';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs,
  SiTailwindcss, SiPython, SiMongodb, SiRedux, SiGithub,
  SiHtml5, SiCss3, SiPostgresql,
  SiGraphql, SiDocker, SiFirebase
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

interface TechLogoProps {
  icon: React.ReactNode;
  color: string;
}

const TechLogo = ({ icon, color }: TechLogoProps) => {
  return (
    <motion.div
      className="flex items-center justify-center mx-8 opacity-70 hover:opacity-100 transition-opacity"
      whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
    >
      <div
        className="text-4xl sm:text-5xl"
        style={{ color }}
      >
        {icon}
      </div>
    </motion.div>
  );
};

export default function TechStackLogos() {
  // Tech stack icons with their brand colors
  const techLogos = [
    { icon: <SiReact />, color: '#61DAFB' },
    { icon: <SiNextdotjs />, color: '#ffffff' },
    { icon: <SiTypescript />, color: '#3178C6' },
    { icon: <SiJavascript />, color: '#F7DF1E' },
    { icon: <SiNodedotjs />, color: '#339933' },
    { icon: <SiTailwindcss />, color: '#06B6D4' },
    { icon: <SiPython />, color: '#3776AB' },
    { icon: <SiMongodb />, color: '#47A248' },
    { icon: <SiRedux />, color: '#764ABC' },
    { icon: <SiGithub />, color: '#ffffff' },
    { icon: <FaJava />, color: '#007396' },
    { icon: <SiHtml5 />, color: '#E34F26' },
    { icon: <SiCss3 />, color: '#1572B6' },
    { icon: <SiPostgresql />, color: '#4169E1' },
    { icon: <SiGraphql />, color: '#E10098' },
    { icon: <SiDocker />, color: '#2496ED' },
    { icon: <SiFirebase />, color: '#FFCA28' }
  ];

  return (
    <div className="w-full py-16 bg-black relative">
      {/* Network-like background effect similar to the image */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(100, 100, 100, 0.05) 0%, transparent 5%),
            radial-gradient(circle at 80% 30%, rgba(100, 100, 100, 0.05) 0%, transparent 5%),
            linear-gradient(90deg, transparent 0%, rgba(100, 100, 100, 0.05) 50%, transparent 100%)
          `,
          backgroundSize: '100% 100%, 100% 100%, 100% 1px',
          backgroundPosition: 'center, center, center',
          backgroundRepeat: 'no-repeat, no-repeat, repeat-y'
        }}
      >
        {/* Network dots and lines */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gray-500 opacity-10"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          ></div>
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gray-500 opacity-5"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: '1px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 70}%`,
              transform: `rotate(${Math.random() * 180}deg)`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#4885ed] to-[#3367d6] dark:from-[#60a5fa] dark:to-[#3b82f6]">
          Technologies I Work With
        </h2>

        <InfiniteSlider
          speed={20}
          speedOnHover={0}
          className="py-8"
        >
          {techLogos.map((tech, index) => (
            <TechLogo key={index} icon={tech.icon} color={tech.color} />
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
}