import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, Component } from "lucide-react";
import { TextLoop } from '@/components/motion-primitives/text-loop';
import { motion } from 'framer-motion';
import Image from "next/image";

function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center px-6 lg:px-20 py-24 text-hero-title body-font relative">
      {/* Social Media Sidebar - Not fixed, will scroll with content */}
      <div className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col items-center gap-6 z-10">
        <div className="flex flex-col gap-6 items-center py-6 px-2">
          <a href="https://leetcode.com/u/dharun36/" target="_blank" rel="noopener noreferrer"
            className="text-black dark:text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
          </a>
          <a href="https://github.com/dharun36" target="_blank" rel="noopener noreferrer"
            className="text-black dark:text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <a href="https://www.facebook.com/dharun36" target="_blank" rel="noopener noreferrer"
            className="text-black dark:text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/dharun-ramasamy" target="_blank" rel="noopener noreferrer"
            className="text-black dark:text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
            </svg>
          </a>
          <div className="h-14 w-px bg-white/40 my-1"></div>
          <span className="text-black dark:text-white opacity-70 text-xs font-light tracking-widest vertical-text">Follow</span>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center">
          {/* Circular profile photo with animation */}
          <motion.div
            className="w-32 h-32 mb-6 overflow-hidden rounded-full border-4 border-white/20 shadow-xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              duration: 0.8
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255, 255, 255, 0.2)",
              borderColor: "rgba(255, 255, 255, 0.4)"
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&h=300&auto=format&fit=crop"
              alt="Dharun R Profile"
              className="w-full h-full object-cover"
            />

            {/* Subtle shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 3,
                repeatDelay: 5
              }}
              style={{ width: "50%" }}
            />
          </motion.div>

          <div className='text-4xl font-geist-sans h-[40px]'>
            <span>
              Hi, I'm
            </span>
          </div>

          <div className='text-4xl md:text-5xl font-bold tracking-tight h-[25px] md:h-[40px] mb-0'>
            <h1 className="relative z-10 text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-gray-400 text-center font-sans font-bold">
              DHARUN R
            </h1>
          </div>
          <div className='mt-2 mb-6 flex items-center justify-center text-3xl h-[60px]'>
            <div className="flex items-center">
              <span className="whitespace-nowrap">I'm a</span> <b className="ml-2 inline-flex">
                <TextLoop
                  className='overflow-hidden py-3'
                  transition={{
                    type: 'tween',
                    ease: [0.25, 0.1, 0.25, 1.0],
                    duration: 0.5,
                  }}
                  variants={{
                    initial: {
                      y: 12,
                      opacity: 0,
                    },
                    animate: {
                      y: 0,
                      opacity: 1,
                    },
                    exit: {
                      y: -12,
                      opacity: 0,
                    },
                  }}
                >
                  <span className="block">Web Developer</span>
                  <span className="block">ML Engineer</span>
                  <span className="block">Programmer</span>
                </TextLoop>
              </b>
            </div>
          </div>

          <p className="mb-8 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            Building smart solution
            And Impactful digital experiences
          </p>

          {/* Social Media Icons for mobile - above the buttons */}
          <div className="md:hidden flex justify-center gap-6 mb-8">
            <a href="https://leetcode.com/u/dharun36/" target="_blank" rel="noopener noreferrer"
              className="text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
            </a>
            <a href="https://github.com/dharun36" target="_blank" rel="noopener noreferrer"
              className="text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/dharun36" target="_blank" rel="noopener noreferrer"
              className="text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/dharun36" target="_blank" rel="noopener noreferrer"
              className="text-white opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </a>
          </div>

          <div className="flex justify-center gap-4">
            <div>
              <Button className='px-6 mr-3 text-sm font-medium h-12 transition-colors duration-300' style={{ borderRadius: 999 }}>
                View My Work
              </Button>
              <Button className='px-8 mx-3 text-sm font-medium h-12 bg-transparent border border-white transition-colors duration-300' style={{ borderRadius: 999 }} variant="outline">
                Resume
              </Button>
            </div>
          </div>

          {/* Tech stack section */}

          {/* Mouse scroll indicator */}
          {/* <motion.div 
            className="mt-16 cursor-pointer opacity-50 hover:opacity-75 transition-opacity"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
          >
            <div className="h-12 w-7 border border-gray-400 dark:border-gray-400 rounded-full flex justify-center p-1">
              <motion.div 
                className="w-1 h-2 rounded-full bg-gray-400 dark:bg-gray-400"
                animate={{ 
                  y: [0, 4, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}

export default Home;