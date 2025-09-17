import React from 'react';
import { InView } from "@/components/ui/in-view";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import AboutTechStackMarquee from './components/AboutTechStackMarquee';

export default function About() {

  return (
    <div className="items-end justify-center px-4 pb-24">
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '0px 0px -200px 0px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <section id="about" className="py-24 mt-16 mb-14 relative">
          {/* Minimal header */}
          <div className="max-w-6xl mx-auto">
            <h2 className="relative z-10 text-3xl lg:text-5xl mb-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-gray-400 text-center font-sans font-bold">
              About Me
            </h2>

            {/* Two column layout - About Me on left, Skills on right */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              {/* Left column - About Me content */}
              <motion.div
                className="lg:w-1/2 mb-12 lg:mb-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="backdrop-blur-sm rounded-xl p-8 shadow-xl hover:border-gray-700 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">Hello, I'm a Dharun</h3>

                  <p className="text-lg leading-relaxed text-gray-200 mb-6">
                    I build things for the web and bring ideas to life with code, focusing on creating digital experiences that combine beautiful design with powerful functionality.
                  </p>

                  <p className="text-base text-gray-300 mb-6">
                    With a passion for clean code and intuitive user interfaces, I specialize in developing modern web applications using cutting-edge technologies. I'm always exploring new tools and techniques to create better digital experiences.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    <Badge className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700">Frontend</Badge>
                    <Badge className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700">Backend</Badge>
                    <Badge className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700">UI/UX</Badge>
                    <Badge className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700">Mobile</Badge>
                  </div>
                </div>

                {/* Quote section */}
                <motion.div
                  className="mt-8 px-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="text-4xl text-white/20 font-serif mb-3">"</div>
                  <p className="text-lg italic text-white/80 mb-3">
                    The best way to predict the future is to create it.
                  </p>
                  <p className="text-sm text-white/50">― Peter Drucker</p>
                </motion.div>
              </motion.div>

              {/* Right column - Skills tech stack */}
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className=" backdrop-blur-sm rounded-xl p-8 shadow-xl hover:border-gray-700 transition-all duration-300 h-full">
                  <h3 className=" font-bold text-white mb-4 border-b border-gray-800 pb-2">

                    <p className="text-gray-300 mb-6">Technologies I Work With</p>
                  </h3>


                  <AboutTechStackMarquee />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </InView>
    </div>
  );
}