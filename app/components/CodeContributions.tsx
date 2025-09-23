"use client";

import React, { useState, useEffect } from 'react';
import { FaGithub, FaCode } from 'react-icons/fa';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';

interface ContributionDay {
  date: string;
  count: number;
}

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking?: number;
  contestRating?: number;
}

interface ContributionProps {
  githubUsername?: string;
  leetcodeUsername?: string;
  githubContributions?: ContributionDay[];
  leetcodeStats?: LeetCodeStats;
}

const CodeContributions: React.FC<ContributionProps> = ({
  githubUsername = "dharun36",
  leetcodeUsername = "23adr036",
  githubContributions = [],
}) => {
  // Custom CSS for the LeetCode calendar
  const calendarStyles = `
    .calendar-container {
      padding: 12px;
      border-radius: 6px;
      background: rgba(30, 30, 30, 0.3);
      max-width: 100%;
      overflow-x: auto;
      margin-bottom: 12px;
    }
    .leetcode-calendar {
      min-width: fit-content;
      padding: 4px;
    }
    .leetcode-calendar .day-cell {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      transition: transform 0.15s ease-in-out;
    }
    .leetcode-calendar .day-cell:hover {
      transform: scale(1.35);
      z-index: 10;
    }
    @media (min-width: 640px) {
      .calendar-container {
        padding: 16px;
      }
      .leetcode-calendar .day-cell {
        width: 13px;
        height: 13px;
      }
    }
  `;
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats>({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch LeetCode stats using our API
  async function getLeetCodeStats(username: string) {
    try {
      const res = await axios.post('/api/leetcode', { username });
      return res.data;
    } catch (err) {
      console.error('Error fetching LeetCode stats:', err);
      throw err;
    }
  }

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        setLoading(true);
        // We still fetch data for the stats section
        const data = await getLeetCodeStats(leetcodeUsername);

        // We don't need to process submission calendar data anymore
        // as we're using the LeetCard API with heatmap for visualization
        setLeetcodeStats({
          totalSolved: data.totalSolved || 0,
          easySolved: data.easySolved || 0,
          mediumSolved: data.mediumSolved || 0,
          hardSolved: data.hardSolved || 0,
          ranking: data.ranking,
          contestRating: data.contestRating
        });
      } catch (err) {
        console.error('Failed to fetch LeetCode data', err);
        setError('Failed to load LeetCode stats');
        // Fallback to default data if API fails
        setLeetcodeStats({
          totalSolved: 354,
          easySolved: 125,
          mediumSolved: 189,
          hardSolved: 40,
          ranking: 12437,
          contestRating: 1842,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeData();
  }, [leetcodeUsername]);

  // We no longer need the helper functions for determining color as we're using the LeetCodeHeatMap component

  return (
    <div className="w-full min-h-screen py-12 sm:py-16 md:py-24 flex flex-col" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <style jsx>{calendarStyles}</style>
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-black dark:text-white p-2 sm:p-3 font-bold mb-2 sm:mb-4 text-center mx-auto">
        Code Contributions
      </h2>
      <p className="text-center text-sm sm:text-base md:text-lg mb-6 sm:mb-10 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-4 text-gray-700 dark:text-gray-300">
        My activity on GitHub and LeetCode
      </p>

      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-3 sm:px-6 md:px-12">
        <div className="flex flex-col gap-10">
          {/* GitHub Contribution Section - Full Width */}
          <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-transparent from-gray-900 via-[#0d1117] to-[#0d1117] p-3 sm:p-4 md:p-6 shadow-lg">
            <div className="flex items-center mb-3 sm:mb-6">
              <FaGithub className="text-xl sm:text-2xl md:text-3xl mr-2 sm:mr-3 text-gray-200" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">GitHub Contributions</h3>
            </div>
            {/* GitHub Contributions Calendar */}
            <div className="mb-4 sm:mb-6">
              <div className="overflow-x-auto py-4">
                <GitHubCalendar
                  username={githubUsername}
                  colorScheme="dark"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  hideColorLegend={false}
                  hideMonthLabels={false}
                  labels={{
                    totalCount: '{{count}} contributions in the last year'
                  }}
                />
              </div>
            </div>
          </div>

          {/* LeetCode Stats Section */}
          <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-transparent p-3 sm:p-4 md:p-6 shadow-lg">
            <div className="flex items-center mb-3 sm:mb-6">
              <FaCode className="text-xl sm:text-2xl md:text-3xl mr-2 sm:mr-3 text-gray-200" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">LeetCode Stats</h3>
            </div>


            {/* LeetCode Contributions Calendar */}
            <div className="mb-4 sm:mb-6 bg-transparent">

              <div className="overflow-x-auto py-4">
                {/* LeetCard API with heatmap */}
                <div className="w-full flex justify-center items-center">
                  <img
                    src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?ext=heatmap&theme=dark`}
                    alt="LeetCode Stats"
                    className="w-full max-w-3xl"
                    style={{ borderRadius: '8px' }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeContributions;
