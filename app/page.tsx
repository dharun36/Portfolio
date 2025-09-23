"use client"

import Image from "next/image";
import { ModeToggle } from "./toggle";
import Navbar from "./Navbar"
import Particles from '@/components/ui/Backgrounds/Particles/Particles';
import Home from './Home';
import About from './about';
import Project from './Project';
import { ScrollNav } from './ScrollNav';
import Footer from './Footer';
import CertificationsShowcase from './components/CertificationsShowcase';
import CodeContributions from './components/CodeContributions';
import ContactPage from './components/ContactPage';

export default function Page() {

  return (
    <div className="relative w-full min-h-screen overflow-y-auto scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* 🔹 Fixed full-page background */}
      <div className="fixed inset-0 -z-10 w-full h-full" style={{ aspectRatio: '16/9' }}>
        <Particles
          particleColors={["#000000", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={110}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      {/* 🔹 Foreground content */}
      <div className="z-10">

        <Navbar />
        <div id="home">
          <Home />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="projects" className="relative">
          <Project />
        </div>
        <br /><br /><br />
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center mt-8">
            <a
              href="https://github.com/dharun36?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.open("https://github.com/dharun36?tab=repositories", "_blank")}
              className="group relative px-8 py-3.5 text-lg font-medium text-gray-800 dark:text-white bg-transparent overflow-hidden rounded-lg transition-all duration-300 backdrop-blur-sm border border-gray-300/20 dark:border-gray-700/20 hover:border-gray-300/40 dark:hover:border-gray-600/40 shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_20px_5px_rgba(30,64,175,0.15)] flex items-center hover:scale-105 cursor-pointer"
            >
              <div className="relative z-10 flex items-center">
                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">View More Projects</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1 transform translate-x-0 group-hover:translate-x-2 opacity-70 group-hover:opacity-100 text-gray-600 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              {/* Animated particles on hover */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <span className="absolute top-0 left-1/4 w-1 h-1 rounded-full bg-blue-400/0 group-hover:bg-blue-400/70 group-hover:animate-ping [animation-duration:1.5s]"></span>
                <span className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-blue-400/0 group-hover:bg-blue-400/70 group-hover:animate-ping [animation-duration:2s]"></span>
                <span className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-blue-400/0 group-hover:bg-blue-400/70 group-hover:animate-ping [animation-duration:2.5s]"></span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 via-blue-100/10 to-blue-50/10 dark:from-blue-900/10 dark:via-blue-800/10 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-400 group-hover:w-full transition-all duration-300 pointer-events-none"></div>
            </a>
          </div>
        </div>
        <div id="certifications" className="relative w-full">
          <CertificationsShowcase />
        </div>
        <div id="contributions" className="relative">
          <CodeContributions />
        </div>
        <div id="contact" className="relative">
          <ContactPage />
        </div>
        <Footer />
      </div>


    </div>
  );
}
