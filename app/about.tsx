import React from 'react'
import { InView } from "@/components/ui/in-view";

export default function About() {
  return (
    <div className=' h-[500px] items-end justify-center px-4 pb-24'>
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '0px 0px -200px 0px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <section id="about" className="py-24 mt-36" >
          <div className="my-10 max-w-3xl mx-auto text-center">
            <h2 className="py-5 text-4xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                I thrive on building intelligent, user-friendly, and impactful digital solutions. With a strong foundation in web development, machine learning, and deep learning, I enjoy combining technology and creativity to solve real-world problems.
              </p>
              <p>
                Whether it's developing responsive web applications, training deep learning models, or experimenting with new tools and frameworks, I’m always eager to learn and improve. I believe in continuous growth and love collaborating on innovative, meaningful projects that make a difference.
              </p>
            </div>
          </div>
        </section >
      </InView>
    </div>
  );
}
