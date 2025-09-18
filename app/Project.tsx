"use client"

import React from 'react'
import ShinyText from '@/components/ShinyText.jsx';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { BsCodeSlash } from 'react-icons/bs';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import ScrollStack, { ScrollStackItem } from "@/components/ui/Components/ScrollStack/ScrollStack";
import projectsData from './data/projects.json';
import { cn } from "@/lib/utils";

function Project() {

  return (
    <div className="w-full min-h-screen py-24 flex flex-col">
      <h2 className="text-4xl text-black dark:text-white p-3 md:text-5xl font-bold mb-4 text-center mx-auto">
        My Projects
      </h2>
      <p className="text-center text-lg mb-5 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
        A collection of my recent work spanning web applications, mobile apps, and other software projects
      </p>

      <div className="h-[80vh] overflow-y-auto scroller relative overflow-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <ScrollStack className="pb-32 mx-auto w-full">
          {projectsData.map((project) => (
            <ScrollStackItem
              key={project.id}
              itemClassName="bg-cover bg-center bg-no-repeat min-h-[450px] w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto"
            >
              <div className={cn(
                "flex flex-col md:flex-row h-full shadow-lg rounded-3xl overflow-hidden relative z-20 max-w-7xl bg-[linear-gradient(180deg,gray-50,#000000)] dark:bg-[linear-gradient(180deg,#111827,#030712)] dark:border-zinc-800 dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              )}>
                {/* Left side - Project details */}
                <div className="flex-1 px-6 sm:px-8 py-6 flex flex-col md:flex-1 lg:w-[450px] md:max-w-[60%]">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm bg-gray-800 text-white dark:bg-gray-400 dark:text-gray-900  px-2.5 py-0.5 rounded-full border dark:border-gray-700 ">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-400 dark:to-gray-200 inline-block text-transparent bg-clip-text">

                      <ShinyText
                        text={project.title}
                        disabled={false}
                        speed={3}
                        className='custom-class'
                      />
                    </h3>
                    <div className="mb-6">

                      <div className="flex flex-wrap gap-2">
                        {project.tech.split(', ').map((tech, idx) => (
                          <div
                            key={idx}
                            className="text-sm px-3 py-1 rounded-full bg-gray-800/10 text-gray-800 dark:bg-gray-200/10 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                      {project.description}
                    </p>


                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                        <HiOutlineBadgeCheck className="mr-1 text-gray-700 dark:text-blue-500" />
                        Key Features
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile links - only visible on mobile */}
                    <div className="md:hidden flex justify-end mt-4 space-x-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 dark:text-white text-xl px-3 py-2 bg-gray-200/80 dark:bg-gray-800/80 rounded-full flex items-center transition-colors hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        <FaGithub />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 dark:text-white text-xl px-3 py-2 bg-gray-200/80 dark:bg-gray-800/80 rounded-full flex items-center transition-colors hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        <FaGlobe />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right side - Project image */}
                {/* Right side - Project image - Hidden on mobile */}
                <div className="hidden md:block md:w-2/5 h-72 md:h-auto relative overflow-hidden md:max-w-[40%]">
                  <div className="absolute top-4 right-4 flex space-x-3 z-10">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-xl px-3 py-2 bg-black/40 backdrop-blur-sm rounded-full flex items-center transition-colors hover:bg-black/60"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-xl px-3 py-2 bg-black/40 backdrop-blur-sm rounded-full flex items-center transition-colors hover:bg-black/60"
                    >
                      <FaGlobe />
                    </a>
                  </div>
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