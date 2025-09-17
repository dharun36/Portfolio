"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Skill = {
  name: string;
  level: number; // 1-100
  category: string;
  color: string;
  icon?: React.ReactNode;
};

interface SkillsOrbProps {
  skills: Skill[];
}

export default function SkillsOrb({ skills }: SkillsOrbProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="w-full py-16">
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
          >
            {category}
          </button>
        ))}
        {activeCategory && (
          <button
            onClick={() => setActiveCategory(null)}
            className="px-4 py-2 rounded-full text-sm bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Show All
          </button>
        )}
      </div>

      <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-3xl overflow-hidden">
        {skills
          .filter(skill => !activeCategory || skill.category === activeCategory)
          .map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: skill.level / 100 + 0.5,
                transition: { delay: i * 0.1, duration: 0.5 }
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                backgroundColor: skill.color,
              }}
            >
              <motion.div
                className="relative flex items-center justify-center rounded-full text-white font-medium p-1"
                whileHover={{
                  scale: 1.2,
                  boxShadow: '0 0 15px rgba(255,255,255,0.5)'
                }}
                animate={{
                  x: [0, 10, -10, 10, 0],
                  y: [0, -10, 10, -10, 0],
                  transition: {
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <div
                  className="flex flex-col items-center justify-center rounded-full"
                  style={{
                    width: `${skill.level}px`,
                    height: `${skill.level}px`,
                    minWidth: '60px',
                    minHeight: '60px'
                  }}
                >
                  {skill.icon}
                  <span className="text-xs">{skill.name}</span>
                  <span className="text-[10px] opacity-70">{skill.level}%</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}