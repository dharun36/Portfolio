"use client"

import React from 'react'
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { BsCodeSlash } from 'react-icons/bs';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import ScrollStack, { ScrollStackItem } from "@/components/ui/Components/ScrollStack/ScrollStack";
import projectsData from './data/projects.json';
import { cn } from "@/lib/utils";
import ProjectTitle from './ProjectTitle';

function Project() {

  return (
    <div className="w-full min-h-screen py-24 flex flex-col">
      <div className="text-center mb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          My Projects
        </h2>
        <p className="text-center text-sm sm:text-base mt-4 mb-4 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          A collection of my recent work spanning web applications, mobile apps, and other software projects
        </p>
      </div>

      <div className="h-[80vh] overflow-y-auto scroller relative overflow-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <ScrollStack className="pb-32 mx-auto w-full max-w-[1400px]">
          {projectsData.map((project) => (
            <ScrollStackItem
              key={project.id}
              itemClassName="bg-cover bg-center bg-no-repeat min-h-[450px] w-[92%] mx-auto"
            >
              <div className={cn(
                "flex flex-col md:flex-row h-full shadow-lg rounded-3xl overflow-hidden relative z-20 max-w-7xl bg-[linear-gradient(180deg,gray-50,#000000)] dark:bg-[linear-gradient(180deg,#111827,#030712)] dark:border-zinc-800 dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              )}>
                {/* Mobile image - Only visible on mobile */}
                <div className="block md:hidden relative w-full h-48 overflow-hidden">
                  {/* Mobile top-right links */}
                  <div className="absolute top-3 right-3 flex space-x-2 z-10">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-base px-2 py-2 bg-black/60 backdrop-blur-sm rounded-full flex items-center transition-colors hover:bg-black/80"
                      aria-label="GitHub repository"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-base px-2 py-2 bg-black/60 backdrop-blur-sm rounded-full flex items-center transition-colors hover:bg-black/80"
                      aria-label="Live website"
                    >
                      <FaGlobe />
                    </a>
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Left side - Project details */}
                <div className="flex-1 px-5 sm:px-6 md:px-8 py-4 md:py-6 flex flex-col md:flex-1 lg:w-[450px] md:max-w-[60%]">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm bg-gray-800 text-white dark:bg-gray-400 dark:text-gray-900 px-2.5 py-0.5 rounded-full border dark:border-gray-700">
                        {project.category}
                      </span>
                    </div>

                    <ProjectTitle title={project.title} />
                    <div className="mb-4 sm:mb-6">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.tech.split(', ').map((tech, idx) => (
                          <div
                            key={idx}
                            className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-gray-800/10 text-gray-800 dark:bg-gray-200/10 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      {project.description}
                    </p>

                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 flex items-center">
                        <HiOutlineBadgeCheck className="mr-1 text-gray-700 dark:text-blue-500" />
                        Key Features
                      </h4>
                      <ul className="list-disc list-inside space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right side - Project image - Hidden on mobile */}
                <div className="hidden md:block md:w-2/5 h-72 md:h-auto relative overflow-hidden md:max-w-[40%]">
                  {/* Desktop project links */}
                  <div className="absolute top-4 right-4 flex space-x-3 z-10">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-xl px-3 py-2 bg-black/40 backdrop-blur-sm rounded-full flex items-center transition-colors hover:bg-black/60"
                      aria-label="GitHub repository"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-xl px-3 py-2 bg-black/40 backdrop-blur-sm rounded-full flex items-center transition-colors hover:bg-black/60"
                      aria-label="Live website"
                    >
                      <FaGlobe />
                    </a>
                  </div>
                  {/* Project image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                  />
                </div>
              </div>
            </ScrollStackItem>
          ))}
          {/* End marker for ScrollStack */}
          <div className="scroll-stack-end"></div>
        </ScrollStack>
      </div>

      {/* View More Projects Button */}

    </div>
  );
}


export default Project