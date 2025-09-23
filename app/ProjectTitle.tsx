"use client";

import React from 'react';
import '../components/ShinyText.css';

interface ProjectTitleProps {
  title: string;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ title }) => {
  return (
    <h3 className="text-2xl md:text-3xl font-bold mb-4 relative">
      <span className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-400 dark:to-gray-200 text-transparent bg-clip-text">
        {title}
      </span>
      <span className="hidden dark:block dark-mode-shine absolute inset-0"></span>
      <span className="block dark:hidden light-mode-shine absolute inset-0"></span>
    </h3>
  );
};

export default ProjectTitle;