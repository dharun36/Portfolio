"use client"

import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 mt-24 border-t border-gray-800 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Dharun R. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            <Link href="https://github.com/dharun36"
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="GitHub profile">
              <FaGithub size={20} />
            </Link>
            <Link href="https://linkedin.com/"
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="LinkedIn profile">
              <FaLinkedin size={20} />
            </Link>
            <Link href="https://twitter.com/"
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="Twitter profile">
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}