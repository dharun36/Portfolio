"use client";

import { useEffect } from 'react';

// This component helps preload fonts to reduce CLS
export default function FontPreloader() {
  useEffect(() => {
    // Add links to preload critical fonts
    const preloadFonts = [
      // Add your font paths here - example for Google Fonts:
      { href: 'https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;600;700&display=swap', rel: 'preload', as: 'style' },
    ];

    preloadFonts.forEach(font => {
      const linkEl = document.createElement('link');
      linkEl.rel = font.rel;
      linkEl.href = font.href;
      linkEl.as = font.as;
      document.head.appendChild(linkEl);

      // Also load the font immediately
      const linkStyleEl = document.createElement('link');
      linkStyleEl.rel = 'stylesheet';
      linkStyleEl.href = font.href;
      document.head.appendChild(linkStyleEl);
    });
  }, []);

  return null; // This component doesn't render anything
}