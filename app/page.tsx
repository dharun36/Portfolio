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
        <Footer />
      </div>


    </div>
  );
}
