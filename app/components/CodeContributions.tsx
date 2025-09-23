"use client";

import React, { useState, useEffect } from 'react';
import { FaGithub, FaCode } from 'react-icons/fa';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';

interface ContributionDay {
  date: string;
  count: number;
}

interface LeetCodeSubmissionCalendar {
  [timestamp: string]: number;
}

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking?: number;
  contestRating?: number;
  submissionCalendar?: LeetCodeSubmissionCalendar;
  submissionCalendarArray?: Array<{ date: string, count: number }>;
}

interface ContributionProps {
  githubUsername?: string;
  leetcodeUsername?: string;
  githubContributions?: ContributionDay[];
  leetcodeStats?: LeetCodeStats;
}

const CodeContributions: React.FC<ContributionProps> = ({
  githubUsername = "dharun36",
  leetcodeUsername = "dharun36",
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

  // Function to fetch LeetCode stats
  async function getLeetCodeStats(username: string) {
    try {
      const res = await axios.post('https://leetcode-restful-api.vercel.app/profile', { username });
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
        const data = await getLeetCodeStats(leetcodeUsername);

        // Transform the submission calendar data from API
        let calendarArray: Array<{ date: string, count: number }> = [];
        if (data.submissionCalendar) {
          try {
            calendarArray = Object.entries(data.submissionCalendar)
              .filter(([timestamp, count]) => {
                // Validate that timestamp is a valid number and count is a number
                const isValid = !isNaN(parseInt(timestamp)) && typeof count === 'number';
                return isValid;
              })
              .map(([timestamp, count]) => ({
                date: new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0],
                count: count as number
              }));
          } catch (err) {
            console.error('Error processing LeetCode submission calendar', err);
            // Provide empty array if there's an error
            calendarArray = [];
          }
        }

        setLeetcodeStats({
          totalSolved: data.totalSolved || 0,
          easySolved: data.easySolved || 0,
          mediumSolved: data.mediumSolved || 0,
          hardSolved: data.hardSolved || 0,
          ranking: data.ranking,
          contestRating: data.contestRating,
          submissionCalendar: data.submissionCalendar,
          submissionCalendarArray: calendarArray
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

  // Helper function to determine color intensity based on contribution count
  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800";
    if (count <= 2) return "bg-blue-100 dark:bg-blue-900";
    if (count <= 4) return "bg-blue-300 dark:bg-blue-700";
    if (count <= 6) return "bg-blue-400 dark:bg-blue-600";
    return "bg-blue-500 dark:bg-blue-500";
  };

  // Helper function to determine color for LeetCode submissions
  const getSubmissionColor = (count: number, isToday: boolean = false) => {
    if (isToday) {
      // Special border for today's cell
      return count === 0
        ? "bg-gray-800/30 ring-1 ring-white/30"
        : `${getSubmissionBaseColor(count)} ring-1 ring-white/50`;
    }
    return getSubmissionBaseColor(count);
  };

  // Base color function for submissions
  const getSubmissionBaseColor = (count: number) => {
    if (count === 0) return "bg-gray-800/30";
    if (count === 1) return "bg-[#f7cf7c]/40";
    if (count === 2) return "bg-[#f7cf7c]/60";
    if (count === 3) return "bg-[#f7cf7c]/80";
    if (count === 4) return "bg-[#f7cf7c]";
    if (count <= 6) return "bg-[#f89f1b]/80";
    if (count <= 9) return "bg-[#f89f1b]/90";
    return "bg-[#f89f1b]";
  };

  return (
    <div className="w-full min-h-screen py-12 sm:py-16 md:py-24 flex flex-col" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <style jsx>{calendarStyles}</style>
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-black dark:text-white p-2 sm:p-3 font-bold mb-2 sm:mb-4 text-center mx-auto">
        Code Contributions
      </h2>
      <p className="text-center text-sm sm:text-base md:text-lg mb-6 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto px-4 text-gray-700 dark:text-gray-300">
        My activity on GitHub and LeetCode
      </p>

      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-3 sm:px-6 md:px-12">
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
          <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-[#0d1117] to-[#0d1117] p-3 sm:p-4 md:p-6 shadow-lg">
            <div className="flex items-center mb-3 sm:mb-6">
              <FaCode className="text-xl sm:text-2xl md:text-3xl mr-2 sm:mr-3 text-gray-200" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">LeetCode Stats</h3>
            </div>

            <div className="mb-4">
              <a
                href={`https://leetcode.com/${leetcodeUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f89f1b] hover:underline font-medium flex items-center"
              >
                @{leetcodeUsername}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* LeetCode Contributions Calendar */}
            <div className="mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <p className="text-xs sm:text-sm text-gray-400">LeetCode Submission Activity:</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Last 15 weeks</p>
              </div>
              <div className="overflow-x-auto py-4">
                {loading ? (
                  <div className="flex flex-col justify-center items-center h-32 gap-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#f89f1b]"></div>
                    <p className="text-sm text-[#f89f1b]">Loading LeetCode data...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col justify-center items-center h-24 gap-2">
                    <p className="text-red-400 text-sm">{error}</p>
                    <p className="text-gray-400 text-xs">Using fallback data instead</p>
                  </div>
                ) : leetcodeStats.submissionCalendarArray && leetcodeStats.submissionCalendarArray.length > 0 ? (
                  <div className="calendar-container">
                    <div className="leetcode-calendar">
                      {/* Month Labels */}
                      <div className="flex text-xs text-gray-400 mb-2">
                        {(() => {
                          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                          const today = new Date();
                          const monthsToShow = 5;
                          const elements: React.ReactNode[] = [];

                          for (let i = monthsToShow; i >= 0; i--) {
                            const date = new Date();
                            date.setMonth(today.getMonth() - i);
                            const month = months[date.getMonth()];

                            // Position month label approximately where it should appear
                            const position = (monthsToShow - i) * (100 / monthsToShow);
                            elements.push(
                              <div
                                key={month}
                                className="absolute text-xs"
                                style={{ left: `${position}%` }}
                              >
                                {month}
                              </div>
                            );
                          }

                          return <div className="relative h-4 w-full">{elements}</div>;
                        })()}
                      </div>

                      {/* Days of Week Labels */}
                      <div className="flex text-xs text-gray-400 mb-1">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                          <div key={day} className="w-3 mx-1 text-center">
                            {idx % 2 === 0 ? day[0] : ''}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-flow-col gap-1">
                        {Array.from({ length: 7 }, (_, dayOfWeek) => (
                          <div key={dayOfWeek} className="grid grid-flow-row gap-1">
                            {(() => {
                              // Get last 365 days of data (or all available)
                              const data = leetcodeStats.submissionCalendarArray || [];
                              const cells: React.ReactNode[] = [];

                              // Filter for submissions matching this day of week
                              const daysForThisColumn = data
                                .filter(day => {
                                  const date = new Date(day.date);
                                  return date.getDay() === dayOfWeek;
                                })
                                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                              // Create cells for this column (day of week)
                              daysForThisColumn.slice(-15).forEach(day => {
                                // Format date for display
                                const date = new Date(day.date);
                                const formattedDate = date.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                });

                                // Check if this is today's cell
                                const today = new Date();
                                const isToday = date.toDateString() === today.toDateString();

                                cells.push(
                                  <div
                                    key={day.date}
                                    className={`day-cell ${getSubmissionColor(day.count, isToday)}`}
                                    title={`${formattedDate}: ${day.count} ${day.count === 1 ? 'submission' : 'submissions'}`}
                                  />
                                );
                              });

                              return cells;
                            })()}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between mt-4 text-xs text-gray-400 items-center">
                      <span>Less</span>
                      <div className="flex gap-1">
                        {[0, 1, 2, 4, 6, 10].map(count => (
                          <div
                            key={count}
                            className={`w-3 h-3 rounded-sm ${getSubmissionColor(count)}`}
                            title={`${count} ${count === 1 ? 'submission' : 'submissions'}`}
                          />
                        ))}
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center h-24 gap-1">
                    <p className="text-gray-400 text-sm">No submission data available</p>
                    <p className="text-gray-500 text-xs">Try refreshing or check your username</p>
                  </div>
                )}
              </div>
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