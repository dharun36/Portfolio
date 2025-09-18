"use client";

import React from 'react';
import { FaGithub, FaCode } from 'react-icons/fa';

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionProps {
  githubUsername?: string;
  leetcodeUsername?: string;
  githubContributions?: ContributionDay[];
  leetcodeStats?: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking?: number;
    contestRating?: number;
  };
}

const CodeContributions: React.FC<ContributionProps> = ({
  githubUsername = "dharun36",
  leetcodeUsername = "dharun36",
  // Sample data - in a real app, you'd fetch this from APIs
  githubContributions = [
    { date: "2025-09-16", count: 500 },
    { date: "2025-09-15", count: 300 },
    { date: "2025-09-14", count: 700 },
    { date: "2025-09-13", count: 200 },
    { date: "2025-09-12", count: 400 },
    { date: "2025-09-11", count: 100 },
    { date: "2025-09-10", count: 6 },
  ],
  leetcodeStats = {
    totalSolved: 354,
    easySolved: 125,
    mediumSolved: 189,
    hardSolved: 40,
    ranking: 12437,
    contestRating: 1842,
  },
}) => {
  // Helper function to determine color intensity based on contribution count
  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800";
    if (count <= 2) return "bg-blue-100 dark:bg-blue-900";
    if (count <= 4) return "bg-blue-300 dark:bg-blue-700";
    if (count <= 6) return "bg-blue-400 dark:bg-blue-600";
    return "bg-blue-500 dark:bg-blue-500";
  };

  return (
    <div className="w-full min-h-screen py-12 sm:py-16 md:py-24 flex flex-col" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-black dark:text-white p-2 sm:p-3 font-bold mb-2 sm:mb-4 text-center mx-auto">
        Code Contributions
      </h2>
      <p className="text-center text-sm sm:text-base md:text-lg mb-6 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto px-4 text-gray-700 dark:text-gray-300">
        My activity on GitHub and LeetCode
      </p>

      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-3 sm:px-6 md:px-12">
        <div className="flex flex-col gap-10">
          {/* GitHub Contribution Section - Full Width */}
          <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f0f0] dark:from-[#111827] dark:via-[#0c1222] dark:to-[#090f1a] p-3 sm:p-4 md:p-6">
            <div className="flex items-center mb-3 sm:mb-6">
              <FaGithub className="text-xl sm:text-2xl md:text-3xl mr-2 sm:mr-3 text-gray-800 dark:text-gray-200" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">GitHub Contributions</h3>
            </div>

            <div className="mb-4">
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center"
              >
                @{githubUsername}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Enhanced contribution graph visualization */}
            <div className="mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">Recent activity:</p>
              <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-21 lg:grid-cols-28 xl:grid-cols-35 gap-0.5 sm:gap-1 py-1 sm:py-2">
                {React.useMemo(() => {
                  // Generate a deterministic pattern based on fixed indices
                  const contributions = Array.from({ length: 35 }).map((_, idx) => {
                    // Create a deterministic pattern - no randomness
                    let count = 0;
                    if (idx % 7 === 0) count = 4;
                    else if (idx % 11 === 0) count = 6;
                    else if (idx % 3 === 0) count = 2;
                    else if (idx % 5 === 0) count = 3;
                    else if (idx % 2 === 0 && idx % 3 === 1) count = 1;

                    const date = new Date();
                    date.setDate(date.getDate() - (35 - idx));
                    const dateStr = date.toISOString().split('T')[0];

                    return {
                      key: idx,
                      count,
                      dateStr
                    };
                  });

                  return contributions.map(item => (
                    <div
                      key={item.key}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-sm ${getContributionColor(item.count)}`}
                      title={`${item.dateStr}: ${item.count} contributions`}
                    />
                  ));
                }, [])}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-md sm:rounded-lg">
              <p className="text-center text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-200">
                View my complete contribution history and projects on GitHub
              </p>
              <div className="mt-3 sm:mt-4 flex justify-center">
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md sm:rounded-lg transition-colors flex items-center"
                >
                  <FaGithub className="mr-1.5 sm:mr-2" /> Visit GitHub Profile
                </a>
              </div>
            </div>
          </div>

          {/* LeetCode Stats Section */}
          <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f0f0] dark:from-[#111827] dark:via-[#0c1222] dark:to-[#090f1a] p-3 sm:p-4 md:p-6 shadow-lg">
            <div className="flex items-center mb-3 sm:mb-6">
              <FaCode className="text-xl sm:text-2xl md:text-3xl mr-2 sm:mr-3 text-gray-800 dark:text-gray-200" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">LeetCode Stats</h3>
            </div>

            <div className="mb-4">
              <a
                href={`https://leetcode.com/${leetcodeUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center"
              >
                @{leetcodeUsername}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Problem solving stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-6">
              <div className="rounded-md sm:rounded-lg p-2 sm:p-3 md:p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Easy</p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-green-600 dark:text-green-400">{leetcodeStats.easySolved}</p>
              </div>
              <div className="rounded-md sm:rounded-lg p-2 sm:p-3 md:p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Medium</p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-yellow-600 dark:text-yellow-400">{leetcodeStats.mediumSolved}</p>
              </div>
              <div className="rounded-md sm:rounded-lg p-2 sm:p-3 md:p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Hard</p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-red-600 dark:text-red-400">{leetcodeStats.hardSolved}</p>
              </div>
              <div className="rounded-md sm:rounded-lg p-2 sm:p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400">{leetcodeStats.totalSolved}</p>
              </div>
            </div>

            {/* Additional stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 mb-3 sm:mb-4 gap-2 sm:gap-3 md:gap-4">
              <div className="p-2 sm:p-3 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md sm:rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Global Ranking</p>
                <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">{leetcodeStats.ranking?.toLocaleString()}</p>
              </div>
              <div className="p-2 sm:p-3 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md sm:rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Contest Rating</p>
                <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">{leetcodeStats.contestRating}</p>
              </div>
              <div className="p-2 sm:p-3 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md sm:rounded-lg md:col-span-2">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 sm:h-2 rounded-full mt-1.5 sm:mt-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 h-1.5 sm:h-2 rounded-full"
                    style={{ width: `${(leetcodeStats.totalSolved / 2500) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{leetcodeStats.totalSolved} / 2500 problems</p>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 flex justify-center md:justify-end">
              <a
                href={`https://leetcode.com/${leetcodeUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#f89f1b] hover:bg-[#e09018] text-white text-xs sm:text-sm dark:bg-[#f89f1b] dark:hover:bg-[#e09018] rounded-md sm:rounded-lg transition-colors flex items-center"
              >
                <FaCode className="mr-1.5 sm:mr-2" /> View LeetCode Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeContributions;