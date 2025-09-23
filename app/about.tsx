import React from 'react';
import { InView } from "@/components/ui/in-view";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import AboutTechStackMarquee from './components/AboutTechStackMarquee';
import { FiUser } from "react-icons/fi";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-2 sm:px-4" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <InView
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        viewOptions={{ margin: '0px 0px -200px 0px' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <section id="about" className="py-12 sm:py-16 md:py-24 mt-12 sm:mt-16 sm:mb-14 relative w-full mx-auto" style={{ maxWidth: "calc(100vw - 16px)", width: "100%" }}>
          <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4 md:px-6">
            {/* Simple section heading */}
            <div className="text-center mb-12 sm:mb-16">
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About Me
              </motion.h2>

              <motion.div
                className="w-20 sm:w-24 h-1 bg-gray-800 dark:bg-gray-200 mx-auto mt-4"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              ></motion.div>

              {/* <motion.p
                className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Passionate developer crafting exceptional digital experiences with modern technologies
              </motion.p> */}
            </div>

            {/* Main content */}
            <div className="w-full flex flex-col items-center">
              {/* About Me content */}
              <motion.div
                className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-10 sm:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="bg-white dark:bg-gray-950 rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-8 border border-gray-200 dark:border-gray-800 shadow-md w-full">
                  <div className="flex items-center gap-2 mb-3 sm:mb-5 pb-2 border-b border-gray-200 dark:border-gray-800">
                    <FiUser className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300" />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                      Hello, I'm Dharun
                    </h3>
                  </div>

                  <motion.p
                    className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-4 sm:mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    I'm a <span className="font-medium text-gray-900 dark:text-white">full-stack developer</span> who loves turning complex problems into elegant, intuitive solutions. My focus is on creating digital experiences that are both beautiful and functional.
                  </motion.p>

                  <motion.p
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    With expertise in <span className="font-medium">React</span>, <span className="font-medium">Next.js</span>, and <span className="font-medium">Node.js</span>, I build modern web applications that deliver exceptional user experiences. I'm passionate about clean code, performance optimization, and staying current with emerging technologies.
                  </motion.p>

                  <motion.p
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    My journey in tech has equipped me with a diverse skill set spanning frontend and backend development, allowing me to tackle projects from concept to completion with confidence and creativity.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-1.5 sm:gap-2 mt-6 sm:mt-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs sm:text-sm py-1 sm:py-1.5">Frontend Development</Badge>
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs sm:text-sm py-1 sm:py-1.5">Backend Development</Badge>
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs sm:text-sm py-1 sm:py-1.5">UI/UX Design</Badge>
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs sm:text-sm py-1 sm:py-1.5">Mobile Development</Badge>
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs sm:text-sm py-1 sm:py-1.5">DevOps</Badge>
                  </motion.div>
                </div>

                {/* Quote section with simpler styling */}
                {/* <motion.div
                  className="mt-5 sm:mt-8 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="relative">
                    <div className="text-3xl sm:text-4xl lg:text-5xl text-gray-400 dark:text-gray-600 font-serif mb-1 sm:mb-2">"</div>
                    <p className="text-sm sm:text-base md:text-lg italic text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      The best way to predict the future is to create it.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium text-right">― Peter Drucker</p>
                  </div>
                </motion.div> */}
              </motion.div>

              {/* Skills section as a separate section */}
              <motion.div
                className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="rounded-xl">
                  <motion.p
                    className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    My toolkit for building modern, scalable applications
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <AboutTechStackMarquee />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </InView>
    </div>
  );
}