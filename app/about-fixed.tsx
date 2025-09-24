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
            </div>

            {/* Main content */}
            <div className="w-full flex flex-col items-center">
              {/* About Me content */}
              <motion.div
                className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-6 sm:mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="bg-white dark:bg-gray-950 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-200 dark:border-gray-800 shadow-md w-full">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3 pb-1 border-b border-gray-200 dark:border-gray-800">
                    <FiUser className="text-lg sm:text-xl md:text-xl text-gray-700 dark:text-gray-300" />
                    <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-800 dark:text-white">
                      Hello, I'm Dharun
                    </h3>
                  </div>

                  <motion.p
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >Full Stack Developer skilled in the MERN stack with a strong interest in AI and Machine Learning. Currently pursuing Artificial Intelligence and Data Science, I enjoy blending development with intelligent technologies to build impactful solutions.</motion.p>

                  <motion.p
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    Passionate about learning and innovation, I like exploring new tools, solving challenges through code, and turning ideas into real-world projects. I value collaboration and growth, and I'm always eager to contribute meaningfully as I advance in my journey.</motion.p>

                  <motion.div
                    className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs sm:text-sm py-1 sm:py-1.5">Artificial Intelligence</Badge>
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs sm:text-sm py-1 sm:py-1.5">Machine Learning</Badge>
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs sm:text-sm py-1 sm:py-1.5">Full Stack</Badge>
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs sm:text-sm py-1 sm:py-1.5">Data Science</Badge>
                  </motion.div>
                </div>
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
                    className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 text-center"
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