"use client"

import React from 'react'
import About from './about';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import ScrollStack, { ScrollStackItem } from "@/components/ui/Components/ScrollStack/ScrollStack";
function Project() {
  const projectsData = [
    { title: "Project One", tech: "React, Redux, SASS", githubUrl: "#", liveUrl: "#" },
    { title: "Project Two", tech: "Next.js, Tailwind CSS", githubUrl: "#", liveUrl: "#" },
    { title: "Project Three", tech: "Python, Flask, AI", githubUrl: "#", liveUrl: "#" },
    { title: "Project Four", tech: "Node.js, Express, MongoDB", githubUrl: "#", liveUrl: "#" },
    { title: "Project Five", tech: "HTML, CSS, Vanilla JS", githubUrl: "#", liveUrl: "#" },
    { title: "Project Six", tech: "TypeScript, GraphQL", githubUrl: "#", liveUrl: "#" },
  ];

  return (
    <div className="w-full min-h-screen py-24 flex flex-col">
      <h2 className="text-4xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        My Projects
      </h2>

      <div className="h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <ScrollStack className="pb-32">
          {projectsData.map(({ title, tech, githubUrl, liveUrl }, index) => (
            <ScrollStackItem key={index}
              itemClassName="bg-cover bg-center bg-no-repeat min-h-[400px]"
            >
              <div className="flex flex-col h-full p-8 rounded-3xl">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">
                    {title}
                  </h3>
                  <p className="text-md mb-6">
                    {tech}
                  </p>
                  <p className="mb-6">
                    A description of this project would go here. This is where you would explain what the project does,
                    what technologies were used, and what challenges were overcome.
                  </p>
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repo"
                    className="hover:text-blue-600 transition-colors text-2xl"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                    className="hover:text-blue-600 transition-colors text-2xl"
                  >
                    <FaGlobe />
                  </a>
                </div>
              </div>
            </ScrollStackItem>
          ))}
          {/* End marker for ScrollStack */}
          <div className="scroll-stack-end"></div>
        </ScrollStack>
      </div>
    </div>
  )
}

export default Project