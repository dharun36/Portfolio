import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { TextLoop } from '@/components/motion-primitives/text-loop';
import { motion } from 'framer-motion';

function Home() {
  return (
    <section className="lg:px-20 px-6 pt-20 pb-16 text-hero-title body-font">
      <div className="container lg:mx-10 mx-auto mt-10 flex px-0 py-16 md:flex-row flex-col items-center gap-12">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <div className='text-4xl font-geist-sans h-[40px]'>
            <span>
              Hi, I'm
            </span>
          </div>

          <div className='text-4xl md:text-5xl font-bold tracking-tight h-[60px] mb-0'>
            <h1 className="relative z-10 text-lg md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-gray-300  text-center font-sans font-bold">
              DHARUN R
            </h1>
          </div>

          <div className='mt-2 mb-6 flex items-center text-3xl h-[60px]'>
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

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 leading-relaxed text-base md:text-lg max-w-2xl"
          >
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant
            cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic
            tumeric truffaut hexagon try-hard chambray.
          </motion.p>

          <div className="flex md:justify-start justify-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button className='px-6 mr-3 text-sm font-medium h-12 bg-[#3367d6] text-white hover:bg-[#3367d6] dark:bg-[#3b82f6] dark:text-white dark:hover:bg-[#3b82f6] transition-colors duration-300' style={{ borderRadius: 999 }}>
                View My Work
              </Button>
              <Button className='px-8 mx-3 text-sm text-blue-400 hover:text-blue-400 font-medium h-12 bg-transparent hover:bg-[#3b82f6]/10 dark:hover:bg-[#60a5fa]/10 border-[#4885ed] dark:border-[#60a5fa] transition-colors duration-300' style={{ borderRadius: 999 }} variant="outline">
                Resume
              </Button>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <img
            className="object-cover object-center rounded-lg shadow-md"
            alt="Dharun R"
            src="https://dummyimage.com/720x600"
            width={720}
            height={600}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Home;